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

  describe('Delivery group standards', () => {
    test('GET /delivery-groups/meet-delivery-standards should return 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/delivery-groups/meet-delivery-standards'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('should render overview page with title', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups/meet-delivery-standards'
      })

      expect(result).toEqual(
        expect.stringContaining('Delivery group standards')
      )
      expect(result).toEqual(
        expect.stringContaining('help teams run successful delivery groups')
      )
    })

    test('should display main navigation bar', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups/meet-delivery-standards'
      })

      expect(result).toEqual(
        expect.stringContaining('defra-service-navigation')
      )
      expect(result).toEqual(expect.stringContaining('Service manual'))
      expect(result).toEqual(expect.stringContaining('Delivery groups'))
    })

    test('should display breadcrumbs', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups/meet-delivery-standards'
      })

      expect(result).toEqual(expect.stringContaining('govuk-breadcrumbs'))
      expect(result).toEqual(expect.stringContaining('Delivery groups'))
      expect(result).toEqual(expect.stringContaining('href="/delivery-groups"'))
    })

    test('GET /delivery-groups/meet-delivery-standards/define-outcomes should return 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/delivery-groups/meet-delivery-standards/define-outcomes'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('should render standard 1 with RAG ratings', async () => {
      const { result } = await server.inject({
        method: 'GET',
        url: '/delivery-groups/meet-delivery-standards/define-outcomes'
      })

      expect(result).toEqual(
        expect.stringContaining('1. Define and share outcomes')
      )
      expect(result).toEqual(expect.stringContaining('Why this matters'))
      expect(result).toEqual(expect.stringContaining('govuk-tag--green'))
      expect(result).toEqual(expect.stringContaining('govuk-tag--yellow'))
      expect(result).toEqual(expect.stringContaining('govuk-tag--red'))
    })

    test('GET /delivery-groups/meet-delivery-standards/products-and-services should return 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/delivery-groups/meet-delivery-standards/products-and-services'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('GET /delivery-groups/meet-delivery-standards/roadmap-for-change should return 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/delivery-groups/meet-delivery-standards/roadmap-for-change'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })

    test('GET /delivery-groups/meet-delivery-standards/success-measures should return 200', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/delivery-groups/meet-delivery-standards/success-measures'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })
  })
})
