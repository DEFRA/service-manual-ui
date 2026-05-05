import { describe, it, beforeEach, expect, vi } from 'vitest'
import * as sessionService from './service.js'

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

  describe('getAnswers', () => {
    it('returns an array of slug/answer pairs for each slug', () => {
      mockYar.get.mockImplementation((key) => {
        if (key === 'answer-question-1') return 'test@example.com'
        if (key === 'answer-question-2') return 'Some problem'
        return null
      })

      const result = sessionService.getAnswers(mockYar, [
        'question-1',
        'question-2',
        'question-3'
      ])

      expect(result).toEqual([
        { slug: 'question-1', answer: 'test@example.com' },
        { slug: 'question-2', answer: 'Some problem' },
        { slug: 'question-3', answer: null }
      ])
    })

    it('returns null for unanswered slugs', () => {
      mockYar.get.mockReturnValue(undefined)

      const result = sessionService.getAnswers(mockYar, ['question-1'])
      expect(result).toEqual([{ slug: 'question-1', answer: null }])
    })

    it('returns an empty array when given no slugs', () => {
      const result = sessionService.getAnswers(mockYar, [])
      expect(result).toEqual([])
    })
  })
})
