/**
 * Ask the toolkit with its feature flag on.
 *
 * featureFlags.askEnabled is off by default, so unlike the rest of the site
 * this page cannot be exercised by booting the server as-is. This file sets
 * AI_TOOLKIT_ASK_ENABLED=true, resets the module cache (config reads the
 * environment once, at import) and then imports the server, which keeps the
 * flagged-on state inside this file. controller-gated.test.js proves the
 * other direction.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'
import { statusCodes } from '../common/constants/status-codes.js'

const askUrl = '/ai-toolkit/ask'

describe('#askController', () => {
  let server
  let previousAskEnabled

  beforeAll(async () => {
    previousAskEnabled = process.env.AI_TOOLKIT_ASK_ENABLED
    process.env.AI_TOOLKIT_ASK_ENABLED = 'true'
    vi.resetModules()
    const { createServer } = await import('../server.js')
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
    if (previousAskEnabled === undefined) {
      delete process.env.AI_TOOLKIT_ASK_ENABLED
    } else {
      process.env.AI_TOOLKIT_ASK_ENABLED = previousAskEnabled
    }
    vi.resetModules()
  })

  describe(`GET ${askUrl}`, () => {
    test('returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: askUrl
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test.each([
      ['the page heading', 'Ask the toolkit'],
      ['what the page is for', 'Get an answer, with a link to the guidance it came from'],
      ['the question field', 'id="question"'],
      ['a Defra green ask button', 'app-ask__send'],
      ['the route to a person', 'Get help from a person'],
      ['breadcrumbs', 'govuk-breadcrumbs'],
      ['a breadcrumb back to the toolkit', 'href="/ai-toolkit"']
    ])('renders %s', async (_description, expected) => {
      const { result } = await server.inject({
        method: 'GET',
        url: askUrl
      })

      expect(result).toEqual(expect.stringContaining(expected))
    })

    test.each([
      ['Deliver with AI', '/ai-toolkit/deliver-with-ai'],
      ['Find a tool', '/ai-toolkit/tools'],
      ['Use AI patterns', '/ai-toolkit/patterns'],
      ['See our projects', '/ai-toolkit/projects']
    ])(
      'carries the toolkit service navigation, including %s',
      async (_text, href) => {
        const { result } = await server.inject({
          method: 'GET',
          url: askUrl
        })

        expect(result).toEqual(expect.stringContaining(`href="${href}"`))
      }
    )

    test('marks itself as the current navigation item', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: askUrl
      })

      expect(result).toEqual(
        expect.stringContaining(`href="${askUrl}" aria-current="page"`)
      )
    })
  })

  describe('asking a question', () => {
    /**
     * Posts a question and follows the redirect, carrying the session cookie
     * so the conversation is the one this question was added to.
     * @param {string} question
     * @returns {Promise<object>} The rendered conversation response
     */
    async function ask (question) {
      const posted = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: `question=${encodeURIComponent(question)}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })

      return server.inject({
        method: 'GET',
        url: posted.headers.location.split('#')[0],
        headers: { cookie: posted.headers['set-cookie']?.[0].split(';')[0] }
      })
    }

    test('redirects to the conversation rather than answering in place', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: 'question=How%20do%20I%20choose%20a%20tool%3F',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(
        '/ai-toolkit/ask/conversation#latest-answer'
      )
    })

    test('lands on the new answer rather than the top of the page', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining('id="latest-answer" tabindex="-1"')
      )
    })

    test('shows the question back to the person who asked it', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining('How do I choose a tool?')
      )
    })

    test('labels the answer as AI-generated', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(expect.stringContaining('AI-generated'))
    })

    test('offers sources to check the answer against', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(expect.stringContaining('Check this answer'))
      expect(result).toEqual(
        expect.stringContaining('href="/ai-toolkit/guidance/choosing-a-tool"')
      )
    })

    test('quotes a rule word for word, marked as a quotation', async () => {
      const { result } = await ask(
        'Can I use Microsoft 365 Copilot with personal data?'
      )

      expect(result).toEqual(
        expect.stringContaining('Quoted from the guidance, word for word')
      )
      expect(result).toEqual(
        expect.stringContaining(
          'For personal data, the DPIA route is for a service you are building to process it'
        )
      )
    })

    test.each([
      ['nothing at all', '', 'Enter your question'],
      ['only spaces', '%20%20%20', 'Enter your question'],
      ['more than 500 characters', 'a'.repeat(501), 'Your question must be 500 characters or fewer']
    ])('rejects %s with a specific error', async (_description, payload, expected) => {
      const { statusCode, result } = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: `question=${payload}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining(expected))
      expect(result).toEqual(expect.stringContaining('There is a problem'))
      expect(result).toEqual(expect.stringContaining('Error: Ask the toolkit'))
    })
  })

  describe('the conversation page', () => {
    test('sends someone with no conversation back to the start', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/conversation'
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(askUrl)
    })
  })

  describe('keeping conversations apart', () => {
    /**
     * Asks a question and returns the session cookie it was stored against.
     * @returns {Promise<string>}
     */
    async function startConversation () {
      const { headers } = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: 'question=How%20do%20I%20choose%20a%20tool%3F',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })

      return headers['set-cookie'][0].split(';')[0]
    }

    test('the front door is the front door when nothing has been asked', async () => {
      const { statusCode } = await server.inject({ method: 'GET', url: askUrl })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('going back to the front door mid-conversation returns to the conversation', async () => {
      const cookie = await startConversation()

      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: askUrl,
        headers: { cookie }
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe('/ai-toolkit/ask/conversation')
    })

    test('starting a new conversation drops what went before', async () => {
      const cookie = await startConversation()

      const restarted = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/restart',
        headers: { cookie }
      })
      expect(restarted.statusCode).toBe(statusCodes.seeOther)

      const after = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/conversation',
        headers: { cookie }
      })

      expect(after.statusCode).toBe(statusCodes.seeOther)
      expect(after.headers.location).toBe(askUrl)
    })
  })

  describe('contacting the team when stuck', () => {
    /**
     * @param {boolean} includeConversation
     * @returns {Promise<object>} The rendered contact page
     */
    async function getStuck (includeConversation) {
      const started = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: 'question=Can%20I%20use%20Copilot%20with%20personal%20data%3F',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
      const cookie = started.headers['set-cookie'][0].split(';')[0]

      return server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/stuck',
        payload: includeConversation ? 'includeConversation=yes' : '',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })
    }

    test('offers a way to reach the team from the conversation', async () => {
      const started = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: 'question=How%20do%20I%20choose%20a%20tool%3F',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
      const cookie = started.headers['set-cookie'][0].split(';')[0]

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/conversation',
        headers: { cookie }
      })

      expect(result).toEqual(expect.stringContaining('Are you stuck?'))
      expect(result).toEqual(expect.stringContaining('name="includeConversation"'))
    })

    test('shares nothing from the conversation unless asked', async () => {
      const { statusCode, result } = await getStuck(false)

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).not.toEqual(expect.stringContaining('amp;body='))
    })

    test('puts the conversation in the email when asked', async () => {
      const { statusCode, result } = await getStuck(true)

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('amp;body='))
      expect(result).toEqual(expect.stringContaining('What is in the email'))
    })

    test('sends someone with no conversation back to the start', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/stuck',
        payload: '',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(askUrl)
    })
  })

  describe('the navigation link on other toolkit pages', () => {
    test.each([
      ['the toolkit landing page', '/ai-toolkit'],
      ['a tools page', '/ai-toolkit/tools'],
      ['a guidance page', '/ai-toolkit/guidance/security']
    ])('%s links to Ask the toolkit', async (_description, url) => {
      const { result } = await server.inject({ method: 'GET', url })

      expect(result).toEqual(
        expect.stringContaining(`href="${askUrl}">Ask the toolkit</a>`)
      )
    })
  })
})
