import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('#serviceManualController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('GET /service-manual', () => {
    test('should return service manual home page', async () => {
      const { result, statusCode } = await server.inject({
        method: 'GET',
        url: '/service-manual'
      })

      expect(statusCode).toBe(statusCodes.ok)
      expect(result).toEqual(
        expect.stringContaining('Defra digital service manual')
      )
      expect(result).toEqual(
        expect.stringContaining('Design and build digital services for Defra')
      )
    })

    test('should display service tiles', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/service-manual'
      })

      expect(result).toEqual(expect.stringContaining('Service assessments'))
      expect(result).toEqual(expect.stringContaining('Sustainability'))
      expect(result).toEqual(expect.stringContaining('Accessibility'))
    })

    test('should not display breadcrumbs (has hero instead)', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/service-manual'
      })

      expect(result).not.toEqual(expect.stringContaining('govuk-breadcrumbs'))
    })

    test('should display service navigation with Home link', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/service-manual'
      })

      expect(result).toEqual(
        expect.stringContaining('defra-service-navigation')
      )
      // Check for Home link in navigation
      expect(result).toMatch(/defra-service-navigation__link.*href="\/"/s)
    })
  })
})
