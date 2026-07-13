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

  // The GOV.UK Notify client uses axios internally and does not respect
  // NODE_USE_ENV_PROXY. Explicitly disable its proxy handling so requests
  // are not routed through the (now removed) global HTTP(S) proxy agent.
  client.setProxy(false)

  return client
}

export { createNotifyClient }
