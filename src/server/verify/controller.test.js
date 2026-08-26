import { codeResults } from './constants.js'

const mockGenerateVerificationCode = vi.fn()
const mockSendVerificationCode = vi.fn()
const mockCheckVerificationCode = vi.fn()

vi.mock('./service.js', () => ({
  generateVerificationCode: (...args) => mockGenerateVerificationCode(...args),
  sendVerificationCode: (...args) => mockSendVerificationCode(...args),
  checkVerificationCode: (...args) => mockCheckVerificationCode(...args)
}))

const mockSetPendingLogin = vi.fn()
const mockGetPendingLogin = vi.fn()
const mockClearPendingLogin = vi.fn()
const mockSetLoginError = vi.fn()
const mockPopLoginError = vi.fn()
const mockResolveReturnUrl = vi.fn()
const mockCreatePendingCode = vi.fn()
const mockGetPendingCode = vi.fn()
const mockDropPendingCode = vi.fn()
const mockRecordFailedCodeAttempt = vi.fn()
const mockCompleteLogin = vi.fn()

vi.mock('./session.js', () => ({
  setPendingLogin: (...args) => mockSetPendingLogin(...args),
  getPendingLogin: (...args) => mockGetPendingLogin(...args),
  clearPendingLogin: (...args) => mockClearPendingLogin(...args),
  setLoginError: (...args) => mockSetLoginError(...args),
  popLoginError: (...args) => mockPopLoginError(...args),
  resolveReturnUrl: (...args) => mockResolveReturnUrl(...args),
  createPendingCode: (...args) => mockCreatePendingCode(...args),
  getPendingCode: (...args) => mockGetPendingCode(...args),
  dropPendingCode: (...args) => mockDropPendingCode(...args),
  recordFailedCodeAttempt: (...args) => mockRecordFailedCodeAttempt(...args),
  completeLogin: (...args) => mockCompleteLogin(...args)
}))

const controller = await import('./controller.js')

function buildRequest ({
  payload = {},
  query = {},
  yar = {},
  serverApp = {},
  cookieAuth = {}
} = {}) {
  return {
    payload,
    query,
    yar,
    server: {
      app: {
        cache: {},
        codeCache: {},
        ...serverApp
      }
    },
    cookieAuth
  }
}

function buildToolkit () {
  return {
    view: vi.fn(),
    redirect: vi.fn()
  }
}

