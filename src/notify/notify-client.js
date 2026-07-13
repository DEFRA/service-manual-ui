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

function createNotifyClient (apiKey) {
  const client = new NotifyClient(apiKey)

  // ensure axios does not use it's own proxy. Global proxy envs are used by default.
  client.setProxy(false)

  return client
}

export { createNotifyClient }
