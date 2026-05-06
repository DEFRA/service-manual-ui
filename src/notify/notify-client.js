import { NotifyClient } from 'notifications-node-client'

import { config } from '../config/config.js'

const createNotifyClient = () => {
  return new NotifyClient(
    config.get('notify.apiKey')
  )
}

const notifyClient = createNotifyClient()

export {
  notifyClient
}