describe('verify controller', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockResolveReturnUrl.mockImplementation((value) => value ?? '/')
  })

  describe('getEmailPage', () => {
    test('renders sign-in page with flash error and resolved returnUrl', async () => {
      const request = buildRequest({
        query: { returnUrl: '/from-query' },
        yar: {}
      })
      const h = buildToolkit()

      mockPopLoginError.mockReturnValue({
        error: 'Too many attempts',
        returnUrl: '/from-flash'
      })
      mockResolveReturnUrl.mockReturnValue('/from-flash')

      await controller.getEmailPage(request, h)

      expect(h.view).toHaveBeenCalledWith('verify/enter-email', {
        pageTitle: 'Sign in',
        returnUrl: '/from-flash',
        error: 'Too many attempts'
      })
    })
  })

  describe('startVerification', () => {
    test('stores pending state and redirects when sending succeeds', async () => {
      const request = buildRequest({
        yar: {},
        serverApp: { codeCache: { set: vi.fn() } }
      })
      const h = buildToolkit()
      mockGenerateVerificationCode.mockReturnValue('123456')
      mockCreatePendingCode.mockResolvedValue('pending-id-1')
      mockSendVerificationCode.mockResolvedValue({ success: true })

      await controller.startVerification(
        request,
        h,
        'test@example.com',
        '/next',
        {
          codeSubmitHref: '/custom/code',
          changeEmailHref: '/custom/email'
        }
      )

      expect(mockSetPendingLogin).toHaveBeenCalledWith(request.yar, {
        pendingId: 'pending-id-1',
        email: 'test@example.com',
        returnUrl: '/next',
        codeSubmitHref: '/custom/code',
        changeEmailHref: '/custom/email'
      })
      expect(h.redirect).toHaveBeenCalledWith('/verify/code')
    })

    test('drops pending code and re-renders with an error when sending fails', async () => {
      const codeCache = { set: vi.fn(), drop: vi.fn() }
      const request = buildRequest({ yar: {}, serverApp: { codeCache } })
      const h = buildToolkit()

      mockGenerateVerificationCode.mockReturnValue('123456')
      mockCreatePendingCode.mockResolvedValue('pending-id-1')
      mockSendVerificationCode.mockResolvedValue({ success: false })

      await controller.startVerification(request, h, 'test@example.com', '/next')

      expect(mockDropPendingCode).toHaveBeenCalledWith(codeCache, 'pending-id-1')
      expect(h.view).toHaveBeenCalledWith('verify/enter-email', {
        pageTitle: 'Sign in',
        returnUrl: '/next',
        email: 'test@example.com',
        error: 'There was a problem sending your code. Try again in a few minutes.'
      })
    })
  })

  describe('code page flow', () => {
    test('redirects GET /verify/code to /verify when pending login is missing', async () => {
      mockGetPendingLogin.mockReturnValue(null)
      const h = buildToolkit()

      await controller.getCodePage(buildRequest({ yar: {} }), h)
      expect(h.redirect).toHaveBeenCalledWith('/verify')
    })

    test('returns no-pending outcome when code is submitted without pending login', async () => {
      mockGetPendingLogin.mockReturnValue(null)

      const result = await controller.processCodeSubmission(buildRequest({ yar: {} }))
      expect(result).toEqual({ outcome: 'no-pending' })
    })

    test('completes login and clears pending state when code is verified', async () => {
      const request = buildRequest({
        payload: { code: '123456' },
        yar: {},
        serverApp: { codeCache: {}, cache: {} },
        cookieAuth: {}
      })

      mockGetPendingLogin.mockReturnValue({
        pendingId: 'pending-id-1',
        email: 'test@example.com',
        returnUrl: '/secure'
      })
      mockGetPendingCode.mockResolvedValue({
        email: 'test@example.com',
        verificationCode: '123456',
        attempts: 0
      })
      mockCheckVerificationCode.mockReturnValue({ status: codeResults.VERIFIED })

      const result = await controller.processCodeSubmission(request)

      expect(mockCompleteLogin).toHaveBeenCalledWith(
        request.server.app.cache,
        request.cookieAuth,
        'test@example.com'
      )
      expect(mockDropPendingCode).toHaveBeenCalledWith(
        request.server.app.codeCache,
        'pending-id-1'
      )
      expect(mockClearPendingLogin).toHaveBeenCalledWith(request.yar)
      expect(result).toEqual({
        outcome: 'verified',
        email: 'test@example.com',
        returnUrl: '/secure'
      })
    })

    test('returns retry and records failed attempt when code is incorrect', async () => {
      const request = buildRequest({
        payload: { code: '999999' },
        yar: {},
        serverApp: { codeCache: {} }
      })

      mockGetPendingLogin.mockReturnValue({
        pendingId: 'pending-id-1',
        email: 'test@example.com',
        codeSubmitHref: '/my/code',
        changeEmailHref: '/my/email'
      })
      mockGetPendingCode.mockResolvedValue({
        email: 'test@example.com',
        verificationCode: '123456',
        attempts: 1
      })
      mockCheckVerificationCode.mockReturnValue({ status: codeResults.INCORRECT })

      const result = await controller.processCodeSubmission(request)

      expect(mockRecordFailedCodeAttempt).toHaveBeenCalledWith(
        request.server.app.codeCache,
        'pending-id-1',
        {
          email: 'test@example.com',
          verificationCode: '123456',
          attempts: 1
        }
      )
      expect(result).toEqual({
        outcome: 'retry',
        email: 'test@example.com',
        codeSubmitHref: '/my/code',
        changeEmailHref: '/my/email',
        error: 'Enter the correct code. Check your email and try again.'
      })
    })

    test('returns restart and sets flash error when code is locked out', async () => {
      const request = buildRequest({
        payload: { code: '999999' },
        yar: {},
        serverApp: { codeCache: {} }
      })

      mockGetPendingLogin.mockReturnValue({
        pendingId: 'pending-id-1',
        email: 'test@example.com',
        returnUrl: '/secure'
      })
      mockGetPendingCode.mockResolvedValue({
        email: 'test@example.com',
        verificationCode: '123456',
        attempts: 4
      })
      mockCheckVerificationCode.mockReturnValue({ status: codeResults.LOCKED_OUT })

      const result = await controller.processCodeSubmission(request)

      expect(mockDropPendingCode).toHaveBeenCalledWith(
        request.server.app.codeCache,
        'pending-id-1'
      )
      expect(mockClearPendingLogin).toHaveBeenCalledWith(request.yar)
      expect(mockSetLoginError).toHaveBeenCalledWith(request.yar, {
        error: 'Too many incorrect attempts. Enter your email to get a new code.',
        returnUrl: '/secure'
      })
      expect(result).toEqual({ outcome: 'restart' })
    })

    test('redirects to resolved returnUrl when postCodePage verifies successfully', async () => {
      const request = buildRequest({
        payload: { code: '123456' },
        yar: {},
        serverApp: { codeCache: {}, cache: {} },
        cookieAuth: {}
      })
      const h = buildToolkit()

      mockGetPendingLogin.mockReturnValue({
        pendingId: 'pending-id-1',
        email: 'test@example.com',
        returnUrl: '/ai-toolkit/triage/question-1'
      })
      mockGetPendingCode.mockResolvedValue({
        email: 'test@example.com',
        verificationCode: '123456',
        attempts: 0
      })
      mockCheckVerificationCode.mockReturnValue({ status: codeResults.VERIFIED })
      mockResolveReturnUrl.mockReturnValue('/ai-toolkit/triage/question-1')

      await controller.postCodePage(request, h)

      expect(h.redirect).toHaveBeenCalledWith('/ai-toolkit/triage/question-1')
    })
  })
})
