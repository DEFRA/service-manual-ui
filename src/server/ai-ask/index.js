import { config } from '../../config/config.js'

import { askController } from './controller.js'

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
 * controller-enabled.test.js.
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

      server.route([
        {
          method: 'GET',
          path: '/ai-toolkit/ask',
          ...askController
        }
      ])
    }
  }
}
