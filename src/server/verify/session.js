import { randomUUID } from 'node:crypto'

import {
  DEFAULT_RETURN_URL,
  VERIFY_ERROR_FLASH_KEY,
  PENDING_VERIFY_SESSION_KEY
} from './constants.js'

/**
 * @typedef {object} PendingLogin
 * @property {string} pendingId - key into the verification-code cache
 * @property {string} email
 * @property {string} returnUrl - path to redirect to after a successful verify
 * @property {string} [codeSubmitHref] - where the code-entry form posts to;
 *   defaults to /verify/code when not set (see startVerification)
 * @property {string} [changeEmailHref] - where "enter a different email"
 *   links to; defaults to /verify when not set
 */

/**
 * @typedef {object} LoginError
 * @property {string} error - message to display on the email page
 * @property {string} returnUrl - return URL to carry back to the email page
 */

/**
 * Store the pending verify state (between the email step and the code step)
 * in the user's session.
 *
 * @param {import('@hapi/yar').Yar} yar
 * @param {PendingLogin} pendingLogin
 * @returns {void}
 */
export function setPendingLogin (yar, pendingLogin) {
  yar.set(PENDING_VERIFY_SESSION_KEY, pendingLogin)
}

/**
 * Retrieve the pending verify state, if any.
 *
 * @param {import('@hapi/yar').Yar} yar
 * @returns {PendingLogin | null}
 */
export function getPendingLogin (yar) {
  return yar.get(PENDING_VERIFY_SESSION_KEY) ?? null
}

/**
 * Clear the pending verify state, e.g. once a verify succeeds or is abandoned.
 *
 * @param {import('@hapi/yar').Yar} yar
 * @returns {void}
 */
export function clearPendingLogin (yar) {
  yar.clear(PENDING_VERIFY_SESSION_KEY)
}

/**
 * Store a one-time verify error to show on the email page after a redirect
 * (e.g. an expired or locked-out code). Read once via popLoginError, which
 * clears it - so a page refresh doesn't keep re-showing the same error.
 *
 * @param {import('@hapi/yar').Yar} yar
 * @param {LoginError} loginError
 * @returns {void}
 */
export function setLoginError (yar, loginError) {
  yar.flash(VERIFY_ERROR_FLASH_KEY, loginError)
}

/**
 * Retrieve and clear the one-time verify error, if any.
 *
 * @param {import('@hapi/yar').Yar} yar
 * @returns {LoginError | null}
 */
export function popLoginError (yar) {
  const loginErrors = yar.flash(VERIFY_ERROR_FLASH_KEY)

  return loginErrors[0] ?? null
}

/**
 * Determine the URL to return to once verify succeeds. Falls back to the
 * default when no return URL was captured (e.g. the user navigated to
 * /verify directly rather than being redirected from a protected page).
 *
 * @param {string | undefined | null} returnUrl
 * @returns {string}
 */
export function resolveReturnUrl (returnUrl) {
  if (typeof returnUrl !== 'string' || !returnUrl.startsWith('/')) {
    return DEFAULT_RETURN_URL
  }

  // Guard against open redirects - only allow same-origin relative paths.
  if (returnUrl.startsWith('//') || returnUrl.includes('://')) {
    return DEFAULT_RETURN_URL
  }

  return returnUrl
}

/**
 * Create a pending code-verification cache entry, keyed by a freshly
 * generated pending ID.
 *
 * @param {import('@hapi/catbox').Policy} codeCache
 * @param {{ email: string, verificationCode: string }} params
 * @returns {Promise<string>} the generated pending ID
 */
export async function createPendingCode (codeCache, params) {
  const pendingId = randomUUID()

  await codeCache.set(pendingId, {
    email: params.email,
    verificationCode: params.verificationCode,
    attempts: 0
  })

  return pendingId
}

/**
 * Retrieve a pending code-verification cache entry.
 *
 * @param {import('@hapi/catbox').Policy} codeCache
 * @param {string} pendingId
 * @returns {Promise<{ email: string, verificationCode: string, attempts: number } | null>}
 */
export async function getPendingCode (codeCache, pendingId) {
  return codeCache.get(pendingId)
}

/**
 * Drop a pending code-verification cache entry, e.g. once it has been used
 * or abandoned.
 *
 * @param {import('@hapi/catbox').Policy} codeCache
 * @param {string} pendingId
 * @returns {Promise<void>}
 */
export async function dropPendingCode (codeCache, pendingId) {
  await codeCache.drop(pendingId)
}

/**
 * Record an incorrect code attempt against a pending code-verification
 * cache entry.
 *
 * @param {import('@hapi/catbox').Policy} codeCache
 * @param {string} pendingId
 * @param {{ email: string, verificationCode: string, attempts: number }} cached
 * @returns {Promise<number>} the new attempt count
 */
export async function recordFailedCodeAttempt (codeCache, pendingId, cached) {
  const attempts = cached.attempts + 1

  await codeCache.set(pendingId, { ...cached, attempts })

  return attempts
}

/**
 * The cache key an authenticated session is stored under, keyed by the
 * sessionId issued in the auth cookie. Centralised here since it's written
 * by completeLogin, read by the 'session' auth strategy's validate function
 * (see common/helpers/auth.js), and dropped by clearAuthSession - all three
 * need to agree on the same key format.
 *
 * @param {string} sessionId
 * @returns {string}
 */
export function sessionCacheKey (sessionId) {
  return `verification:${sessionId}`
}

/**
 * Create an authenticated session for the given email and set the
 * session cookie on the response.
 *
 * @param {import('@hapi/catbox').Policy} cache
 * @param {import('@hapi/hapi').Request['cookieAuth']} cookieAuth
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function completeLogin (cache, cookieAuth, email) {
  const sessionId = randomUUID()

  await cache.set(sessionCacheKey(sessionId), { email })

  cookieAuth.set({ sessionId })
}

/**
 * Fully invalidates the current authenticated session: drops the
 * server-side cache entry completeLogin created (so the session can't be
 * revalidated even if the cookie itself survives) and clears the auth
 * cookie. Safe to call with no sessionId (e.g. there was never a valid
 * session) - it just clears the cookie in that case.
 *
 * @param {import('@hapi/catbox').Policy} cache
 * @param {import('@hapi/hapi').Request['cookieAuth']} cookieAuth
 * @param {string | undefined | null} sessionId
 * @returns {Promise<void>}
 */
export async function clearAuthSession (cache, cookieAuth, sessionId) {
  if (sessionId) {
    await cache.drop(sessionCacheKey(sessionId))
  }

  cookieAuth.clear()
}
