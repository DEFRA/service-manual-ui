import { describe, test, expect } from 'vitest'

import { markdown } from './markdown.js'

describe('#markdown', () => {
  describe('basic rendering', () => {
    test('should return empty string for null content', () => {
      expect(markdown(null)).toBe('')
    })

    test('should return empty string for undefined content', () => {
      expect(markdown(undefined)).toBe('')
    })

    test('should return empty string for empty string', () => {
      expect(markdown('')).toBe('')
    })

    test('should render basic markdown', () => {
      const result = markdown('Hello world')
      expect(result).toContain('<p')
      expect(result).toContain('Hello world')
    })
  })

  describe('horizontal rule rendering', () => {
    test('should render hr with GOV.UK classes', () => {
      const result = markdown('---')
      expect(result).toContain('govuk-section-break')
      expect(result).toContain('govuk-section-break--visible')
      expect(result).toContain('govuk-section-break--xl')
    })
  })

  describe('information callout rendering', () => {
    test('should render information callout with govuk-inset-text class', () => {
      const result = markdown('^ This is an information callout ^')
      expect(result).toContain('<div class="govuk-inset-text">')
      expect(result).toContain('This is an information callout')
      expect(result).toContain('</div>')
    })

    test('should render information callout with links', () => {
      const result = markdown(
        '^ Check the [documentation](https://example.com) for more info ^'
      )
      expect(result).toContain('<div class="govuk-inset-text">')
      expect(result).toContain('documentation')
      expect(result).toContain('</div>')
    })
  })

  describe('warning callout rendering', () => {
    test('should render warning callout with govuk-warning-text class', () => {
      const result = markdown('% This is a warning callout %')
      expect(result).toContain('<div class="govuk-warning-text">')
      expect(result).toContain('govuk-warning-text__icon')
      expect(result).toContain('govuk-warning-text__text')
      expect(result).toContain('govuk-visually-hidden')
      expect(result).toContain('Warning')
      expect(result).toContain('This is a warning callout')
    })
  })

  describe('external link rendering', () => {
    test('should add target="_blank" to external https links', () => {
      const result = markdown('[External](https://example.com)')
      expect(result).toContain('target="_blank"')
      expect(result).toContain('rel="noreferrer noopener"')
    })

    test('should add target="_blank" to external http links', () => {
      const result = markdown('[External](http://example.com)')
      expect(result).toContain('target="_blank"')
      expect(result).toContain('rel="noreferrer noopener"')
    })

    test('should not add target="_blank" to internal links', () => {
      const result = markdown('[Internal](/some-page)')
      expect(result).not.toContain('target="_blank"')
      expect(result).not.toContain('rel="noreferrer noopener"')
    })

    test('should not add target="_blank" to relative links', () => {
      const result = markdown('[Relative](some-page)')
      expect(result).not.toContain('target="_blank"')
    })
  })
})
