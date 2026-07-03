import { vi } from 'vitest'

vi.mock('../../config/config.js', () => ({
  config: { get: vi.fn() }
}))

describe('isEmailDomainAllowed', () => {
  let isEmailDomainAllowed

  async function setup (domains) {
    vi.resetModules()
    const { config } = await import('../../config/config.js')
    config.get.mockReturnValue(domains)
    ;({ isEmailDomainAllowed } = await import('./email-allow-list.js'))
  }

  describe('empty list', () => {
    beforeEach(async () => setup([]))

    test('denies any email when list is empty', () => {
      expect(isEmailDomainAllowed('user@defra.gov.uk')).toBe(false)
    })

    test('denies even if domain looks valid', () => {
      expect(isEmailDomainAllowed('user@example.com')).toBe(false)
    })
  })

  describe('exact domain matching', () => {
    beforeEach(async () => setup(['defra.gov.uk', 'supplier-co.com']))

    test('allows email whose domain exactly matches an entry', () => {
      expect(isEmailDomainAllowed('user@defra.gov.uk')).toBe(true)
    })

    test('allows email whose domain exactly matches another entry', () => {
      expect(isEmailDomainAllowed('user@supplier-co.com')).toBe(true)
    })

    test('rejects subdomain of an allowed apex (exact match only)', () => {
      expect(isEmailDomainAllowed('user@team.defra.gov.uk')).toBe(false)
    })

    test('rejects a domain not in the list', () => {
      expect(isEmailDomainAllowed('user@gmail.com')).toBe(false)
    })
  })

  describe('case insensitivity', () => {
    beforeEach(async () => setup(['defra.gov.uk']))

    test('allows uppercase email domain', () => {
      expect(isEmailDomainAllowed('USER@DEFRA.GOV.UK')).toBe(true)
    })

    test('allows mixed-case email domain', () => {
      expect(isEmailDomainAllowed('User@Defra.Gov.Uk')).toBe(true)
    })
  })

  describe('entry normalisation', () => {
    test('entry with surrounding whitespace is trimmed', async () => {
      await setup([' defra.gov.uk '])
      expect(isEmailDomainAllowed('user@defra.gov.uk')).toBe(true)
    })

    test('empty/blank entries in the list are ignored', async () => {
      await setup(['', ' ', 'defra.gov.uk'])
      expect(isEmailDomainAllowed('user@defra.gov.uk')).toBe(true)
    })
  })
})
