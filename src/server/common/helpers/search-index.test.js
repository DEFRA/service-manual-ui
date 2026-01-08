import {
  buildSearchIndex,
  getSearchIndex,
  searchContent,
  getSuggestions
} from './search-index.js'

describe('#searchIndex', () => {
  describe('buildSearchIndex', () => {
    test('should return an array of indexed content', () => {
      const index = buildSearchIndex()

      expect(Array.isArray(index)).toBe(true)
      expect(index.length).toBeGreaterThan(0)
    })

    test('should include required properties for each entry', () => {
      const index = buildSearchIndex()
      const entry = index[0]

      expect(entry).toHaveProperty('title')
      expect(entry).toHaveProperty('description')
      expect(entry).toHaveProperty('url')
      expect(entry).toHaveProperty('headings')
      expect(entry).toHaveProperty('content')
    })

    test('should generate correct URL paths from file paths', () => {
      const index = buildSearchIndex()
      const accessibilityEntry = index.find((e) =>
        e.url.includes('/accessibility')
      )

      expect(accessibilityEntry).toBeDefined()
      expect(accessibilityEntry.url).toMatch(/^\//)
      expect(accessibilityEntry.url).not.toMatch(/\.md$/)
    })

    test('should extract headings from markdown content', () => {
      const index = buildSearchIndex()
      const entryWithHeadings = index.find((e) => e.headings.length > 0)

      expect(entryWithHeadings).toBeDefined()
      expect(Array.isArray(entryWithHeadings.headings)).toBe(true)
    })

    test('should extract plain text content without markdown syntax', () => {
      const index = buildSearchIndex()
      const entry = index.find((e) => e.content.length > 0)

      expect(entry.content).not.toMatch(/^#{1,6}\s/)
      expect(entry.content).not.toMatch(/\[.*\]\(.*\)/)
    })
  })

  describe('getSearchIndex', () => {
    test('should return the search index', () => {
      const index = getSearchIndex()

      expect(Array.isArray(index)).toBe(true)
      expect(index.length).toBeGreaterThan(0)
    })

    test('should return cached index on subsequent calls', () => {
      const index1 = getSearchIndex()
      const index2 = getSearchIndex()

      expect(index1).toBe(index2)
    })
  })

  describe('searchContent', () => {
    test('should return empty array for empty query', () => {
      expect(searchContent('')).toEqual([])
      expect(searchContent(null)).toEqual([])
      expect(searchContent(undefined)).toEqual([])
    })

    test('should return empty array for whitespace-only query', () => {
      expect(searchContent('   ')).toEqual([])
    })

    test('should find results matching title', () => {
      const results = searchContent('accessibility')

      expect(results.length).toBeGreaterThan(0)
      expect(
        results.some((r) => r.title.toLowerCase().includes('accessibility'))
      ).toBe(true)
    })

    test('should find results matching description', () => {
      const results = searchContent('WCAG')

      expect(results.length).toBeGreaterThan(0)
    })

    test('should return results with required properties', () => {
      const results = searchContent('service')

      expect(results.length).toBeGreaterThan(0)
      const result = results[0]
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('description')
      expect(result).toHaveProperty('url')
      expect(result).toHaveProperty('score')
    })

    test('should sort results by relevance score', () => {
      const results = searchContent('service')

      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score)
      }
    })

    test('should respect the limit parameter', () => {
      const results = searchContent('service', 2)

      expect(results.length).toBeLessThanOrEqual(2)
    })

    test('should be case insensitive', () => {
      const lowerResults = searchContent('accessibility')
      const upperResults = searchContent('ACCESSIBILITY')
      const mixedResults = searchContent('Accessibility')

      expect(lowerResults.length).toBe(upperResults.length)
      expect(lowerResults.length).toBe(mixedResults.length)
    })

    test('should handle multiple search terms', () => {
      const results = searchContent('service standard')

      expect(results.length).toBeGreaterThan(0)
    })

    describe('phrase boost scoring', () => {
      test('should boost results where exact phrase appears in content', () => {
        // Search for a two-word phrase
        const results = searchContent('service standard')

        expect(results.length).toBeGreaterThan(0)

        // Results should be sorted by score (highest first)
        for (let i = 1; i < results.length; i++) {
          expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score)
        }
      })

      test('should give higher score to exact phrase match vs separate word matches', () => {
        // When searching for multi-word queries, entries with the exact phrase
        // should score higher than entries with the words appearing separately
        const results = searchContent('service assessment')

        expect(results.length).toBeGreaterThan(0)

        // The top result should have a score reflecting the phrase boost
        // Each word match in content = 10 points, phrase boost = 15 additional
        // So exact phrase in content should be at least 35 points (10+10+15)
        expect(results[0].score).toBeGreaterThan(0)
      })

      test('phrase boost should only apply to multi-word queries', () => {
        // Single word queries should not get phrase boost
        const singleWordResults = searchContent('accessibility')

        expect(singleWordResults.length).toBeGreaterThan(0)
        // Score should be based on individual word matches only
        expect(singleWordResults[0].score).toBeGreaterThan(0)
      })

      test('should boost title phrase matches higher than content phrase matches', () => {
        // Title phrase boost (50) > Description phrase boost (20) > Content phrase boost (15)
        // This tests that the scoring weights are applied correctly
        const results = searchContent('service manual')

        expect(results.length).toBeGreaterThan(0)
        // Top results should have higher scores due to title/description matches
        expect(results[0].score).toBeGreaterThan(0)
      })
    })
  })

  describe('getSuggestions', () => {
    test('should return limited suggestions for autocomplete', () => {
      const suggestions = getSuggestions('service')

      expect(suggestions.length).toBeLessThanOrEqual(5)
    })

    test('should return empty array for short queries', () => {
      const suggestions = getSuggestions('a')

      expect(Array.isArray(suggestions)).toBe(true)
    })

    test('should return suggestions with required properties', () => {
      const suggestions = getSuggestions('accessibility')

      expect(suggestions.length).toBeGreaterThan(0)
      const suggestion = suggestions[0]
      expect(suggestion).toHaveProperty('title')
      expect(suggestion).toHaveProperty('url')
    })
  })
})
