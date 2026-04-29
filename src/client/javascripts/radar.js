/**
 * AI tools radar. Progressive-enhancement filter and search.
 *
 * Without JavaScript, the radar shows all entries grouped by status
 * and all CTAs use generic mailto subjects.
 *
 * With JavaScript:
 * - users can filter by status and search by name
 * - the no-results CTA is rewritten with the user's search term so the
 *   email lands with useful context for the AI Capability and Enablement team
 *
 * The module is split into small helpers (hoisted to module scope) and a
 * tiny `initRadar` entry point. The helpers are exported where they're pure
 * so tests can exercise edge cases without setting up a full DOM.
 */

const ARIA_CURRENT = 'aria-current'
const ARIA_PRESSED = 'aria-pressed'
const MAILBOX = 'AICapabilityAndEnablement@defra.gov.uk'

/**
 * Build the SR-live message for a given visible count.
 * Pure: extracted so the singular/plural branch can be unit tested.
 */
export function buildLiveMessage(visible) {
  if (visible === 0) {
    return 'No entries match your filter'
  }
  const noun = visible === 1 ? 'entry' : 'entries'
  return `${visible} ${noun} shown`
}

/**
 * Build the no-results mailto href, with subject + body tailored to
 * the current query so the email is useful when it lands.
 * Pure: takes the query string, returns the full mailto URL.
 */
export function buildNoResultsHref(query, mailbox = MAILBOX) {
  const trimmed = query.trim()
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
  return `mailto:${mailbox}?${params.toString()}`
}

function setChipPressed(chip, isPressed) {
  chip.setAttribute(ARIA_PRESSED, isPressed ? 'true' : 'false')
  chip.removeAttribute(ARIA_CURRENT)
}

function upgradeChipAria(chip) {
  if (chip.getAttribute(ARIA_CURRENT) === 'true') {
    chip.removeAttribute(ARIA_CURRENT)
    chip.setAttribute(ARIA_PRESSED, 'true')
  } else {
    chip.setAttribute(ARIA_PRESSED, 'false')
  }
}

function updateNoResultsCta(state) {
  const { noResults, noResultsTitle, noResultsLink, query } = state
  if (!noResults) {
    return
  }
  const trimmed = query.trim()

  if (noResultsTitle) {
    noResultsTitle.textContent = trimmed
      ? `No tools match "${trimmed}"`
      : 'No tools match your filter'
  }

  if (noResultsLink) {
    noResultsLink.href = buildNoResultsHref(query)
    noResultsLink.textContent = trimmed
      ? `Ask about ${trimmed}`
      : 'Ask the team about this'
  }
}

function applyCardFilter(state) {
  let visible = 0
  state.cards.forEach((card) => {
    const matchesStatus =
      state.status === 'all' || card.dataset.status === state.status
    const matchesQuery = !state.query || card.dataset.name.includes(state.query)
    const show = matchesStatus && matchesQuery
    card.hidden = !show
    if (show) {
      visible++
    }
  })
  return visible
}

function applySectionFilter(state) {
  state.sections.forEach((section) => {
    const visibleInSection = section.querySelectorAll(
      '.app-radar-card:not([hidden])'
    ).length
    const isOnFiltered =
      state.status !== 'all' && section.dataset.section !== state.status
    section.hidden = visibleInSection === 0 || isOnFiltered
  })
}

function applyFilters(state) {
  const visible = applyCardFilter(state)
  applySectionFilter(state)

  if (state.noResults) {
    state.noResults.hidden = visible > 0
    if (visible === 0) {
      updateNoResultsCta(state)
    }
  }

  if (state.live) {
    state.live.textContent = buildLiveMessage(visible)
  }

  return visible
}

// Filter chips: anchor links that JS upgrades to in-place filters.
// Without JS the links jump to section anchors (progressive enhancement).
// When JS is active we swap aria-current for aria-pressed to match the
// semantics of a toggle control rather than navigation.
function setupChips(chips, state, refresh) {
  chips.forEach((chip) => {
    upgradeChipAria(chip)

    chip.addEventListener('click', (event) => {
      event.preventDefault()
      state.status = chip.dataset.radarChip
      chips.forEach((other) => setChipPressed(other, other === chip))
      refresh()
    })
  })
}

function setupSearch(search, state, refresh) {
  if (!search) {
    return
  }
  search.addEventListener('input', (event) => {
    state.query = event.target.value.toLowerCase().trim()
    refresh()
  })
}

function setupClearLink(clearLink, search, chips, state, refresh) {
  if (!clearLink || !search) {
    return
  }
  clearLink.addEventListener('click', (event) => {
    event.preventDefault()
    search.value = ''
    state.query = ''
    // Reset to "All" status too, since they probably want to start over
    state.status = 'all'
    chips.forEach((chip) =>
      setChipPressed(chip, chip.dataset.radarChip === 'all')
    )
    refresh()
    // applyFilters writes to the live region, so SR users hear the new count
    search.focus()
  })
}

export function initRadar() {
  const root = document.querySelector('[data-radar]')
  if (!root) {
    return
  }

  const state = {
    cards: Array.from(root.querySelectorAll('.app-radar-card')),
    sections: Array.from(root.querySelectorAll('.app-radar-section')),
    noResults: root.querySelector('[data-radar-noresults]'),
    noResultsTitle: root.querySelector('[data-radar-noresults-title]'),
    noResultsLink: root.querySelector('[data-radar-noresults-link]'),
    live: root.querySelector('[data-radar-live]'),
    status: 'all',
    query: ''
  }

  const chips = Array.from(root.querySelectorAll('[data-radar-chip]'))
  const searchWrapper = root.querySelector('[data-radar-search-wrapper]')
  const search = root.querySelector('[data-radar-search]')
  const clearLink = root.querySelector('[data-radar-clear]')

  // Reveal the search input. It's hidden in HTML by default so users without
  // JavaScript don't see a search box that wouldn't filter anything (no form
  // wrapper, no server-side search). With JS, the box becomes the smart search.
  if (searchWrapper) {
    searchWrapper.hidden = false
  }

  const refresh = () => applyFilters(state)

  setupChips(chips, state, refresh)
  setupSearch(search, state, refresh)
  setupClearLink(clearLink, search, chips, state, refresh)
}
