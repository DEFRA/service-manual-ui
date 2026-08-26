import { buildErrorLog, buildEventLog } from './build-error-log.js'

const POST_SUBMISSION_EVENT = {
  type: 'post_triage_submission',
  action: 'post'
}

export const buildPostSubmissionErrorLog = (error, reference) =>
  buildErrorLog(error, { ...POST_SUBMISSION_EVENT, reference })

export const buildPostSubmissionSuccessLog = (reference) =>
  buildEventLog({ ...POST_SUBMISSION_EVENT, reference })
