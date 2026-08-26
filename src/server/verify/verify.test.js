import { statusCodes } from '../common/constants/status-codes.js'
import { createServer } from '../server.js'
import nock from 'nock'

async function postEmail (server, email, returnUrl) {
  return server.inject({
    method: 'POST',
    url: '/verify',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    payload: `email=${encodeURIComponent(email)}&returnUrl=${encodeURIComponent(returnUrl)}`
  })
}

async function submitCode (server, code, cookie) {
  return server.inject({
    method: 'POST',
    url: '/verify/code',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      ...(cookie ? { cookie } : {})
    },
    payload: `code=${encodeURIComponent(code)}`
  })
}

describe('verify routes', () => {
  let server
  let lastVerificationCode

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(() => {
    lastVerificationCode = null
    nock.disableNetConnect()
    nock('https://api.notifications.service.gov.uk')
      .post('/v2/notifications/email', (body) => {
        lastVerificationCode = body.personalisation?.verificationCode
        return true
      })
      .reply(201, { id: 'verify-id-1', reference: 'verify-test-reference' })
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  test('renders the sign-in page on GET /verify', async () => {
    const { statusCode, result } = await server.inject({
      method: 'GET',
      url: '/verify'
    })

    expect(statusCode).toBe(statusCodes.ok)
    expect(result).toContain('Sign in')
  })

  test('re-renders email form with validation error for an invalid email', async () => {
    const { statusCode, result } = await server.inject({
      method: 'POST',
      url: '/verify',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      payload: 'email=invalid-email'
    })

    expect(statusCode).toBe(statusCodes.ok)
    expect(result).toContain('Enter a valid email address')
    expect(result).not.toContain('Enter your code')
  })

  test('redirects GET /verify/code to /verify when no pending session exists', async () => {
    const { statusCode, headers } = await server.inject({
      method: 'GET',
      url: '/verify/code'
    })

    expect(statusCode).toBe(statusCodes.found)
    expect(headers.location).toBe('/verify')
  })

  test('re-renders code form with validation error for an invalid code payload', async () => {
    const start = await postEmail(server, 'test@example.com', '/')
    const cookie = start.headers['set-cookie']?.[0]?.split(';')[0]

    const { statusCode, result } = await submitCode(server, 'abc', cookie)

    expect(statusCode).toBe(statusCodes.ok)
    expect(result).toContain('Enter the 6-digit code from your email')
    expect(result).not.toContain('Sign in')
  })

  test('redirects to the safe returnUrl after successful verification', async () => {
    const start = await postEmail(server, 'test@example.com', '/ai-toolkit/triage/question-1')
    const cookie = start.headers['set-cookie']?.[0]?.split(';')[0]

    expect(start.statusCode).toBe(statusCodes.found)
    expect(start.headers.location).toBe('/verify/code')
    expect(lastVerificationCode).toMatch(/^\d{6}$/)

    const verify = await submitCode(server, lastVerificationCode, cookie)

    expect(verify.statusCode).toBe(statusCodes.found)
    expect(verify.headers.location).toBe('/ai-toolkit/triage/question-1')
  })

  test('falls back to root when returnUrl is unsafe', async () => {
    const start = await postEmail(server, 'test@example.com', 'https://evil.example')
    const cookie = start.headers['set-cookie']?.[0]?.split(';')[0]

    const verify = await submitCode(server, lastVerificationCode, cookie)

    expect(verify.statusCode).toBe(statusCodes.found)
    expect(verify.headers.location).toBe('/')
  })
})
