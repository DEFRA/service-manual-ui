import { describe, test, expect, vi, beforeEach } from 'vitest'

import { claimReport, releaseReport } from '../../../../src/server/ai-ask/report-claim.js'

// The session cache module is ours, so it is the seam for the Redis client.
const cache = vi.hoisted(() => ({ client: null }))
vi.mock('../../../../src/server/common/helpers/session-cache/cache-engine.js', () => ({
  getRedisClient: () => cache.client
}))

/**
 * A stand-in for the Redis client with the one behaviour the claim relies on:
 * SET with NX writes only when the key is not there already.
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
      keys.set(key, { value, ttl })
      return 'OK'
    }),
    del: vi.fn(async (key) => {
      keys.delete(key)
    })
  }
}

describe('claimReport, where sessions are in Redis', () => {
  beforeEach(() => {
    cache.client = fakeRedis()
  })

  test('lets the first request for an answer send, and refuses the second', async () => {
    expect(await claimReport('session-a:1')).toBe(true)
    expect(await claimReport('session-a:1')).toBe(false)
  })

  test('keeps claims for different answers and sessions apart', async () => {
    await claimReport('session-a:1')

    expect(await claimReport('session-a:2')).toBe(true)
    expect(await claimReport('session-b:1')).toBe(true)
  })

  test('sets the claim with an expiry, so it clears itself', async () => {
    await claimReport('session-a:1')

    expect(cache.client.set).toHaveBeenCalledWith(
      'ask-report-claim:session-a:1', '1', 'PX', expect.any(Number), 'NX'
    )
    expect(cache.client.set.mock.calls[0][3]).toBeGreaterThan(0)
  })

  test('lets the answer be claimed again once released', async () => {
    await claimReport('session-a:1')

    await releaseReport('session-a:1')

    expect(cache.client.del).toHaveBeenCalledWith('ask-report-claim:session-a:1')
    expect(await claimReport('session-a:1')).toBe(true)
  })
})

describe('claimReport, where sessions are in memory', () => {
  beforeEach(() => {
    cache.client = null
  })

  test('lets the first request for an answer send, and refuses the second', async () => {
    expect(await claimReport('local:1')).toBe(true)
    expect(await claimReport('local:1')).toBe(false)
  })

  test('lets the answer be claimed again once released', async () => {
    await claimReport('local:2')

    await releaseReport('local:2')

    expect(await claimReport('local:2')).toBe(true)
  })
})
