import { standardsController } from './controller.js'

/**
 * Standards Browser routes
 * Allows users to browse, search, and filter Defra standards
 */
export const standards = {
  plugin: {
    name: 'standards',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/standards',
          ...standardsController
        }
      ])
    }
  }
}
