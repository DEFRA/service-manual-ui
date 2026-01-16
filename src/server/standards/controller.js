import { standards, filterStandards, paginate, getAreas } from './data.js'

const DEFAULT_PAGE_SIZE = 10

/**
 * Build pagination links preserving current query parameters
 * @param {Object} query - Current query parameters
 * @param {Object} pagination - Pagination info
 * @returns {Object} Pagination object for GOV.UK component
 */
function buildPaginationLinks(query, pagination) {
  const { currentPage, totalPages, hasPrevious, hasNext } = pagination

  if (totalPages <= 1) {
    return null
  }

  const buildUrl = (page) => {
    const params = new URLSearchParams()
    if (query.q) {
      params.set('q', query.q)
    }
    if (query.area) {
      const areas = Array.isArray(query.area) ? query.area : [query.area]
      areas.forEach((area) => params.append('area', area))
    }
    params.set('page', page)
    return `/standards?${params.toString()}`
  }

  const result = {
    items: []
  }

  // Previous link
  if (hasPrevious) {
    result.previous = {
      href: buildUrl(currentPage - 1)
    }
  }

  // Page numbers
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    result.items.push({
      number: pageNum,
      href: buildUrl(pageNum),
      current: pageNum === currentPage
    })
  }

  // Next link
  if (hasNext) {
    result.next = {
      href: buildUrl(currentPage + 1)
    }
  }

  return result
}

/**
 * Standards Browser page controller
 * Displays all Defra standards with search, filter, and pagination
 */
export const standardsController = {
  handler(request, h) {
    const query = request.query.q || ''
    const selectedAreas = request.query.area
      ? Array.isArray(request.query.area)
        ? request.query.area
        : [request.query.area]
      : []
    const page = parseInt(request.query.page, 10) || 1

    // Filter standards by search and area
    const filteredStandards = filterStandards({
      query,
      areas: selectedAreas
    })

    // Paginate results
    const { items: paginatedStandards, pagination } = paginate(
      filteredStandards,
      page,
      DEFAULT_PAGE_SIZE
    )

    // Get all available areas for filter checkboxes
    const allAreas = getAreas()

    // Build checkbox items with checked state
    const areaCheckboxes = allAreas.map((area) => ({
      text: area,
      value: area,
      checked: selectedAreas.includes(area)
    }))

    // Determine if filters or search are active
    const hasActiveSearch = query.length > 0
    const hasActiveFilters = selectedAreas.length > 0
    const hasActiveSearchOrFilters = hasActiveSearch || hasActiveFilters

    // Build clear links
    const clearSearchUrl = hasActiveFilters
      ? `/standards?${selectedAreas.map((a) => `area=${encodeURIComponent(a)}`).join('&')}`
      : '/standards'

    const clearFiltersUrl = hasActiveSearch
      ? `/standards?q=${encodeURIComponent(query)}`
      : '/standards'

    // Build pagination links
    const paginationLinks = buildPaginationLinks(request.query, pagination)

    return h.view('standards/standards', {
      pageTitle: 'Defra standards',
      heading: 'Defra standards',
      standards: paginatedStandards,
      totalStandards: standards.length,
      filteredCount: filteredStandards.length,
      query,
      selectedAreas,
      areaCheckboxes,
      pagination,
      paginationLinks,
      hasActiveSearch,
      hasActiveFilters,
      hasActiveSearchOrFilters,
      clearSearchUrl,
      clearFiltersUrl,
      showNoResults: filteredStandards.length === 0
    })
  }
}
