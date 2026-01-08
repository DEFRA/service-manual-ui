import {
  searchController,
  searchSuggestionsController,
  searchIndexController
} from './controller.js'

/**
 * Search routes - handles search results page and API endpoints
 */
export const search = {
  plugin: {
    name: 'search',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/search',
          ...searchController
        },
        {
          method: 'GET',
          path: '/api/search/suggestions',
          ...searchSuggestionsController
        },
        {
          method: 'GET',
          path: '/api/search/index',
          ...searchIndexController
        }
      ])
    }
  }
}
