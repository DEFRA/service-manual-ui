import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('#deliveryGroupsController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('GET /delivery-groups', () => {
    test('should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('should display hero section with heading and description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('Delivery Groups'))
      expect(result).toEqual(
        expect.stringContaining(
          'Understanding the standards, governance and assurance process'
        )
      )
    })

    test('should display correct page title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('<title>'))
      expect(result).toEqual(expect.stringContaining('Delivery Groups'))
    })

    test('should display Defra header with logo', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('defra-header'))
      expect(result).toEqual(expect.stringContaining('defra-logo.svg'))
    })
  })

  describe('Tiles', () => {
    test('should display Get delivery assurance tile with description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('Get delivery assurance'))
      expect(result).toEqual(
        expect.stringContaining(
          'Track and manage the progress of your deliveries'
        )
      )
    })

    test('should display Follow delivery governance tile with description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(
        expect.stringContaining('Follow delivery governance')
      )
      expect(result).toEqual(
        expect.stringContaining(
          'Understand the boards, approvals and reporting required'
        )
      )
    })

    test('should display Meet delivery standards tile with description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('Meet delivery standards'))
      expect(result).toEqual(
        expect.stringContaining(
          'How to meet the standards expected of a high-performing delivery group'
        )
      )
    })

    test('should display View service insights tile with description', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('View service insights'))
      expect(result).toEqual(
        expect.stringContaining('View end-to-end service maps and insights')
      )
    })

    test('should display all tiles with defra-tile class', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      const tileMatches = result.match(/class="defra-tile"/g)
      expect(tileMatches).not.toBeNull()
      expect(tileMatches.length).toBe(4)
    })
  })

  describe('Breadcrumbs', () => {
    test('should display breadcrumbs with Defra Digital link', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('govuk-breadcrumbs'))
      expect(result).toEqual(expect.stringContaining('Defra Digital'))
      expect(result).toEqual(expect.stringContaining('href="/"'))
    })

    test('should display current page in breadcrumbs', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('Delivery Groups'))
    })
  })

  describe('Navigation', () => {
    test('should display landing navigation bar', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(
        expect.stringContaining('defra-service-navigation')
      )
    })

    test('should include Service Manual link in navigation', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('href="/service-manual"'))
    })

    test('should include Delivery Groups link in navigation', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups'
      })

      expect(result).toEqual(expect.stringContaining('href="/delivery-groups"'))
    })
  })
})
