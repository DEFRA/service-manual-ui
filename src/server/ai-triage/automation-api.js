import { config } from '../../config/config.js'

import { getToken } from './automation-token.js'

const SUBMISSIONS_PATH = '/submissions'

// The labels and their order are the order the questions are asked in. The
// email address is deliberately absent: aice-triage-automation has no field for it, and
// the text is what gets sent to a hosted AI model. The shared-mailbox email
// carries the address, and both records name the same reference.
const TEXT_SECTIONS = [
  { label: 'Problem', field: 'problem' },
  { label: 'Users affected', field: 'users' },
  { label: 'Expected benefits', field: 'benefits' },
  { label: 'Solutions already tried', field: 'solutionAttempts' },
  { label: 'Data readiness', field: 'dataReadiness' }
]

/**
 * Composes the five substantive answers into the single text field aice-triage-automation
 * stores, as labelled sections in the order the questions are asked.
 *
 * @param {import('./model.js').TriageSubmission} submission
 * @returns {string}
 */
export function composeSubmissionText (submission) {
  return TEXT_SECTIONS.map(
    ({ label, field }) => `${label}: ${submission[field] ?? ''}`
  ).join('\n\n')
}

// URL resolves the path against the configured base, so a base with or without
// a trailing slash gives the same answer. Trimming it with a regex invited a
// backtracking warning for no gain.
function submissionsUrl () {
  return new URL(SUBMISSIONS_PATH, config.get('aiTriage.automationUrl')).toString()
}

/**
 * Posts a submission to the aice-triage-automation intake endpoint.
 *
 * The endpoint is idempotent on `submissionId`, and there is nothing in its
 * response to depend on, so this returns only whether a post was made. Any
 * failure — non-2xx, timeout, connection refused — throws, for the caller to
 * log and swallow.
 *
 * @param {object} params
 * @param {string} params.submissionId The AICE-YY-XXXX reference, also on both emails
 * @param {import('./model.js').TriageSubmission} params.submission
 * @param {string} params.submittedAt ISO 8601 timestamp taken at submission
 * @param {import('@aws-sdk/client-sts').STSClient} [params.stsClient]
 * @returns {Promise<{ posted: boolean }>}
 */
export async function postSubmission ({
  submissionId,
  submission,
  submittedAt,
  stsClient
}) {
  if (!config.get('aiTriage.automationEnabled')) {
    return { posted: false }
  }

  const token = await getToken(stsClient)

  const headers = { 'content-type': 'application/json' }

  if (token) {
    headers.authorization = `Bearer ${token}`
  }

  const response = await fetch(submissionsUrl(), {
    method: 'POST',
    headers,
    body: JSON.stringify({
      submissionId,
      text: composeSubmissionText(submission),
      submittedAt
    }),
    signal: AbortSignal.timeout(config.get('aiTriage.automationTimeoutMs'))
  })

  if (!response.ok) {
    const error = new Error(
      `aice-triage-automation rejected the submission with status ${response.status}`
    )
    error.status = response.status
    throw error
  }

  return { posted: true }
}
