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
import { statusCodes } from '../../../../src/server/common/constants/status-codes.js'

const askUrl = '/ai-toolkit/ask'

describe('askController', () => {
  let server
  beforeAll(async () => {
    vi.stubEnv('AI_TOOLKIT_ASK_ENABLED', 'true')
    vi.resetModules()
    const { createServer } = await import('../../../../src/server/server.js')
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  /**
   * Posts a question and hands back the session cookie, so later requests
   * land in the same conversation. Pass a cookie to add to an existing
   * conversation, or leave it out to start one.
   * @param {string} question
   * @param {string} [cookie]
   * @returns {Promise<{ posted: object, cookie: string }>}
   */
  async function postQuestion (question, cookie) {
    const posted = await server.inject({
      method: 'POST',
      url: askUrl,
      payload: `question=${encodeURIComponent(question)}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        ...(cookie ? { cookie } : {})
      }
    })

    return {
      posted,
      cookie: posted.headers['set-cookie']?.[0].split(';')[0] ?? cookie
    }
  }

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
      ['a breadcrumb back to the toolkit', 'href="/ai-toolkit"'],
      ['the privacy reminder', 'Do not include personal or sensitive information']
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
      const { posted, cookie } = await postQuestion(question)

      return server.inject({
        method: 'GET',
        url: posted.headers.location.split('#')[0],
        headers: { cookie }
      })
    }

    /**
     * Points the page at a backend for one request, with fetch stubbed to
     * behave as given, and puts everything back afterwards.
     * @param {Function} fetchStub
     * @param {Function} run
     */
    async function withBackend (fetchStub, run) {
      const { config } = await import('../../../../src/config/config.js')
      const previousUrl = config.get('aiContent.askApiUrl')
      config.set('aiContent.askApiUrl', 'http://backend:8085')
      vi.stubGlobal('fetch', fetchStub)

      try {
        await run()
      } finally {
        config.set('aiContent.askApiUrl', previousUrl)
        vi.unstubAllGlobals()
      }
    }

    const NO_ANSWER = 'The toolkit could not answer just now. Try again in a minute.'

    test('says what to do when the backend gives no answer, and keeps the question', async () => {
      await withBackend(vi.fn().mockRejectedValue(new TypeError('fetch failed')), async () => {
        const { statusCode, result } = await server.inject({
          method: 'POST',
          url: askUrl,
          payload: `question=${encodeURIComponent('How do I choose a tool?')}`,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })

        expect(statusCode).toBe(statusCodes.ok)
        expect(result).toEqual(expect.stringContaining(NO_ANSWER))
        expect(result).toEqual(expect.stringContaining('How do I choose a tool?'))
      })
    })

    test('shows the same message on the latest answer when a follow-up gets no answer', async () => {
      const { cookie } = await postQuestion('Can I use GitHub Copilot?')

      await withBackend(vi.fn().mockRejectedValue(new TypeError('fetch failed')), async () => {
        const { statusCode, result } = await server.inject({
          method: 'POST',
          url: askUrl,
          payload: `question=${encodeURIComponent('What about agents?')}`,
          headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
        })

        expect(statusCode).toBe(statusCodes.ok)
        // Still the answer page, with the conversation so far on it.
        expect(result).toEqual(expect.stringContaining('Can I use GitHub Copilot?'))
        expect(result).toEqual(expect.stringContaining('Ask a follow-up question'))
        expect(result).toEqual(expect.stringContaining(NO_ANSWER))
        expect(result).toEqual(expect.stringContaining('What about agents?'))
      })

      // The failed follow-up was not added to the conversation, so there is
      // no second answer to read.
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/2',
        headers: { cookie }
      })
      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(askUrl)
    })

    test('treats a 200 that is not an answer as no answer', async () => {
      const fetchStub = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(null)
      })

      await withBackend(fetchStub, async () => {
        const { statusCode, result } = await server.inject({
          method: 'POST',
          url: askUrl,
          payload: `question=${encodeURIComponent('How do I choose a tool?')}`,
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })

        expect(statusCode).toBe(statusCodes.ok)
        expect(result).toEqual(expect.stringContaining(NO_ANSWER))
      })
    })

    test('sends each answer to a page of its own', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: 'question=How%20do%20I%20choose%20a%20tool%3F',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe('/ai-toolkit/ask/answers/1')
    })

    test('leads with the answer, not a heading made of the question', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining('<h1 class="govuk-heading-l">Your answer</h1>')
      )
    })

    test('shows the question at body size, where a long one wraps harmlessly', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining(
          '<p class="govuk-body app-ask__asked-text">How do I choose a tool?</p>'
        )
      )
    })

    test('titles the page with its position in the conversation, never the question', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining('<title>Answer 1 of 1 | AI digital toolkit')
      )
      expect(result).not.toEqual(expect.stringContaining('How do I choose a tool?</title>'))
    })

    test('shows the question back to the person who asked it', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining('How do I choose a tool?')
      )
    })

    test('leaves the privacy reminder off the follow-up, and out of the field description', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).not.toEqual(
        expect.stringContaining('Do not include personal or sensitive information')
      )
      expect(result).toEqual(
        expect.stringContaining('aria-describedby="question-info"')
      )
    })

    test('warns that the answer can be wrong, where it is read', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining(
          'AI can make mistakes. Check the guidance before you act.'
        )
      )
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

    test('shows a need_more_detail answer as a choice of options, in the order sent', async () => {
      const { result } = await ask('help me get started')

      expect(result).toEqual(expect.stringContaining('type="radio"'))
      expect(result).toEqual(
        expect.stringContaining(
          'What data am I allowed to use with an AI tool?'
        )
      )

      const first = result.indexOf('What data am I allowed to use with an AI tool?')
      const second = result.indexOf('Which AI tool should I use for my project?')
      expect(first).toBeGreaterThan(-1)
      expect(second).toBeGreaterThan(first)
    })

    test('keeps the follow-up question box under a need_more_detail answer', async () => {
      const { result } = await ask('help me get started')

      expect(result).toEqual(expect.stringContaining('id="question"'))
    })

    test('choosing an option and continuing asks it as the next question', async () => {
      const { posted, cookie } = await postQuestion('help me get started')

      expect(posted.headers.location).toBe('/ai-toolkit/ask/answers/1')

      const shown = await server.inject({
        method: 'GET',
        url: posted.headers.location,
        headers: { cookie }
      })

      // Read the value straight out of the rendered radio input, so this
      // fails if the template or filter ever emitted the wrong name or
      // value, rather than assuming the fixture text and the markup agree.
      const radioMatch = shown.result.match(
        /class="govuk-radios__input" id="option" name="question" type="radio" value="([^"]+)"/
      )
      expect(radioMatch).not.toBeNull()
      const chosen = radioMatch[1]

      const { posted: followedUp, cookie: followUpCookie } = await postQuestion(
        chosen,
        cookie
      )

      const { result } = await server.inject({
        method: 'GET',
        url: followedUp.headers.location,
        headers: { cookie: followUpCookie }
      })

      expect(result).toEqual(
        expect.stringContaining(
          `<p class="govuk-body app-ask__asked-text">${chosen}</p>`
        )
      )
    })

    test('pressing Continue with no option chosen shows the error on the options, not the free-text box', async () => {
      const { posted, cookie } = await postQuestion('help me get started')

      const { result } = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: 'from=options',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          cookie
        }
      })

      expect(result).toEqual(
        expect.stringContaining('Select an option, or type your question below')
      )
      expect(result).toEqual(expect.stringContaining('href="#option"'))
      expect(result).not.toEqual(expect.stringContaining('Enter your question'))

      const followUpErrorIndex = result.indexOf('id="question-error"')
      expect(followUpErrorIndex).toBe(-1)

      expect(posted.headers.location).toBe('/ai-toolkit/ask/answers/1')
    })

    test('shows a cannot_answer, outside_toolkit answer with its own heading and no Check this answer section', async () => {
      const { result } = await ask('What is the parking policy?')

      expect(result).toEqual(
        expect.stringContaining(
          '<h1 class="govuk-heading-l">The toolkit cannot answer this</h1>'
        )
      )
      expect(result).not.toEqual(expect.stringContaining('Check this answer'))
    })

    test('shows a cannot_answer, no_guidance_yet answer with its nearest guidance listed', async () => {
      const { result } = await ask('What is the procurement process?')

      expect(result).toEqual(
        expect.stringContaining(
          '<h1 class="govuk-heading-l">The toolkit cannot answer this</h1>'
        )
      )
      expect(result).toEqual(expect.stringContaining('Nearest guidance'))
      expect(result).toEqual(
        expect.stringContaining('href="/ai-toolkit/guidance/choosing-a-tool"')
      )
    })

    test('shows a talk_to_a_person answer with a link to the team, and the conversation reaches them', async () => {
      const { posted, cookie } = await postQuestion('Can I use this for my project?')

      const shown = await server.inject({
        method: 'GET',
        url: posted.headers.location,
        headers: { cookie }
      })

      expect(shown.result).toEqual(
        expect.stringContaining(
          '<h1 class="govuk-heading-l">This one is for the team</h1>'
        )
      )
      expect(shown.result).toEqual(
        expect.stringContaining('href="/ai-toolkit/ask/help"')
      )

      const stuck = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/stuck',
        payload: 'includeConversation=yes',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })

      expect(stuck.result).toEqual(
        expect.stringContaining('Can I use this for my project?')
      )
    })

    test('shows a blocked answer in neutral words, with the follow-up field still there', async () => {
      const { result } = await ask('Can you give me legal advice?')

      expect(result).toEqual(
        expect.stringContaining(
          '<h1 class="govuk-heading-l">The toolkit cannot help with this question</h1>'
        )
      )
      expect(result.toLowerCase()).not.toMatch(/flagged|filtered|unsafe|violat/)
      expect(result).toEqual(expect.stringContaining('id="question"'))
    })

    test('shows a soft error answer as the same error summary as a failed fetch, and does not save it', async () => {
      const { statusCode, result } = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: `question=${encodeURIComponent('simulate an error please')}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining(NO_ANSWER))
      expect(result).toEqual(expect.stringContaining('simulate an error please'))
      expect(result).toEqual(expect.stringContaining('Error: Ask the toolkit'))

      // Nothing was saved: there is no answer at this address to read.
      const { statusCode: laterStatus, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1'
      })
      expect(laterStatus).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(askUrl)
    })

    test('leaves answered and need_more_detail answers as they were', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining('<h1 class="govuk-heading-l">Your answer</h1>')
      )
      expect(result).toEqual(expect.stringContaining('Toolkit answer'))
      expect(result).toEqual(expect.stringContaining('AI can make mistakes'))
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

  describe('an answer page', () => {
    /**
     * Asks several questions in one conversation.
     * @param {Array<string>} questions
     * @returns {Promise<string>} The session cookie they were stored against
     */
    async function haveConversation (questions) {
      let cookie

      for (const question of questions) {
        ({ cookie } = await postQuestion(question, cookie))
      }

      return cookie
    }

    test('sends someone with no conversation back to the start', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1'
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(askUrl)
    })

    test.each([
      ['past the end of the conversation', '99'],
      ['not a number', 'abc'],
      ['zero', '0']
    ])('sends an answer number that is %s back to the start', async (_d, number) => {
      const cookie = await haveConversation(['Can I use GitHub Copilot?'])

      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: `/ai-toolkit/ask/answers/${number}`,
        headers: { cookie }
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(askUrl)
    })

    test('an earlier answer is still there at its own address', async () => {
      const cookie = await haveConversation([
        'Can I use GitHub Copilot?',
        'How do I choose a tool for my team?'
      ])

      const { statusCode, result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(
        expect.stringContaining('Can I use GitHub Copilot?')
      )
    })

    test('does not offer options on an earlier need_more_detail answer, only the latest can be followed on from', async () => {
      const cookie = await haveConversation([
        'help me get started',
        'How do I choose a tool?'
      ])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })

      expect(result).not.toEqual(expect.stringContaining('type="radio"'))
    })

    test('lists the conversation as links, one per question', async () => {
      const cookie = await haveConversation([
        'Can I use GitHub Copilot?',
        'How do I choose a tool for my team?'
      ])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/2',
        headers: { cookie }
      })

      expect(result).toEqual(expect.stringContaining('This conversation'))
      expect(result).toEqual(
        expect.stringContaining('href="/ai-toolkit/ask/answers/1"')
      )
    })

    test('shows no conversation list while there is only one question to choose from', async () => {
      const cookie = await haveConversation(['Can I use GitHub Copilot?'])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })

      expect(result).not.toEqual(expect.stringContaining('This conversation'))
    })

    test.each([
      ['the same support box as the rest of the toolkit', 'Get help from a person'],
      ['a route to a person that can carry the conversation', 'href="/ai-toolkit/ask/help"'],
      ['a way to start over, at the field', 'Asking about something else?'],
      ['start over as a link to a confirmation page', 'href="/ai-toolkit/ask/restart"']
    ])('renders %s', async (_description, expected) => {
      const cookie = await haveConversation(['Can I use GitHub Copilot?'])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })

      expect(result).toEqual(expect.stringContaining(expected))
    })

    test('stops offering the field once the conversation is as long as one can be', async () => {
      const { MAX_EXCHANGES } = await import('../../../../src/server/ai-ask/constants.js')
      const cookie = await haveConversation(
        Array.from({ length: MAX_EXCHANGES }, (_, i) => `Question ${i + 1}`)
      )

      const { result } = await server.inject({
        method: 'GET',
        url: `/ai-toolkit/ask/answers/${MAX_EXCHANGES}`,
        headers: { cookie }
      })
      expect(result).not.toEqual(expect.stringContaining('id="question"'))
      expect(result).toEqual(
        expect.stringContaining(`reached ${MAX_EXCHANGES} questions`)
      )

      const refused = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: 'question=One%20more',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })
      expect(refused.statusCode).toBe(statusCodes.seeOther)
      expect(refused.headers.location).toBe(
        `/ai-toolkit/ask/answers/${MAX_EXCHANGES}`
      )
    })

    test('marks the answer being read, and does not link it to itself', async () => {
      const cookie = await haveConversation([
        'Can I use GitHub Copilot?',
        'How do I choose a tool for my team?'
      ])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/2',
        headers: { cookie }
      })

      expect(result).toEqual(expect.stringContaining('aria-current="page"'))
      expect(result).not.toEqual(
        expect.stringContaining('href="/ai-toolkit/ask/answers/2"')
      )
    })

    test('only the newest answer can be followed on from', async () => {
      const cookie = await haveConversation([
        'Can I use GitHub Copilot?',
        'How do I choose a tool for my team?'
      ])

      const earlier = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })
      const latest = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/2',
        headers: { cookie }
      })

      expect(earlier.result).not.toEqual(
        expect.stringContaining('Ask a follow-up question')
      )
      expect(earlier.result).toEqual(
        expect.stringContaining(
          'You can only ask from the latest answer in a conversation.'
        )
      )
      expect(latest.result).toEqual(
        expect.stringContaining('Ask a follow-up question')
      )
    })

    test('holds no disclosures', async () => {
      const cookie = await haveConversation([
        'Can I use GitHub Copilot?',
        'How do I choose a tool for my team?'
      ])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/2',
        headers: { cookie }
      })

      expect(result).not.toEqual(expect.stringContaining('<details'))
    })

    test('goes back to where you got to when reading an earlier answer', async () => {
      const cookie = await haveConversation([
        'Can I use GitHub Copilot?',
        'How do I choose a tool for my team?',
        'What patterns exist for summarisation?'
      ])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })

      // Not answer 2. Stepping back one at a time through a long conversation
      // is what the list at the foot of the page exists to avoid.
      expect(result).toEqual(
        expect.stringContaining(
          '<a href="/ai-toolkit/ask/answers/3" class="govuk-back-link">Back to where you got to'
        )
      )
    })

    test('goes out of the service from the latest answer', async () => {
      const cookie = await haveConversation([
        'Can I use GitHub Copilot?',
        'How do I choose a tool for my team?'
      ])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/2',
        headers: { cookie }
      })

      expect(result).toEqual(
        expect.stringContaining(
          '<a href="/ai-toolkit" class="govuk-back-link">Back to the AI digital toolkit'
        )
      )
    })

    test('shows a back link or breadcrumbs, never both', async () => {
      const cookie = await haveConversation(['Can I use GitHub Copilot?'])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })

      expect(result).toEqual(expect.stringContaining('govuk-back-link'))
      expect(result).not.toEqual(expect.stringContaining('govuk-breadcrumbs'))
    })
  })

  describe('keeping conversations apart', () => {
    /**
     * Asks a question and returns the session cookie it was stored against.
     * @returns {Promise<string>}
     */
    async function startConversation () {
      const { cookie } = await postQuestion('How do I choose a tool?')

      return cookie
    }

    test('the front door is the front door when nothing has been asked', async () => {
      const { statusCode } = await server.inject({ method: 'GET', url: askUrl })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('going back to the front door mid-conversation returns to the latest answer', async () => {
      const cookie = await startConversation()

      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: askUrl,
        headers: { cookie }
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe('/ai-toolkit/ask/answers/1')
    })

    test('asks before starting a new conversation, so a prefetched link cannot clear one', async () => {
      const cookie = await startConversation()

      const { statusCode, result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/restart',
        headers: { cookie }
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('This deletes the 1 question and'))
      expect(result).toEqual(expect.stringContaining('action="/ai-toolkit/ask/restart"'))
      expect(result).toEqual(expect.stringContaining('href="/ai-toolkit/ask/answers/1">Cancel'))
    })

    test('has nothing to ask about restarting when nothing has been asked', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/restart'
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(askUrl)
    })

    test('starting a new conversation drops what went before', async () => {
      const cookie = await startConversation()

      const restarted = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/restart',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })
      expect(restarted.statusCode).toBe(statusCodes.seeOther)

      const after = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
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
      const { cookie } = await postQuestion(
        'Can I use Copilot with personal data?'
      )

      return server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/stuck',
        payload: includeConversation ? 'includeConversation=yes' : '',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })
    }

    test('offers a way to reach the team from the conversation', async () => {
      const { cookie } = await postQuestion('How do I choose a tool?')

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })

      expect(result).toEqual(
        expect.stringContaining('href="/ai-toolkit/ask/help"')
      )

      const help = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/help',
        headers: { cookie }
      })

      expect(help.statusCode).toBe(statusCodes.ok)
      expect(help.result).toEqual(
        expect.stringContaining('name="includeConversation"')
      )
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
