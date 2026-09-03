import hapi from '@hapi/hapi'
import { STSClient } from '@aws-sdk/client-sts'

import { awsClients } from './aws-clients.js'

describe('#awsClients', () => {
  let server

  beforeEach(async () => {
    server = hapi.server()
    await server.register(awsClients)
  })

  afterEach(async () => {
    await server.stop({ timeout: 0 })
  })

  test('decorates the server with a single STS client', () => {
    expect(server.stsClient).toBeInstanceOf(STSClient)
  })

  test('decorates the request with the same client', async () => {
    let requestClient

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        requestClient = request.stsClient
        return 'ok'
      }
    })

    await server.inject('/')

    expect(requestClient).toBe(server.stsClient)
  })

  // The token call sits in the submitter's path and is not covered by the
  // post's AbortSignal, so an unbounded client would hold the submit page open
  // for the OS TCP timeout wherever STS is unreachable.
  test('bounds the client, which the SDK does not do by default', async () => {
    const resolved = await server.stsClient.config.requestHandler.configProvider

    expect(resolved.connectionTimeout).toBe(2000)
    expect(resolved.requestTimeout).toBe(3000)
    await expect(server.stsClient.config.maxAttempts()).resolves.toBe(2)
  })

  test('destroys the client when the server stops', async () => {
    const destroy = vi.spyOn(server.stsClient, 'destroy')

    await server.initialize()
    await server.stop({ timeout: 0 })

    expect(destroy).toHaveBeenCalled()
  })
})
