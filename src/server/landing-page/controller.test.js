import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('#landingPageController', () => {
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
        expect.stringContaining('Welcome to Defra Service Manual')
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
  })

  describe('Tiles', () => {
    test('should display Service Manual tile with correct link and description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('Defra Service Manual'))
      expect(result).toEqual(expect.stringContaining('href="/service-manual"'))
      expect(result).toEqual(
        expect.stringContaining(
          'Check the requirements you need to follow and how to design and deliver great services'
        )
      )
    })

    test('should display Delivery Groups tile with correct link and description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('Delivery Groups'))
      expect(result).toEqual(expect.stringContaining('href="/delivery-groups"'))
      expect(result).toEqual(
        expect.stringContaining(
          'Find out about the different delivery groups and how they support your work'
        )
      )
    })

    test('should display Secure by Design tile', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('Secure by Design'))
      expect(result).toEqual(
        expect.stringContaining(
          'Make and keep your capabilities or services secure'
        )
      )
    })

    test('should display AI Handbook tile', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('AI Practitioner'))
      expect(result).toEqual(expect.stringContaining('Handbook'))
      expect(result).toEqual(
        expect.stringContaining(
          'Find the latest guidance on how to develop and use AI safely'
        )
      )
    })

    test('should display all tiles with defra-tile class', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      // Count the number of defra-tile elements (should be 4 main tiles)
      const tileMatches = result.match(/class="defra-tile"/g)
      expect(tileMatches).not.toBeNull()
      expect(tileMatches.length).toBeGreaterThanOrEqual(4)
    })
  })

  describe('Navigation', () => {
    test('should display landing navigation bar', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(
        expect.stringContaining('defra-service-navigation')
      )
    })

    test('should include Service Manual link in navigation', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('href="/service-manual"'))
      expect(result).toEqual(expect.stringContaining('Service Manual'))
    })

    test('should include Delivery Groups link in navigation', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/'
      })

      expect(result).toEqual(expect.stringContaining('href="/delivery-groups"'))
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
        expect.stringContaining('More guidance and resources will be available')
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
