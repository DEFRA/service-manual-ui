import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { config } from '../../../../src/config/config.js'

import { answerFor } from '../../../../src/server/ai-ask/chat-api.js'
import { fixtureAnswerFor } from '../../../../src/server/ai-ask/__fixtures__/answers.js'

describe('#chatApi', () => {
  let originalUrl
  let originalTimeout

  beforeEach(() => {
    originalUrl = config.get('aiContent.askApiUrl')
    originalTimeout = config.get('aiContent.askApiTimeoutMs')
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    config.set('aiContent.askApiUrl', originalUrl)
    config.set('aiContent.askApiTimeoutMs', originalTimeout)
    vi.unstubAllGlobals()
  })

  describe('with no API URL', () => {
    test('answers from the fixtures and never calls out', async () => {
      config.set('aiContent.askApiUrl', '')

      const history = [{ question: 'Which tool?', status: 'answered', message: 'M', options: [] }]

      const answer = await answerFor('what about it?', { history })

      expect(answer).toEqual(fixtureAnswerFor('what about it?', { history }))
      expect(answer.message).toEqual(expect.stringContaining('Still on "Which tool?"'))
      expect(fetch).not.toHaveBeenCalled()
    })
  })

  describe('with an API URL', () => {
    const wireAnswer = {
      status: 'answered',
      message: 'An answer',
      rule_verbatim: null,
      sources: []
    }

    beforeEach(() => {
      config.set('aiContent.askApiUrl', 'http://backend:8085/')
      config.set('aiContent.askApiTimeoutMs', 1234)
      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(wireAnswer)
      })
    })

    test('posts the question and the conversation so far to /ask', async () => {
      const history = [
        { question: 'Copilot?', status: 'answered', message: 'An answer', options: [] }
      ]

      await answerFor('what about agents?', { history })

      expect(fetch).toHaveBeenCalledWith(
        'http://backend:8085/ask',
        expect.objectContaining({
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question: 'what about agents?', history })
        })
      )
    })

    test('sends an empty history, not a missing one, for a first question', async () => {
      await answerFor('Copilot?')

      const { body } = fetch.mock.calls[0][1]
      expect(JSON.parse(body)).toEqual({ question: 'Copilot?', history: [] })
    })

    test('aborts the request after the configured timeout', async () => {
      config.set('aiContent.askApiTimeoutMs', 25)

      await answerFor('Copilot?')

      const { signal } = fetch.mock.calls[0][1]
      expect(signal).toBeInstanceOf(AbortSignal)
      expect(signal.aborted).toBe(false)

      await new Promise((resolve) => setTimeout(resolve, 50))

      expect(signal.aborted).toBe(true)
    })

    test('returns the wire shape untouched', async () => {
      await expect(answerFor('Copilot?')).resolves.toEqual(wireAnswer)
    })

    test('throws, carrying the status, when the backend rejects the question', async () => {
      fetch.mockResolvedValue({ ok: false, status: 503 })

      await expect(answerFor('Copilot?')).rejects.toMatchObject({
        message: 'service-manual-chat-backend answered with status 503',
        status: 503
      })
    })

    test.each([
      ['null', null],
      ['a string', 'Yes'],
      ['an array', []],
      ['an object with no status', { message: 'An answer' }]
    ])('throws when a 200 carries %s instead of an answer', async (_description, body) => {
      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(body)
      })

      await expect(answerFor('Copilot?')).rejects.toThrow(
        'service-manual-chat-backend answered 200 with something other than an answer'
      )
    })

    test('lets a network failure through', async () => {
      fetch.mockRejectedValue(new TypeError('fetch failed'))

      await expect(answerFor('Copilot?')).rejects.toThrow('fetch failed')
    })
  })
})
