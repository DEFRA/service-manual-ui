import { GetWebIdentityTokenCommand } from '@aws-sdk/client-sts'

import { config } from '../../config/config.js'

import { getToken } from './backend-token.js'

describe('#getToken', () => {
  let originalAuthEnabled
  let stsClient

  beforeEach(() => {
    originalAuthEnabled = config.get('aiTriage.authEnabled')
    stsClient = {
      send: vi.fn().mockResolvedValue({ WebIdentityToken: 'a-signed-jwt' })
    }
  })

  afterEach(() => {
    config.set('aiTriage.authEnabled', originalAuthEnabled)
  })

  test('returns null and does not call STS when auth is disabled', async () => {
    config.set('aiTriage.authEnabled', false)

    await expect(getToken(stsClient)).resolves.toBeNull()
    expect(stsClient.send).not.toHaveBeenCalled()
  })

  test('asks STS for a token with the configured audience, algorithm and duration', async () => {
    config.set('aiTriage.authEnabled', true)

    await expect(getToken(stsClient)).resolves.toBe('a-signed-jwt')

    expect(stsClient.send).toHaveBeenCalledTimes(1)

    const [command] = stsClient.send.mock.calls[0]

    expect(command).toBeInstanceOf(GetWebIdentityTokenCommand)
    expect(command.input).toEqual({
      Audience: [config.get('aiTriage.backendAudience')],
      DurationSeconds: config.get('aiTriage.tokenDurationSeconds'),
      SigningAlgorithm: 'RS256'
    })
  })

  test('does not send tags, which the platform rejects on a container role', async () => {
    config.set('aiTriage.authEnabled', true)

    await getToken(stsClient)

    expect(stsClient.send.mock.calls[0][0].input).not.toHaveProperty('Tags')
  })

  test('throws when there is no STS client to ask', async () => {
    config.set('aiTriage.authEnabled', true)

    await expect(getToken(undefined)).rejects.toThrow(
      'No STS client available to get a backend auth token'
    )
  })

  test('throws when STS returns no token', async () => {
    config.set('aiTriage.authEnabled', true)
    stsClient.send.mockResolvedValue({})

    await expect(getToken(stsClient)).rejects.toThrow(
      'STS returned no WebIdentity token'
    )
  })

  test('propagates an STS failure to the caller', async () => {
    config.set('aiTriage.authEnabled', true)
    stsClient.send.mockRejectedValue(new Error('AccessDeniedException'))

    await expect(getToken(stsClient)).rejects.toThrow('AccessDeniedException')
  })
})
