import { config } from '../../../config/config.js'
import schema from './email-required.js'

describe('email-required schema', () => {
  let originalDomains

  beforeEach(() => {
    originalDomains = config.get('aiTriage.allowedEmailDomains')
  })

  afterEach(() => {
    config.set('aiTriage.allowedEmailDomains', originalDomains)
  })

  describe('valid input', () => {
    it('should pass a valid email from an allowed domain', () => {
      // vitest.setup.js seeds .example.com as allowed
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
    it('should fail with notAllowed message when domain is not in the allow list', () => {
      config.set('aiTriage.allowedEmailDomains', ['.defra.gov.uk'])
      const { error } = schema.validate('user@gmail.com')
      expect(error).toBeDefined()
      expect(error.message).toBe(
        'Enter an email address from an approved organisation'
      )
    })

    it('should fail when allow list is empty (deny all)', () => {
      config.set('aiTriage.allowedEmailDomains', [])
      const { error } = schema.validate('user@defra.gov.uk')
      expect(error).toBeDefined()
      expect(error.message).toBe(
        'Enter an email address from an approved organisation'
      )
    })
  })
})
