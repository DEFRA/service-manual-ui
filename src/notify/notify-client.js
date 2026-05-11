import { NotifyClient } from 'notifications-node-client'

function createNotifyClient(apiKey) {
  return new NotifyClient(apiKey)
}

export { createNotifyClient }
