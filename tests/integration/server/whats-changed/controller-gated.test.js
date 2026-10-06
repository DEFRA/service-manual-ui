/**
 * What's changed with its feature flag off, the default everywhere until an
 * environment opts in. Merging to main deploys, so the flag is all that keeps
 * the placeholder posts out of production: the routes must not exist, and
 * nothing may link to them.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'

import { statusCodes } from '../../../../src/server/common/constants/status-codes.js'

const listUrl = '/ai-toolkit/whats-changed'

describe("What's changed flag off (the default)", () => {
  let server

  beforeAll(async () => {
    vi.stubEnv('AI_TOOLKIT_WHATS_CHANGED_ENABLED', undefined)
    expect(process.env.AI_TOOLKIT_WHATS_CHANGED_ENABLED).toBeUndefined()
    vi.resetModules()
    const { createServer } = await import('../../../../src/server/server.js')
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  test.each([
    ['the list page', listUrl],
    ['a post', `${listUrl}/why-we-are-building-a-way-to-ask-the-toolkit`]
  ])('%s returns 404', async (_description, url) => {
    const { statusCode } = await server.inject(url)

    expect(statusCode).toBe(statusCodes.notFound)
  })

  test.each([
    ['the toolkit home page', '/ai-toolkit'],
    ['a guidance page', '/ai-toolkit/guidance/security']
  ])('%s does not link to it', async (_description, url) => {
    const { statusCode, result } = await server.inject(url)

    expect(statusCode).toBe(statusCodes.ok)
    expect(result).not.toContain(listUrl)
    expect(result).not.toContain('whats-changed-heading')
  })
})
