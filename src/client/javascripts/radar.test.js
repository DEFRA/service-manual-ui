/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, afterEach } from 'vitest'
import { initRadar, buildLiveMessage, buildNoResultsHref } from './radar.js'

/**
 * Render a realistic radar fixture into document.body. Every test gets a
 * fresh tree so click/input handlers from previous initRadar() calls can't
 * leak across tests.
 */
function renderFixture({
  withSearch = true,
  withLive = true,
  withNoResults = true,
  withClear = true,
  withSearchWrapper = true,
  initialActiveChip = 'all'
} = {}) {
  document.body.innerHTML = `
    <div data-radar>
      <div data-radar-chips>
        <a href="#sec-all" data-radar-chip="all"${
          initialActiveChip === 'all' ? ' aria-current="true"' : ''
        }>All</a>
        <a href="#sec-approved" data-radar-chip="approved"${
          initialActiveChip === 'approved' ? ' aria-current="true"' : ''
        }>Approved</a>
        <a href="#sec-trial" data-radar-chip="trial"${
          initialActiveChip === 'trial' ? ' aria-current="true"' : ''
        }>Trial</a>
      </div>

      ${
        withSearchWrapper
          ? `<div data-radar-search-wrapper hidden>${
              withSearch ? '<input data-radar-search type="search">' : ''
            }</div>`
          : withSearch
            ? '<input data-radar-search type="search">'
            : ''
      }

      ${withLive ? '<div data-radar-live aria-live="polite"></div>' : ''}

      <section id="sec-approved" data-section="approved" class="app-radar-section">
        <div class="app-radar-card" data-status="approved" data-name="claude">Claude</div>
        <div class="app-radar-card" data-status="approved" data-name="cursor">Cursor</div>
      </section>

      <section id="sec-trial" data-section="trial" class="app-radar-section">
        <div class="app-radar-card" data-status="trial" data-name="github copilot">GitHub Copilot</div>
      </section>

      ${
        withNoResults
          ? `<div data-radar-noresults hidden>
               <h3 data-radar-noresults-title>No tools match your filter</h3>
               <a data-radar-noresults-link href="mailto:placeholder">Ask the team</a>
               ${withClear ? '<a href="#" data-radar-clear>Clear search</a>' : ''}
             </div>`
          : ''
      }
    </div>
  `

  return {
    root: document.querySelector('[data-radar]'),
    chips: Array.from(document.querySelectorAll('[data-radar-chip]')),
    cards: Array.from(document.querySelectorAll('.app-radar-card')),
    sections: Array.from(document.querySelectorAll('.app-radar-section')),
    search: document.querySelector('[data-radar-search]'),
    searchWrapper: document.querySelector('[data-radar-search-wrapper]'),
    live: document.querySelector('[data-radar-live]'),
    noResults: document.querySelector('[data-radar-noresults]'),
    noResultsTitle: document.querySelector('[data-radar-noresults-title]'),
    noResultsLink: document.querySelector('[data-radar-noresults-link]'),
    clearLink: document.querySelector('[data-radar-clear]')
  }
}

