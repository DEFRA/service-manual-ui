import { statusCodes } from '../common/constants/status-codes.js'
import { createServer } from '../server.js'
import { MAX_CODE_ATTEMPTS } from './constants.js'
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

  test('re-renders the code form with a retry error when the code is wrong but not yet locked out', async () => {
    const start = await postEmail(server, 'test@example.com', '/')
    const cookie = start.headers['set-cookie']?.[0]?.split(';')[0]

    const retry = await submitCode(server, '000000', cookie)

    expect(retry.statusCode).toBe(statusCodes.ok)
    expect(retry.result).toContain('Enter the correct code. Check your email and try again.')
    expect(retry.result).not.toContain('Too many incorrect attempts')

    // the pending verify survives a wrong attempt - the correct code still works after
    const verify = await submitCode(server, lastVerificationCode, cookie)

    expect(verify.statusCode).toBe(statusCodes.found)
    expect(verify.headers.location).toBe('/')
  })

  test('locks out after too many incorrect codes, shows the flash error once with its own returnUrl, then clears it', async () => {
    const start = await postEmail(server, 'test@example.com', '/ai-toolkit/triage/question-1')
    const cookie = start.headers['set-cookie']?.[0]?.split(';')[0]

    let lastAttempt
    for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt++) {
      lastAttempt = await submitCode(server, '000000', cookie)
    }

    expect(lastAttempt.statusCode).toBe(statusCodes.found)
    expect(lastAttempt.headers.location).toBe('/verify')

    // a returnUrl on the query string must not override the one captured on the flash error
    const withError = await server.inject({
      method: 'GET',
      url: '/verify?returnUrl=/other-page',
      headers: { cookie }
    })
    expect(withError.result).toContain('Too many incorrect attempts')
    expect(withError.result).toContain('value="/ai-toolkit/triage/question-1"')
    expect(withError.result).not.toContain('value="/other-page"')

    const withoutError = await server.inject({
      method: 'GET',
      url: '/verify',
      headers: { cookie }
    })
    expect(withoutError.result).not.toContain('Too many incorrect attempts')
  })

  test('redirects POST /verify/code to /verify when there is no pending session', async () => {
    const { statusCode, headers } = await submitCode(server, '123456')

    expect(statusCode).toBe(statusCodes.found)
    expect(headers.location).toBe('/verify')
  })

  test('re-renders the email page and starts no pending session when sending the code fails', async () => {
    nock.cleanAll()
    nock('https://api.notifications.service.gov.uk')
      .post('/v2/notifications/email')
      .reply(400, { errors: [{ error: 'BadRequestError', message: 'blocked' }] })

    const start = await postEmail(server, 'test@example.com', '/ai-toolkit/triage/question-1')
    const cookie = start.headers['set-cookie']?.[0]?.split(';')[0]

    expect(start.statusCode).toBe(statusCodes.ok)
    expect(start.result).toContain('There was a problem sending your code')
    expect(start.result).not.toContain('Enter your code')

    const codePage = await server.inject({
      method: 'GET',
      url: '/verify/code',
      headers: cookie ? { cookie } : {}
    })

    expect(codePage.statusCode).toBe(statusCodes.found)
    expect(codePage.headers.location).toBe('/verify')
  })
})
