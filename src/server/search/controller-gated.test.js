/**
 * Search controller tests with AI content gated off.
 *
 * Mirrors src/server/home/controller-gated.test.js: set ENABLE_AI_CONTENT=false,
 * reset modules, then dynamically import the server so route registration and
 * the search index both pick up the gated state.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'
import { statusCodes } from '../common/constants/status-codes.js'

describe('Search with AI content gated off', () => {
  let server
  let previousEnableAiContent

  beforeAll(async () => {
    previousEnableAiContent = process.env.ENABLE_AI_CONTENT
    process.env.ENABLE_AI_CONTENT = 'false'
    vi.resetModules()
    const { createServer } = await import('../server.js')
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
    if (previousEnableAiContent === undefined) {
      delete process.env.ENABLE_AI_CONTENT
    } else {
      process.env.ENABLE_AI_CONTENT = previousEnableAiContent
    }
    vi.resetModules()
  })

  describe('GET /api/search/index', () => {
    test('returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/api/search/index'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('does not include any /ai-toolkit entries', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/index'
      })

      const index = JSON.parse(response.payload)

      expect(index.length).toBeGreaterThan(0)
      expect(index.some((e) => e.url.startsWith('/ai-toolkit'))).toBe(false)
    })

    test('still includes non-toolkit pages', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/index'
      })

      const index = JSON.parse(response.payload)

      expect(index.some((e) => e.url === '/accessibility')).toBe(true)
    })
  })

  describe('GET /api/search/suggestions', () => {
    test('does not surface /ai-toolkit results', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/search/suggestions?q=prompt'
      })

      const suggestions = JSON.parse(response.payload)

      expect(suggestions.every((s) => !s.url.startsWith('/ai-toolkit'))).toBe(
        true
      )
    })
  })

  describe('GET /search', () => {
    test('does not link to any /ai-toolkit page', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/search?q=prompt'
      })

      expect(result).not.toEqual(expect.stringContaining('href="/ai-toolkit'))
    })
  })
})
