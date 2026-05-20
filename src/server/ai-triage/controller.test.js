process.env.ENABLE_AI_CONTENT = 'true'
import { statusCodes } from '../common/constants/status-codes.js'
import { createServer } from '../server.js'

vi.mock('../../notify/notify-client.js', () => ({
  createNotifyClient: () => ({
    sendEmail: vi.fn().mockResolvedValue({
      data: { reference: 'triage-test' },
      status: 201
    })
  })
}))

const postForm = (server, url, answer, cookie) =>
  server.inject({
    method: 'POST',
    url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      ...(cookie ? { cookie } : {})
    },
    payload: `answer=${encodeURIComponent(answer)}`
  })

async function buildSession(server) {
  let cookie = ''

  const questions = [
    { url: '/ai-toolkit/triage/question-1', answer: 'test@example.com' },
    { url: '/ai-toolkit/triage/question-2', answer: 'A problem description' },
    { url: '/ai-toolkit/triage/question-3', answer: 'Some users' },
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

  describe('GET /ai-toolkit/triage/question-1', () => {
    test('returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/question-1'
      })
      expect(statusCode).toBe(statusCodes.ok)
    })

    test('renders the question title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/question-1'
      })
      expect(result).toEqual(
        expect.stringContaining('What is your email address?')
      )
    })

    test('renders a form with method post', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/question-1'
      })
      expect(result).toEqual(expect.stringContaining('method="post"'))
    })
  })

  describe('POST /ai-toolkit/triage/question-1', () => {
    const postQuestion1 = (answer) =>
      server.inject({
        method: 'POST',
        url: '/ai-toolkit/triage/question-1',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        payload: `answer=${encodeURIComponent(answer)}`
      })

    test('redirects to question-2 with a valid email', async () => {
      const { statusCode, headers } = await postQuestion1('test@example.com')
      expect(statusCode).toBe(statusCodes.found)
      expect(headers.location).toBe('/ai-toolkit/triage/question-2')
    })

    test('returns 200 with error when payload is empty', async () => {
      const { statusCode, result } = await postQuestion1('')
      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('govuk-error-summary'))
    })

    test('returns 200 with error when email is invalid', async () => {
      const { statusCode, result } = await postQuestion1('not-a-valid-email')
      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('govuk-error-summary'))
    })
  })

  describe('POST /ai-toolkit/triage/question-5', () => {
    test('redirects to check-your-answers on valid submission', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/triage/question-5',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        payload: `answer=${encodeURIComponent('Some attempt to solve the problem')}`
      })
      expect(statusCode).toBe(statusCodes.found)
      expect(headers.location).toBe('/ai-toolkit/triage/check-your-answers')
    })
  })

  describe('GET /ai-toolkit/triage/thank-you', () => {
    test('returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/thank-you'
      })
      expect(statusCode).toBe(statusCodes.ok)
    })

    test('renders the thank-you content', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/thank-you'
      })
      expect(result).toEqual(expect.stringContaining('Submission received'))
    })

    test('renders the notification banner when confirmationFailed=true', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/thank-you?confirmationFailed=true'
      })
      expect(result).toEqual(expect.stringContaining('defra-alert'))
      expect(result).toEqual(
        expect.stringContaining('Your submission has been received')
      )
    })

    test('does not render the notification banner without query param', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/thank-you'
      })
      expect(result).not.toEqual(expect.stringContaining('defra-alert'))
    })
  })

  describe('GET /ai-toolkit/triage/check-your-answers', () => {
    test('returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/check-your-answers'
      })
      expect(statusCode).toBe(statusCodes.ok)
    })

    test('renders the page title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/check-your-answers'
      })
      expect(result).toEqual(expect.stringContaining('Check your answers'))
    })

    test('renders summary cards', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/check-your-answers'
      })
      expect(result).toEqual(expect.stringContaining('govuk-summary-card'))
    })

    test('renders a Change link for each question', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/triage/check-your-answers'
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
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        payload: ''
      })
      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('govuk-error-summary'))
    })
  })
})
