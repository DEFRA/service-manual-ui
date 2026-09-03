import { Client, Policy } from '@hapi/catbox'
import { Engine as CatboxMemory } from '@hapi/catbox-memory'

import * as session from './session.js'

/**
 * A real catbox Policy backed by an in-memory engine - the same shape
 * `request.server.app.codeCache`/`app.cache` are in production (see
 * common/helpers/auth.js), just without a Hapi server around it.
 */
async function buildCache () {
  const client = new Client(new CatboxMemory())
  await client.start()

  return new Policy({ expiresIn: 60_000 }, client, 'test')
}

describe('verify session helper', () => {
  describe('resolveReturnUrl', () => {
    test('keeps a safe relative URL', () => {
      expect(session.resolveReturnUrl('/ai-toolkit/triage/question-1')).toBe(
        '/ai-toolkit/triage/question-1'
      )
    })

    test('falls back to root for unsafe values', () => {
      expect(session.resolveReturnUrl()).toBe('/')
      expect(session.resolveReturnUrl('https://evil.example')).toBe('/')
      expect(session.resolveReturnUrl('//evil.example')).toBe('/')
      expect(session.resolveReturnUrl('relative-path')).toBe('/')
    })
  })

  describe('sessionCacheKey', () => {
    test('prefixes session cache keys with verification', () => {
      expect(session.sessionCacheKey('abc')).toBe('verification:abc')
    })
  })

  describe('pending code cache operations', () => {
    test('creates a pending code record with attempts set to zero', async () => {
      const codeCache = await buildCache()

      const pendingId = await session.createPendingCode(codeCache, {
        email: 'test@example.com',
        verificationCode: '123456'
      })

      expect(typeof pendingId).toBe('string')
      const cached = await session.getPendingCode(codeCache, pendingId)
      expect(cached).toMatchObject({
        email: 'test@example.com',
        verificationCode: '123456',
        attempts: 0
      })
      expect(typeof cached.createdAt).toBe('number')
    })

    test('returns null for a pending code that was never created', async () => {
      const codeCache = await buildCache()

      expect(await session.getPendingCode(codeCache, 'unknown-id')).toBeNull()
    })

    test('increments and persists failed code attempt counts', async () => {
      const codeCache = await buildCache()
      const cached = { email: 'test@example.com', verificationCode: '123456', attempts: 2, createdAt: Date.now() }
      await codeCache.set('pending-id-1', cached)

      const attempts = await session.recordFailedCodeAttempt(codeCache, 'pending-id-1', cached)

      expect(attempts).toBe(3)
      // Verify cache was updated with the new attempt count
      const updated = await session.getPendingCode(codeCache, 'pending-id-1')
      expect(updated.attempts).toBe(3)
      expect(updated.email).toBe(cached.email)
    })

    test('drops pending code records from cache', async () => {
      const codeCache = await buildCache()
      await codeCache.set('pending-id-1', { email: 'test@example.com' })

      await session.dropPendingCode(codeCache, 'pending-id-1')

      expect(await session.getPendingCode(codeCache, 'pending-id-1')).toBeNull()
    })
  })

  describe('auth session lifecycle', () => {
    test('stores authenticated session under a key derived from the issued sessionId', async () => {
      const cache = await buildCache()
      const cookieAuth = { set: vi.fn() }

      await session.completeLogin(cache, cookieAuth, 'test@example.com')

      const [[{ sessionId }]] = cookieAuth.set.mock.calls
      expect(await cache.get(session.sessionCacheKey(sessionId))).toEqual({
        email: 'test@example.com'
      })
    })

    test('drops cache session and clears cookie when session id exists', async () => {
      const cache = await buildCache()
      const cookieAuth = { clear: vi.fn() }
      await cache.set(session.sessionCacheKey('session-id-1'), { email: 'test@example.com' })

      await session.clearAuthSession(cache, cookieAuth, 'session-id-1')

      expect(await cache.get(session.sessionCacheKey('session-id-1'))).toBeNull()
      expect(cookieAuth.clear).toHaveBeenCalled()
    })

    test('clears cookie when session id is missing', async () => {
      const cache = await buildCache()
      const cookieAuth = { clear: vi.fn() }

      await session.clearAuthSession(cache, cookieAuth, null)

      expect(cookieAuth.clear).toHaveBeenCalled()
    })
  })
})
