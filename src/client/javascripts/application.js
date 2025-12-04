import {
  createAll,
  Button,
  Checkboxes,
  ErrorSummary,
  Header,
  Radios,
  SkipLink
} from 'govuk-frontend'

createAll(Button)
createAll(Checkboxes)
createAll(ErrorSummary)
createAll(Header)
createAll(Radios)
createAll(SkipLink)

// Service navigation mobile toggle
function initServiceNavigation() {
  const toggleButton = document.querySelector('.js-service-navigation-toggle')
  const navList = document.getElementById('service-navigation-list')

  if (toggleButton && navList) {
    toggleButton.hidden = false

    toggleButton.addEventListener('click', function () {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true'
      toggleButton.setAttribute('aria-expanded', !isExpanded)
      navList.classList.toggle('defra-service-navigation__list--open')
    })
  }
}

initServiceNavigation()
