import { vi } from 'vitest'
import { isEmailDomainAllowed } from '../email-allow-list.js'
import schema from './email-required.js'

vi.mock('../email-allow-list.js', () => ({
  isEmailDomainAllowed: vi.fn().mockReturnValue(true)
}))

describe('email-required schema', () => {
  describe('valid input', () => {
    it('should pass a valid email from an allowed domain', () => {
      const { value, error } = schema.validate('test@example.com')
      expect(error).toBeUndefined()
      expect(value).toBe('test@example.com')
    })

    it('should trim whitespace', () => {
      const { value, error } = schema.validate('  test@example.com  ')
      expect(error).toBeUndefined()
      expect(value).toBe('test@example.com')
    })
  })

  describe('invalid input', () => {
    it('should fail on empty string', () => {
      const { error } = schema.validate('')
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter an email address')
    })

    it('should fail on whitespace-only string', () => {
      const { error } = schema.validate('   ')
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter an email address')
    })

    it('should fail on invalid email format', () => {
      const { error } = schema.validate('not-an-email')
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a valid email address')
    })

    it('should fail on email missing @ symbol', () => {
      const { error } = schema.validate('testexample.com')
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a valid email address')
    })
  })

  describe('allow-list', () => {
    it('should fail with notAllowed message when domain is not allowed', () => {
      vi.mocked(isEmailDomainAllowed).mockReturnValueOnce(false)
      const { error } = schema.validate('user@gmail.com')
      expect(error).toBeDefined()
      expect(error.message).toBe(
        'Enter an email address from an approved organisation'
      )
    })

    it('should pass when domain is allowed', () => {
      vi.mocked(isEmailDomainAllowed).mockReturnValueOnce(true)
      const { error } = schema.validate('user@defra.gov.uk')
      expect(error).toBeUndefined()
    })
  })
})
