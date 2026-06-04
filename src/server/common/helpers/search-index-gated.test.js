/**
 * Search index tests with AI content gated off.
 *
 * aiContent.enabled defaults to true, so the default suite indexes everything.
 * This file sets ENABLE_AI_CONTENT=false, resets the module cache (to drop both
 * the cached index and the cached config) and dynamically imports the helper,
 * mirroring the pattern used by src/server/home/controller-gated.test.js.
 */
import { describe, test, expect, beforeAll, afterAll, vi } from 'vitest'

describe('Search index with AI content gated off', () => {
  let buildSearchIndex
  let searchContent
  let getSuggestions
  let previousEnableAiContent

  beforeAll(async () => {
    previousEnableAiContent = process.env.ENABLE_AI_CONTENT
    process.env.ENABLE_AI_CONTENT = 'false'
    vi.resetModules()
    const mod = await import('./search-index.js')
    buildSearchIndex = mod.buildSearchIndex
    searchContent = mod.searchContent
    getSuggestions = mod.getSuggestions
  })

  afterAll(() => {
    if (previousEnableAiContent === undefined) {
      delete process.env.ENABLE_AI_CONTENT
    } else {
      process.env.ENABLE_AI_CONTENT = previousEnableAiContent
    }
    vi.resetModules()
  })

  test('buildSearchIndex excludes /ai-toolkit pages', () => {
    const index = buildSearchIndex()

    expect(index.length).toBeGreaterThan(0)
    expect(index.some((e) => e.url.startsWith('/ai-toolkit'))).toBe(false)
  })

  test('buildSearchIndex still includes non-toolkit pages', () => {
    const index = buildSearchIndex()

    expect(index.some((e) => e.url === '/accessibility')).toBe(true)
  })

  test('searchContent does not return /ai-toolkit results', () => {
    const results = searchContent('prompt')

    expect(results.every((r) => !r.url.startsWith('/ai-toolkit'))).toBe(true)
  })

  test('getSuggestions does not surface /ai-toolkit results', () => {
    const suggestions = getSuggestions('prompt')

    expect(suggestions.every((s) => !s.url.startsWith('/ai-toolkit'))).toBe(
      true
    )
  })
})
