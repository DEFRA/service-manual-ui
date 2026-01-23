import { landingPageController } from './controller.js'

/**
 * Sets up the routes used in the landing page.
 * These routes are registered in src/server/router.js.
 */
export const landingPage = {
  plugin: {
    name: 'landing-page',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/',
          ...landingPageController
        }
      ])
    }
  }
}
