import { createServer } from '../server.js'
import { statusCodes } from '../common/constants/status-codes.js'

describe('#markdownPagesController', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  describe('GET /architecture-and-software-development', () => {
    test('Should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/architecture-and-software-development'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('Should render page with title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/architecture-and-software-development'
      })

      expect(result).toEqual(
        expect.stringContaining('Architecture and software development')
      )
    })

    test('Should render markdown content as HTML', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/architecture-and-software-development'
      })

      // Check that markdown headings are converted to HTML
      expect(result).toEqual(
        expect.stringContaining('Defra software development standards')
      )
    })
  })

  describe('GET /accessibility', () => {
    test('Should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/accessibility'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('Should render page with title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/accessibility'
      })

      expect(result).toEqual(expect.stringContaining('Accessibility'))
    })
  })

  describe('GET /service-standard', () => {
    test('Should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/service-standard'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })
  })

  describe('GET /components', () => {
    test('Should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/components'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })
  })

  describe('GET /patterns', () => {
    test('Should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/patterns'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })
  })

  describe('GET /working-with-defra', () => {
    test('Should return 200 status code', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/working-with-defra'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })
  })

  describe('Breadcrumbs', () => {
    test('should include breadcrumbs with full navigation path', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/accessibility'
      })

      expect(result).toEqual(expect.stringContaining('govuk-breadcrumbs'))
      expect(result).toEqual(expect.stringContaining('Defra digital'))
      expect(result).toEqual(expect.stringContaining('href="/"'))
      expect(result).toEqual(expect.stringContaining('Service manual'))
      expect(result).toEqual(expect.stringContaining('href="/service-manual"'))
    })
  })
})
