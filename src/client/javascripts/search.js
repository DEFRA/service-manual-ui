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
 * Initialise search autocomplete
 */
export async function initSearch() {
  const container = document.getElementById('search-autocomplete-container')
  const existingInput = document.getElementById('defra-search')

  if (!container || !existingInput) {
    return
  }

  // Fetch the search index
  const indexData = await fetchSearchIndex()

  if (indexData.length === 0) {
    // If no index, keep the basic search form working
    return
  }

  // Get any existing value from the input
  const existingValue = existingInput.value

  // Clear the container (remove the existing input)
  container.innerHTML = ''

  // Initialise accessible-autocomplete
  accessibleAutocomplete({
    element: container,
    id: 'defra-search',
    name: 'q',
    placeholder: 'Search',
    showNoOptionsFound: false,
    minLength: MIN_QUERY_LENGTH,
    defaultValue: existingValue,
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
        // Find the full result object to get the section title
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

      // Find the matching result and navigate to it
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
  })

  // Apply our custom styling class to the generated input
  const autocompleteInput = container.querySelector('input')
  if (autocompleteInput) {
    autocompleteInput.classList.add('defra-header-search__input')
    autocompleteInput.setAttribute('type', 'search')
  }
}
