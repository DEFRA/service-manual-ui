import accessibleAutocomplete from 'accessible-autocomplete'

/**
 * Search scoring weights
 */
const SCORE_WEIGHTS = {
  TITLE_MATCH: 100,
  SECTION_MATCH: 50,
  DESCRIPTION_MATCH: 30,
  EXACT_PHRASE_BOOST: 50
}

const MIN_QUERY_LENGTH = 2
const MAX_SUGGESTIONS = 5

/**
 * Search index cache
 * @type {Array|null}
 */
let searchIndex = null

/**
 * Fetch the search index from the API
 * @returns {Promise<Array>} Search index array
 */
async function fetchSearchIndex() {
  if (searchIndex) {
    return searchIndex
  }

  try {
    const response = await fetch('/api/search/index')
    if (!response.ok) {
      throw new Error('Failed to fetch search index')
    }
    searchIndex = await response.json()
    return searchIndex
  } catch (error) {
    console.error('Error fetching search index:', error)
    return []
  }
}

/**
 * Calculate match score for a single entry against query terms
 * @param {Object} entry - Search index entry
 * @param {string[]} queryTerms - Array of search terms
 * @param {string} queryLower - Full query in lowercase
 * @returns {{score: number, matched: boolean}} Score and match status
 */
function calculateEntryScore(entry, queryTerms, queryLower) {
  const titleLower = entry.title.toLowerCase()
  const descriptionLower = (entry.description || '').toLowerCase()
  const sectionLower = (entry.sectionTitle || '').toLowerCase()

  let score = 0
  let matched = false

  for (const term of queryTerms) {
    if (titleLower.includes(term)) {
      score += SCORE_WEIGHTS.TITLE_MATCH
      matched = true
    }
    if (sectionLower.includes(term)) {
      score += SCORE_WEIGHTS.SECTION_MATCH
      matched = true
    }
    if (descriptionLower.includes(term)) {
      score += SCORE_WEIGHTS.DESCRIPTION_MATCH
      matched = true
    }
  }

  // Boost exact phrase matches
  if (titleLower.includes(queryLower)) {
    score += SCORE_WEIGHTS.EXACT_PHRASE_BOOST
  }

  return { score, matched }
}

/**
 * Search the index for matching results
 * @param {string} query - Search query
 * @param {Array} searchData - Search index
 * @returns {Array} Matching results
 */
function searchInIndex(query, searchData) {
  if (!query || query.length < MIN_QUERY_LENGTH) {
    return []
  }

  const queryLower = query.toLowerCase().trim()
  const queryTerms = queryLower.split(/\s+/).filter(Boolean)

  if (queryTerms.length === 0) {
    return []
  }

  const results = []

  for (const entry of searchData) {
    const { score, matched } = calculateEntryScore(
      entry,
      queryTerms,
      queryLower
    )

    if (matched) {
      results.push({ ...entry, score })
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score)

  return results.slice(0, MAX_SUGGESTIONS)
}

/**
 * Prepare container for autocomplete by preserving label and clearing content
 * @param {HTMLElement} container - The container element
 * @returns {HTMLElement|null} The preserved label element
 */
function prepareContainer(container) {
  const existingLabel = container.querySelector('label')
  container.innerHTML = ''
  if (existingLabel) {
    container.appendChild(existingLabel)
  }
  return existingLabel
}

/**
 * Build autocomplete configuration object
 * @param {HTMLElement} container - The container element
 * @param {string} defaultValue - Initial input value
 * @param {Array} indexData - Search index data
 * @returns {Object} Autocomplete configuration
 */
function buildAutocompleteConfig(container, defaultValue, indexData) {
  return {
    element: container,
    id: 'defra-search',
    name: 'q',
    placeholder: 'Search',
    showNoOptionsFound: false,
    minLength: MIN_QUERY_LENGTH,
    defaultValue,
    source: (query, populateResults) => {
      const results = searchInIndex(query, indexData)
      populateResults(results.map((r) => r.title))
    },
    templates: {
      inputValue: (result) => result,
      suggestion: (result) => {
        if (!result) {
          return ''
        }
        const match = indexData.find((item) => item.title === result)
        if (match?.sectionTitle) {
          return `<span class="defra-search-suggestion__title">${result}</span><span class="defra-search-suggestion__section">${match.sectionTitle}</span>`
        }
        return result
      }
    },
    onConfirm: (selected) => {
      if (!selected) {
        return
      }
      const match = indexData.find((item) => item.title === selected)
      if (match?.url) {
        globalThis.location.href = match.url
      }
    },
    tStatusQueryTooShort: (minQueryLength) =>
      `Type ${minQueryLength} or more characters for suggestions`,
    tStatusNoResults: () => 'No suggestions found',
    tStatusSelectedOption: (selectedOption, length, position) =>
      `${selectedOption} (${position + 1} of ${length}) is highlighted`,
    tStatusResults: (length, contentSelectedOption) => {
      const suffix = length === 1 ? 'suggestion' : 'suggestions'
      return `${length} ${suffix} available. ${contentSelectedOption}`
    }
  }
}

/**
 * Configure the autocomplete input element with custom styling and label handling
 * @param {HTMLElement} container - The container element
 */
function configureAutocompleteInput(container) {
  const autocompleteInput = container.querySelector('input')
  if (!autocompleteInput) {
    return
  }

  autocompleteInput.classList.add('defra-header-search__input')
  autocompleteInput.setAttribute('type', 'search')

  const label = container.querySelector('label')
  if (label) {
    const updateLabelVisibility = () => {
      label.classList.toggle(
        'defra-header-search__label--hidden',
        Boolean(autocompleteInput.value)
      )
    }
    autocompleteInput.addEventListener('input', updateLabelVisibility)
    autocompleteInput.addEventListener('change', updateLabelVisibility)
    updateLabelVisibility()
  }
}

/**
 * Initialise search autocomplete
 */
export async function initSearch() {
  const container = document.getElementById('search-autocomplete-container')
  const existingInput = document.getElementById('defra-search')

  if (!container || !existingInput) {
    return
  }

  const indexData = await fetchSearchIndex()
  if (indexData.length === 0) {
    return
  }

  const existingValue = existingInput.value
  prepareContainer(container)

  const config = buildAutocompleteConfig(container, existingValue, indexData)
  accessibleAutocomplete(config)

  configureAutocompleteInput(container)
}
