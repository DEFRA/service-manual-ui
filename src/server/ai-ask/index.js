import { config } from '../../config/config.js'

import {
  askController,
  askPostController,
  answerController,
  restartController,
  restartPostController,
  helpController,
  stuckController
} from './controller.js'
import { MAX_PAYLOAD_BYTES } from './constants.js'
import {
  askPath,
  answersPath,
  helpPath,
  restartPath,
  stuckPath
} from './paths.js'

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
          path: askPath,
          ...askController
        },
        {
          method: 'POST',
          path: askPath,
          options: { payload: formPayload },
          ...askPostController
        },
        {
          // Every answer has an address of its own. Anything that is not a
          // number, or is a number this conversation does not reach, is sent
          // back to the start rather than shown an error.
          method: 'GET',
          path: `${answersPath}/{number}`,
          ...answerController
        },
        {
          method: 'GET',
          path: helpPath,
          ...helpController
        },
        {
          // GET asks, POST does it. Clearing a conversation on a GET would let
          // a prefetched link throw it away.
          method: 'GET',
          path: restartPath,
          ...restartController
        },
        {
          method: 'POST',
          path: restartPath,
          options: { payload: formPayload },
          ...restartPostController
        },
        {
          method: 'POST',
          path: stuckPath,
          options: { payload: formPayload },
          ...stuckController
        }
      ])
    }
  }
}
