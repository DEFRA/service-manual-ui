/**
 * @vitest-environment jsdom
 */

import { vi, beforeEach, afterEach } from 'vitest'

// Mock accessible-autocomplete before importing search.js
vi.mock('accessible-autocomplete', () => ({
  default: vi.fn()
}))

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('initSearch', () => {
  let initSearch
  let accessibleAutocomplete

  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks()

    // Reset modules to get fresh imports
    vi.resetModules()

    // Import after mocking
    const searchModule = await import('./search.js')
    initSearch = searchModule.initSearch

    const autocompleteModule = await import('accessible-autocomplete')
    accessibleAutocomplete = autocompleteModule.default

    // Setup default DOM
    document.body.innerHTML = `
      <form class="defra-header-search" role="search" action="/search" method="get">
        <div class="defra-header-search__wrapper" id="search-autocomplete-container">
          <label class="govuk-visually-hidden" for="defra-search">Search the manual</label>
          <input
            class="govuk-input defra-header-search__input"
            id="defra-search"
            name="q"
            type="search"
            placeholder="Search"
            autocomplete="off">
        </div>
        <button class="defra-header-search__button" type="submit">
          <span class="govuk-visually-hidden">Search</span>
        </button>
      </form>
    `

    // Default successful fetch response
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            title: 'Accessibility',
            description: 'Make your service accessible',
            sectionTitle: 'Service Standard',
            url: '/accessibility'
          },
          {
            title: 'Service assessments',
            description: 'How to book an assessment',
            sectionTitle: '',
            url: '/service-assessments'
          }
        ])
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  test('should fetch search index on initialisation', async () => {
    await initSearch()

    expect(mockFetch).toHaveBeenCalledWith('/api/search/index')
  })

  test('should initialise accessible-autocomplete when index loads', async () => {
    await initSearch()

    expect(accessibleAutocomplete).toHaveBeenCalled()
  })

  test('should configure autocomplete with correct options', async () => {
    await initSearch()

    const callArgs = accessibleAutocomplete.mock.calls[0][0]

    expect(callArgs.id).toBe('defra-search')
    expect(callArgs.name).toBe('q')
    expect(callArgs.minLength).toBe(2)
    expect(callArgs.showNoOptionsFound).toBe(false)
    expect(typeof callArgs.source).toBe('function')
    expect(typeof callArgs.onConfirm).toBe('function')
  })

  test('should not initialise when container element is missing', async () => {
    document.body.innerHTML = ''

    await initSearch()

    expect(accessibleAutocomplete).not.toHaveBeenCalled()
  })

  test('should not initialise when input element is missing', async () => {
    document.body.innerHTML = `
      <div id="search-autocomplete-container"></div>
    `

    await initSearch()

    expect(accessibleAutocomplete).not.toHaveBeenCalled()
  })

  test('should handle fetch error gracefully', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    await expect(initSearch()).resolves.not.toThrow()
    expect(accessibleAutocomplete).not.toHaveBeenCalled()
  })

  test('should handle non-ok response gracefully', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500
    })

    await expect(initSearch()).resolves.not.toThrow()
    expect(accessibleAutocomplete).not.toHaveBeenCalled()
  })

  test('should preserve existing input value as defaultValue', async () => {
    const input = document.getElementById('defra-search')
    input.value = 'existing query'

    await initSearch()

    const callArgs = accessibleAutocomplete.mock.calls[0][0]
    expect(callArgs.defaultValue).toBe('existing query')
  })

  test('should clear container before initialising autocomplete', async () => {
    await initSearch()

    const container = document.getElementById('search-autocomplete-container')
    expect(container.querySelector('#defra-search')).toBeNull()
  })

  describe('source function', () => {
    test('should filter results based on query', async () => {
      await initSearch()

      const sourceFunction = accessibleAutocomplete.mock.calls[0][0].source
      const populateResults = vi.fn()

      sourceFunction('access', populateResults)

      expect(populateResults).toHaveBeenCalled()
      const results = populateResults.mock.calls[0][0]
      expect(results).toContain('Accessibility')
    })

    test('should return empty array for short queries', async () => {
      await initSearch()

      const sourceFunction = accessibleAutocomplete.mock.calls[0][0].source
      const populateResults = vi.fn()

      sourceFunction('a', populateResults)

      expect(populateResults).toHaveBeenCalledWith([])
    })

    test('should return empty array for empty query', async () => {
      await initSearch()

      const sourceFunction = accessibleAutocomplete.mock.calls[0][0].source
      const populateResults = vi.fn()

      sourceFunction('', populateResults)

      expect(populateResults).toHaveBeenCalledWith([])
    })
  })

  describe('onConfirm callback', () => {
    test('should navigate to selected result URL', async () => {
      // Mock globalThis.location
      const locationMock = { href: '' }
      Object.defineProperty(globalThis, 'location', {
        value: locationMock,
        writable: true,
        configurable: true
      })

      await initSearch()

      const onConfirm = accessibleAutocomplete.mock.calls[0][0].onConfirm

      onConfirm('Accessibility')

      expect(locationMock.href).toBe('/accessibility')
    })

    test('should not navigate when selection is null', async () => {
      const locationMock = { href: '/original' }
      Object.defineProperty(globalThis, 'location', {
        value: locationMock,
        writable: true,
        configurable: true
      })

      await initSearch()

      const onConfirm = accessibleAutocomplete.mock.calls[0][0].onConfirm

      onConfirm(null)

      expect(locationMock.href).toBe('/original')
    })

    test('should not navigate when selection not found in index', async () => {
      const locationMock = { href: '/original' }
      Object.defineProperty(globalThis, 'location', {
        value: locationMock,
        writable: true,
        configurable: true
      })

      await initSearch()

      const onConfirm = accessibleAutocomplete.mock.calls[0][0].onConfirm

      onConfirm('Non-existent page')

      expect(locationMock.href).toBe('/original')
    })
  })

  describe('templates', () => {
    test('should provide suggestion template', async () => {
      await initSearch()

      const templates = accessibleAutocomplete.mock.calls[0][0].templates

      expect(templates).toHaveProperty('suggestion')
      expect(typeof templates.suggestion).toBe('function')
    })

    test('should provide inputValue template', async () => {
      await initSearch()

      const templates = accessibleAutocomplete.mock.calls[0][0].templates

      expect(templates).toHaveProperty('inputValue')
      expect(typeof templates.inputValue).toBe('function')
    })

    test('suggestion template should include section title when available', async () => {
      await initSearch()

      const templates = accessibleAutocomplete.mock.calls[0][0].templates
      const html = templates.suggestion('Accessibility')

      expect(html).toContain('Accessibility')
      expect(html).toContain('Service Standard')
      expect(html).toContain('defra-search-suggestion__section')
    })

    test('suggestion template should handle empty result', async () => {
      await initSearch()

      const templates = accessibleAutocomplete.mock.calls[0][0].templates
      const html = templates.suggestion('')

      expect(html).toBe('')
    })

    test('inputValue template should return the result as-is', async () => {
      await initSearch()

      const templates = accessibleAutocomplete.mock.calls[0][0].templates
      const value = templates.inputValue('Test value')

      expect(value).toBe('Test value')
    })
  })

  describe('accessibility messages', () => {
    test('should provide custom status messages', async () => {
      await initSearch()

      const callArgs = accessibleAutocomplete.mock.calls[0][0]

      expect(typeof callArgs.tStatusQueryTooShort).toBe('function')
      expect(typeof callArgs.tStatusNoResults).toBe('function')
      expect(typeof callArgs.tStatusSelectedOption).toBe('function')
      expect(typeof callArgs.tStatusResults).toBe('function')
    })

    test('tStatusQueryTooShort should return helpful message', async () => {
      await initSearch()

      const tStatusQueryTooShort =
        accessibleAutocomplete.mock.calls[0][0].tStatusQueryTooShort
      const message = tStatusQueryTooShort(2)

      expect(message).toContain('2')
      expect(message).toContain('characters')
    })

    test('tStatusResults should handle singular and plural', async () => {
      await initSearch()

      const tStatusResults =
        accessibleAutocomplete.mock.calls[0][0].tStatusResults

      const singleResult = tStatusResults(1, '')
      const multipleResults = tStatusResults(5, '')

      expect(singleResult).toContain('1')
      expect(singleResult).toContain('suggestion')
      expect(multipleResults).toContain('5')
      expect(multipleResults).toContain('suggestions')
    })
  })
})
