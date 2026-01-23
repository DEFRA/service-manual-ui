import { serviceManualController } from './controller.js'

/**
 * Sets up the routes used in the service manual home page.
 * These routes are registered in src/server/router.js.
 */
export const serviceManual = {
  plugin: {
    name: 'service-manual',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/service-manual',
          ...serviceManualController
        }
      ])
    }
  }
}
