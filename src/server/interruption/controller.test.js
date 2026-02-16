import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('#interruptionController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('GET /interruption-card', () => {
    test('should return 200 status code when targetUrl is provided', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/interruption-card?targetUrl=https://example.com'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('should return 400 status code when targetUrl is missing', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/interruption-card'
      })

      expect(statusCode).toBe(statusCodes.badRequest)
    })

    test('should display the correct heading', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/interruption-card?targetUrl=https://example.com'
      })

      expect(result).toEqual(
        expect.stringContaining('You are going to an internal service')
      )
    })

    test('should contain the continue button with the correct target URL', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/interruption-card?targetUrl=https://example.com'
      })

      expect(result).toEqual(
        expect.stringContaining('href="https://example.com"')
      )
      expect(result).toEqual(expect.stringContaining('Continue'))
    })
  })
})
