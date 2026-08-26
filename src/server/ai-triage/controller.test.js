import { statusCodes } from '../common/constants/status-codes.js'
import { createServer } from '../server.js'
import { MAX_PAYLOAD_BYTES, MAX_TEXT_LENGTH } from './constants.js'

vi.mock('../../notify/notify-client.js', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    createNotifyClient: () => ({
      sendEmail: vi.fn().mockResolvedValue({
        data: { reference: 'triage-test' },
        status: 201
      })
    })
  }
})

const authCredentials = { email: 'test@example.com' }
const auth = { strategy: 'session', credentials: authCredentials }

const postForm = (server, url, answer, cookie) =>
  server.inject({
    method: 'POST',
    url,
    auth,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      ...(cookie ? { cookie } : {})
    },
    payload: `answer=${encodeURIComponent(answer)}`
  })

async function buildSession (server) {
  let cookie = ''

  const questions = [
    { url: '/ai-toolkit/triage/question-1', answer: 'A problem description' },
    { url: '/ai-toolkit/triage/question-2', answer: 'Some users' },
    { url: '/ai-toolkit/triage/question-3', answer: 'Data sources and owners' },
    { url: '/ai-toolkit/triage/question-4', answer: 'Some benefits' },
    { url: '/ai-toolkit/triage/question-5', answer: 'Previous attempts' }
  ]

  for (const { url, answer } of questions) {
    const res = await postForm(server, url, answer, cookie)
    const setCookie = res.headers['set-cookie']
    if (setCookie) {
      cookie = setCookie[0].split(';')[0]
    }
  }

  return cookie
}

describe('#aiTriageController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('auth', () => {
    test('GET /ai-toolkit/triage/question-1 redirects to /verify when signed out', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/question-1'
      })
      expect(statusCode).toBe(statusCodes.found)
      expect(headers.location).toContain('/verify')
    })

    test('GET /ai-toolkit/triage/check-your-answers redirects to /verify when signed out', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/check-your-answers'
      })
      expect(statusCode).toBe(statusCodes.found)
      expect(headers.location).toContain('/verify')
    })

    test('GET /ai-toolkit/triage/thank-you redirects to /verify when signed out', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/thank-you'
      })
      expect(statusCode).toBe(statusCodes.found)
      expect(headers.location).toContain('/verify')
    })
  })

  describe('GET /ai-toolkit/triage/question-1', () => {
    test('returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/question-1',
        auth
      })
      expect(statusCode).toBe(statusCodes.ok)
    })

    test('renders the question title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/question-1',
        auth
      })
      expect(result).toEqual(expect.stringContaining('What is the problem?'))
    })

    test('renders a form with method post', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/question-1',
        auth
      })
      expect(result).toEqual(expect.stringContaining('method="post"'))
    })
  })

  describe('POST /ai-toolkit/triage/question-1', () => {
    const postQuestion1 = (answer) =>
      server.inject({
        method: 'POST',
        url: '/ai-toolkit/triage/question-1',
        auth,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        payload: `answer=${encodeURIComponent(answer)}`
      })

    test('redirects to question-2 with a valid answer', async () => {
      const { statusCode, headers } = await postQuestion1(
        'A problem description'
      )
      expect(statusCode).toBe(statusCodes.found)
      expect(headers.location).toBe('/ai-toolkit/triage/question-2')
    })

    test('returns 200 with error when payload is empty', async () => {
      const { statusCode, result } = await postQuestion1('')
      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('govuk-error-summary'))
    })
  })

  describe('POST /ai-toolkit/triage/question-2', () => {
    const postQuestion2 = (answer) =>
      server.inject({
        method: 'POST',
        url: '/ai-toolkit/triage/question-2',
        auth,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        payload: `answer=${encodeURIComponent(answer)}`
      })

    test('returns 200 with error when answer exceeds the maximum length', async () => {
      const { statusCode, result } = await postQuestion2(
        'x'.repeat(MAX_TEXT_LENGTH + 1)
      )
      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('govuk-error-summary'))
      expect(result).toEqual(
        expect.stringContaining(
          `Answer must be ${MAX_TEXT_LENGTH} characters or fewer`
        )
      )
    })

    test('rejects an oversized payload with 413', async () => {
      const { statusCode } = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/triage/question-2',
        auth,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        payload: `answer=${'x'.repeat(MAX_PAYLOAD_BYTES + 1)}`
      })
      expect(statusCode).toBe(statusCodes.payloadTooLarge)
    })
  })

  describe('POST /ai-toolkit/triage/question-4', () => {
    test('redirects to question-5 on valid submission', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/triage/question-4',
        auth,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        payload: `answer=${encodeURIComponent('Faster decisions for caseworkers')}`
      })
      expect(statusCode).toBe(statusCodes.found)
      expect(headers.location).toBe('/ai-toolkit/triage/question-5')
    })
  })

  describe('POST /ai-toolkit/triage/question-5', () => {
    test('redirects to check-your-answers on valid submission', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/triage/question-5',
        auth,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        payload: `answer=${encodeURIComponent('We tried a manual workaround first')}`
      })
      expect(statusCode).toBe(statusCodes.found)
      expect(headers.location).toBe('/ai-toolkit/triage/check-your-answers')
    })
  })

  describe('GET /ai-toolkit/triage/thank-you', () => {
    test('returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/thank-you',
        auth
      })
      expect(statusCode).toBe(statusCodes.ok)
    })

    test('renders the thank-you content', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/thank-you',
        auth
      })
      expect(result).toEqual(expect.stringContaining('Submission received'))
    })

    test('renders the notification banner when confirmationFailed=true', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/thank-you?confirmationFailed=true',
        auth
      })
      expect(result).toEqual(expect.stringContaining('defra-alert'))
      expect(result).toEqual(
        expect.stringContaining('Your submission has been received')
      )
    })

    test('does not render the notification banner without query param', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/thank-you',
        auth
      })
      expect(result).not.toEqual(expect.stringContaining('defra-alert'))
    })
  })

  describe('GET /ai-toolkit/triage/check-your-answers', () => {
    test('returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/check-your-answers',
        auth
      })
      expect(statusCode).toBe(statusCodes.ok)
    })

    test('renders the page title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/check-your-answers',
        auth
      })
      expect(result).toEqual(expect.stringContaining('Check your answers'))
    })

    test('renders summary cards', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/check-your-answers',
        auth
      })
      expect(result).toEqual(expect.stringContaining('govuk-summary-card'))
    })

    test('renders a Change link for each question', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/check-your-answers',
        auth
      })
      expect(result).toEqual(
        expect.stringContaining('/ai-toolkit/triage/question-1')
      )
    })
  })

  describe('POST /ai-toolkit/triage/check-your-answers', () => {
    test('redirects to thank-you when all answers are present', async () => {
      const cookie = await buildSession(server)

      const { statusCode, headers } = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/triage/check-your-answers',
        auth,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          cookie
        }
      })
      expect(statusCode).toBe(statusCodes.found)
      expect(headers.location).toBe('/ai-toolkit/triage/thank-you')
    })

    test('returns 200 with errors when session answers are missing', async () => {
      const { statusCode, result } = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/triage/check-your-answers',
        auth,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        payload: ''
      })
      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('govuk-error-summary'))
    })
  })
})
