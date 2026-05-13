import * as sessionService from './session.js'

describe('sessionService', () => {
  let mockYar

  beforeEach(() => {
    mockYar = {
      get: vi.fn(),
      set: vi.fn(),
      clear: vi.fn()
    }
  })

  describe('getAnswer', () => {
    test('should return the stored value for a slug', () => {
      mockYar.get.mockReturnValue({
        'question-1': { answer: 'test@example.com' }
      })

      const result = sessionService.getAnswer(mockYar, 'question-1')
      expect(result).toEqual({ answer: 'test@example.com' })
      expect(mockYar.get).toHaveBeenCalledWith('ai-triage')
    })

    test('should return null if the slug is not stored', () => {
      mockYar.get.mockReturnValue({ 'question-1': { answer: 'test' } })

      const result = sessionService.getAnswer(mockYar, 'question-2')
      expect(result).toBeNull()
    })

    test('should return null if session data is empty', () => {
      mockYar.get.mockReturnValue(null)

      const result = sessionService.getAnswer(mockYar, 'question-1')
      expect(result).toBeNull()
    })

    test('should return null if yar.get returns undefined', () => {
      mockYar.get.mockReturnValue(undefined)

      const result = sessionService.getAnswer(mockYar, 'question-1')
      expect(result).toBeNull()
    })
  })

  describe('setAnswer', () => {
    test('should store answer under the slug in session object', () => {
      mockYar.get.mockReturnValue({
        'question-1': { answer: 'existing' }
      })

      sessionService.setAnswer(mockYar, 'question-2', { answer: 'new' })

      expect(mockYar.set).toHaveBeenCalledWith('ai-triage', {
        'question-1': { answer: 'existing' },
        'question-2': { answer: 'new' }
      })
    })

    test('should create session object when none exists', () => {
      mockYar.get.mockReturnValue(null)

      sessionService.setAnswer(mockYar, 'question-1', {
        answer: 'test@example.com'
      })

      expect(mockYar.set).toHaveBeenCalledWith('ai-triage', {
        'question-1': { answer: 'test@example.com' }
      })
    })

    test('should overwrite existing answer for the same slug', () => {
      mockYar.get.mockReturnValue({
        'question-1': { answer: 'old' }
      })

      sessionService.setAnswer(mockYar, 'question-1', { answer: 'updated' })

      expect(mockYar.set).toHaveBeenCalledWith('ai-triage', {
        'question-1': { answer: 'updated' }
      })
    })
  })

  describe('getTriageSessionData', () => {
    test('should return all stored triage data', () => {
      const data = {
        'question-1': { answer: 'test@example.com' },
        'question-2': { answer: 'Some problem' }
      }
      mockYar.get.mockReturnValue(data)

      const result = sessionService.getTriageSessionData(mockYar)
      expect(result).toEqual(data)
      expect(mockYar.get).toHaveBeenCalledWith('ai-triage')
    })

    test('should return empty object when no data stored', () => {
      mockYar.get.mockReturnValue(null)

      const result = sessionService.getTriageSessionData(mockYar)
      expect(result).toEqual({})
    })
  })

  describe('clearTriageSession', () => {
    test('should clear the session with a single call', () => {
      sessionService.clearTriageSession(mockYar)

      expect(mockYar.clear).toHaveBeenCalledTimes(1)
      expect(mockYar.clear).toHaveBeenCalledWith('ai-triage')
    })
  })
  describe('setReference', () => {
    test('should store the reference under its own key', () => {
      sessionService.setReference(mockYar, 'AICE-26-TEST01')
      expect(mockYar.set).toHaveBeenCalledWith(
        'ai-triage-reference',
        'AICE-26-TEST01'
      )
    })
  })

  describe('getReference', () => {
    test('should return the stored reference', () => {
      mockYar.get.mockReturnValue('AICE-26-TEST01')
      const result = sessionService.getReference(mockYar)
      expect(result).toBe('AICE-26-TEST01')
      expect(mockYar.get).toHaveBeenCalledWith('ai-triage-reference')
    })

    test('should return null when no reference is stored', () => {
      mockYar.get.mockReturnValue(null)
      const result = sessionService.getReference(mockYar)
      expect(result).toBeNull()
    })
  })

  describe('clearReference', () => {
    test('should clear the reference key', () => {
      sessionService.clearReference(mockYar)
      expect(mockYar.clear).toHaveBeenCalledWith('ai-triage-reference')
    })
  })
})
