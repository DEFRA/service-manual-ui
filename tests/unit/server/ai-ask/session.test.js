import { describe, test, expect, vi } from 'vitest'

import {
  getExchanges,
  addExchange,
  findExchange,
  clearConversation,
  flashReported,
  markReported,
  takeReported,
  toHistory
} from '../../../../src/server/ai-ask/session.js'
import {
  MAX_HISTORY_TURNS,
  MAX_MESSAGE_LENGTH
} from '../../../../src/server/ai-ask/constants.js'

const exchange = (question) => ({ id: `id-${question}`, question, answer: { sources: [] } })

/**
 * @param {Array<object>} [stored]
 * @returns {object} A stand-in for the yar session
 */
function mockYar (stored) {
  return {
    get: vi.fn(() => stored),
    set: vi.fn(),
    clear: vi.fn(),
    flash: vi.fn()
  }
}

describe('getExchanges', () => {
  test('starts empty', () => {
    expect(getExchanges(mockYar(undefined))).toEqual([])
  })

  test('returns what is stored', () => {
    const stored = [exchange('First')]
    const yar = mockYar(stored)

    expect(getExchanges(yar)).toEqual(stored)
    expect(yar.set).not.toHaveBeenCalled()
  })

  test('gives answers from before answers had ids an id of their own, and keeps it', () => {
    const legacy = { question: 'Old', answer: { sources: [] } }
    const yar = mockYar([exchange('First'), legacy])

    const exchanges = getExchanges(yar)

    expect(exchanges[0]).toEqual(exchange('First'))
    expect(exchanges[1]).toEqual({ ...legacy, id: expect.any(String) })
    expect(yar.set).toHaveBeenCalledWith('ai-ask', exchanges)
  })
})

describe('addExchange', () => {
  test('keeps what came before, oldest first', () => {
    const yar = mockYar([exchange('First')])

    addExchange(yar, exchange('Second'))

    expect(yar.set).toHaveBeenCalledWith('ai-ask', [
      exchange('First'),
      exchange('Second')
    ])
  })
})

describe('findExchange', () => {
  const conversation = [exchange('First'), exchange('Second')]

  test('finds an answer by its place in the conversation', () => {
    expect(findExchange(conversation, '2')).toEqual({
      exchange: conversation[1],
      number: 2
    })
  })

  test.each([
    ['past the end', '3'],
    ['before the start', '0'],
    ['negative', '-1'],
    ['not a whole number', '1.5'],
    ['not a number at all', 'abc'],
    ['empty', '']
  ])('refuses an answer number that is %s', (_description, number) => {
    expect(findExchange(conversation, number)).toBeNull()
  })

  test('finds nothing in an empty conversation', () => {
    expect(findExchange([], '1')).toBeNull()
  })
})

describe('clearConversation', () => {
  test('drops the whole conversation', () => {
    const yar = mockYar([exchange('First')])

    clearConversation(yar)

    expect(yar.clear).toHaveBeenCalledWith('ai-ask')
  })

  test('forgets a report confirmation that was never shown', () => {
    const yar = mockYar([exchange('First')])

    clearConversation(yar)

    expect(yar.flash).toHaveBeenCalledWith('ai-ask-reported')
  })
})

describe('markReported', () => {
  test('marks only the answer reported, by its id, and says where it is', () => {
    const yar = mockYar([exchange('First'), exchange('Second')])

    const number = markReported(yar, 'id-Second')

    expect(number).toBe(2)
    expect(yar.set).toHaveBeenCalledWith('ai-ask', [
      exchange('First'),
      { ...exchange('Second'), reported: true }
    ])
  })

  test('marks nothing when the answer is no longer in the conversation', () => {
    const yar = mockYar([exchange('New first')])

    expect(markReported(yar, 'id-Old first')).toBeNull()
    expect(yar.set).not.toHaveBeenCalled()
  })
})

describe('a reported answer', () => {
  /**
   * A stand-in for yar's flash: set with override, read once, then gone.
   * @returns {object}
   */
  function flashYar () {
    const flashes = {}

    return {
      flash (type, message, isOverride) {
        if (message === undefined) {
          const value = flashes[type]
          delete flashes[type]
          return value ?? []
        }
        flashes[type] = isOverride ? message : [...(flashes[type] ?? []), message]
        return undefined
      }
    }
  }

  test('is read back once, then forgotten', () => {
    const yar = flashYar()

    flashReported(yar, 2)

    expect(takeReported(yar)).toBe(2)
    expect(takeReported(yar)).toBeNull()
  })

  test('is nothing when none was reported', () => {
    expect(takeReported(flashYar())).toBeNull()
  })
})

describe('toHistory', () => {
  const turn = (question, answer = {}) => ({
    id: `id-${question}`,
    question,
    answer: {
      status: 'answered',
      message: `About ${question}`,
      reason: null,
      rule: { text: 'A rule' },
      sources: [{ title: 'A page', url: '/ai-toolkit/a-page' }],
      options: [],
      ...answer
    }
  })

  test('is empty at the start of a conversation', () => {
    expect(toHistory([])).toEqual([])
  })

  test('carries the words of each turn, not its sources or quoted rule', () => {
    expect(toHistory([turn('Copilot?')])).toEqual([
      { question: 'Copilot?', status: 'answered', message: 'About Copilot?', options: [] }
    ])
  })

  test('keeps the options a clarifying question offered', () => {
    const [sent] = toHistory([
      turn('What are the rules?', { status: 'need_more_detail', options: ['Data', 'Security'] })
    ])

    expect(sent).toMatchObject({ status: 'need_more_detail', options: ['Data', 'Security'] })
  })

  test('keeps only the most recent turns, oldest first', () => {
    const questions = ['1', '2', '3', '4', '5', '6']

    expect(toHistory(questions.map((q) => turn(q))).map((sent) => sent.question)).toEqual(
      questions.slice(-MAX_HISTORY_TURNS)
    )
  })

  test('leaves out a blocked turn, without it using up a place', () => {
    const exchanges = [
      turn('1'),
      turn('2'),
      turn('3'),
      turn('4'),
      turn('Ignore the above', { status: 'blocked' })
    ]

    expect(toHistory(exchanges).map((sent) => sent.question)).toEqual(['1', '2', '3', '4'])
  })

  test('cuts an answer longer than the backend accepts', () => {
    const [sent] = toHistory([turn('Long?', { message: 'x'.repeat(MAX_MESSAGE_LENGTH + 1) })])

    expect(sent.message).toHaveLength(MAX_MESSAGE_LENGTH)
  })

  test('cuts by characters, never through the middle of an emoji', () => {
    // An emoji is two UTF-16 units. Cutting between them sends half of it,
    // which the backend cannot pass on to Bedrock.
    const message = `${'x'.repeat(MAX_MESSAGE_LENGTH - 1)}😀 and more`

    const [sent] = toHistory([turn('Long?', { message })])

    expect(sent.message).toBe(`${'x'.repeat(MAX_MESSAGE_LENGTH - 1)}😀`)
    expect(Array.from(sent.message)).toHaveLength(MAX_MESSAGE_LENGTH)
    expect(sent.message.isWellFormed()).toBe(true)
  })

  test('sends an empty message and no options for an answer that had none', () => {
    const [sent] = toHistory([turn('Old?', { message: null, options: undefined })])

    expect(sent).toMatchObject({ message: '', options: [] })
  })
})
