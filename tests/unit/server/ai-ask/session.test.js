import { describe, test, expect, vi } from 'vitest'

import {
  getExchanges,
  addExchange,
  findExchange,
  clearConversation,
  flashReported,
  markReported,
  takeReported
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

describe('getExchanges', () => {
  test('starts empty', () => {
    expect(getExchanges(mockYar(undefined))).toEqual([])
  })

  test('returns what is stored', () => {
    const stored = [exchange('First')]

    expect(getExchanges(mockYar(stored))).toEqual(stored)
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
})

describe('markReported', () => {
  test('marks only the answer reported, keeping the rest of the conversation', () => {
    const yar = mockYar([exchange('First'), exchange('Second')])

    markReported(yar, 2)

    expect(yar.set).toHaveBeenCalledWith('ai-ask', [
      exchange('First'),
      { ...exchange('Second'), reported: true }
    ])
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
