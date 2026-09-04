/**
 * Ask the toolkit with its feature flag on.
 *
 * featureFlags.askEnabled is off by default, so unlike the rest of the site
 * this page cannot be exercised by booting the server as-is. This file sets
 * AI_TOOLKIT_ASK_ENABLED=true, resets the module cache (config reads the
 * environment once, at import) and then imports the server, which keeps the
 * flagged-on state inside this file. controller-gated.test.js proves the
 * other direction.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'
import { statusCodes } from '../common/constants/status-codes.js'

const askUrl = '/ai-toolkit/ask'

describe('#askController', () => {
  let server
  let previousAskEnabled

  beforeAll(async () => {
    previousAskEnabled = process.env.AI_TOOLKIT_ASK_ENABLED
    process.env.AI_TOOLKIT_ASK_ENABLED = 'true'
    vi.resetModules()
    const { createServer } = await import('../server.js')
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
    if (previousAskEnabled === undefined) {
      delete process.env.AI_TOOLKIT_ASK_ENABLED
    } else {
      process.env.AI_TOOLKIT_ASK_ENABLED = previousAskEnabled
    }
    vi.resetModules()
  })

  describe(`GET ${askUrl}`, () => {
    test('returns 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: askUrl
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test.each([
      ['the page heading', 'Ask the toolkit'],
      ['what the page is for', 'Ask a question about using AI at Defra'],
      ['breadcrumbs', 'govuk-breadcrumbs'],
      ['a breadcrumb back to the toolkit', 'href="/ai-toolkit"']
    ])('renders %s', async (_description, expected) => {
      const { result } = await server.inject({
        method: 'GET',
        url: askUrl
      })

      expect(result).toEqual(expect.stringContaining(expected))
    })

    test.each([
      ['Deliver with AI', '/ai-toolkit/deliver-with-ai'],
      ['Find a tool', '/ai-toolkit/tools'],
      ['Use AI patterns', '/ai-toolkit/patterns'],
      ['See our projects', '/ai-toolkit/projects']
    ])(
      'carries the toolkit service navigation, including %s',
      async (_text, href) => {
        const { result } = await server.inject({
          method: 'GET',
          url: askUrl
        })

        expect(result).toEqual(expect.stringContaining(`href="${href}"`))
      }
    )

    test('marks itself as the current navigation item', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: askUrl
      })

      expect(result).toEqual(
        expect.stringContaining(`href="${askUrl}" aria-current="page"`)
      )
    })
  })

  describe('the navigation link on other toolkit pages', () => {
    test.each([
      ['the toolkit landing page', '/ai-toolkit'],
      ['a tools page', '/ai-toolkit/tools'],
      ['a guidance page', '/ai-toolkit/guidance/security']
    ])('%s links to Ask the toolkit', async (_description, url) => {
      const { result } = await server.inject({ method: 'GET', url })

      expect(result).toEqual(
        expect.stringContaining(`href="${askUrl}">Ask the toolkit</a>`)
      )
    })
  })
})
