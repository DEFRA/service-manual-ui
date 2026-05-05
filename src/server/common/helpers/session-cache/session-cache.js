import yar from '@hapi/yar'

import { config } from '../../../../config/config.js'

const sessionConfig = config.get('session')

/**
 * Session cache plugin using @hapi/yar with server-side catbox storage.
 * maxCookieSize: 0 forces all session data to be stored server-side.
 * Access via request.yar in route handlers.
 */
export const sessionCache = {
  plugin: yar,
  options: {
    name: sessionConfig.cache.name,
    maxCookieSize: 0,
    cache: {
      cache: sessionConfig.cache.name,
      expiresIn: sessionConfig.cache.ttl
    },
    storeBlank: false,
    errorOnCacheNotReady: true,
    cookieOptions: {
      password: sessionConfig.cookie.password,
      ttl: sessionConfig.cookie.ttl,
      isSecure: config.get('session.cookie.secure'),
      clearInvalid: true
    }
  }
}
