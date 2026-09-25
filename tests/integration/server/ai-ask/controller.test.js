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
import { describe, test, expect, beforeAll, afterAll, afterEach, vi } from 'vitest'
import { statusCodes } from '../../../../src/server/common/constants/status-codes.js'

const askUrl = '/ai-toolkit/ask'

// "Report a problem with this answer" sends through GOV.UK Notify. The
// module is ours, so it is the seam: every other part of the route runs for
// real.
const notify = vi.hoisted(() => ({ trySendEmail: vi.fn() }))
vi.mock('../../../../src/notify/notify-client.js', () => ({
  createNotifyClient: () => ({}),
  trySendEmail: notify.trySendEmail
}))

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
      ['what the page is for, and that it is AI', 'Get an AI answer from the toolkit'],
      ['that each answer links to its guidance', 'with a link to each page it used.'],
      ['the question field', 'id="question"'],
      ['a Defra green ask button', 'app-ask__send'],
      ['the route to a person', 'Get help from a person'],
      ['breadcrumbs', 'govuk-breadcrumbs'],
      ['a breadcrumb back to the toolkit', 'href="/ai-toolkit"'],
      ['the privacy reminder and the wait, on one line', 'Do not include personal or sensitive data. Answers can take 30 seconds.'],
      ['example questions to start from', 'What data can I use with AI tools?']
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

    test('does not show a notice on a plain visit', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: askUrl
      })

      expect(result).not.toEqual(
        expect.stringContaining('Your conversation has ended')
      )
      expect(result).not.toEqual(
        expect.stringContaining('We could not find that conversation')
      )
    })

    test('leaves the warning that AI can be wrong for the answers, where it is acted on', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: askUrl
      })

      expect(result).not.toEqual(expect.stringContaining('AI can make mistakes'))
    })

    test('offers each example question as a button that asks it', async () => {
      const { EXAMPLE_QUESTIONS } = await import('../../../../src/server/ai-ask/constants.js')
      const { result } = await server.inject({
        method: 'GET',
        url: askUrl
      })

      for (const example of EXAMPLE_QUESTIONS) {
        expect(result).toEqual(
          expect.stringContaining(
            `<button type="submit" name="question" value="${example.replaceAll("'", '&#39;')}" class="app-ask__example">`
          )
        )
      }
    })

    test('ignores an unrecognised notice value', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: `${askUrl}?notice=anything-else`
      })

      expect(result).not.toEqual(
        expect.stringContaining('Your conversation has ended')
      )
      expect(result).not.toEqual(
        expect.stringContaining('We could not find that conversation')
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
        // Still the conversation, with the question kept in the box.
        expect(result).toEqual(expect.stringContaining('Can I use GitHub Copilot?'))
        expect(result).toEqual(expect.stringContaining('What about agents?</textarea>'))
        // A problem with the service, not the question, so no field error.
        expect(result).toEqual(
          expect.stringContaining('Sorry, there is a problem with the service')
        )
        expect(result).toEqual(expect.stringContaining(NO_ANSWER))
        expect(result).not.toEqual(expect.stringContaining('id="question-error"'))
        expect(result).toEqual(expect.stringContaining('<title>Error: Question 1, Ask the toolkit'))
      })

      // The failed follow-up was not added to the conversation, so its
      // address goes back to the one answer there is.
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/2',
        headers: { cookie }
      })
      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')
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
      expect(headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')
    })

    test('names the service in the heading, not the question', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining('<h1 class="govuk-heading-l app-ask__title">Ask the toolkit</h1>')
      )
    })

    test('names each turn with a heading, so a screen reader can move between them', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining('You<span class="govuk-visually-hidden">, question 1</span></h2>')
      )
      expect(result).toEqual(
        expect.stringContaining('AI toolkit<span class="govuk-visually-hidden">, answer 1</span></h2>')
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
        expect.stringContaining('<title>Question 1, Ask the toolkit | AI digital toolkit')
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
        expect.stringContaining('Do not include personal or sensitive data')
      )
      expect(result).toEqual(
        expect.stringContaining('aria-describedby="question-info"')
      )
    })

    test('asks the follow-up with the same words as the front door', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(expect.stringContaining('Your question'))
      expect(result).toEqual(
        expect.stringContaining('Ask<span class="govuk-visually-hidden"> the toolkit</span>')
      )
    })

    test('says how long an answer takes where there is no spinner to say it', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining('<p class="govuk-hint app-ask__nojs-wait">This can take up to 30 seconds.</p>')
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

      expect(result).toEqual(expect.stringContaining('Guidance used'))
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

    test('shows a need_more_detail answer as quick replies, in the order sent', async () => {
      const { result } = await ask('help me get started')

      expect(result).toEqual(
        expect.stringContaining('Choose one, or ask your own question.')
      )
      expect(result).toEqual(expect.stringContaining('app-ask__quick-reply'))
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

    test('pressing a quick reply asks it as the next question', async () => {
      const { posted, cookie } = await postQuestion('help me get started')

      expect(posted.headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')

      const shown = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })

      // Read the value straight out of the rendered button, so this fails if
      // the template ever emitted the wrong name or value, rather than
      // assuming the fixture text and the markup agree.
      const replyMatch = shown.result.match(
        /<button type="submit" name="question" value="([^"]+)" class="govuk-button govuk-button--secondary app-ask__quick-reply"/
      )
      expect(replyMatch).not.toBeNull()
      const chosen = replyMatch[1]

      const { posted: followedUp, cookie: followUpCookie } = await postQuestion(
        chosen,
        cookie
      )

      const { result } = await server.inject({
        method: 'GET',
        url: followedUp.headers.location.split('#')[0],
        headers: { cookie: followUpCookie }
      })

      expect(result).toEqual(
        expect.stringContaining(
          `<p class="govuk-body app-ask__asked-text">${chosen}</p>`
        )
      )
    })

    test('shows a cannot_answer, outside_toolkit answer by saying so first, with no guidance used', async () => {
      const { result } = await ask('What is the parking policy?')

      expect(result).toEqual(
        expect.stringContaining('The toolkit cannot answer this. It covers choosing a tool')
      )
      expect(result).not.toEqual(expect.stringContaining('Guidance used'))
      expect(result).not.toEqual(expect.stringContaining('AI can make mistakes'))
    })

    test('shows a cannot_answer, no_guidance_yet answer with its nearest guidance listed', async () => {
      const { result } = await ask('What is the procurement process?')

      expect(result).toEqual(
        expect.stringContaining('The toolkit does not cover this yet.')
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
        url: posted.headers.location.split('#')[0],
        headers: { cookie }
      })

      expect(shown.result).toEqual(
        expect.stringContaining('<p class="govuk-body app-ask__outcome">This one is for the team.</p>')
      )
      expect(shown.result).toEqual(
        expect.stringContaining('<a class="govuk-link" href="/ai-toolkit/ask/help">Email the AI Capability and Enablement team</a>')
      )
      expect(shown.result).not.toEqual(expect.stringContaining('AI can make mistakes'))
      expect(shown.result).toEqual(
        expect.stringContaining(
          'This depends on your project, so it needs a conversation with the team rather than a general answer.'
        )
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
        expect.stringContaining('AI toolkit<span class="govuk-visually-hidden">, answer 1</span>')
      )
      expect(result.toLowerCase()).not.toMatch(/flagged|filtered|unsafe|violat/)
      expect(result).toEqual(expect.stringContaining('id="question"'))
      expect(result).not.toEqual(expect.stringContaining('AI can make mistakes'))
    })

    test('keeps the route to a person on the last turn of a full conversation', async () => {
      const { MAX_EXCHANGES } = await import('../../../../src/server/ai-ask/constants.js')
      let cookie
      for (let i = 1; i < MAX_EXCHANGES; i++) {
        ({ cookie } = await postQuestion(`Question ${i}`, cookie))
      }
      await postQuestion('Can I use this for my project?', cookie)

      const { result } = await server.inject({
        method: 'GET',
        url: `/ai-toolkit/ask/answers/${MAX_EXCHANGES}`,
        headers: { cookie }
      })

      expect(result).not.toEqual(expect.stringContaining('id="question"'))
      expect(result).toEqual(
        expect.stringContaining('<a class="govuk-link" href="/ai-toolkit/ask/help">Email the AI Capability and Enablement team</a></p>')
      )
    })

    test('offers the route to a person on the newest turn only', async () => {
      const { cookie } = await postQuestion('Can I use this for my project?')
      await postQuestion('How do I choose a tool?', cookie)

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/2',
        headers: { cookie }
      })

      expect(result).toEqual(expect.stringContaining('This one is for the team.'))
      expect(result).not.toEqual(
        expect.stringContaining('<a class="govuk-link" href="/ai-toolkit/ask/help">Email the AI Capability and Enablement team</a></p>')
      )
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
      expect(headers.location).toBe(`${askUrl}?notice=not-found`)
    })

    test.each([
      ['an answered answer', 'How do I choose a tool?'],
      ['a need_more_detail answer', 'help me get started']
    ])('warns that %s can be wrong', async (_description, question) => {
      const { result } = await ask(question)

      expect(result).toEqual(expect.stringContaining('AI can make mistakes'))
    })

    test('shows the answer message on an answered page', async () => {
      const { result } = await ask('How do I choose a tool?')

      expect(result).toEqual(
        expect.stringContaining(
          'Start from the data you will use, because your classification and the tool type together decide what is allowed.'
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

    test('sends someone with no conversation back to the start, saying why', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1'
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(`${askUrl}?notice=not-found`)

      const { result } = await server.inject({ method: 'GET', url: headers.location })

      expect(result).toEqual(
        expect.stringContaining('We could not find that conversation. Conversations are kept for 4 hours after your last question.')
      )
    })

    test.each([
      ['past the end of the conversation', '99'],
      ['not a number', 'abc'],
      ['zero', '0']
    ])('sends an answer number that is %s to the newest turn', async (_d, number) => {
      const cookie = await haveConversation(['Can I use GitHub Copilot?'])

      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: `/ai-toolkit/ask/answers/${number}`,
        headers: { cookie }
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')
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

      expect(result).not.toEqual(expect.stringContaining('app-ask__quick-reply'))
    })

    test('shows the whole conversation on one page, each turn at its own anchor', async () => {
      const cookie = await haveConversation([
        'Can I use GitHub Copilot?',
        'How do I choose a tool for my team?'
      ])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/2',
        headers: { cookie }
      })

      expect(result).toEqual(expect.stringContaining('id="turn-1"'))
      expect(result).toEqual(expect.stringContaining('id="turn-2"'))
      expect(result.indexOf('Can I use GitHub Copilot?')).toBeLessThan(
        result.indexOf('How do I choose a tool for my team?')
      )
    })

    describe('in a long conversation', () => {
      const questions = [
        'Question one',
        'Question two',
        'Question three',
        'Question four',
        'Question five'
      ]

      test('shows the last three turns, with a way to show the rest', async () => {
        const cookie = await haveConversation(questions)

        const { result } = await server.inject({
          method: 'GET',
          url: '/ai-toolkit/ask/answers/5',
          headers: { cookie }
        })

        expect(result).not.toEqual(expect.stringContaining('id="turn-2"'))
        expect(result).toEqual(expect.stringContaining('id="turn-3"'))
        expect(result).toEqual(
          expect.stringContaining('href="/ai-toolkit/ask/answers/5?all=1#turn-1">Show 2 earlier questions</a>')
        )
      })

      test('shows every turn once asked to', async () => {
        const cookie = await haveConversation(questions)

        const { result } = await server.inject({
          method: 'GET',
          url: '/ai-toolkit/ask/answers/5?all=1',
          headers: { cookie }
        })

        expect(result).toEqual(expect.stringContaining('id="turn-1"'))
        expect(result).not.toEqual(expect.stringContaining('earlier question'))
      })

      test('shows every turn when the address is for one that would be hidden', async () => {
        const cookie = await haveConversation(questions)

        const { result } = await server.inject({
          method: 'GET',
          url: '/ai-toolkit/ask/answers/1',
          headers: { cookie }
        })

        expect(result).toEqual(expect.stringContaining('id="turn-1"'))
        expect(result).toEqual(expect.stringContaining('id="turn-5"'))
      })
    })

    test.each([
      ['the same support box as the rest of the toolkit', 'Get help from a person'],
      ['a route to a person that can carry the conversation', 'href="/ai-toolkit/ask/help"'],
      ['a way to start over, at the field', 'Asking about something else?'],
      ['a way to report a problem with the answer', 'href="/ai-toolkit/ask/answers/1/report">Report a problem with this answer'],
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
        `/ai-toolkit/ask/answers/${MAX_EXCHANGES}#turn-${MAX_EXCHANGES}`
      )
    })

    test('holds one question box, under the newest turn, on any answer address', async () => {
      const cookie = await haveConversation([
        'Can I use GitHub Copilot?',
        'How do I choose a tool for my team?'
      ])

      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1',
        headers: { cookie }
      })

      expect(result.match(/id="question"/g)).toHaveLength(1)
      expect(result.indexOf('id="question"')).toBeGreaterThan(
        result.indexOf('How do I choose a tool for my team?')
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
          '<a href="/ai-toolkit/ask/answers/3#turn-3" class="govuk-back-link">Back to where you got to'
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
      expect(headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')
    })

    test('asks before starting a new conversation, so a prefetched link cannot clear one', async () => {
      const cookie = await startConversation()

      const { statusCode, result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/restart',
        headers: { cookie }
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('This deletes the 1 question and answer in your current conversation.'))
      expect(result).toEqual(expect.stringContaining('action="/ai-toolkit/ask/restart"'))
      expect(result).toEqual(expect.stringContaining('href="/ai-toolkit/ask/answers/1#turn-1">Cancel'))
    })
    test('pluralizes questions and answers when there is more than one', async () => {
      const { cookie } = await postQuestion('How do I choose a tool?')
      await postQuestion('What about agents?', cookie)

      const { statusCode, result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/restart',
        headers: { cookie }
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('This deletes the 2 questions and answers in your current conversation.'))
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
      expect(after.headers.location).toBe(`${askUrl}?notice=not-found`)
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

    test('sends someone with no conversation back to the start, saying why', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/help'
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(`${askUrl}?notice=no-conversation`)

      const { result } = await server.inject({
        method: 'GET',
        url: headers.location
      })

      expect(result).toEqual(
        expect.stringContaining('Your conversation has ended, so there is nothing to send to the team. Ask a new question, or use the contact details below.')
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

  describe('reporting a problem with an answer', () => {
    /**
     * Asks one question and returns the session cookie.
     * @returns {Promise<string>}
     */
    async function startConversation () {
      const { cookie } = await postQuestion('How do I choose a tool?')

      return cookie
    }

    /**
     * The id the report form carries for answer 1, read from the form itself
     * so the test sends what a browser would.
     * @param {string} cookie
     * @returns {Promise<string>}
     */
    async function formExchangeId (cookie) {
      const { result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1/report',
        headers: { cookie }
      })

      return result.match(/name="exchange" value="([^"]+)"/)?.[1] ?? ''
    }

    /**
     * Sends the report form for answer 1, as opened in this conversation.
     * @param {string} cookie
     * @param {string} problem
     * @param {string} [exchange] - The id the form carries; read from the page if not given
     * @returns {Promise<object>}
     */
    async function report (cookie, problem, exchange) {
      const id = exchange ?? await formExchangeId(cookie)

      return server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/answers/1/report',
        payload: `exchange=${encodeURIComponent(id)}&problem=${encodeURIComponent(problem)}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })
    }

    afterEach(() => {
      notify.trySendEmail.mockReset()
    })

    test('says which answer is being reported, and what will be sent', async () => {
      const cookie = await startConversation()

      const { statusCode, result } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1/report',
        headers: { cookie }
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('<h1 class="govuk-heading-l">Report a problem with this answer</h1>'))
      expect(result).toEqual(expect.stringContaining('You are reporting the answer to'))
      expect(result).toEqual(expect.stringContaining('How do I choose a tool?'))
      expect(result).toEqual(expect.stringContaining('We will send the question, the answer and anything you write below'))
      expect(result).toEqual(expect.stringContaining('action="/ai-toolkit/ask/answers/1/report"'))
      expect(result).toEqual(expect.stringContaining('href="/ai-toolkit/ask/answers/1#turn-1" class="govuk-back-link"'))
    })

    test('sends the question, the answer and what is wrong to the shared mailbox', async () => {
      const cookie = await startConversation()
      notify.trySendEmail.mockResolvedValue([{ data: {}, status: 201 }, null])

      const { statusCode, headers } = await report(cookie, 'It is out of date')

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe('/ai-toolkit/ask/answers/1')
      expect(notify.trySendEmail).toHaveBeenCalledWith(
        expect.anything(),
        '6a1c2d3e-4f50-4a61-8b72-9c8d0e1f2a3b',
        'dummy-mailbox-email-for-tests@example.com',
        {
          personalisation: {
            answerNumber: '1',
            problem: 'It is out of date',
            exchange: expect.stringContaining('You asked:\nHow do I choose a tool?')
          }
        }
      )
    })

    test.each([
      ['only spaces', '&problem=%20%20%20'],
      ['no field at all', '']
    ])('says so when someone reports a problem with %s', async (_description, extra) => {
      const cookie = await startConversation()
      notify.trySendEmail.mockResolvedValue([{ data: {}, status: 201 }, null])
      const exchange = await formExchangeId(cookie)

      await server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/answers/1/report',
        payload: `exchange=${exchange}${extra}`,
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })

      expect(notify.trySendEmail.mock.calls[0][3].personalisation.problem).toBe(
        'They did not say what was wrong.'
      )
    })

    test('confirms the report once, back in the conversation', async () => {
      const cookie = await startConversation()
      notify.trySendEmail.mockResolvedValue([{ data: {}, status: 201 }, null])

      await report(cookie, 'It is out of date')

      const first = await server.inject({ method: 'GET', url: '/ai-toolkit/ask/answers/1', headers: { cookie } })
      const second = await server.inject({ method: 'GET', url: '/ai-toolkit/ask/answers/1', headers: { cookie } })

      expect(first.result).toEqual(expect.stringContaining('has your report on answer 1'))
      expect(second.result).not.toEqual(expect.stringContaining('has your report on answer 1'))
    })

    test('sends one report per answer, however many times the form is sent', async () => {
      const cookie = await startConversation()
      notify.trySendEmail.mockResolvedValue([{ data: {}, status: 201 }, null])

      await report(cookie, 'It is out of date')
      const again = await report(cookie, 'It is out of date')

      expect(notify.trySendEmail).toHaveBeenCalledTimes(1)
      expect(again.headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')

      const { result } = await server.inject({ method: 'GET', url: '/ai-toolkit/ask/answers/1', headers: { cookie } })
      expect(result).toEqual(expect.stringContaining('Report sent<span class="govuk-visually-hidden"> for answer 1</span>'))
      expect(result).not.toEqual(expect.stringContaining('href="/ai-toolkit/ask/answers/1/report"'))
    })

    test('sends one email when the same report arrives twice at once', async () => {
      const cookie = await startConversation()
      let finishSending
      notify.trySendEmail.mockImplementation(() => new Promise((resolve) => {
        finishSending = () => resolve([{ data: {}, status: 201 }, null])
      }))

      const exchange = await formExchangeId(cookie)
      const first = report(cookie, 'It is out of date', exchange)
      await vi.waitFor(() => expect(notify.trySendEmail).toHaveBeenCalledTimes(1))
      const second = await report(cookie, 'It is out of date', exchange)
      finishSending()
      await first

      expect(notify.trySendEmail).toHaveBeenCalledTimes(1)
      expect(second.headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')
    })

    test('can be sent again after a send that failed', async () => {
      const cookie = await startConversation()
      notify.trySendEmail
        .mockResolvedValueOnce([null, { status: 500, data: null, message: 'Down' }])
        .mockResolvedValueOnce([{ data: {}, status: 201 }, null])

      await report(cookie, 'It is out of date')
      const retried = await report(cookie, 'It is out of date')

      expect(notify.trySendEmail).toHaveBeenCalledTimes(2)
      expect(retried.headers.location).toBe('/ai-toolkit/ask/answers/1')
    })

    test('sends nothing, and asks to try again, when the claim cannot be made', async () => {
      const cookie = await startConversation()
      const claims = await import('../../../../src/server/ai-ask/report-claim.js')
      const claimSpy = vi.spyOn(claims, 'claimReport')
      claimSpy.mockRejectedValueOnce(new Error('Redis unavailable'))

      const { statusCode, result } = await report(cookie, 'It is out of date')
      claimSpy.mockRestore()

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('Your report could not be sent.'))
      expect(notify.trySendEmail).not.toHaveBeenCalled()
    })

    test('lets the first answer of a new conversation be reported straight after the last', async () => {
      const cookie = await startConversation()
      notify.trySendEmail.mockResolvedValue([{ data: {}, status: 201 }, null])
      await report(cookie, 'It is out of date')

      await server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/restart',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })
      await postQuestion('How do I choose a tool?', cookie)
      const second = await report(cookie, 'This one too')

      expect(notify.trySendEmail).toHaveBeenCalledTimes(2)
      expect(second.headers.location).toBe('/ai-toolkit/ask/answers/1')
    })

    test('does not carry a report confirmation into a new conversation', async () => {
      const cookie = await startConversation()
      notify.trySendEmail.mockResolvedValue([{ data: {}, status: 201 }, null])
      await report(cookie, 'It is out of date')

      // Start again before the confirmation is ever shown.
      await server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/restart',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })
      await postQuestion('How do I choose a tool?', cookie)
      const { result } = await server.inject({ method: 'GET', url: '/ai-toolkit/ask/answers/1', headers: { cookie } })

      expect(result).not.toEqual(expect.stringContaining('has your report on answer'))
    })

    test('still asks to try again when the claim cannot be released after a failed send', async () => {
      const cookie = await startConversation()
      notify.trySendEmail.mockResolvedValue([null, { status: 500, data: null, message: 'Down' }])
      const claims = await import('../../../../src/server/ai-ask/report-claim.js')
      const releaseSpy = vi.spyOn(claims, 'releaseReport')
      releaseSpy.mockRejectedValueOnce(new Error('Redis unavailable'))

      const { statusCode, result } = await report(cookie, 'It is out of date')
      releaseSpy.mockRestore()

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('Your report could not be sent.'))
    })

    test('sends nothing from a form left open while the conversation changed in another tab', async () => {
      const cookie = await startConversation()
      notify.trySendEmail.mockResolvedValue([{ data: {}, status: 201 }, null])
      const oldExchange = await formExchangeId(cookie)

      await server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/restart',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })
      await postQuestion('A different first question', cookie)

      const stale = await report(cookie, 'It is out of date', oldExchange)

      expect(notify.trySendEmail).not.toHaveBeenCalled()
      expect(stale.statusCode).toBe(statusCodes.seeOther)
      expect(stale.headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')
    })

    test('rejects a report over the limit, keeping what was written', async () => {
      const cookie = await startConversation()
      const { MAX_REPORT_LENGTH } = await import('../../../../src/server/ai-ask/constants.js')
      const tooLong = 'a'.repeat(MAX_REPORT_LENGTH + 1)

      const { statusCode, result } = await report(cookie, tooLong)

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining(`Your report must be ${MAX_REPORT_LENGTH} characters or less`))
      expect(result).toEqual(expect.stringContaining('<title>Error: Report a problem with this answer'))
      expect(result).toEqual(expect.stringContaining(tooLong))
      expect(notify.trySendEmail).not.toHaveBeenCalled()
    })

    test('says the service failed when Notify does, keeping what was written', async () => {
      const cookie = await startConversation()
      notify.trySendEmail.mockResolvedValue([null, { status: 500, data: { errors: [{ message: 'Internal server error' }] } }])

      const { statusCode, result } = await report(cookie, 'It is out of date')

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('Sorry, there is a problem with the service'))
      expect(result).toEqual(expect.stringContaining('Your report could not be sent.'))
      expect(result).toEqual(expect.stringContaining('It is out of date</textarea>'))
    })

    test.each([
      ['a report page', 'GET'],
      ['a report', 'POST']
    ])('sends %s for an answer that is not there to the newest turn', async (_d, method) => {
      const cookie = await startConversation()

      const { statusCode, headers } = await server.inject({
        method,
        url: '/ai-toolkit/ask/answers/9/report',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')
    })

    test('sends someone with no conversation back to the start, saying why', async () => {
      const { statusCode, headers } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/ask/answers/1/report'
      })

      expect(statusCode).toBe(statusCodes.seeOther)
      expect(headers.location).toBe(`${askUrl}?notice=not-found`)
    })

    describe('where no report template is set', () => {
      let previousTemplate

      beforeAll(async () => {
        const { config } = await import('../../../../src/config/config.js')
        previousTemplate = config.get('notify.aiToolkit.askReportTemplateId')
        config.set('notify.aiToolkit.askReportTemplateId', '')
      })

      afterAll(async () => {
        const { config } = await import('../../../../src/config/config.js')
        config.set('notify.aiToolkit.askReportTemplateId', previousTemplate)
      })

      test('offers no report link', async () => {
        const cookie = await startConversation()

        const { result } = await server.inject({ method: 'GET', url: '/ai-toolkit/ask/answers/1', headers: { cookie } })

        expect(result).not.toEqual(expect.stringContaining('Report a problem with this answer'))
      })

      test('sends a stale report link back to the conversation', async () => {
        const cookie = await startConversation()

        const { statusCode, headers } = await report(cookie, 'It is out of date')

        expect(statusCode).toBe(statusCodes.seeOther)
        expect(headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')
        expect(notify.trySendEmail).not.toHaveBeenCalled()
      })
    })
  })

  describe('a question handed over from site search', () => {
    /**
     * @param {string} question
     * @param {string} [cookie]
     * @returns {Promise<object>}
     */
    function handOver (question, cookie) {
      return server.inject({
        method: 'POST',
        url: askUrl,
        payload: `prefill=yes&question=${encodeURIComponent(question)}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          ...(cookie ? { cookie } : {})
        }
      })
    }

    test('is filled in on the front door, beside the privacy reminder, and not sent', async () => {
      const { statusCode, result } = await handOver('copilot personal data')

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('copilot personal data</textarea>'))
      expect(result).toEqual(expect.stringContaining('Do not include personal or sensitive data.'))
      expect(result).not.toEqual(expect.stringContaining('There is a problem'))
    })

    test('leaves the box empty, with no error, when nothing was handed over', async () => {
      const { statusCode, result } = await server.inject({
        method: 'POST',
        url: askUrl,
        payload: 'prefill=yes',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(expect.stringContaining('app-ask-question"'))
      expect(result).not.toEqual(expect.stringContaining('There is a problem'))
    })

    test('is carried through starting again when the conversation is full', async () => {
      const { MAX_EXCHANGES } = await import('../../../../src/server/ai-ask/constants.js')
      let cookie
      for (let i = 1; i <= MAX_EXCHANGES; i++) {
        ({ cookie } = await postQuestion(`Question ${i}`, cookie))
      }

      const offered = await handOver('copilot personal data', cookie)

      expect(offered.result).toEqual(expect.stringContaining('<h1 class="govuk-heading-l">Start a new conversation</h1>'))
      expect(offered.result).toEqual(expect.stringContaining('Your question will be ready to ask in a new one.'))
      expect(offered.result).toEqual(expect.stringContaining('<input type="hidden" name="question" value="copilot personal data">'))

      const restarted = await server.inject({
        method: 'POST',
        url: '/ai-toolkit/ask/restart',
        payload: 'question=copilot%20personal%20data',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie }
      })

      expect(restarted.statusCode).toBe(statusCodes.ok)
      expect(restarted.result).toEqual(expect.stringContaining('copilot personal data</textarea>'))
      const { statusCode } = await server.inject({ method: 'GET', url: askUrl, headers: { cookie } })
      expect(statusCode).toBe(statusCodes.ok)
    })

    test('is filled in under the conversation when one is open', async () => {
      const { cookie } = await postQuestion('How do I choose a tool?')

      const { result } = await handOver('copilot personal data', cookie)

      expect(result).toEqual(expect.stringContaining('How do I choose a tool?'))
      expect(result).toEqual(expect.stringContaining('copilot personal data</textarea>'))

      const { headers } = await server.inject({ method: 'GET', url: '/ai-toolkit/ask/answers/2', headers: { cookie } })
      expect(headers.location).toBe('/ai-toolkit/ask/answers/1#turn-1')
    })

    test.each([
      ['a search about AI', 'can I use copilot with personal data', true],
      ['another search', 'book a service assessment', false],
      ['a search about AI too long to ask', `copilot ${'a'.repeat(500)}`, false],
      ['a word that only contains ai', 'detail', false]
    ])('is offered on %s', async (_description, query, offered) => {
      const { result } = await server.inject({ method: 'GET', url: `/search?q=${encodeURIComponent(query)}` })

      expect(result.includes('name="prefill" value="yes"')).toBe(offered)
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

    test('the toolkit landing page also offers it under Start now, as a link', async () => {
      const { result } = await server.inject({ method: 'GET', url: '/ai-toolkit' })

      expect(result).toEqual(
        expect.stringContaining(`Have a question? <a href="${askUrl}" class="govuk-link app-triage__start-secondary-link">Ask the toolkit</a> for an AI answer.`)
      )
    })
  })
})
