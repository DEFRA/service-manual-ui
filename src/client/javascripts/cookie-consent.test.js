/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import {
  getCookieConsent,
  setCookieConsent,
  hasConsentBeenSet,
  loadGoogleAnalytics,
  removeAnalyticsCookies,
  initCookieBanner,
  initCookiesPage
} from './cookie-consent.js'

function clearCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim()
    document.cookie = `${name}=; max-age=0; path=/`
  })
}

function createBannerHtml(measurementId) {
  return `
    <div class="govuk-cookie-banner" data-ga-measurement-id="${measurementId}">
      <div class="govuk-cookie-banner__message">
        <form method="post" action="/cookies/accept">
          <input type="hidden" name="returnUrl" value="/">
          <button type="submit" value="accept">Accept analytics cookies</button>
        </form>
        <form method="post" action="/cookies/reject">
          <input type="hidden" name="returnUrl" value="/">
          <button type="submit" value="reject">Reject analytics cookies</button>
        </form>
      </div>
      <div class="govuk-cookie-banner__message" role="alert" tabindex="-1" hidden>
        <p>You accepted cookies.</p>
        <button type="button">Hide cookie message</button>
      </div>
      <div class="govuk-cookie-banner__message" role="alert" tabindex="-1" hidden>
        <p>You rejected cookies.</p>
        <button type="button">Hide cookie message</button>
      </div>
    </div>
  `
}

