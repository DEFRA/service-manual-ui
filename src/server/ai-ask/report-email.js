import { config } from '../../config/config.js'
import { createNotifyClient, trySendEmail } from '../../notify/notify-client.js'

import { toPlainText } from './transcript.js'

const notifyClient = createNotifyClient(config.get('notify.aiToolkit.apiKey'))

// Shown in the email when someone reports a problem without saying what it is.
const NO_DETAIL = 'They did not say what was wrong.'

/**
 * Whether reports can be sent here. The link is only offered where it works,
 * so an environment without the template never shows a button that fails.
 * @returns {boolean}
 */
function canSendReports () {
  return Boolean(
    config.get('notify.aiToolkit.apiKey') &&
      config.get('notify.aiToolkit.askReportTemplateId') &&
      config.get('notify.aiToolkit.mailbox')
  )
}

/**
 * Emails a problem with one answer to the team's shared mailbox, with the
 * question and the answer, so the team can see what went wrong without asking.
 * @param {object} report
 * @param {number} report.number - The answer's position, 1-based
 * @param {{question: string, answer: object}} report.exchange
 * @param {string} report.problem - What the person said was wrong; may be empty
 * @returns {Promise<{success: true} | {success: false, error: object}>}
 */
async function sendReport ({ number, exchange, problem }) {
  const [, error] = await trySendEmail(
    notifyClient,
    config.get('notify.aiToolkit.askReportTemplateId'),
    config.get('notify.aiToolkit.mailbox'),
    {
      personalisation: {
        answerNumber: String(number),
        problem: problem || NO_DETAIL,
        exchange: toPlainText([exchange])
      }
    }
  )

  return error ? { success: false, error } : { success: true }
}

/**
 * The log entry for a report that could not be sent. It carries Notify's own
 * error, never what the person typed or the answer they were sent.
 * @param {{status: number|null, data?: object, message?: string}} error
 * @returns {object}
 */
function buildReportErrorLog (error) {
  return {
    event: { type: 'ask_report', action: 'send', outcome: 'failure' },
    error: {
      code: error.status,
      message:
        error.data?.errors?.map((e) => e.message).join(', ') ?? error.message,
      type: 'NotifyError'
    }
  }
}

export { buildReportErrorLog, canSendReports, sendReport }
