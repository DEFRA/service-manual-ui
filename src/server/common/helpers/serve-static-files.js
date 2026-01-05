import { config } from '../../../config/config.js'
import { statusCodes } from '../constants/status-codes.js'

export const serveStaticFiles = {
  plugin: {
    name: 'staticFiles',
    register(server) {
      const cacheConfig = config.get('isDevelopment')
        ? false
        : {
            expiresIn: config.get('staticCacheTimeout'),
            privacy: 'private'
          }

      server.route([
        {
          options: {
            auth: false,
            cache: cacheConfig
          },
          method: 'GET',
          path: '/favicon.ico',
          handler(_request, h) {
            return h.response().code(statusCodes.noContent).type('image/x-icon')
          }
        },
        {
          options: {
            auth: false,
            cache: cacheConfig
          },
          method: 'GET',
          path: `${config.get('assetPath')}/{param*}`,
          handler: {
            directory: {
              path: '.',
              redirectToSlash: true
            }
          }
        }
      ])
    }
  }
}
