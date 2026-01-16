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

  test('Should provide expected response', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(result).toEqual(expect.stringContaining('Service Manual |'))
    expect(result).toEqual(
      expect.stringContaining('Design and build digital services for Defra')
    )
    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should include Standards tile in How to do things section', async () => {
    const { result } = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(result).toEqual(expect.stringContaining('href="/standards"'))
    expect(result).toEqual(expect.stringContaining('Standards'))
  })
})
