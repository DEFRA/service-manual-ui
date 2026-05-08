import { describe, it, beforeEach, expect, vi } from 'vitest'
import * as sessionService from './session.js'

describe('sessionService', () => {
  let mockYar

  beforeEach(() => {
    mockYar = {
      get: vi.fn(),
      set: vi.fn()
    }
  })

  describe('getAnswer', () => {
    it('should return the stored value for a key', () => {
      mockYar.get.mockReturnValue('test@example.com')

      const result = sessionService.getAnswer(mockYar, 'answer-question-1')
      expect(result).toBe('test@example.com')
      expect(mockYar.get).toHaveBeenCalledWith('answer-question-1')
    })

    it('should return null if the key is not set', () => {
      mockYar.get.mockReturnValue(null)

      const result = sessionService.getAnswer(mockYar, 'answer-question-1')
      expect(result).toBeNull()
    })

    it('should return null if yar.get returns undefined', () => {
      mockYar.get.mockReturnValue(undefined)

      const result = sessionService.getAnswer(mockYar, 'answer-question-1')
      expect(result).toBeNull()
    })
  })

  describe('setAnswer', () => {
    it('should call yar.set with the key and value', () => {
      sessionService.setAnswer(mockYar, 'answer-question-1', 'test@example.com')
      expect(mockYar.set).toHaveBeenCalledWith(
        'answer-question-1',
        'test@example.com'
      )
    })
  })

  describe('getSessionData', () => {
    it('returns a map of slug to stored value for each slug', () => {
      mockYar.get.mockImplementation((key) => {
        if (key === 'answer-question-1') {
          return 'test@example.com'
        }
        if (key === 'answer-question-2') {
          return 'Some problem'
        }
        return null
      })

      const result = sessionService.getSessionData(mockYar, [
        'question-1',
        'question-2',
        'question-3'
      ])

      expect(result).toEqual({
        'question-1': 'test@example.com',
        'question-2': 'Some problem',
        'question-3': null
      })
    })

    it('returns null for unanswered slugs', () => {
      mockYar.get.mockReturnValue(undefined)

      const result = sessionService.getSessionData(mockYar, ['question-1'])
      expect(result).toEqual({ 'question-1': null })
    })

    it('returns an empty object when given no slugs', () => {
      const result = sessionService.getSessionData(mockYar, [])
      expect(result).toEqual({})
    })
  })
})
