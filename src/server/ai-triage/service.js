import { config } from '../../config/config.js'
import { notifyClient } from '../../notify/notify-client.js'
import { createLogger } from '../common/helpers/logging/logger.js'

const logger = createLogger()

/**
 * @typedef {{ data: object, status: number }} NotifyError
 */

/**
 * Sends an email via GOV.UK Notify, returning a result tuple to avoid leaking
 * PII from the raw error response and allow the caller to decide how to handle errors.
 * 
 * @param {string} templateId
 * @param {string} email
 * @param {Record<string, object>} [params]
 * @returns {Promise<[import('axios').AxiosResponse, null] | [null, NotifyError]>}
 */
async function trySendEmail(templateId, email, params = {}) {
  try {
    const response = await notifyClient.sendEmail(templateId, email, {
      personalisation: params,
      reference: `triage-${Date.now()}`
    })

    return [response, null]
  } catch (error) {
    if (!error.response) {
      throw new Error(`Unknown error while attempting to send email via Notify: ${error.message || error.code}`)
    }

    const data = error.response?.data
    const status = error.response?.status

    return [null, { data, status }]
  }
}

/**
 * Sends a triage submission email and returns a result object indicating success or failure.
 * 
 * @param {import('./models.js').TriageSubmission} submission
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
async function sendTriageEmail(submission) {
  const templateId = config.get('notify.triageTemplateId')
  const sharedMailbox = config.get('notify.aiceMailbox')

  const [response, error] = await trySendEmail(templateId, sharedMailbox, {
    emailAddress: submission.email,
    problem: submission.problem,
    users: submission.users,
    benefits: submission.benefits,
    solutionAttempts: submission.solutionAttempts
  })

  if (error) {
    logger.error(
      { err: error },
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
    {
      reference: response.data?.reference,
    },
    'Triage email sent successfully via Notify'
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
 * @param {import('./models.js').TriageSubmission} submission
 * @returns {Promise<{ triageResult: { success: boolean, data?: object, error?: object } }>}
 */
export async function submit(submission) {
  const triageResult = await sendTriageEmail(submission)

  return {
    triageResult
  }
}
