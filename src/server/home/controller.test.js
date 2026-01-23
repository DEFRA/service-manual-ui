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

    test('should display breadcrumbs back to landing page', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/service-manual'
      })

      expect(result).toEqual(expect.stringContaining('govuk-breadcrumbs'))
      expect(result).toEqual(expect.stringContaining('Defra Digital'))
      expect(result).toEqual(expect.stringContaining('href="/"'))
    })
  })
})
