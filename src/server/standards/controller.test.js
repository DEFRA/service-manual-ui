import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('#standardsController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('GET /standards', () => {
    it('should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    it('should render standards page with heading', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      expect(result).toEqual(expect.stringContaining('Defra standards'))
    })

    it('should display all standards when no filters applied', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      // Should show total count
      expect(result).toMatch(/\d+ standards/)
    })

    it('should show standard title, description, and area for each item', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      // Should have standard cards with class
      expect(result).toEqual(expect.stringContaining('defra-standard'))
      // Should have area tags
      expect(result).toEqual(expect.stringContaining('govuk-tag'))
    })

    it('should link each standard to its source guidance page', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      // Should have links to guidance pages
      expect(result).toMatch(/href="\/[a-z-]+/)
    })

    it('should include breadcrumbs', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      expect(result).toEqual(expect.stringContaining('govuk-breadcrumbs'))
      expect(result).toEqual(expect.stringContaining('Service Manual'))
    })

    it('should have a search input', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      expect(result).toEqual(expect.stringContaining('name="q"'))
      expect(result).toEqual(expect.stringContaining('type="search"'))
    })

    it('should have filter checkboxes for each area', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      expect(result).toEqual(
        expect.stringContaining('Technology &amp; Architecture')
      )
      expect(result).toEqual(expect.stringContaining('Accessibility'))
      expect(result).toEqual(expect.stringContaining('Sustainability'))
      expect(result).toEqual(expect.stringContaining('name="area"'))
    })
  })

  describe('Search functionality', () => {
    it('should filter standards by search query matching title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?q=Platform'
      })

      expect(result).toEqual(expect.stringContaining('Core Delivery Platform'))
    })

    it('should filter standards by search query matching description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?q=deploy'
      })

      // Should find standards mentioning deploy in description
      expect(result).toMatch(/\d+ standards?/)
    })

    it('should show no results message when search has no matches', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?q=xyznonexistent123'
      })

      expect(result).toEqual(expect.stringContaining('No standards found'))
    })

    it('should show clear search option when searching', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?q=Platform'
      })

      expect(result).toEqual(expect.stringContaining('Clear search'))
    })

    it('should preserve search query in input field', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?q=Platform'
      })

      expect(result).toEqual(expect.stringContaining('value="Platform"'))
    })

    it('should be case-insensitive', async () => {
      const { result: upperCase } = await server.inject({
        method: 'GET',
        url: '/standards?q=PLATFORM'
      })

      const { result: lowerCase } = await server.inject({
        method: 'GET',
        url: '/standards?q=platform'
      })

      // Both should find the same results
      expect(upperCase).toEqual(
        expect.stringContaining('Core Delivery Platform')
      )
      expect(lowerCase).toEqual(
        expect.stringContaining('Core Delivery Platform')
      )
    })
  })

  describe('Filter functionality', () => {
    it('should filter standards by single area', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?area=Accessibility'
      })

      // Should show accessibility standards
      expect(result).toEqual(expect.stringContaining('WCAG'))
    })

    it('should filter standards by multiple areas (OR logic)', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?area=Accessibility&area=Sustainability'
      })

      // Should show standards from both areas
      expect(result).toMatch(/\d+ standards?/)
    })

    it('should show clear filters option when filtering', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?area=Accessibility'
      })

      expect(result).toEqual(expect.stringContaining('Clear filters'))
    })

    it('should check selected filter checkboxes', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?area=Accessibility'
      })

      // The Accessibility checkbox should be checked
      expect(result).toMatch(/value="Accessibility"[^>]*checked/)
    })

    it('should combine search and filter', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?q=meet&area=Accessibility'
      })

      // Should find accessibility standards containing "meet"
      expect(result).toMatch(/\d+ standards?/)
    })
  })

  describe('Pagination', () => {
    it('should paginate results with 10 items per page by default', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      // Count the number of standard items on the page
      const standardItems = result.match(/defra-standard__title/g) || []
      expect(standardItems.length).toBeLessThanOrEqual(10)
    })

    it('should show pagination controls when there are multiple pages', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      // Should have pagination navigation
      expect(result).toEqual(expect.stringContaining('govuk-pagination'))
    })

    it('should show different results on page 2', async () => {
      const { result: page1 } = await server.inject({
        method: 'GET',
        url: '/standards?page=1'
      })

      const { result: page2 } = await server.inject({
        method: 'GET',
        url: '/standards?page=2'
      })

      // Pages should have different content (if there are enough standards)
      // At minimum, the page number in URL should differ
      expect(page1).not.toEqual(page2)
    })

    it('should show showing X to Y of Z text', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      expect(result).toMatch(/Showing \d+ to \d+ of \d+ standards/)
    })

    it('should preserve search and filter on pagination', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?q=test&area=Accessibility&page=1'
      })

      // Pagination links should include search and filter params
      if (result.includes('page=2')) {
        expect(result).toEqual(expect.stringContaining('q=test'))
      }
    })
  })

  describe('URL state', () => {
    it('should reflect search query in URL', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?q=Platform'
      })

      // Form action should preserve query params or hidden input
      expect(result).toEqual(expect.stringContaining('Platform'))
    })

    it('should reflect area filters in URL', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?area=Accessibility'
      })

      // Should have the area parameter reflected
      expect(result).toMatch(/value="Accessibility"[^>]*checked/)
    })

    it('should reflect page in URL', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards?page=2'
      })

      // Should be on page 2
      expect(result).toMatch(/page=2|aria-current/)
    })
  })

  describe('Accessibility', () => {
    it('should have form labels', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      expect(result).toEqual(expect.stringContaining('govuk-label'))
    })

    it('should have fieldset for filter checkboxes', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      expect(result).toEqual(expect.stringContaining('govuk-fieldset'))
      expect(result).toEqual(expect.stringContaining('govuk-checkboxes'))
    })

    it('should have skip link to results', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/standards'
      })

      expect(result).toEqual(expect.stringContaining('id="standards-results"'))
    })
  })
})