function fireInput(input, value) {
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

describe('buildLiveMessage', () => {
  test('returns the no-match string when visible is 0', () => {
    expect(buildLiveMessage(0)).toBe('No entries match your filter')
  })

  test('uses singular "entry" for exactly one match', () => {
    expect(buildLiveMessage(1)).toBe('1 entry shown')
  })

  test('uses plural "entries" for multiple matches', () => {
    expect(buildLiveMessage(2)).toBe('2 entries shown')
    expect(buildLiveMessage(11)).toBe('11 entries shown')
  })
})

describe('buildNoResultsHref', () => {
  test('without a query, falls back to a generic subject and no body', () => {
    const href = buildNoResultsHref('')
    expect(href).toMatch(/^mailto:AICapabilityAndEnablement@defra\.gov\.uk\?/)
    const params = new URLSearchParams(href.split('?')[1])
    expect(params.get('subject')).toBe('Tool enquiry for the radar')
    expect(params.has('body')).toBe(false)
  })

  test('with a query, includes the query in the subject and body', () => {
    const href = buildNoResultsHref('claude')
    const params = new URLSearchParams(href.split('?')[1])
    expect(params.get('subject')).toBe('Tool enquiry: claude')
    expect(params.get('body')).toContain('"claude"')
    expect(params.get('body')).toContain('whether the team has evaluated it')
  })

  test('whitespace-only queries are treated as empty', () => {
    const href = buildNoResultsHref('   ')
    const params = new URLSearchParams(href.split('?')[1])
    expect(params.get('subject')).toBe('Tool enquiry for the radar')
    expect(params.has('body')).toBe(false)
  })

  test('respects a custom mailbox argument', () => {
    const href = buildNoResultsHref('cursor', 'someone@example.com')
    expect(href.startsWith('mailto:someone@example.com?')).toBe(true)
  })
})

describe('initRadar', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('does nothing when [data-radar] is not in the document', () => {
    document.body.innerHTML = '<div>no radar here</div>'
    expect(() => initRadar()).not.toThrow()
  })

  test('reveals the search wrapper so the search input becomes usable', () => {
    const { searchWrapper } = renderFixture()
    expect(searchWrapper.hidden).toBe(true)

    initRadar()

    expect(searchWrapper.hidden).toBe(false)
  })

  test('upgrades a pre-rendered aria-current chip to aria-pressed', () => {
    const { chips } = renderFixture({ initialActiveChip: 'all' })
    initRadar()

    const all = chips.find((c) => c.dataset.radarChip === 'all')
    const approved = chips.find((c) => c.dataset.radarChip === 'approved')
    expect(all.getAttribute('aria-current')).toBeNull()
    expect(all.getAttribute('aria-pressed')).toBe('true')
    expect(approved.getAttribute('aria-pressed')).toBe('false')
  })

  test('clicking a chip filters cards by status and updates aria-pressed', () => {
    const { chips, cards } = renderFixture()
    initRadar()

    const approvedChip = chips.find((c) => c.dataset.radarChip === 'approved')
    approvedChip.click()

    const claude = cards.find((c) => c.dataset.name === 'claude')
    const copilot = cards.find((c) => c.dataset.name === 'github copilot')
    expect(claude.hidden).toBe(false)
    expect(copilot.hidden).toBe(true)

    expect(approvedChip.getAttribute('aria-pressed')).toBe('true')
    expect(
      chips
        .filter((c) => c !== approvedChip)
        .every((c) => c.getAttribute('aria-pressed') === 'false')
    ).toBe(true)
  })

  test('clicking a chip prevents the default anchor navigation', () => {
    const { chips } = renderFixture()
    initRadar()

    const approvedChip = chips.find((c) => c.dataset.radarChip === 'approved')
    const event = new Event('click', { bubbles: true, cancelable: true })
    approvedChip.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  test('hides sections that do not match the active status', () => {
    const { chips, sections } = renderFixture()
    initRadar()

    const trialChip = chips.find((c) => c.dataset.radarChip === 'trial')
    trialChip.click()

    const approvedSection = sections.find(
      (s) => s.dataset.section === 'approved'
    )
    const trialSection = sections.find((s) => s.dataset.section === 'trial')
    expect(approvedSection.hidden).toBe(true)
    expect(trialSection.hidden).toBe(false)
  })

  test('typing in the search input filters by tool name', () => {
    const { search, cards } = renderFixture()
    initRadar()

    fireInput(search, 'cursor')

    const claude = cards.find((c) => c.dataset.name === 'claude')
    const cursor = cards.find((c) => c.dataset.name === 'cursor')
    expect(claude.hidden).toBe(true)
    expect(cursor.hidden).toBe(false)
  })

  test('search is case-insensitive and trims surrounding whitespace', () => {
    const { search, cards } = renderFixture()
    initRadar()

    fireInput(search, '  CLAUDE  ')

    const claude = cards.find((c) => c.dataset.name === 'claude')
    expect(claude.hidden).toBe(false)
  })

  test('combines a chip filter with a search query', () => {
    const { chips, search, cards } = renderFixture()
    initRadar()

    chips.find((c) => c.dataset.radarChip === 'approved').click()
    fireInput(search, 'cursor')

    expect(cards.find((c) => c.dataset.name === 'cursor').hidden).toBe(false)
    expect(cards.find((c) => c.dataset.name === 'claude').hidden).toBe(true)
    expect(cards.find((c) => c.dataset.name === 'github copilot').hidden).toBe(
      true
    )
  })

  test('shows the no-results panel when nothing matches', () => {
    const { search, noResults, noResultsTitle } = renderFixture()
    initRadar()

    fireInput(search, 'nothingmatches')

    expect(noResults.hidden).toBe(false)
    expect(noResultsTitle.textContent).toBe('No tools match "nothingmatches"')
  })

  test('rebuilds the no-results CTA mailto from the current query', () => {
    const { search, noResultsLink } = renderFixture()
    initRadar()

    fireInput(search, 'mystery-tool')

    expect(noResultsLink.href).toMatch(/^mailto:/)
    const params = new URLSearchParams(noResultsLink.href.split('?')[1])
    expect(params.get('subject')).toBe('Tool enquiry: mystery-tool')
    expect(noResultsLink.textContent).toBe('Ask about mystery-tool')
  })

  test('uses the generic CTA copy when no query is set (chip-only filter empties results)', () => {
    // Build a fixture where filtering by a status leaves zero matches —
    // this is the no-query path through updateNoResultsCta.
    document.body.innerHTML = `
      <div data-radar>
        <a href="#" data-radar-chip="all">All</a>
        <a href="#" data-radar-chip="empty-status">Nothing here</a>
        <section data-section="trial" class="app-radar-section">
          <div class="app-radar-card" data-status="trial" data-name="x"></div>
        </section>
        <div data-radar-noresults hidden>
          <h3 data-radar-noresults-title>No tools match your filter</h3>
          <a data-radar-noresults-link href="mailto:placeholder">Ask the team</a>
        </div>
      </div>
    `
    initRadar()

    document.querySelector('[data-radar-chip="empty-status"]').click()

    const title = document.querySelector('[data-radar-noresults-title]')
    const link = document.querySelector('[data-radar-noresults-link]')
    expect(title.textContent).toBe('No tools match your filter')
    expect(link.textContent).toBe('Ask the team about this')
    const params = new URLSearchParams(link.href.split('?')[1])
    expect(params.get('subject')).toBe('Tool enquiry for the radar')
  })

  test('hides the no-results panel as soon as something matches again', () => {
    const { search, noResults } = renderFixture()
    initRadar()

    fireInput(search, 'nothingmatches')
    expect(noResults.hidden).toBe(false)

    fireInput(search, 'claude')
    expect(noResults.hidden).toBe(true)
  })

  test('updates the live region with a singular count', () => {
    const { search, live } = renderFixture()
    initRadar()

    fireInput(search, 'claude')

    expect(live.textContent).toBe('1 entry shown')
  })

  test('updates the live region with a plural count', () => {
    const { chips, live } = renderFixture()
    initRadar()

    chips.find((c) => c.dataset.radarChip === 'approved').click()

    expect(live.textContent).toBe('2 entries shown')
  })

  test('announces "No entries" through the live region when nothing matches', () => {
    const { search, live } = renderFixture()
    initRadar()

    fireInput(search, 'nothingmatches')

    expect(live.textContent).toBe('No entries match your filter')
  })

  test('the clear link resets query, status, chip aria, focus and visibility', () => {
    const { search, chips, clearLink, cards, noResults } = renderFixture()
    initRadar()

    chips.find((c) => c.dataset.radarChip === 'trial').click()
    fireInput(search, 'nothingmatches')
    expect(noResults.hidden).toBe(false)

    clearLink.click()

    expect(search.value).toBe('')
    expect(noResults.hidden).toBe(true)
    expect(cards.every((c) => c.hidden === false)).toBe(true)

    const all = chips.find((c) => c.dataset.radarChip === 'all')
    const trial = chips.find((c) => c.dataset.radarChip === 'trial')
    expect(all.getAttribute('aria-pressed')).toBe('true')
    expect(trial.getAttribute('aria-pressed')).toBe('false')

    expect(document.activeElement).toBe(search)
  })

  test('the clear link prevents default anchor navigation', () => {
    const { clearLink } = renderFixture()
    initRadar()

    const event = new Event('click', { bubbles: true, cancelable: true })
    clearLink.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })

  test('does not throw when the search input is missing', () => {
    renderFixture({ withSearch: false })
    expect(() => initRadar()).not.toThrow()
  })

  test('does not throw when the live region is missing', () => {
    const { search } = renderFixture({ withLive: false })
    initRadar()
    expect(() => fireInput(search, 'claude')).not.toThrow()
  })

  test('does not throw when the no-results panel is missing', () => {
    const { search } = renderFixture({ withNoResults: false })
    initRadar()
    expect(() => fireInput(search, 'nothingmatches')).not.toThrow()
  })

  test('does not throw when the clear link is missing', () => {
    renderFixture({ withClear: false })
    expect(() => initRadar()).not.toThrow()
  })

  test('the clear link is a no-op when the search input is missing', () => {
    // search wrapper exists but no search input — clearLink should not bind
    const { clearLink } = renderFixture({ withSearch: false })
    initRadar()

    const event = new Event('click', { bubbles: true, cancelable: true })
    clearLink.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(false)
  })

  test('initialises with no aria-current chips at all', () => {
    // Render with NO initial active chip (server didn't pre-mark one)
    document.body.innerHTML = `
      <div data-radar>
        <a href="#a" data-radar-chip="all">All</a>
        <a href="#b" data-radar-chip="trial">Trial</a>
        <section data-section="trial" class="app-radar-section">
          <div class="app-radar-card" data-status="trial" data-name="x"></div>
        </section>
      </div>
    `
    expect(() => initRadar()).not.toThrow()

    const chips = Array.from(document.querySelectorAll('[data-radar-chip]'))
    expect(chips.every((c) => c.getAttribute('aria-pressed') === 'false')).toBe(
      true
    )
  })
})
