import { aiPractitionerHandbookController } from './controller.js'

/**
 * Sets up the routes used in the AI practitioner handbook landing page.
 * These routes are registered in src/server/router.js.
 */
export const aiPractitionerHandbook = {
  plugin: {
    name: 'ai-practitioner-handbook',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/ai-practitioner-handbook',
          ...aiPractitionerHandbookController
        }
      ])
    }
  }
}
