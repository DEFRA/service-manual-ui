import {
  createAll,
  Button,
  Checkboxes,
  ErrorSummary,
  Header,
  Radios,
  SkipLink
} from 'govuk-frontend'

import { initSearch } from './search.js'

createAll(Button)
createAll(Checkboxes)
createAll(ErrorSummary)
createAll(Header)
createAll(Radios)
createAll(SkipLink)

/**
 * Service navigation mobile toggle
 * Shows/hides the navigation menu on mobile devices
 */
export function initServiceNavigation() {
  const toggleButton = document.querySelector('.js-service-navigation-toggle')
  const navList = document.getElementById('service-navigation-list')

  if (!toggleButton || !navList) {
    return
  }

  toggleButton.hidden = false

  toggleButton.addEventListener('click', function () {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true'
    toggleButton.setAttribute('aria-expanded', String(!isExpanded))
    navList.classList.toggle('defra-service-navigation__list--open')
  })
}

initServiceNavigation()
initSearch()
