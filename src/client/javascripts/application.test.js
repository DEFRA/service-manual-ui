/**
 * @vitest-environment jsdom
 */

import { vi, beforeEach, afterEach } from 'vitest'
import { initServiceNavigation } from './application.js'

// Mock govuk-frontend before importing application.js
vi.mock('govuk-frontend', () => ({
  createAll: vi.fn(),
  Button: vi.fn(),
  Checkboxes: vi.fn(),
  ErrorSummary: vi.fn(),
  Header: vi.fn(),
  Radios: vi.fn(),
  SkipLink: vi.fn()
}))

describe('initServiceNavigation', () => {
  let toggleButton
  let navList

  beforeEach(() => {
    document.body.className = 'js-enabled'
    document.body.innerHTML = `
      <button
        class="js-service-navigation-toggle"
        aria-expanded="false"
        aria-controls="service-navigation-list"
        hidden
      >
        Menu
      </button>
      <ul id="service-navigation-list" class="defra-service-navigation__list">
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    `

    toggleButton = document.querySelector('.js-service-navigation-toggle')
    navList = document.getElementById('service-navigation-list')
  })

  afterEach(() => {
    document.body.innerHTML = ''
    document.body.className = ''
  })

  test('should show toggle button when elements exist', () => {
    initServiceNavigation()
    expect(toggleButton.hidden).toBe(false)
  })

  test('should expand navigation when toggle is clicked', () => {
    initServiceNavigation()
    toggleButton.click()

    expect(toggleButton.getAttribute('aria-expanded')).toBe('true')
    expect(
      navList.classList.contains('defra-service-navigation__list--open')
    ).toBe(true)
  })

  test('should collapse navigation when toggle is clicked again', () => {
    initServiceNavigation()
    toggleButton.click()
    toggleButton.click()

    expect(toggleButton.getAttribute('aria-expanded')).toBe('false')
    expect(
      navList.classList.contains('defra-service-navigation__list--open')
    ).toBe(false)
  })

  test('should not throw when toggle button is missing', () => {
    document.body.innerHTML = `
      <ul id="service-navigation-list" class="defra-service-navigation__list">
        <li>Item 1</li>
      </ul>
    `

    expect(() => initServiceNavigation()).not.toThrow()
  })

  test('should not throw when nav list is missing', () => {
    document.body.innerHTML = `
      <button class="js-service-navigation-toggle" aria-expanded="false" hidden>
        Menu
      </button>
    `

    expect(() => initServiceNavigation()).not.toThrow()
  })

  test('should not throw when both elements are missing', () => {
    document.body.innerHTML = ''
    expect(() => initServiceNavigation()).not.toThrow()
  })
})
