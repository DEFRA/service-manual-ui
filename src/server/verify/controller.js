import {
  codeErrors,
  codeResults,
  DEFAULT_CODE_SUBMIT_PATH,
  DEFAULT_CHANGE_EMAIL_PATH,
  ENTER_EMAIL_TEMPLATE,
  ENTER_CODE_TEMPLATE
} from './constants.js'

import * as loginService from './service.js'
import * as sessionHelper from './session.js'

/**
 * GET /verify - renders the email input page.
 */
export async function getEmailPage (request, h) {
  const loginError = sessionHelper.popLoginError(request.yar)
  const returnUrl = sessionHelper.resolveReturnUrl(
    loginError?.returnUrl ?? request.query.returnUrl
  )

  return h.view(ENTER_EMAIL_TEMPLATE, {
    pageTitle: 'Sign in',
    returnUrl,
    error: loginError?.error
  })
}

/**
 * Generates and sends a verification code for the given email, stores the
 * pending verify state, and redirects to the challenge code page. Falls
 * back to re-rendering the email page with an error if the send fails.
 *
 * Shared by the email-entry form (postEmailPage) and any other flow that
 * already knows and trusts the user's email and wants to skip straight to
 * the code step.
 *
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 * @param {string} email
 * @param {string} returnUrl
 * @param {{ codeSubmitHref?: string, changeEmailHref?: string }} [options]
 */
export async function startVerification (request, h, email, returnUrl, options = {}) {
  const codeSubmitHref = options.codeSubmitHref ?? DEFAULT_CODE_SUBMIT_PATH
  const changeEmailHref = options.changeEmailHref ?? DEFAULT_CHANGE_EMAIL_PATH

  const codeCache = request.server.app.codeCache
  const verificationCode = loginService.generateVerificationCode()
  const pendingId = await sessionHelper.createPendingCode(codeCache, {
    email,
    verificationCode
  })

  const sendResult = await loginService.sendVerificationCode(email, verificationCode)

  if (!sendResult.success) {
    await sessionHelper.dropPendingCode(codeCache, pendingId)

    return h.view(ENTER_EMAIL_TEMPLATE, {
      pageTitle: 'Sign in',
      returnUrl,
      email,
      error: 'There was a problem sending your code. Try again in a few minutes.'
    })
  }

  sessionHelper.setPendingLogin(request.yar, {
    pendingId,
    email,
    returnUrl,
    codeSubmitHref,
    changeEmailHref
  })

  return h.redirect('/verify/code')
}

/**
 * POST /verify - validates the submitted email, and if it is on the allow
 * list, generates and sends a verification code then redirects to the
 * challenge code page.
 */
export async function postEmailPage (request, h) {
  const { email } = request.payload

  const returnUrl = sessionHelper.resolveReturnUrl(request.payload?.returnUrl)

  return startVerification(request, h, email, returnUrl)
}

/**
 * GET /verify/code - renders the challenge code input page. Redirects back
 * to /verify if there is no pending verify (e.g. session expired or user
 * navigated here directly).
 */
export async function getCodePage (request, h) {
  const pendingLogin = sessionHelper.getPendingLogin(request.yar)

  if (!pendingLogin) {
    return h.redirect('/verify')
  }

  return h.view(ENTER_CODE_TEMPLATE, {
    pageTitle: 'Enter your code',
    email: pendingLogin.email,
    codeSubmitHref: pendingLogin.codeSubmitHref ?? DEFAULT_CODE_SUBMIT_PATH,
    changeEmailHref: pendingLogin.changeEmailHref ?? DEFAULT_CHANGE_EMAIL_PATH
  })
}

/**
 * @typedef {object} CodeSubmissionResult
 * @property {'no-pending'|'verified'|'restart'|'retry'} outcome
 * @property {string} [email] - present for 'verified' and 'retry'
 * @property {string} [returnUrl] - present for 'verified'
 * @property {string} [codeSubmitHref] - present for 'retry'
 * @property {string} [changeEmailHref] - present for 'retry'
 * @property {string} [error] - present for 'retry'
 */

/**
 * Validates a submitted challenge code against the pending verify, and
 * applies the resulting session/cache/cookie changes (completing the login,
 * dropping or updating the pending code, tracking attempts). Returns a
 * plain result describing the outcome rather than producing an HTTP
 * response itself, so callers can decide what happens next - e.g. the
 * generic /verify/code redirects to the captured return URL on success,
 * while ai-triage's own code-submission route uses the same verification to
 * go straight into submitting the triage form.
 *
 * @param {import('@hapi/hapi').Request} request
 * @returns {Promise<CodeSubmissionResult>}
 */
export async function processCodeSubmission (request) {
  const pendingLogin = sessionHelper.getPendingLogin(request.yar)

  if (!pendingLogin) {
    return { outcome: 'no-pending' }
  }

  const { code: submittedCode } = request.payload
  const codeCache = request.server.app.codeCache

  const cached = await sessionHelper.getPendingCode(codeCache, pendingLogin.pendingId)
  const result = loginService.checkVerificationCode(cached, submittedCode)

  if (result.status === codeResults.VERIFIED) {
    await sessionHelper.completeLogin(
      request.server.app.cache,
      request.cookieAuth,
      cached.email
    )

    await sessionHelper.dropPendingCode(codeCache, pendingLogin.pendingId)
    sessionHelper.clearPendingLogin(request.yar)

    return {
      outcome: 'verified',
      email: cached.email,
      returnUrl: pendingLogin.returnUrl
    }
  }

  if (result.status === codeResults.LOCKED_OUT) {
    await sessionHelper.dropPendingCode(codeCache, pendingLogin.pendingId)
  }

  if (result.status === codeResults.INCORRECT) {
    await sessionHelper.recordFailedCodeAttempt(codeCache, pendingLogin.pendingId, cached)
  }

  if (codeErrors[result.status]) {
    sessionHelper.clearPendingLogin(request.yar)

    sessionHelper.setLoginError(request.yar, {
      error: codeErrors[result.status],
      returnUrl: pendingLogin.returnUrl
    })

    return { outcome: 'restart' }
  }

  return {
    outcome: 'retry',
    email: pendingLogin.email,
    codeSubmitHref: pendingLogin.codeSubmitHref ?? DEFAULT_CODE_SUBMIT_PATH,
    changeEmailHref: pendingLogin.changeEmailHref ?? DEFAULT_CHANGE_EMAIL_PATH,
    error: 'Enter the correct code. Check your email and try again.'
  }
}

/**
 * POST /verify/code - the verification code "callback": validates the submitted
 * code against the pending verify. On success, creates an authenticated
 * session and redirects to the captured return URL. On failure, tracks
 * attempts and either re-prompts or sends the user back to request a new
 * code once the attempt limit is reached.
 */
export async function postCodePage (request, h) {
  const result = await processCodeSubmission(request)

  if (result.outcome === 'verified') {
    return h.redirect(sessionHelper.resolveReturnUrl(result.returnUrl))
  }

  if (result.outcome === 'retry') {
    return h.view(ENTER_CODE_TEMPLATE, {
      pageTitle: 'Enter your code',
      email: result.email,
      codeSubmitHref: result.codeSubmitHref,
      changeEmailHref: result.changeEmailHref,
      error: result.error
    })
  }

  // 'no-pending' or 'restart'
  return h.redirect('/verify')
}
