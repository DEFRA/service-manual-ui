/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, afterEach, vi } from 'vitest'

import {
  initTableScroll,
  updateTableContainer
} from '../../../../src/client/javascripts/table-scroll.js'

const label = 'What you can put where'

/**
 * Renders a table box as the server sends it. jsdom does no layout, so the
 * widths that decide whether the table overflows are set by hand.
 * @param {{ tableWidth: number, boxWidth: number }} widths
 * @returns {HTMLElement} The box
 */
function renderBox ({ tableWidth, boxWidth }) {
  document.body.innerHTML = `<div class="app-table-container" role="region" aria-label="${label}" tabindex="0"><table></table></div>`
  const box = document.querySelector('.app-table-container')
  Object.defineProperty(box, 'scrollWidth', { configurable: true, value: tableWidth })
  Object.defineProperty(box, 'clientWidth', { configurable: true, value: boxWidth })
  return box
}

function setTableWidth (box, tableWidth) {
  Object.defineProperty(box, 'scrollWidth', { configurable: true, value: tableWidth })
}

function regionAttributes (box) {
  return ['role', 'aria-label', 'tabindex'].map((name) => box.getAttribute(name))
}

afterEach(() => {
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
})

describe('a table box', () => {
  test('stays a named, focusable region while its table is wider than the box', () => {
    const box = renderBox({ tableWidth: 600, boxWidth: 320 })

    initTableScroll()

    expect(regionAttributes(box)).toEqual(['region', label, '0'])
  })

  test('is a plain box with no tab stop when its table fits', () => {
    const box = renderBox({ tableWidth: 600, boxWidth: 600 })

    initTableScroll()

    expect(regionAttributes(box)).toEqual([null, null, null])
  })

  test('is checked again when the box changes size', () => {
    let resized
    vi.stubGlobal('ResizeObserver', class {
      constructor (callback) { resized = callback }
      observe () {}
    })
    const box = renderBox({ tableWidth: 600, boxWidth: 960 })
    initTableScroll()

    setTableWidth(box, 1200)
    resized()

    expect(regionAttributes(box)).toEqual(['region', label, '0'])
  })

  test('without ResizeObserver, gets its region and name back when the window is resized', () => {
    const box = renderBox({ tableWidth: 600, boxWidth: 960 })
    initTableScroll()

    setTableWidth(box, 1200)
    window.dispatchEvent(new Event('resize'))

    expect(regionAttributes(box)).toEqual(['region', label, '0'])
  })
})

describe('updateTableContainer', () => {
  test('keeps the name when a box is checked more than once', () => {
    const box = renderBox({ tableWidth: 600, boxWidth: 600 })

    updateTableContainer(box)
    updateTableContainer(box)
    setTableWidth(box, 1200)
    updateTableContainer(box)

    expect(box.getAttribute('aria-label')).toBe(label)
  })
})
