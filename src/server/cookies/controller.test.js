import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('#cookiesController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('GET /cookies', () => {
    test('should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/cookies'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('should display cookies page heading', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/cookies'
      })

      expect(result).toEqual(expect.stringContaining('Cookies'))
      expect(result).toEqual(expect.stringContaining('Essential cookies'))
    })

    test('should display breadcrumbs with Home link', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/cookies'
      })

      expect(result).toEqual(expect.stringContaining('govuk-breadcrumbs'))
      expect(result).toEqual(expect.stringContaining('Home'))
    })

    test('should display success banner when saved query param is true', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/cookies?saved=true'
      })

      expect(result).toEqual(
        expect.stringContaining('Your cookie settings were saved')
      )
    })

    test('should not display success banner by default', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/cookies'
      })

      expect(result).not.toEqual(
        expect.stringContaining('Your cookie settings were saved')
      )
    })

    test('should not display cookie banner on cookies page', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/cookies'
      })

      expect(result).not.toEqual(expect.stringContaining('govuk-cookie-banner'))
    })
  })

  describe('POST /cookies', () => {
    test('should redirect to cookies page with saved param', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/cookies',
        payload: { analytics: 'yes' }
      })

      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toBe('/cookies?saved=true')
    })

    test('should set consent cookies when accepting analytics', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/cookies',
        payload: { analytics: 'yes' }
      })

      const cookies = response.headers['set-cookie']
      expect(cookies).toBeDefined()

      const cookieString = Array.isArray(cookies) ? cookies.join('; ') : cookies
      expect(cookieString).toEqual(
        expect.stringContaining('defra_cookies_policy')
      )
      expect(cookieString).toEqual(
        expect.stringContaining('defra_cookies_policy_set')
      )
    })

    test('should set consent cookies when rejecting analytics', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/cookies',
        payload: { analytics: 'no' }
      })

      const cookies = response.headers['set-cookie']
      expect(cookies).toBeDefined()

      const cookieString = Array.isArray(cookies) ? cookies.join('; ') : cookies
      expect(cookieString).toEqual(
        expect.stringContaining('defra_cookies_policy')
      )
    })
  })

  describe('POST /cookies/accept', () => {
    test('should redirect to return URL with cookieAction param', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/cookies/accept',
        payload: { returnUrl: '/accessibility' }
      })

      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toBe(
        '/accessibility?cookieAction=accept'
      )
    })

    test('should redirect to home when no return URL provided', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/cookies/accept'
      })

      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toBe('/?cookieAction=accept')
    })

    test('should set consent cookies', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/cookies/accept',
        payload: { returnUrl: '/' }
      })

      const cookies = response.headers['set-cookie']
      const cookieString = Array.isArray(cookies) ? cookies.join('; ') : cookies
      expect(cookieString).toEqual(
        expect.stringContaining('defra_cookies_policy')
      )
      expect(cookieString).toEqual(
        expect.stringContaining('defra_cookies_policy_set')
      )
    })
  })

  describe('POST /cookies/reject', () => {
    test('should redirect to return URL with cookieAction param', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/cookies/reject',
        payload: { returnUrl: '/sustainability' }
      })

      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toBe(
        '/sustainability?cookieAction=reject'
      )
    })

    test('should redirect to home when no return URL provided', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/cookies/reject'
      })

      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toBe('/?cookieAction=reject')
    })

    test('should set consent cookies', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/cookies/reject',
        payload: { returnUrl: '/' }
      })

      const cookies = response.headers['set-cookie']
      const cookieString = Array.isArray(cookies) ? cookies.join('; ') : cookies
      expect(cookieString).toEqual(
        expect.stringContaining('defra_cookies_policy')
      )
      expect(cookieString).toEqual(
        expect.stringContaining('defra_cookies_policy_set')
      )
    })
  })
})
