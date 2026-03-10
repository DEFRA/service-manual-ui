import { config } from '../../config/config.js'

const gtmContainerId = config.get('googleTagManager.containerId')

function parseConsentCookie(cookieValue) {
  try {
    const consent = JSON.parse(decodeURIComponent(cookieValue || ''))
    return consent.analytics === true
  } catch {
    return false
  }
}

const cookiesGetController = {
  handler(request, h) {
    const saved = request.query.saved === 'true'
    const currentAnalytics = parseConsentCookie(
      request.state?.defra_cookies_policy
    )

    return h.view('cookies/cookies', {
      pageTitle: 'Cookies',
      saved,
      currentAnalytics,
      hideCookieBanner: true,
      gtmContainerId,
      breadcrumbs: [{ text: 'Home', href: '/' }, { text: 'Cookies' }]
    })
  }
}

const cookiesPostController = {
  handler(request, h) {
    const analytics = request.payload?.analytics === 'yes'
    const consent = encodeURIComponent(JSON.stringify({ analytics }))

    return h
      .redirect('/cookies?saved=true')
      .state('defra_cookies_policy', consent)
      .state('defra_cookies_policy_set', 'true')
  }
}

const bannerAcceptController = {
  handler(request, h) {
    const returnUrl = request.payload?.returnUrl || '/'
    const consent = encodeURIComponent(JSON.stringify({ analytics: true }))

    return h
      .redirect(`${returnUrl}?cookieAction=accept`)
      .state('defra_cookies_policy', consent)
      .state('defra_cookies_policy_set', 'true')
  }
}

const bannerRejectController = {
  handler(request, h) {
    const returnUrl = request.payload?.returnUrl || '/'
    const consent = encodeURIComponent(JSON.stringify({ analytics: false }))

    return h
      .redirect(`${returnUrl}?cookieAction=reject`)
      .state('defra_cookies_policy', consent)
      .state('defra_cookies_policy_set', 'true')
  }
}

export {
  cookiesGetController,
  cookiesPostController,
  bannerAcceptController,
  bannerRejectController
}
