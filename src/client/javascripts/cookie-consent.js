const COOKIE_NAME = 'defra_cookies_policy'
const COOKIE_SET_NAME = 'defra_cookies_policy_set'
const MAX_AGE_SECONDS = 31536000

export function getCookieConsent() {
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))

  if (!match) {
    return null
  }

  try {
    return JSON.parse(decodeURIComponent(match.split('=')[1]))
  } catch {
    return null
  }
}

export function setCookieConsent(consent) {
  const value = encodeURIComponent(JSON.stringify(consent))
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`
  document.cookie = `${COOKIE_SET_NAME}=true; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`
}

export function hasConsentBeenSet() {
  return document.cookie
    .split('; ')
    .some((row) => row.startsWith(`${COOKIE_SET_NAME}=`))
}

export function loadGoogleAnalytics(measurementId) {
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
    return
  }

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  script.async = true
  document.head.appendChild(script)

  globalThis.dataLayer = globalThis.dataLayer || []
  function gtag(...args) {
    globalThis.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', measurementId, { anonymize_ip: true })
}

export function removeAnalyticsCookies() {
  const cookies = document.cookie.split('; ')
  const hostname = globalThis.location.hostname
  for (const cookie of cookies) {
    const name = cookie.split('=')[0]
    if (name.startsWith('_ga')) {
      document.cookie = `${name}=; path=/; max-age=0`
      document.cookie = `${name}=; path=/; max-age=0; domain=${hostname}`
      document.cookie = `${name}=; path=/; max-age=0; domain=.${hostname}`
    }
  }
}

function handleBannerConsent(
  banner,
  mainMessage,
  acceptedMessage,
  rejectedMessage,
  measurementId
) {
  const forms = mainMessage.querySelectorAll('form')
  for (const form of forms) {
    form.addEventListener('submit', function (event) {
      event.preventDefault()

      const button = form.querySelector('button')
      if (button.value === 'accept') {
        setCookieConsent({ analytics: true })
        if (measurementId) {
          loadGoogleAnalytics(measurementId)
        }
        mainMessage.hidden = true
        acceptedMessage.hidden = false
        acceptedMessage.focus()
      }

      if (button.value === 'reject') {
        setCookieConsent({ analytics: false })
        removeAnalyticsCookies()
        mainMessage.hidden = true
        rejectedMessage.hidden = false
        rejectedMessage.focus()
      }
    })
  }

  const hideButtons = banner.querySelectorAll(
    '.govuk-cookie-banner__message[role="alert"] button'
  )
  for (const hideButton of hideButtons) {
    hideButton.addEventListener('click', function () {
      banner.hidden = true
    })
  }
}

export function initCookieBanner() {
  const banner = document.querySelector('.govuk-cookie-banner')

  if (!banner) {
    return
  }

  const measurementId = banner.dataset.gaMeasurementId
  const messages = banner.querySelectorAll('.govuk-cookie-banner__message')
  const mainMessage = messages[0]
  const acceptedMessage = messages[1]
  const rejectedMessage = messages[2]

  if (
    hasConsentBeenSet() &&
    !banner.querySelector('[role="alert"]:not([hidden])')
  ) {
    banner.hidden = true
    const consent = getCookieConsent()
    if (consent?.analytics && measurementId) {
      loadGoogleAnalytics(measurementId)
    }
    return
  }

  if (acceptedMessage && !acceptedMessage.hidden && measurementId) {
    loadGoogleAnalytics(measurementId)
  }

  handleBannerConsent(
    banner,
    mainMessage,
    acceptedMessage,
    rejectedMessage,
    measurementId
  )
}

export function initCookiesPage() {
  const form = document.getElementById('cookies-form')

  if (!form) {
    return
  }

  form.addEventListener('submit', function () {
    const selected = form.querySelector('input[name="analytics"]:checked')

    if (!selected) {
      return
    }

    const consent = { analytics: selected.value === 'yes' }
    setCookieConsent(consent)

    if (!consent.analytics) {
      removeAnalyticsCookies()
    }
  })
}
