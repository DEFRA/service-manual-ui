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

  describe('internal service link interception', () => {
    test('should rewrite SharePoint links to interruption card', () => {
      const result = markdown(
        '[BA Toolkit](https://defra.sharepoint.com/teams/Team924/SitePages/BA-Toolkit.aspx)'
      )
      expect(result).toContain(
        'href="/interruption-card?targetUrl=https%3A%2F%2Fdefra.sharepoint.com%2Fteams%2FTeam924%2FSitePages%2FBA-Toolkit.aspx"'
      )
    })

    test('should rewrite Teams links to interruption card', () => {
      const result = markdown(
        '[Join channel](https://teams.microsoft.com/l/team/123)'
      )
      expect(result).toContain(
        'href="/interruption-card?targetUrl=https%3A%2F%2Fteams.microsoft.com%2Fl%2Fteam%2F123"'
      )
    })

    test('should not add target="_blank" to intercepted links', () => {
      const result = markdown('[Internal](https://defra.sharepoint.com/page)')
      expect(result).not.toContain('target="_blank"')
      expect(result).not.toContain('rel="noreferrer noopener"')
    })

    test('should not intercept non-internal external links', () => {
      const result = markdown('[GOV.UK](https://www.gov.uk/service-manual)')
      expect(result).not.toContain('/interruption-card')
      expect(result).toContain('href="https://www.gov.uk/service-manual"')
    })

    test('should rewrite CDP links to interruption card', () => {
      const result = markdown(
        '[CDP](https://portal.cdp-int.defra.cloud/documentation)'
      )
      expect(result).toContain('/interruption-card?targetUrl=')
      expect(result).toContain('portal.cdp-int.defra.cloud')
    })

    test('should rewrite Slack links to interruption card', () => {
      const result = markdown(
        '[#channel](https://defra-digital.slack.com/archives/C06HH978YJ3)'
      )
      expect(result).toContain('/interruption-card?targetUrl=')
      expect(result).toContain('defra-digital.slack.com')
    })

    test('should rewrite Jira links to interruption card', () => {
      const result = markdown(
        '[Tools Radar](https://eaflood.atlassian.net/jira/software/projects/TR)'
      )
      expect(result).toContain('/interruption-card?targetUrl=')
      expect(result).toContain('eaflood.atlassian.net')
    })

    test('should rewrite Mural links to interruption card', () => {
      const result = markdown(
        '[Template](https://app.mural.co/t/coredefra2548/template/123)'
      )
      expect(result).toContain('/interruption-card?targetUrl=')
      expect(result).toContain('app.mural.co')
    })

    test('should not intercept internal path links', () => {
      const result = markdown('[Page](/accessibility)')
      expect(result).not.toContain('/interruption-card')
      expect(result).toContain('href="/accessibility"')
    })
  })
})
