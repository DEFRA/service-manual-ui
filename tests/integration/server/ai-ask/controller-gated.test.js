/**
 * Ask the toolkit with its feature flag off.
 *
 * This is the test that matters: merging to main deploys, so the flag is the
 * only thing between unfinished work and production. The route must not exist
 * rather than exist and hide its contents.
 *
 * Two ways to be off, both covered here:
 *
 * - featureFlags.askEnabled unset, which is the default everywhere until an
 *   environment opts in.
 * - aiContent.enabled false, which hides the whole AI digital toolkit. Ask the
 *   toolkit answers only from toolkit content, so it goes with it even when
 *   its own flag is on.
 *
 * Both reset the module cache before importing the server, because config
 * reads the environment once, at import.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'
import { statusCodes } from '../../../../src/server/common/constants/status-codes.js'

const askUrl = '/ai-toolkit/ask'

describe('Ask the toolkit flag off (the default)', () => {
  let server
  beforeAll(async () => {
    vi.stubEnv('AI_TOOLKIT_ASK_ENABLED', undefined)
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

  test(`GET ${askUrl} returns 404`, async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: askUrl
    })

    expect(statusCode).toBe(statusCodes.notFound)
  })

  test('the rest of the AI digital toolkit is unaffected', async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: '/ai-toolkit'
    })

    expect(statusCode).toBe(statusCodes.ok)
  })

  test.each([
    ['the toolkit landing page', '/ai-toolkit'],
    ['a tools page', '/ai-toolkit/tools'],
    ['a guidance page', '/ai-toolkit/guidance/security']
  ])('%s does not link to it', async (_description, url) => {
    const { result } = await server.inject({ method: 'GET', url })

    expect(result).not.toEqual(expect.stringContaining(askUrl))
    expect(result).not.toEqual(expect.stringContaining('Ask the toolkit'))
  })

  test('the rest of the toolkit navigation is unchanged', async () => {
    const { result } = await server.inject({
      method: 'GET',
      url: '/ai-toolkit'
    })

    expect(result).toEqual(
      expect.stringContaining('href="/ai-toolkit/deliver-with-ai"')
    )
    expect(result).toEqual(expect.stringContaining('href="/ai-toolkit/tools"'))
  })
})

describe('AI content off, Ask the toolkit flag on', () => {
  let server
  beforeAll(async () => {
    vi.stubEnv('AI_TOOLKIT_ASK_ENABLED', 'true')
    vi.stubEnv('ENABLE_AI_CONTENT', 'false')
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

  test(`GET ${askUrl} returns 404`, async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: askUrl
    })

    expect(statusCode).toBe(statusCodes.notFound)
  })
})
