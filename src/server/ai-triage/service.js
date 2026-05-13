import { config } from '../../config/config.js'
import { createNotifyClient } from '../../notify/notify-client.js'
import { createLogger } from '../common/helpers/logging/logger.js'
import { randomBytes } from 'crypto'
import {
  buildSendTriageEmailErrorLog,
  buildSendTriageEmailSuccessLog
} from './logging/send-triage-email-log-utils.js'
import {
  buildSendConfirmationEmailErrorLog,
  buildSendConfirmationEmailSuccessLog
} from './logging/send-confirmation-email-log-utils.js'

const logger = createLogger()
const notifyClient = createNotifyClient(config.get('notify.aiToolkit.apiKey'))

/**
 * @typedef {import('../../notify/notify-client.js').NotifyError} NotifyError
 * @typedef {import('../../notify/notify-client.js').NotifySendEmailResponse} NotifySendEmailResponse
 */

/**
 * Sends an email via GOV.UK Notify, returning a result tuple to avoid leaking
 * PII from the raw error response and allow the caller to decide how to handle errors.
 *
 * @param {string} templateId
 * @param {string} email
 * @param {{ personalisation?: Record<string, unknown>, reference?: string }} [params]
 * @returns {Promise<[{ data: NotifySendEmailResponse, status: number }, null] | [null, NotifyError]>}
 */
async function trySendEmail(templateId, email, params = {}) {
  try {
    const response = await notifyClient.sendEmail(templateId, email, {
      personalisation: params.personalisation,
      reference: params.reference
    })

    return [{ data: response.data, status: response.status }, null]
  } catch (error) {
    if (!error.response) {
      throw new Error(
        `Unknown error while attempting to send email via Notify: ${error.message || error.code}`
      )
    }

    const data = error.response.data
    const status = error.response.status

    return [null, { data, status }]
  }
}

/**
 * Sends a triage submission email and returns a result object indicating success or failure.
 *
 * @param {import('./model.js').TriageSubmission} submission
 * @param {string} reference
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
async function sendTriageEmail(submission, reference) {
  const templateId = config.get('notify.aiToolkit.triageTemplateId')
  const sharedMailbox = config.get('notify.aiToolkit.mailbox')

  const [response, error] = await trySendEmail(templateId, sharedMailbox, {
    personalisation: {
      emailAddress: submission.email,
      problem: submission.problem,
      users: submission.users,
      benefits: submission.benefits,
      solutionAttempts: submission.solutionAttempts
    },
    reference
  })

  if (error) {
    logger.error(
      buildSendTriageEmailErrorLog(error),
      'Failed to send triage email via Gov.UK Notify'
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
    buildSendTriageEmailSuccessLog(response.data.reference),
    'Triage email sent successfully via Notify'
  )

  return {
    success: true,
    data: response.data
  }
}

/**
 * Sends a confirmation email and returns a result object indicating success or failure.
 *
 * @param {import('./model.js').TriageSubmission} submission
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
async function sendConfirmationEmail(submission, reference) {
  const templateId = config.get('notify.aiToolkit.confirmationTemplateId')

  const [response, error] = await trySendEmail(templateId, submission.email, {
    reference
  })

  if (error) {
    logger.error(
      buildSendConfirmationEmailErrorLog(error),
      'Failed to send confirmation email via Gov.UK Notify'
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
    buildSendConfirmationEmailSuccessLog(response.data?.reference),
    'Confirmation email sent successfully via Notify'
  )

  return {
    success: true,
    data: response.data
  }
}

function generateReference() {
  // No O, 0, I, 1 — to avoid transcription errors
  const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const year = new Date().getFullYear().toString().slice(-2)
  const bytes = randomBytes(6)
  let suffix = ''
  for (let i = 0; i < 6; i++) {
    suffix += CHARSET[bytes[i] % CHARSET.length]
  }
  return `AICE-${year}-${suffix}`
}

/**
 * Submits a triage request - returns an result object representing email sending
 * outcome.
 *
 * @param {import('./model.js').TriageSubmission} submission
 * @returns {Promise<{
 *    triageResult: { success: boolean, data?: object, error?: object },
 *    confirmationResult?: { success: boolean, data?: object, error?: object }
 *    reference?: string
 * }>}
 */
export async function submit(submission) {
  const reference = generateReference()
  const triageResult = await sendTriageEmail(submission, reference)
  if (!triageResult.success) {
    return {
      triageResult
    }
  }
  const confirmationResult = await sendConfirmationEmail(submission, reference)

  return {
    triageResult,
    confirmationResult,
    reference
  }
}
