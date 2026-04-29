/**
 * AI tools radar — progressive-enhancement filter and search.
 *
 * Without JavaScript, the radar shows all entries grouped by status
 * and all CTAs use generic mailto subjects.
 *
 * With JavaScript:
 * - users can filter by status and search by name
 * - the no-results CTA is rewritten with the user's search term so the
 *   email lands with useful context for the AI Capability and Enablement team
 */
export function initRadar() {
  const root = document.querySelector('[data-radar]')
  if (!root) {
    return
  }

  const cards = Array.from(root.querySelectorAll('.app-radar-card'))
  const sections = Array.from(root.querySelectorAll('.app-radar-section'))
  const chips = Array.from(root.querySelectorAll('[data-radar-chip]'))
  const searchWrapper = root.querySelector('[data-radar-search-wrapper]')
  const search = root.querySelector('[data-radar-search]')
  const live = root.querySelector('[data-radar-live]')
  const noResults = root.querySelector('[data-radar-noresults]')
  const noResultsTitle = root.querySelector('[data-radar-noresults-title]')
  const noResultsLink = root.querySelector('[data-radar-noresults-link]')
  const clearLink = root.querySelector('[data-radar-clear]')

  // Reveal the search input. It's hidden in HTML by default so users without
  // JavaScript don't see a search box that wouldn't filter anything (no form
  // wrapper, no server-side search). With JS, the box becomes the smart search.
  if (searchWrapper) {
    searchWrapper.hidden = false
  }

  const MAILBOX = 'AICapabilityAndEnablement@defra.gov.uk'

  let activeStatus = 'all'
  let activeQuery = ''

  function updateNoResultsCta() {
    if (!noResults) {
      return
    }

    const trimmed = activeQuery.trim()

    if (noResultsTitle) {
      noResultsTitle.textContent = trimmed
        ? `No tools match "${trimmed}"`
        : 'No tools match your filter'
    }

    if (noResultsLink) {
      const subject = trimmed
        ? `Tool enquiry: ${trimmed}`
        : 'Tool enquiry for the radar'
      const body = trimmed
        ? `Hello,\n\nI was looking on the radar for "${trimmed}" but could not find it. I'd like to know:\n\n- whether the team has evaluated it\n- whether anyone else at Defra is using it\n- whether it's safe to use\n\nThanks,`
        : ''

      const params = new URLSearchParams()
      params.set('subject', subject)
      if (body) {
        params.set('body', body)
      }

      noResultsLink.href = `mailto:${MAILBOX}?${params.toString()}`
      noResultsLink.textContent = trimmed
        ? `Ask about ${trimmed}`
        : 'Ask the team about this'
    }
  }

  function applyFilters() {
    let visible = 0

    cards.forEach((card) => {
      const matchesStatus =
        activeStatus === 'all' || card.dataset.status === activeStatus
      const matchesQuery =
        !activeQuery || card.dataset.name.includes(activeQuery)
      const show = matchesStatus && matchesQuery
      card.hidden = !show
      if (show) {
        visible++
      }
    })

    sections.forEach((section) => {
      const visibleInSection = section.querySelectorAll(
        '.app-radar-card:not([hidden])'
      ).length
      const isOnFiltered =
        activeStatus !== 'all' && section.dataset.section !== activeStatus
      section.hidden = visibleInSection === 0 || isOnFiltered
    })

    if (noResults) {
      noResults.hidden = visible > 0
      if (visible === 0) {
        updateNoResultsCta()
      }
    }

    if (live) {
      const message =
        visible === 0
          ? 'No entries match your filter'
          : `${visible} ${visible === 1 ? 'entry' : 'entries'} shown`
      live.textContent = message
    }
  }

  // Filter chips — anchor links that JS upgrades to in-place filters.
  // Without JS the links jump to section anchors (progressive enhancement).
  // When JS is active we swap aria-current for aria-pressed to match the
  // semantics of a toggle control rather than navigation.
  chips.forEach((chip) => {
    // Initial JS-upgrade: convert any pre-rendered aria-current to aria-pressed
    if (chip.getAttribute('aria-current') === 'true') {
      chip.removeAttribute('aria-current')
      chip.setAttribute('aria-pressed', 'true')
    } else {
      chip.setAttribute('aria-pressed', 'false')
    }

    chip.addEventListener('click', (event) => {
      event.preventDefault()
      activeStatus = chip.dataset.radarChip

      chips.forEach((other) => {
        other.setAttribute(
          'aria-pressed',
          other === chip ? 'true' : 'false'
        )
        other.removeAttribute('aria-current')
      })

      applyFilters()
    })
  })

  // Search — filter by name as user types
  if (search) {
    search.addEventListener('input', (event) => {
      activeQuery = event.target.value.toLowerCase().trim()
      applyFilters()
    })
  }

  // Clear-search link inside no-results state
  if (clearLink && search) {
    clearLink.addEventListener('click', (event) => {
      event.preventDefault()
      search.value = ''
      activeQuery = ''
      // Reset to "All" status too, since they probably want to start over
      activeStatus = 'all'
      chips.forEach((chip) => {
        chip.setAttribute(
          'aria-pressed',
          chip.dataset.radarChip === 'all' ? 'true' : 'false'
        )
        chip.removeAttribute('aria-current')
      })
      applyFilters()
      // applyFilters writes to the live region, so SR users hear the new count
      search.focus()
    })
  }

}
