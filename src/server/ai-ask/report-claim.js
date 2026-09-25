import { getRedisClient } from '../common/helpers/session-cache/cache-engine.js'

// How long a report stays claimed, in milliseconds. Long enough to outlast
// the Notify call and the moment before the session records the report, then
// the claim clears itself.
const CLAIM_MS = 60_000

// Prefixed so the claims sit apart from the sessions in the same Redis.
const KEY_PREFIX = 'ask-report-claim:'

// Used only where sessions are kept in memory, which is on one machine in
// local development, so one process sees every request.
const localClaims = new Set()

/**
 * Claims the right to send one answer's report, so two submissions of the
 * same form at the same moment, a double click or a resent form, send one
 * email between them, whichever instance each lands on.
 *
 * Where sessions are in Redis, the claim is a Redis key set only if it is not
 * there already, in one atomic step, so two instances cannot both win. It
 * expires on its own. Where sessions are in memory, there is one process, and
 * a set in that process does the same job.
 * @param {string} key - The session and the answer, together
 * @returns {Promise<boolean>} Whether this request is the one to send
 */
async function claimReport (key) {
  const redis = getRedisClient()

  if (redis) {
    const result = await redis.set(`${KEY_PREFIX}${key}`, '1', 'PX', CLAIM_MS, 'NX')

    return result === 'OK'
  }

  if (localClaims.has(key)) {
    return false
  }

  localClaims.add(key)
  setTimeout(() => localClaims.delete(key), CLAIM_MS).unref()

  return true
}

/**
 * Lets the answer be reported again, after a send that failed.
 * @param {string} key
 * @returns {Promise<void>}
 */
async function releaseReport (key) {
  const redis = getRedisClient()

  if (redis) {
    await redis.del(`${KEY_PREFIX}${key}`)
    return
  }

  localClaims.delete(key)
}

export { claimReport, releaseReport }
