/**
 * What's changed with its feature flag on.
 *
 * featureFlags.whatsChangedEnabled is off by default, so this file sets
 * AI_TOOLKIT_WHATS_CHANGED_ENABLED=true and resets the module cache (config
 * reads the environment once, at import) before importing the server.
 * controller-gated.test.js proves the other direction. Expected titles come
 * from the real entries, so the tests hold when the placeholder posts are
 * replaced.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'

import { statusCodes } from '../../../../src/server/common/constants/status-codes.js'

const listUrl = '/ai-toolkit/whats-changed'
const navItem = `href="${listUrl}"`

// Nunjucks escapes quotes and apostrophes in titles.
function escape (text) {
  return text.replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

describe("What's changed flag on", () => {
  let server
  let entries

  beforeAll(async () => {
    vi.stubEnv('AI_TOOLKIT_WHATS_CHANGED_ENABLED', 'true')
    vi.resetModules()
    const { createServer } = await import('../../../../src/server/server.js')
    ;({ publishedEntries: entries } = await import(
      '../../../../src/server/whats-changed/entries.js'
    ))
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  test('the list page links to every entry', async () => {
    const { statusCode, result } = await server.inject(listUrl)

    expect(statusCode).toBe(statusCodes.ok)
    for (const entry of entries()) {
      expect(result).toContain(`href="${entry.url}"`)
    }
  })

  test('a post shows its title and a link back to the list', async () => {
    const entry = entries().find((e) => e.hasPage)
    const { statusCode, result } = await server.inject(entry.url)

    expect(statusCode).toBe(statusCodes.ok)
    expect(result).toContain(escape(entry.title))
    expect(result).toContain(`<a class="govuk-breadcrumbs__link" href="${listUrl}">`)
  })

  test('posts link to the older and newer post', async () => {
    const [newer, older] = entries().filter((e) => e.hasPage)
    const { result } = await server.inject(newer.url)

    expect(result).toContain(`href="${older.url}"`)
    expect(result).toContain('govuk-pagination__prev')
    expect(result).not.toContain('govuk-pagination__next')
  })

  test('a post that does not exist returns 404', async () => {
    const { statusCode } = await server.inject(`${listUrl}/no-such-post`)

    expect(statusCode).toBe(statusCodes.notFound)
  })

  test('the toolkit home page shows the newest entries', async () => {
    const { result } = await server.inject('/ai-toolkit')

    expect(result).toContain('id="whats-changed-heading"')
    expect(result).toContain(`href="${entries()[0].url}"`)
    expect(result).toContain("See everything that's changed")
  })

  test('the toolkit navigation does not list it, to keep the menu to the main tasks', async () => {
    const { result } = await server.inject('/ai-toolkit')
    const menu = result.slice(result.indexOf('id="service-navigation-list"'), result.indexOf('</nav>', result.indexOf('id="service-navigation-list"')))

    expect(menu).not.toContain(navItem)
  })
})
