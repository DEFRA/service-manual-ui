/**
 * Tests for the 301 redirects from old /ai-playbook URLs to /ai-toolkit.
 *
 * The default suite runs with ENABLE_AI_CONTENT=true (vitest.setup.js), so
 * the redirect routes are registered and we can hit them. A second describe
 * block unsets the env var, resets the module cache, and re-imports the
 * server to verify the redirects also disappear when AI content is gated.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'
import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('301 redirects (AI content enabled)', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('GET /ai-playbook redirects to /ai-toolkit with 301', async () => {
    const { statusCode, headers } = await server.inject({
      method: 'GET',
      url: '/ai-playbook'
    })

    expect(statusCode).toBe(statusCodes.movedPermanently)
    expect(headers.location).toBe('/ai-toolkit')
  })

  test('GET /ai-playbook/tools redirects to /ai-toolkit/tools with 301', async () => {
    const { statusCode, headers } = await server.inject({
      method: 'GET',
      url: '/ai-playbook/tools'
    })

    expect(statusCode).toBe(statusCodes.movedPermanently)
    expect(headers.location).toBe('/ai-toolkit/tools')
  })

  test('GET /ai-playbook/patterns/ai-assistant redirects with the deeper path preserved', async () => {
    const { statusCode, headers } = await server.inject({
      method: 'GET',
      url: '/ai-playbook/patterns/ai-assistant'
    })

    expect(statusCode).toBe(statusCodes.movedPermanently)
    expect(headers.location).toBe('/ai-toolkit/patterns/ai-assistant')
  })

  test('GET /ai-playbook/case-studies/nrf-alpha redirects with the deeper path preserved', async () => {
    const { statusCode, headers } = await server.inject({
      method: 'GET',
      url: '/ai-playbook/case-studies/nrf-alpha'
    })

    expect(statusCode).toBe(statusCodes.movedPermanently)
    expect(headers.location).toBe('/ai-toolkit/case-studies/nrf-alpha')
  })

  test('GET /ai-playbook/triage/question-1 redirects', async () => {
    const { statusCode, headers } = await server.inject({
      method: 'GET',
      url: '/ai-playbook/triage/question-1'
    })

    expect(statusCode).toBe(statusCodes.movedPermanently)
    expect(headers.location).toBe('/ai-toolkit/triage/question-1')
  })

  test('GET /ai-toolkit returns the toolkit page (not redirected back)', async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: '/ai-toolkit'
    })

    expect(statusCode).toBe(statusCodes.ok)
  })
})

describe('301 redirects (AI content gated off)', () => {
  let server
  let previousEnableAiContent

  beforeAll(async () => {
    previousEnableAiContent = process.env.ENABLE_AI_CONTENT
    delete process.env.ENABLE_AI_CONTENT
    vi.resetModules()
    const { createServer: createServerGated } = await import('../server.js')
    server = await createServerGated()
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

  test('GET /ai-playbook returns 404 (no redirect leak)', async () => {
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
})
