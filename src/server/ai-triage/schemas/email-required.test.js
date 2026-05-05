import schema from './email-required.js'

describe('email-required schema', () => {
  describe('valid input', () => {
    it('should pass a valid email', () => {
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
})
