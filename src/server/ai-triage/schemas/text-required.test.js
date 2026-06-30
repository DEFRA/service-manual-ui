import schema from './text-required.js'

import { MAX_TEXT_LENGTH } from '../constants.js'

describe('text-required schema', () => {
  describe('valid input', () => {
    it('should pass non-empty text', () => {
      const { value, error } = schema.validate('some text')
      expect(error).toBeUndefined()
      expect(value).toBe('some text')
    })

    it('should pass text at the maximum length', () => {
      const text = 'x'.repeat(MAX_TEXT_LENGTH)
      const { value, error } = schema.validate(text)
      expect(error).toBeUndefined()
      expect(value).toBe(text)
    })

    it('should trim whitespace', () => {
      const { value, error } = schema.validate('  some text  ')
      expect(error).toBeUndefined()
      expect(value).toBe('some text')
    })

    it('should pass single character', () => {
      const { value, error } = schema.validate('x')
      expect(error).toBeUndefined()
      expect(value).toBe('x')
    })
  })

  describe('invalid input', () => {
    it('should fail on empty string', () => {
      const { error } = schema.validate('')
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter an answer')
    })

    it('should fail on whitespace-only string', () => {
      const { error } = schema.validate('   ')
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter an answer')
    })

    it('should fail when text exceeds the maximum length', () => {
      const { error } = schema.validate('x'.repeat(MAX_TEXT_LENGTH + 1))
      expect(error).toBeDefined()
      expect(error.message).toBe(
        `Answer must be ${MAX_TEXT_LENGTH} characters or fewer`
      )
    })
  })
})
