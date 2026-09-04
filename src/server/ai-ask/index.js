import { config } from '../../config/config.js'

import {
  askController,
  askPostController,
  conversationController,
  restartController
} from './controller.js'
import { MAX_PAYLOAD_BYTES } from './constants.js'

/**
 * Ask the toolkit routes.
 *
 * Registered only when both flags are on, so an environment with the feature
 * off has no route to reach rather than a page that hides its contents:
 *
 * - aiContent.enabled, because Ask the toolkit answers only from AI digital
 *   toolkit content, so it makes no sense where that content is hidden.
 * - featureFlags.askEnabled, which is off by default. Merging to main deploys,
 *   so this is what keeps unfinished work out of production.
 *
 * The gate is proved both ways in controller.test.js and
 * controller-gated.test.js.
 */
export const aiAsk = {
  plugin: {
    name: 'ai-ask',
    register (server) {
      const isEnabled =
        config.get('aiContent.enabled') && config.get('featureFlags.askEnabled')

      if (!isEnabled) {
        return
      }

      const formPayload = {
        parse: true,
        allow: 'application/x-www-form-urlencoded',
        maxBytes: MAX_PAYLOAD_BYTES
      }

      server.route([
        {
          method: 'GET',
          path: '/ai-toolkit/ask',
          ...askController
        },
        {
          method: 'POST',
          path: '/ai-toolkit/ask',
          options: { payload: formPayload },
          ...askPostController
        },
        {
          method: 'GET',
          path: '/ai-toolkit/ask/conversation',
          ...conversationController
        },
        {
          method: 'GET',
          path: '/ai-toolkit/ask/restart',
          ...restartController
        }
      ])
    }
  }
}
