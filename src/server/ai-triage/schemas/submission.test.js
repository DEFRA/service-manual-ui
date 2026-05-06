import schema from './submission.js'

describe('submission schema', () => {
  const valid = {
    email: 'test@example.com',
    problem: 'A problem description',
    users: 'Some users',
    benefits: 'Some benefits',
    solutionAttempts: 'Some solution attempts'
  }

  describe('valid input', () => {
    test('should pass with all valid fields', () => {
      const { error } = schema.validate(valid)
      expect(error).toBeUndefined()
    })

    test('should trim whitespace from all string fields', () => {
      const { value, error } = schema.validate({
        email: '  test@example.com  ',
        problem: '  A problem  ',
        users: '  Some users  ',
        benefits: '  Some benefits  ',
        solutionAttempts: '  Some solution attempts  '
      })

      expect(error).toBeUndefined()
      expect(value.email).toBe('test@example.com')
      expect(value.problem).toBe('A problem')
      expect(value.users).toBe('Some users')
      expect(value.benefits).toBe('Some benefits'),
      expect(value.solutionAttempts).toBe('Some solution attempts')
    })
  })

  describe('email field', () => {
    test('should fail on missing email', () => {
      const { error } = schema.validate({ ...valid, email: undefined })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter an email address')
    })

    test('should fail on empty email', () => {
      const { error } = schema.validate({ ...valid, email: '' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter an email address')
    })

    test('should fail on invalid email format', () => {
      const { error } = schema.validate({ ...valid, email: 'not-an-email' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a valid email address')
    })
  })

  describe('problem field', () => {
    test('should fail on missing problem', () => {
      const { error } = schema.validate({ ...valid, problem: undefined })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the problem')
    })

    test('should fail on empty problem', () => {
      const { error } = schema.validate({ ...valid, problem: '' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the problem')
    })

    test('should fail on whitespace-only problem', () => {
      const { error } = schema.validate({ ...valid, problem: '   ' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the problem')
    })
  })

  describe('users field', () => {
    test('should fail on missing users', () => {
      const { error } = schema.validate({ ...valid, users: undefined })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the users')
    })

    test('should fail on empty users', () => {
      const { error } = schema.validate({ ...valid, users: '' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the users')
    })

    test('should fail on whitespace-only users', () => {
      const { error } = schema.validate({ ...valid, users: '   ' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the users')
    })
  })

  describe('benefits field', () => {
    test('should fail on missing benefits', () => {
      const { error } = schema.validate({ ...valid, benefits: undefined })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the benefits')
    })

    test('should fail on empty benefits', () => {
      const { error } = schema.validate({ ...valid, benefits: '' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the benefits')
    })

    test('should fail on whitespace-only benefits', () => {
      const { error } = schema.validate({ ...valid, benefits: '   ' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the benefits')
    })
  })

  describe('solutionAttempts field', () => {
    test('should fail on missing solutionAttempts', () => {
      const { error } = schema.validate({ ...valid, solutionAttempts: undefined })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the solution attempts')
    })

    test('should fail on empty solutionAttempts', () => {
      const { error } = schema.validate({ ...valid, solutionAttempts: '' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the solution attempts')
    })

    test('should fail on whitespace-only solutionAttempts', () => {
      const { error } = schema.validate({ ...valid, solutionAttempts: '   ' })
      expect(error).toBeDefined()
      expect(error.message).toBe('Enter a description of the solution attempts')
    })
  })
})
