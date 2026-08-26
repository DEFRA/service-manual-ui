import { randomInt } from 'node:crypto'

import { config } from '../../config/config.js'

import { trySendEmail, createNotifyClient } from '../../notify/notify-client.js'

import { createLogger } from '../common/helpers/logging/logger.js'
import * as codeLogUtils from '../common/helpers/logging/send-verification-code-email-log-utils.js'

import { MAX_CODE_ATTEMPTS, VERIFICATION_CODE_LENGTH, codeResults } from './constants.js'

const logger = createLogger()

const notifyClient = createNotifyClient(config.get('notify.aiToolkit.apiKey'))

/**
 * Generates a random numeric verification (challenge) code of
 * VERIFICATION_CODE_LENGTH digits, e.g. "048213".
 *
 * @returns {string}
 */
export function generateVerificationCode () {
  const max = 10 ** VERIFICATION_CODE_LENGTH
  const code = randomInt(0, max)

  return code.toString().padStart(VERIFICATION_CODE_LENGTH, '0')
}

/**
 * Sends the verification code email and returns a result object
 * indicating success or failure.
 *
 * @param {string} email
 * @param {string} verificationCode
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function sendVerificationCode (email, verificationCode) {
  const templateId = config.get('notify.aiToolkit.verificationCodeTemplateId')

  const [response, error] = await trySendEmail(notifyClient, templateId, email, {
    personalisation: { verificationCode }
  })

  if (error) {
    logger.error(
      codeLogUtils.buildSendVerificationCodeEmailErrorLog(error),
      'Failed to send verification code email via Gov.UK Notify'
    )

    return {
      success: false,
      error: {
        details: error.data,
        status: error.status
      }
    }
  }

  logger.info(
    codeLogUtils.buildSendVerificationCodeEmailSuccessLog(
      response.data.reference
    ),
    'Verification code email sent successfully via Notify'
  )

  return {
    success: true,
    data: response.data
  }
}

/**
 * Decides the outcome of a submitted challenge code against the pending
 * verify's cached code entry. Pure decision logic only - the caller is
 * responsible for acting on the cache/session/cookie state based on the
 * returned status (e.g. completing the verify, dropping the cache entry,
 * or recording the failed attempt).
 *
 * @param {{ verificationCode: string, attempts: number } | null} cached
 * @param {string} submittedCode
 * @returns {
 *   | { status: 'verified' }
 *   | { status: 'expired' }
 *   | { status: 'incorrect' }
 *   | { status: 'locked-out' }
 * }
 */
export function checkVerificationCode (cached, submittedCode) {
  if (!cached) {
    return { status: codeResults.EXPIRED }
  }

  if (cached.verificationCode === submittedCode) {
    return { status: codeResults.VERIFIED }
  }

  const attempts = cached.attempts + 1

  if (attempts >= MAX_CODE_ATTEMPTS) {
    return { status: codeResults.LOCKED_OUT }
  }

  return { status: 'incorrect' }
}
