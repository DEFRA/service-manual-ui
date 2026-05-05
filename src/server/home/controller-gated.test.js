/**
 * Home page and route registration tests with AI content gated off.
 *
 * The gate is config-driven: aiContent.enabled defaults to false unless
 * ENABLE_AI_CONTENT=true is set. The wider test suite has it set to true via
 * vitest.setup.js so the default-on tests pass. This file unsets the env var,
 * resets the module cache, then dynamically imports the server. That keeps the
 * gated state isolated to this file and leaves the rest of the suite running
 * with content visible.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'
import { statusCodes } from '../common/constants/status-codes.js'

describe('AI content gated off', () => {
  let server
  let previousEnableAiContent

  beforeAll(async () => {
    previousEnableAiContent = process.env.ENABLE_AI_CONTENT
    delete process.env.ENABLE_AI_CONTENT
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

  describe('Home page', () => {
    test('still returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('hides the AI digital toolkit tile', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).not.toEqual(expect.stringContaining('AI digital toolkit'))
      expect(result).not.toEqual(expect.stringContaining('href="/ai-toolkit"'))
    })

    test('still renders the other tiles', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('Digital service manual'))
      expect(result).toEqual(expect.stringContaining('Delivery groups'))
    })

    test('renders only two tiles (down from three)', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      const tileMatches = result.match(/class="defra-tile"/g)
      expect(tileMatches).not.toBeNull()
      expect(tileMatches.length).toBe(2)
    })

    test('still renders the "Coming soon" panel', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('Coming soon'))
    })
  })

  describe('Route registration', () => {
    test('GET /ai-toolkit returns 404', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit'
      })

      expect(statusCode).toBe(statusCodes.notFound)
    })

    test('GET /ai-toolkit/tools returns 404', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/tools'
      })

      expect(statusCode).toBe(statusCodes.notFound)
    })

    test('GET /ai-toolkit/patterns returns 404', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/patterns'
      })

      expect(statusCode).toBe(statusCodes.notFound)
    })

    test('GET /ai-toolkit/from-the-field returns 404', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-toolkit/from-the-field'
      })

      expect(statusCode).toBe(statusCodes.notFound)
    })

    test('non-toolkit markdown routes are unaffected', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/accessibility'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })
  })
})
