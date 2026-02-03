import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('#homeController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('GET /', () => {
    test('should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('should display hero section with heading and description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(
        expect.stringContaining('Deliver digital services at Defra')
      )
      expect(result).toEqual(
        expect.stringContaining(
          'Tools, guidance and support to help you design, build and operate successful services'
        )
      )
    })

    test('should display correct page title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(
        expect.stringContaining('Welcome to Defra digital')
      )
    })

    test('should display Defra header with logo', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('defra-header'))
      expect(result).toEqual(expect.stringContaining('defra-logo.svg'))
    })

    test('should have logo as non-interactive image (not a link)', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      // Logo should NOT be wrapped in a link (accessibility fix)
      expect(result).not.toEqual(
        expect.stringContaining('defra-header__logo-link')
      )
      // Service name should still be a link
      expect(result).toEqual(
        expect.stringContaining('class="defra-header__service-name"')
      )
    })
  })

  describe('Tiles', () => {
    test('should display service manual tile with correct link and description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('Digital service manual'))
      expect(result).toEqual(expect.stringContaining('href="/service-manual"'))
      expect(result).toEqual(
        expect.stringContaining(
          'Check the requirements you need to follow and how to design and deliver great services'
        )
      )
    })

    test('should display Delivery groups tile with correct link and description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('Delivery groups'))
      expect(result).toEqual(expect.stringContaining('href="/delivery-groups"'))
      expect(result).toEqual(
        expect.stringContaining(
          'Find out about the different delivery groups and how they support your work'
        )
      )
    })

    test('should display two main tiles', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      const tileMatches = result.match(/class="defra-tile"/g)
      expect(tileMatches).not.toBeNull()
      expect(tileMatches.length).toBe(2)
    })
  })

  describe('Navigation', () => {
    test('should display main navigation bar', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(
        expect.stringContaining('defra-service-navigation')
      )
      expect(result).toEqual(expect.stringContaining('Digital service manual'))
      expect(result).toEqual(expect.stringContaining('Delivery groups'))
    })
  })

  describe('Coming soon section', () => {
    test('should display coming soon section', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('Coming soon'))
      expect(result).toEqual(
        expect.stringContaining(
          'We are adding more guidance soon. Contact us to suggest content.'
        )
      )
    })

    test('should display contact button', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('Contact us'))
      expect(result).toEqual(expect.stringContaining('govuk-button'))
    })
  })
})
