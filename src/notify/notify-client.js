import { NotifyClient } from 'notifications-node-client'

/**
 * @typedef {object} NotifyError
 * @property {object} data
 * @property {number} status
 */

/**
 * @typedef {object} NotifySendEmailResponse
 * @property {string} id
 * @property {string} [reference]
 * @property {{ body: string, subject: string, from_email: string, one_click_unsubscribe_url?: string }} content
 * @property {string} uri
 * @property {import('notifications-node-client/types/client/notification').TemplateRef} template
 */

export function createNotifyClient (apiKey) {
  return new NotifyClient(apiKey)
}

/**
 * @typedef {import('../../notify/notify-client.js').NotifyError} NotifyError
 * @typedef {import('../../notify/notify-client.js').NotifySendEmailResponse} NotifySendEmailResponse
 */
/**
 * Sends an email via GOV.UK Notify, returning a result tuple to avoid leaking
 * PII from the raw error response and allow the caller to decide how to handle errors.
 *
 * @param {NotifyClient} notifyClient
 * @param {string} templateId
 * @param {string} email
 * @param {{ personalisation?: Record<string, unknown>, reference?: string }} [params]
 * @returns {Promise<[{ data: NotifySendEmailResponse, status: number }, null] | [null, NotifyError]>}
 */
export async function trySendEmail (notifyClient, templateId, email, params = {}) {
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
