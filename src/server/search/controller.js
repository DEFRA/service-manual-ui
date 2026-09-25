import {
  searchContent,
  getSuggestions,
  getSearchIndex
} from '../common/helpers/search-index.js'
import { MAX_QUESTION_LENGTH } from '../ai-ask/constants.js'

const MAX_AUTOCOMPLETE_SUGGESTIONS = 5

// Ask the toolkit is offered only on a search about AI, because it answers
// from the AI digital toolkit and not the whole service manual, and only on
// one short enough to ask as it stands.
const AI_TERMS = /\b(ai|copilot|chatgpt|gpt|claude|gemini|llm|genai|agents?|machine learning|prompts?|chatbots?)\b/i

/**
 * Search results page controller
 */
export const searchController = {
  handler (request, h) {
    const query = request.query.q || ''
    const results = query ? searchContent(query) : []

    return h.view('search/results', {
      pageTitle: query ? `Search results for "${query}"` : 'Search',
      heading: 'Search results',
      query,
      results,
      resultsCount: results.length,
      offerAsk: query.length <= MAX_QUESTION_LENGTH && AI_TERMS.test(query)
    })
  }
}

/**
 * Search suggestions API endpoint for autocomplete
 * Returns JSON for client-side autocomplete
 */
export const searchSuggestionsController = {
  handler (request) {
    const query = request.query.q || ''
    const suggestions = query
      ? getSuggestions(query, MAX_AUTOCOMPLETE_SUGGESTIONS)
      : []

    return suggestions
  }
}

/**
 * Search index API endpoint
 * Returns the full search index for client-side search
 */
export const searchIndexController = {
  handler () {
    const index = getSearchIndex()

    // Return a simplified index for client-side use
    return index.map((entry) => ({
      title: entry.title,
      description: entry.description,
      sectionTitle: entry.sectionTitle,
      url: entry.url
    }))
  }
}
