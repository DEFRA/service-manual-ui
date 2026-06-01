import { config } from '../../config/config.js'
import {
  cookiesGetController,
  cookiesPostController,
  bannerAcceptController,
  bannerRejectController
} from './controller.js'

const ONE_YEAR_MS = 31536000000

export const cookies = {
  plugin: {
    name: 'cookies',
    register (server) {
      const cookieOptions = {
        isSecure: config.get('isProduction'),
        isHttpOnly: false,
        path: '/',
        ttl: ONE_YEAR_MS,
        isSameSite: 'Lax',
        strictHeader: false,
        encoding: 'none'
      }

      server.state('defra_cookies_policy', cookieOptions)
      server.state('defra_cookies_policy_set', cookieOptions)

      server.route([
        {
          method: 'GET',
          path: '/cookies',
          ...cookiesGetController
        },
        {
          method: 'POST',
          path: '/cookies',
          ...cookiesPostController
        },
        {
          method: 'POST',
          path: '/cookies/accept',
          ...bannerAcceptController
        },
        {
          method: 'POST',
          path: '/cookies/reject',
          ...bannerRejectController
        }
      ])
    }
  }
}
