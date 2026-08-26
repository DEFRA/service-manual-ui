const session = await import('./session.js')

describe('verify session helper', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('pending login session state', () => {
    test('stores pending login under the pending-verify key', () => {
      const yar = { set: vi.fn() }

      session.setPendingLogin(yar, { pendingId: 'p-1', email: 'test@example.com' })

      expect(yar.set).toHaveBeenCalledWith('pending-verify', {
        pendingId: 'p-1',
        email: 'test@example.com'
      })
    })

    test('returns null when pending login is missing', () => {
      const yar = { get: vi.fn().mockReturnValue(undefined) }
      expect(session.getPendingLogin(yar)).toBeNull()
    })

    test('clears pending login from session', () => {
      const yar = { clear: vi.fn() }
      session.clearPendingLogin(yar)
      expect(yar.clear).toHaveBeenCalledWith('pending-verify')
    })
  })

  describe('login error flash state', () => {
    test('writes login errors to the verify-error flash key', () => {
      const yar = { flash: vi.fn() }
      const errorPayload = { error: 'Expired', returnUrl: '/a' }

      session.setLoginError(yar, errorPayload)

      expect(yar.flash).toHaveBeenCalledWith('verify-error', errorPayload)
    })

    test('returns the first flashed login error and then returns null when empty', () => {
      const yar = {
        flash: vi
          .fn()
          .mockReturnValueOnce([{ error: 'Expired', returnUrl: '/a' }])
          .mockReturnValueOnce([])
      }

      expect(session.popLoginError(yar)).toEqual({
        error: 'Expired',
        returnUrl: '/a'
      })
      expect(session.popLoginError(yar)).toBeNull()
    })
  })

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

  describe('pending code cache operations', () => {
    test('creates a pending code record with attempts set to zero', async () => {
      const codeCache = { set: vi.fn() }

      const pendingId = await session.createPendingCode(codeCache, {
        email: 'test@example.com',
        verificationCode: '123456'
      })

      expect(typeof pendingId).toBe('string')
      expect(codeCache.set).toHaveBeenCalledWith(pendingId, {
        email: 'test@example.com',
        verificationCode: '123456',
        attempts: 0
      })
    })

    test('increments and persists failed code attempt counts', async () => {
      const codeCache = { set: vi.fn() }
      const cached = { email: 'test@example.com', verificationCode: '123456', attempts: 2 }

      const attempts = await session.recordFailedCodeAttempt(codeCache, 'pending-id-1', cached)

      expect(attempts).toBe(3)
      expect(codeCache.set).toHaveBeenCalledWith('pending-id-1', {
        ...cached,
        attempts: 3
      })
    })

    test('drops pending code records from cache', async () => {
      const codeCache = { drop: vi.fn() }
      await session.dropPendingCode(codeCache, 'pending-id-1')
      expect(codeCache.drop).toHaveBeenCalledWith('pending-id-1')
    })
  })

  describe('auth session lifecycle', () => {
    test('prefixes session cache keys with verification', () => {
      expect(session.sessionCacheKey('abc')).toBe('verification:abc')
    })

    test('stores authenticated session and sets auth cookie', async () => {
      const cache = { set: vi.fn() }
      const cookieAuth = { set: vi.fn() }

      await session.completeLogin(cache, cookieAuth, 'test@example.com')

      const [[cacheKey, sessionPayload]] = cache.set.mock.calls
      const [[cookiePayload]] = cookieAuth.set.mock.calls

      expect(cacheKey).toBe(`verification:${cookiePayload.sessionId}`)
      expect(sessionPayload).toEqual({ email: 'test@example.com' })
      expect(cookiePayload).toMatchObject({ sessionId: expect.any(String) })
    })

    test('drops cache session and clears cookie when session id exists', async () => {
      const cache = { drop: vi.fn() }
      const cookieAuth = { clear: vi.fn() }

      await session.clearAuthSession(cache, cookieAuth, 'session-id-1')
      expect(cache.drop).toHaveBeenCalledWith('verification:session-id-1')
      expect(cookieAuth.clear).toHaveBeenCalled()
    })

    test('clears cookie when session id is missing', async () => {
      const cache = { drop: vi.fn() }
      const cookieAuth = { clear: vi.fn() }

      await session.clearAuthSession(cache, cookieAuth, null)

      expect(cache.drop).not.toHaveBeenCalled()
      expect(cookieAuth.clear).toHaveBeenCalled()
    })
  })
})
