import format from './email-domain-array.js'

const { coerce, validate } = format

describe('email-domain-array format', () => {
  describe('coerce', () => {
    describe('when given a string', () => {
      it('splits on commas', () => {
        expect(coerce('defra.gov.uk,example.com')).toEqual(['defra.gov.uk', 'example.com'])
      })

      it('trims whitespace from each entry', () => {
        expect(coerce(' defra.gov.uk , example.com ')).toEqual(['defra.gov.uk', 'example.com'])
      })

      it('filters out blank entries', () => {
        expect(coerce('defra.gov.uk,,example.com')).toEqual(['defra.gov.uk', 'example.com'])
      })

      it('filters out whitespace-only entries', () => {
        expect(coerce('defra.gov.uk, ,example.com')).toEqual(['defra.gov.uk', 'example.com'])
      })

      it('returns an empty array for an empty string', () => {
        expect(coerce('')).toEqual([])
      })
    })

    describe('when given a non-string', () => {
      it('returns an array unchanged', () => {
        const arr = ['defra.gov.uk']
        expect(coerce(arr)).toBe(arr)
      })

      it('returns undefined unchanged', () => {
        expect(coerce(undefined)).toBeUndefined()
      })
    })
  })

  describe('validate', () => {
    it('accepts an empty array', () => {
      expect(() => validate([])).not.toThrow()
    })

    it('accepts an array of valid domains', () => {
      expect(() => validate(['defra.gov.uk', 'example.com'])).not.toThrow()
    })

    it('throws if the value is not an array', () => {
      expect(() => validate('defra.gov.uk')).toThrow(TypeError)
      expect(() => validate('defra.gov.uk')).toThrow('must be an array')
    })

    it('throws if any domain starts with a dot', () => {
      expect(() => validate(['.defra.gov.uk'])).toThrow(TypeError)
      expect(() => validate(['.defra.gov.uk'])).toThrow(
        'email domains must not start with a dot: .defra.gov.uk'
      )
    })

    it('reports all dotted domains in the error', () => {
      expect(() => validate(['.defra.gov.uk', '.example.com'])).toThrow(
        'email domains must not start with a dot: .defra.gov.uk, .example.com'
      )
    })

    it('only rejects dotted entries, not valid ones alongside them', () => {
      expect(() => validate(['defra.gov.uk', '.example.com'])).toThrow(
        'email domains must not start with a dot: .example.com'
      )
    })
  })
})
