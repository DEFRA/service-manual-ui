import { describe, test, expect, vi, beforeEach } from 'vitest'

import { claimReport, releaseReport } from '../../../../src/server/ai-ask/report-claim.js'

// The session cache module is ours, so it is the seam for the Redis client.
const cache = vi.hoisted(() => ({ client: null }))
vi.mock('../../../../src/server/common/helpers/session-cache/cache-engine.js', () => ({
  getRedisClient: () => cache.client
}))

/**
 * A stand-in for the Redis client with the behaviour the claim relies on:
 * SET with NX writes only when the key is not there already, and the release
 * script deletes the key only when it still holds the given token.
 * @returns {object}
 */
function fakeRedis () {
  const keys = new Map()

  return {
    keys,
    set: vi.fn(async (key, value, _px, ttl, nx) => {
      if (nx === 'NX' && keys.has(key)) {
        return null
      }
      keys.set(key, value)
      return 'OK'
    }),
    eval: vi.fn(async (_script, _count, key, token) => {
      if (keys.get(key) === token) {
        keys.delete(key)
        return 1
      }
      return 0
    })
  }
}

describe('claimReport, where sessions are in Redis', () => {
  beforeEach(() => {
    cache.client = fakeRedis()
  })

  test('lets the first request for an answer send, and refuses the second', async () => {
    expect(await claimReport('session-a:1')).toEqual(expect.any(String))
    expect(await claimReport('session-a:1')).toBeNull()
  })

  test('keeps claims for different answers and sessions apart', async () => {
    await claimReport('session-a:1')

    expect(await claimReport('session-a:2')).not.toBeNull()
    expect(await claimReport('session-b:1')).not.toBeNull()
  })

  test('sets the claim to its token, with an expiry, so it clears itself', async () => {
    const token = await claimReport('session-a:1')

    expect(cache.client.set).toHaveBeenCalledWith(
      'ask-report-claim:session-a:1', token, 'PX', expect.any(Number), 'NX'
    )
    expect(cache.client.set.mock.calls[0][3]).toBeGreaterThan(0)
  })

  test('lets the answer be claimed again once released by its owner', async () => {
    const token = await claimReport('session-a:1')

    await releaseReport('session-a:1', token)

    expect(await claimReport('session-a:1')).not.toBeNull()
  })

  test('leaves a claim alone when released with a token that is not its own', async () => {
    await claimReport('session-a:1')

    await releaseReport('session-a:1', 'an-expired-claims-token')

    expect(await claimReport('session-a:1')).toBeNull()
  })
})

describe('claimReport, where sessions are in memory', () => {
  beforeEach(() => {
    cache.client = null
  })

  test('lets the first request for an answer send, and refuses the second', async () => {
    expect(await claimReport('local:1')).toEqual(expect.any(String))
    expect(await claimReport('local:1')).toBeNull()
  })

  test('lets the answer be claimed again once released by its owner', async () => {
    const token = await claimReport('local:2')

    await releaseReport('local:2', token)

    expect(await claimReport('local:2')).not.toBeNull()
  })

  test('leaves a claim alone when released with a token that is not its own', async () => {
    await claimReport('local:3')

    await releaseReport('local:3', 'an-expired-claims-token')

    expect(await claimReport('local:3')).toBeNull()
  })
})
