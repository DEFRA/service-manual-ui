import { randomBytes } from 'node:crypto'

import { config } from '../../config/config.js'

import { createNotifyClient } from '../../notify/notify-client.js'

import { createLogger } from '../common/helpers/logging/logger.js'
import * as SendTriageEmailLog from '../common/helpers/logging/send-triage-email-log-utils.js'
import * as SendConfirmationEmailLog from '../common/helpers/logging/send-confirmation-email-log-utils.js'
import * as PostSubmissionLog from '../common/helpers/logging/post-submission-log-utils.js'

import {
  REFERENCE_CHARSET,
  REFERENCE_SUFFIX_LENGTH,
  REFERENCE_YEAR_SLICE
} from './constants.js'
import submissionSchema from './schemas/submission.js'
import { postSubmission } from './automation-api.js'

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
async function trySendEmail (templateId, email, params = {}) {
  try {
    const response = await notifyClient.sendEmail(templateId, email, {
      personalisation: params.personalisation,
      reference: params.reference
    })

    return [{ data: response.data, status: response.status }, null]
  } catch (error) {
    if (!error.response) {
      return [
        null,
        { data: null, status: null, message: error.message || error.code }
      ]
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
async function sendTriageEmail (submission, reference) {
  const templateId = config.get('notify.aiToolkit.triageTemplateId')
  const sharedMailbox = config.get('notify.aiToolkit.mailbox')

  const [response, error] = await trySendEmail(templateId, sharedMailbox, {
    personalisation: {
      emailAddress: submission.email,
      problem: submission.problem,
      users: submission.users,
      benefits: submission.benefits,
      solutionAttempts: submission.solutionAttempts,
      dataReadiness: submission.dataReadiness
    },
    reference
  })

  if (error) {
    logger.error(
      SendTriageEmailLog.buildSendTriageEmailErrorLog(error),
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
    SendTriageEmailLog.buildSendTriageEmailSuccessLog(response.data.reference),
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
async function sendConfirmationEmail (submission, reference) {
  const templateId = config.get('notify.aiToolkit.confirmationTemplateId')

  const [response, error] = await trySendEmail(templateId, submission.email, {
    reference
  })

  if (error) {
    logger.error(
      SendConfirmationEmailLog.buildSendConfirmationEmailErrorLog(error),
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
    SendConfirmationEmailLog.buildSendConfirmationEmailSuccessLog(
      response.data?.reference
    ),
    'Confirmation email sent successfully via Notify'
  )

  return {
    success: true,
    data: response.data
  }
}

function generateReference () {
  const year = new Date().getFullYear().toString().slice(REFERENCE_YEAR_SLICE)
  const bytes = randomBytes(REFERENCE_SUFFIX_LENGTH)

  let suffix = ''

  for (let i = 0; i < REFERENCE_SUFFIX_LENGTH; i++) {
    suffix += REFERENCE_CHARSET[bytes[i] % REFERENCE_CHARSET.length]
  }
  return `AICE-${year}-${suffix}`
}

/**
 * Posts the submission to aice-triage-automation, alongside the
 * Notify emails rather than instead of them.
 *
 * A failure of any kind must not cost someone their submission, so it is logged
 * with the reference and swallowed. Nothing about the caller's result, or the
 * person's journey, depends on the outcome.
 *
 * @param {import('./model.js').TriageSubmission} submission
 * @param {string} reference
 * @param {string} submittedAt
 * @param {import('@aws-sdk/client-sts').STSClient} [stsClient]
 * @returns {Promise<void>}
 */
async function postSubmissionToAutomation (
  submission,
  reference,
  submittedAt,
  stsClient
) {
  try {
    const { posted } = await postSubmission({
      submissionId: reference,
      submission,
      submittedAt,
      stsClient
    })

    if (posted) {
      logger.info(
        PostSubmissionLog.buildPostSubmissionSuccessLog(reference),
        'Triage submission posted to aice-triage-automation'
      )
    }
  } catch (error) {
    logger.error(
      PostSubmissionLog.buildPostSubmissionErrorLog(error, reference),
      'Failed to post triage submission to aice-triage-automation'
    )
  }
}

/**
 * Submits a triage request - returns an result object representing email sending
 * outcome.
 *
 * @param {import('./model.js').TriageSubmission} submission
 * @param {{ stsClient?: import('@aws-sdk/client-sts').STSClient }} [options]
 * @returns {Promise<{
 *    triageResult: { success: boolean, data?: object, error?: object },
 *    confirmationResult?: { success: boolean, data?: object, error?: object },
 *    reference?: string
 * }>}
 */
export async function submit (submission, options = {}) {
  const { error: validationError } = submissionSchema.validate(submission, {
    abortEarly: false
  })

  if (validationError) {
    return { validationError }
  }
  const submittedAt = new Date().toISOString()
  const reference = generateReference()
  const triageResult = await sendTriageEmail(submission, reference)
  if (!triageResult.success) {
    return {
      triageResult
    }
  }
  const confirmationResult = await sendConfirmationEmail(submission, reference)

  // After both emails: the shared-mailbox email is the only record carrying the
  // submitter's address, so it must never be the post that got there first.
  await postSubmissionToAutomation(
    submission,
    reference,
    submittedAt,
    options.stsClient
  )

  return {
    triageResult,
    confirmationResult,
    reference
  }
}
