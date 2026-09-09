import { describe, test, expect, vi } from 'vitest'

import {
  getExchanges,
  addExchange,
  toThread,
  findExchange,
  clearConversation
} from '../../../../src/server/ai-ask/session.js'

const exchange = (question) => ({ question, answer: { sources: [] } })

/**
 * @param {Array<object>} [stored]
 * @returns {object} A stand-in for the yar session
 */
function mockYar (stored) {
  return {
    get: vi.fn(() => stored),
    set: vi.fn(),
    clear: vi.fn()
  }
}

describe('#getExchanges', () => {
  test('starts empty', () => {
    expect(getExchanges(mockYar(undefined))).toEqual([])
  })

  test('returns what is stored', () => {
    const stored = [exchange('First')]

    expect(getExchanges(mockYar(stored))).toEqual(stored)
  })
})

describe('#addExchange', () => {
  test('keeps what came before, oldest first', () => {
    const yar = mockYar([exchange('First')])

    addExchange(yar, exchange('Second'))

    expect(yar.set).toHaveBeenCalledWith('ai-ask', [
      exchange('First'),
      exchange('Second')
    ])
  })
})

describe('#toThread', () => {
  test('has nothing to list for an empty conversation', () => {
    expect(toThread([], 1)).toEqual([])
  })

  test('numbers the questions in the order they were asked, each with an address', () => {
    const thread = toThread([exchange('First'), exchange('Second')], 2)

    expect(thread).toEqual([
      {
        number: 1,
        question: 'First',
        href: '/ai-toolkit/ask/answers/1',
        isCurrent: false
      },
      {
        number: 2,
        question: 'Second',
        href: '/ai-toolkit/ask/answers/2',
        isCurrent: true
      }
    ])
  })

  test('marks nothing current when reading none of them', () => {
    const thread = toThread([exchange('First')])

    expect(thread[0].isCurrent).toBe(false)
  })
})

describe('#findExchange', () => {
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

describe('#clearConversation', () => {
  test('drops the whole conversation', () => {
    const yar = mockYar([exchange('First')])

    clearConversation(yar)

    expect(yar.clear).toHaveBeenCalledWith('ai-ask')
  })
})
