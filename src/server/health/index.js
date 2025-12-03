import { healthController } from './controller.js'

export const health = {
  plugin: {
    name: 'health',
    register(server) {
      server.route({
        method: 'GET',
        path: '/health',
        ...healthController
      })
    }
  }
}
