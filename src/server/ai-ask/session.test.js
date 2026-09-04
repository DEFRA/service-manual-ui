import { describe, test, expect, vi } from 'vitest'

import {
  getExchanges,
  addExchange,
  splitConversation,
  clearConversation
} from './session.js'

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

describe('#splitConversation', () => {
  test('has nothing to show for an empty conversation', () => {
    expect(splitConversation([])).toEqual({ latest: null, previous: [] })
  })

  test('a single exchange is the latest, with nothing earlier', () => {
    const only = exchange('Only')

    expect(splitConversation([only])).toEqual({ latest: only, previous: [] })
  })

  test('the newest leads and the rest follow, newest first', () => {
    const first = exchange('First')
    const second = exchange('Second')
    const third = exchange('Third')

    expect(splitConversation([first, second, third])).toEqual({
      latest: third,
      previous: [second, first]
    })
  })
})

describe('#clearConversation', () => {
  test('drops the whole conversation', () => {
    const yar = mockYar([exchange('First')])

    clearConversation(yar)

    expect(yar.clear).toHaveBeenCalledWith('ai-ask')
  })
})
