import accessibleAutocomplete from 'accessible-autocomplete'

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
 * Search the index for matching results
 * @param {string} query - Search query
 * @param {Array} index - Search index
 * @returns {Array} Matching results
 */
function searchInIndex(query, index) {
  if (!query || query.length < 2) {
    return []
  }

  const queryLower = query.toLowerCase().trim()
  const queryTerms = queryLower.split(/\s+/).filter(Boolean)

  if (queryTerms.length === 0) {
    return []
  }

  const results = []

  for (const entry of index) {
    const titleLower = entry.title.toLowerCase()
    const descriptionLower = (entry.description || '').toLowerCase()
    const sectionLower = (entry.sectionTitle || '').toLowerCase()

    let score = 0
    let matched = false

    for (const term of queryTerms) {
      if (titleLower.includes(term)) {
        score += 100
        matched = true
      }
      if (sectionLower.includes(term)) {
        score += 50
        matched = true
      }
      if (descriptionLower.includes(term)) {
        score += 30
        matched = true
      }
    }

    // Boost exact phrase matches
    if (titleLower.includes(queryLower)) {
      score += 50
    }

    if (matched) {
      results.push({ ...entry, score })
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score)

  return results.slice(0, 5)
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
  const index = await fetchSearchIndex()

  if (index.length === 0) {
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
    minLength: 2,
    defaultValue: existingValue,
    source: (query, populateResults) => {
      const results = searchInIndex(query, index)
      populateResults(results.map((r) => r.title))
    },
    templates: {
      inputValue: (result) => result,
      suggestion: (result) => {
        if (!result) return ''
        // Find the full result object to get the section title
        const match = index.find((item) => item.title === result)
        if (match && match.sectionTitle) {
          return `<span class="defra-search-suggestion__title">${result}</span><span class="defra-search-suggestion__section">${match.sectionTitle}</span>`
        }
        return result
      }
    },
    onConfirm: (selected) => {
      if (!selected) return

      // Find the matching result and navigate to it
      const match = index.find((item) => item.title === selected)
      if (match && match.url) {
        window.location.href = match.url
      }
    },
    tStatusQueryTooShort: (minQueryLength) =>
      `Type ${minQueryLength} or more characters for suggestions`,
    tStatusNoResults: () => 'No suggestions found',
    tStatusSelectedOption: (selectedOption, length, index) =>
      `${selectedOption} (${index + 1} of ${length}) is highlighted`,
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
