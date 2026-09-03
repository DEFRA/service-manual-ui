import hapiCookie from '@hapi/cookie'

import { config } from '../../../config/config.js'

/**
 * The cache key an authenticated session is stored under, keyed by the
 * sessionId issued in the auth cookie. Used by completeLogin, the 'session'
 * auth strategy's validate function, and clearAuthSession - all three
 * need to agree on the same key format.
 *
 * @param {string} sessionId
 * @returns {string}
 */
function sessionCacheKey (sessionId) {
  return `verification:${sessionId}`
}

const auth = {
  plugin: {
    name: 'auth',
    register: async (server) => {
      await server.register(hapiCookie)

      // Short-lived cache holding pending verification codes,
      // keyed by pendingId (see verify/session.js and verify/controller.js).
      server.app.codeCache = server.cache({
        cache: config.get('session.cache.name'),
        segment: 'verification-code',
        expiresIn: config.get('verificationCode.codeTtl')
      })

      // Track code requests per email to enforce a per-email rate limit,
      // preventing unlimited code requests. Keyed by email, stores count of
      // codes requested within the code TTL window.
      server.app.codeRequestsCache = server.cache({
        cache: config.get('session.cache.name'),
        segment: 'verification-code-requests',
        expiresIn: config.get('verificationCode.codeTtl')
      })

      // Long-lived cache holding authenticated sessions, keyed by sessionId
      // stored in the 'session' auth cookie via request.cookieAuth.set().
      server.app.cache = server.cache({
        cache: config.get('session.cache.name'),
        segment: 'verification',
        expiresIn: config.get('verificationCode.loginTtl')
      })

      server.auth.strategy('session', 'cookie', _getCookieOptions())
    }
  }
}

/**
 * @private
 * Creates a options object used to configure the 'session' authentication
 * strategy via @package {@link https://hapi.dev/module/cookie/ cookie}.
 *
 * This is used to maintain a user session after they have logged in via the verification code.
 * The session is stored in a cookie and validated on each request.
 *
 * @returns {object} CookieAuthOptions
 */
function _getCookieOptions () {
  return {
    cookie: {
      password: config.get('session.cookie.password'),
      path: '/',
      isSecure: config.get('session.cookie.secure'),
      ttl: config.get('session.cookie.ttl')
    },
    redirectTo: '/verify',
    appendNext: 'returnUrl',
    validate: _validateSessionToken
  }
}

/**
 * @private
 * Validates the authentication token issued by the identity provider
 * that is stored in the user session is still valid.
 *
 * @param {import('@hapi/hapi').Request} request
 * @param {object} session
 * @returns {Promise<{isValid: boolean, credentials?: object}>}
 */
async function _validateSessionToken (request, session) {
  const userSession = await request.server.app.cache.get(sessionCacheKey(session.sessionId))

  if (!userSession) {
    return { isValid: false }
  }

  return { isValid: true, credentials: { ...userSession, sessionId: session.sessionId } }
}

export { auth, sessionCacheKey }