describe('cookie-consent', () => {
  beforeEach(() => {
    clearCookies()
  })

  afterEach(() => {
    clearCookies()
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  describe('#getCookieConsent', () => {
    it('should return null when no cookie is set', () => {
      expect(getCookieConsent()).toBeNull()
    })

    it('should return parsed consent when cookie is set', () => {
      document.cookie =
        'defra_cookies_policy=' +
        encodeURIComponent('{"analytics":true}') +
        '; path=/'

      expect(getCookieConsent()).toEqual({ analytics: true })
    })

    it('should return null for invalid JSON', () => {
      document.cookie = 'defra_cookies_policy=invalid-json; path=/'

      expect(getCookieConsent()).toBeNull()
    })
  })

  describe('#setCookieConsent', () => {
    it('should set the consent cookie', () => {
      setCookieConsent({ analytics: true })

      expect(document.cookie).toContain('defra_cookies_policy')
      expect(getCookieConsent()).toEqual({ analytics: true })
    })

    it('should set the consent-set flag cookie', () => {
      setCookieConsent({ analytics: false })

      expect(document.cookie).toContain('defra_cookies_policy_set=true')
    })
  })

  describe('#hasConsentBeenSet', () => {
    it('should return false when consent has not been set', () => {
      expect(hasConsentBeenSet()).toBe(false)
    })

    it('should return true when consent has been set', () => {
      setCookieConsent({ analytics: false })

      expect(hasConsentBeenSet()).toBe(true)
    })
  })

  describe('#loadGoogleAnalytics', () => {
    it('should inject gtag script into head', () => {
      loadGoogleAnalytics('G-TEST123')

      const script = document.querySelector(
        'script[src*="googletagmanager.com/gtag"]'
      )
      expect(script).not.toBeNull()
      expect(script.src).toContain('G-TEST123')
      expect(script.async).toBe(true)
    })

    it('should not inject duplicate scripts', () => {
      loadGoogleAnalytics('G-TEST123')
      loadGoogleAnalytics('G-TEST123')

      const scripts = document.querySelectorAll(
        'script[src*="googletagmanager.com/gtag"]'
      )
      expect(scripts).toHaveLength(1)
    })

    it('should initialise the dataLayer', () => {
      loadGoogleAnalytics('G-TEST123')

      expect(globalThis.dataLayer).toBeDefined()
      expect(globalThis.dataLayer.length).toBeGreaterThan(0)
    })
  })

  describe('#removeAnalyticsCookies', () => {
    it('should remove _ga cookies', () => {
      document.cookie = '_ga=test; path=/'
      document.cookie = '_ga_ABC123=test; path=/'

      removeAnalyticsCookies()

      expect(document.cookie).not.toContain('_ga')
    })
  })

  describe('#initCookieBanner', () => {
    it('should do nothing when no banner is present', () => {
      initCookieBanner()

      expect(document.querySelector('.govuk-cookie-banner')).toBeNull()
    })

    it('should hide banner when consent has already been set', () => {
      document.body.innerHTML = createBannerHtml('G-TEST123')
      setCookieConsent({ analytics: false })

      initCookieBanner()

      const banner = document.querySelector('.govuk-cookie-banner')
      expect(banner.hidden).toBe(true)
    })

    it('should load GA when consent was previously accepted', () => {
      document.body.innerHTML = createBannerHtml('G-TEST123')
      setCookieConsent({ analytics: true })

      initCookieBanner()

      const script = document.querySelector(
        'script[src*="googletagmanager.com/gtag"]'
      )
      expect(script).not.toBeNull()
    })

    it('should accept cookies when accept form is submitted', () => {
      document.body.innerHTML = createBannerHtml('G-TEST123')

      initCookieBanner()

      const acceptForm = document.querySelector(
        'form[action="/cookies/accept"]'
      )
      acceptForm.dispatchEvent(new Event('submit', { cancelable: true }))

      expect(getCookieConsent()).toEqual({ analytics: true })

      const messages = document.querySelectorAll(
        '.govuk-cookie-banner__message'
      )
      expect(messages[0].hidden).toBe(true)
      expect(messages[1].hidden).toBe(false)
    })

    it('should reject cookies when reject form is submitted', () => {
      document.body.innerHTML = createBannerHtml('G-TEST123')

      initCookieBanner()

      const rejectForm = document.querySelector(
        'form[action="/cookies/reject"]'
      )
      rejectForm.dispatchEvent(new Event('submit', { cancelable: true }))

      expect(getCookieConsent()).toEqual({ analytics: false })

      const messages = document.querySelectorAll(
        '.govuk-cookie-banner__message'
      )
      expect(messages[0].hidden).toBe(true)
      expect(messages[2].hidden).toBe(false)
    })

    it('should prevent default form submission for progressive enhancement', () => {
      document.body.innerHTML = createBannerHtml('G-TEST123')

      initCookieBanner()

      const acceptForm = document.querySelector(
        'form[action="/cookies/accept"]'
      )
      const event = new Event('submit', { cancelable: true })
      acceptForm.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(true)
    })

    it('should focus the confirmation message after accepting', () => {
      document.body.innerHTML = createBannerHtml('G-TEST123')

      initCookieBanner()

      const acceptForm = document.querySelector(
        'form[action="/cookies/accept"]'
      )
      acceptForm.dispatchEvent(new Event('submit', { cancelable: true }))

      const acceptedMessage = document.querySelectorAll(
        '.govuk-cookie-banner__message'
      )[1]
      expect(document.activeElement).toBe(acceptedMessage)
    })

    it('should focus the confirmation message after rejecting', () => {
      document.body.innerHTML = createBannerHtml('G-TEST123')

      initCookieBanner()

      const rejectForm = document.querySelector(
        'form[action="/cookies/reject"]'
      )
      rejectForm.dispatchEvent(new Event('submit', { cancelable: true }))

      const rejectedMessage = document.querySelectorAll(
        '.govuk-cookie-banner__message'
      )[2]
      expect(document.activeElement).toBe(rejectedMessage)
    })

    it('should hide banner when hide button is clicked', () => {
      document.body.innerHTML = createBannerHtml('G-TEST123')

      initCookieBanner()

      // Accept first to show the confirmation message
      const acceptForm = document.querySelector(
        'form[action="/cookies/accept"]'
      )
      acceptForm.dispatchEvent(new Event('submit', { cancelable: true }))

      // Click hide on the confirmation message
      const hideButton = document.querySelectorAll(
        '.govuk-cookie-banner__message[role="alert"] button'
      )[0]
      hideButton.click()

      const banner = document.querySelector('.govuk-cookie-banner')
      expect(banner.hidden).toBe(true)
    })
  })

  describe('#initCookiesPage', () => {
    it('should do nothing when no form is present', () => {
      initCookiesPage()

      expect(document.getElementById('cookies-form')).toBeNull()
    })

    it('should set consent cookie on form submit with yes selected', () => {
      document.body.innerHTML = `
        <form id="cookies-form">
          <input type="radio" name="analytics" value="yes" checked>
          <input type="radio" name="analytics" value="no">
          <button type="submit">Save</button>
        </form>
      `

      initCookiesPage()

      const form = document.getElementById('cookies-form')
      form.dispatchEvent(new Event('submit'))

      expect(getCookieConsent()).toEqual({ analytics: true })
    })

    it('should set consent cookie on form submit with no selected', () => {
      document.body.innerHTML = `
        <form id="cookies-form">
          <input type="radio" name="analytics" value="yes">
          <input type="radio" name="analytics" value="no" checked>
          <button type="submit">Save</button>
        </form>
      `

      initCookiesPage()

      const form = document.getElementById('cookies-form')
      form.dispatchEvent(new Event('submit'))

      expect(getCookieConsent()).toEqual({ analytics: false })
    })
  })
})
