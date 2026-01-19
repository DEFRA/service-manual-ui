import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('#searchController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('GET /search', () => {
    test('should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/search'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('should render search results page', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/search'
      })

      expect(result).toEqual(expect.stringContaining('Search results'))
    })

    test('should show prompt when no query provided', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/search'
      })

      expect(result).toEqual(
        expect.stringContaining('Enter a search term to find content')
      )
    })

    test('should show results count when query matches content', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/search?q=accessibility'
      })

      expect(result).toEqual(expect.stringContaining('results found for'))
      expect(result).toEqual(expect.stringContaining('accessibility'))
    })

    test('should show no results message when query has no matches', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/search?q=xyznonexistent123'
      })

      expect(result).toEqual(expect.stringContaining('No results found'))
    })

    test('should display search result links', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/search?q=service'
      })

      expect(result).toEqual(expect.stringContaining('href="/'))
      expect(result).toEqual(
        expect.stringContaining('defra-search-results__item')
      )
    })

    test('should include breadcrumbs', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/search?q=test'
      })

      expect(result).toEqual(expect.stringContaining('govuk-breadcrumbs'))
      expect(result).toEqual(
        expect.stringContaining('Defra digital service manual')
      )
    })
  })

  describe('GET /api/search/suggestions', () => {
    test('should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/api/search/suggestions?q=service'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('should return JSON array', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/suggestions?q=accessibility'
      })

      const suggestions = JSON.parse(response.payload)

      expect(Array.isArray(suggestions)).toBe(true)
    })

    test('should return suggestions with title and url', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/suggestions?q=accessibility'
      })

      const suggestions = JSON.parse(response.payload)

      expect(suggestions.length).toBeGreaterThan(0)
      expect(suggestions[0]).toHaveProperty('title')
      expect(suggestions[0]).toHaveProperty('url')
    })

    test('should return maximum 5 suggestions', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/suggestions?q=service'
      })

      const suggestions = JSON.parse(response.payload)

      expect(suggestions.length).toBeLessThanOrEqual(5)
    })

    test('should return empty array for empty query', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/suggestions?q='
      })

      const suggestions = JSON.parse(response.payload)

      expect(suggestions).toEqual([])
    })

    test('should return empty array when q parameter is missing', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/suggestions'
      })

      const suggestions = JSON.parse(response.payload)

      expect(suggestions).toEqual([])
    })
  })

  describe('GET /api/search/index', () => {
    test('should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/api/search/index'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('should return JSON array of indexed content', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/index'
      })

      const index = JSON.parse(response.payload)

      expect(Array.isArray(index)).toBe(true)
      expect(index.length).toBeGreaterThan(0)
    })

    test('should return simplified index entries', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/index'
      })

      const index = JSON.parse(response.payload)
      const entry = index[0]

      expect(entry).toHaveProperty('title')
      expect(entry).toHaveProperty('description')
      expect(entry).toHaveProperty('sectionTitle')
      expect(entry).toHaveProperty('url')
      expect(entry).not.toHaveProperty('content')
      expect(entry).not.toHaveProperty('headings')
    })

    test('should include all markdown pages in the index', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/index'
      })

      const index = JSON.parse(response.payload)

      const hasAccessibility = index.some((e) =>
        e.url.includes('/accessibility')
      )
      const hasServiceStandard = index.some((e) =>
        e.url.includes('/service-standard')
      )

      expect(hasAccessibility).toBe(true)
      expect(hasServiceStandard).toBe(true)
    })
  })
})
