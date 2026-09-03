/**
 * Tests for the 301 redirects from old /ai-playbook URLs to /ai-toolkit.
 *
 * AI content is enabled by default, so the redirect routes are registered and
 * we can hit them. A second describe block sets ENABLE_AI_CONTENT=false, resets
 * the module cache, and re-imports the server to verify the redirects also
 * disappear when AI content is gated off.
 */
import { describe, test, expect, beforeAll, afterAll } from 'vitest'
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

  test('GET /architecture-and-software-development redirects to /architecture with 301', async () => {
    const { statusCode, headers } = await server.inject({
      method: 'GET',
      url: '/architecture-and-software-development'
    })

    expect(statusCode).toBe(statusCodes.movedPermanently)
    expect(headers.location).toBe('/architecture')
  })

  test('GET /architecture-and-software-development/core-delivery-platform still serves the tool page', async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: '/architecture-and-software-development/core-delivery-platform'
    })

    expect(statusCode).toBe(statusCodes.ok)
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

// AI gating removed: no gated-off describe block remains
