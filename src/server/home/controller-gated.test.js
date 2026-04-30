/**
 * Home page and route registration tests with the AI digital toolkit gated off.
 *
 * The gate is config-driven: AI_TOOLKIT_ENABLED=false (or ENVIRONMENT=prod via
 * the convict default) hides the home tile and unregisters the /ai-playbook
 * routes. Convict reads env vars once at module import, so this file sets the
 * env var, resets the module cache, then dynamically imports the server. That
 * keeps the gated state isolated to this test file and leaves the rest of the
 * suite running with the default-on configuration.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'
import { statusCodes } from '../common/constants/status-codes.js'

describe('AI toolkit gated off', () => {
  let server

  beforeAll(async () => {
    process.env.AI_TOOLKIT_ENABLED = 'false'
    vi.resetModules()
    const { createServer } = await import('../server.js')
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
    delete process.env.AI_TOOLKIT_ENABLED
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
      expect(result).not.toEqual(expect.stringContaining('href="/ai-playbook"'))
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
    test('GET /ai-playbook returns 404', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-playbook'
      })

      expect(statusCode).toBe(statusCodes.notFound)
    })

    test('GET /ai-playbook/tools returns 404', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-playbook/tools'
      })

      expect(statusCode).toBe(statusCodes.notFound)
    })

    test('GET /ai-playbook/patterns returns 404', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-playbook/patterns'
      })

      expect(statusCode).toBe(statusCodes.notFound)
    })

    test('GET /ai-playbook/from-the-field returns 404', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/ai-playbook/from-the-field'
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
