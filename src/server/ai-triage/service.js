import { config } from '../../config/config.js'
import { createNotifyClient } from '../../notify/notify-client.js'
import { createLogger } from '../common/helpers/logging/logger.js'
import {
  buildSendTriageEmailErrorLog,
  buildSendTriageEmailSuccessLog
} from './logging/send-triage-email-log-utils.js'

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
 * @param {Record<string, object>} [params]
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
      { err: error },
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
    {
      reference: response.data?.reference
    },
    'Confirmation email sent successfully via Notify'
  )

  return {
    success: true,
    data: response.data
  }
}
/**
 * Submits a triage request - returns an result object representing email sending
 * outcome.
 *
 * @param {import('./model.js').TriageSubmission} submission
 * @returns {Promise<{ triageResult: { success: boolean, data?: object, error?: object } }>}
 */
export async function submit(submission) {
  const reference = `triage-${Date.now()}`
  const triageResult = await sendTriageEmail(submission, reference)
  if (!triageResult.success) {
    return {
      triageResult
    }
  }
  const confirmationResult = await sendConfirmationEmail(submission, reference)

  return {
    triageResult,
    confirmationResult
  }
}
