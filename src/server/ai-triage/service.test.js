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
    it('should return the stored value for a slug', () => {
      mockYar.get.mockReturnValue({
        'question-1': { answer: 'test@example.com' }
      })

      const result = sessionService.getAnswer(mockYar, 'question-1')
      expect(result).toEqual({ answer: 'test@example.com' })
      expect(mockYar.get).toHaveBeenCalledWith('ai-triage')
    })

    it('should return null if the slug is not stored', () => {
      mockYar.get.mockReturnValue(null)

      const result = sessionService.getAnswer(mockYar, 'question-1')
      expect(result).toBeNull()
    })

    it('should return null if yar.get returns undefined', () => {
      mockYar.get.mockReturnValue(undefined)

      const result = sessionService.getAnswer(mockYar, 'question-1')
      expect(result).toBeNull()
    })
  })

  describe('setAnswer', () => {
    it('should store answer under the slug in session object', () => {
      mockYar.get.mockReturnValue(null)

      sessionService.setAnswer(mockYar, 'question-1', {
        answer: 'test@example.com'
      })

      expect(mockYar.set).toHaveBeenCalledWith('ai-triage', {
        'question-1': { answer: 'test@example.com' }
      })
    })
  })

  describe('getTriageSessionData', () => {
    it('returns all stored triage data', () => {
      mockYar.get.mockReturnValue({
        'question-1': { answer: 'test@example.com' },
        'question-2': { answer: 'Some problem' }
      })

      const result = sessionService.getTriageSessionData(mockYar)

      expect(result).toEqual({
        'question-1': { answer: 'test@example.com' },
        'question-2': { answer: 'Some problem' }
      })
    })

    it('returns empty object when no data stored', () => {
      mockYar.get.mockReturnValue(undefined)

      const result = sessionService.getTriageSessionData(mockYar)
      expect(result).toEqual({})
    })
  })
})
