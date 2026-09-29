import { randomUUID } from 'node:crypto'

import { config } from '../../config/config.js'
import { getRedisClient } from '../common/helpers/session-cache/cache-engine.js'

// How long a report stays claimed: as long as the session, so the claim, not
// the session, is what stops an answer being reported twice. The session is
// saved whole at the end of each request, so two requests at once in one
// session can undo each other's changes; the claim sits outside it. A failed
// send releases the claim at once, so this only holds sent reports, and a
// claim left by an instance that stopped mid-send.
const CLAIM_MS = config.get('session.cache.ttl')

// Prefixed so the claims sit apart from the sessions in the same Redis.
const KEY_PREFIX = 'ask-report-claim:'

// Deletes the claim only if it still holds this request's token, in one step,
// so a request whose claim expired cannot delete a newer request's claim.
const RELEASE_IF_OWNER = `if redis.call('get', KEYS[1]) == ARGV[1] then
  return redis.call('del', KEYS[1])
end
return 0`

// Used only where sessions are kept in memory, which is on one machine in
// local development, so one process sees every request. Claim key to token.
const localClaims = new Map()

/**
 * Claims the right to send one answer's report, so two submissions of the
 * same form at the same moment, a double click or a resent form, send one
 * email between them, whichever instance each lands on.
 *
 * Where sessions are in Redis, the claim is a Redis key set only if it is not
 * there already, in one atomic step, so two instances cannot both win. It
 * expires on its own. Where sessions are in memory, there is one process, and
 * a map in that process does the same job.
 *
 * The claim holds a token only this request knows, so releasing it can never
 * remove a claim some later request took after this one expired.
 * @param {string} key - The session and the answer, together
 * @returns {Promise<string|null>} This request's token, or null if another
 *   request holds the claim
 */
async function claimReport (key) {
  const token = randomUUID()
  const redis = getRedisClient()

  if (redis) {
    const result = await redis.set(`${KEY_PREFIX}${key}`, token, 'PX', CLAIM_MS, 'NX')

    return result === 'OK' ? token : null
  }

  if (localClaims.has(key)) {
    return null
  }

  localClaims.set(key, token)
  setTimeout(() => releaseLocal(key, token), CLAIM_MS).unref()

  return token
}

/**
 * @param {string} key
 * @param {string} token
 * @returns {void}
 */
function releaseLocal (key, token) {
  if (localClaims.get(key) === token) {
    localClaims.delete(key)
  }
}

/**
 * Lets the answer be reported again, after a send that failed. Does nothing if
 * the claim has since passed to another request.
 * @param {string} key
 * @param {string} token - The token claimReport returned to this request
 * @returns {Promise<void>}
 */
async function releaseReport (key, token) {
  const redis = getRedisClient()

  if (redis) {
    await redis.eval(RELEASE_IF_OWNER, 1, `${KEY_PREFIX}${key}`, token)
    return
  }

  releaseLocal(key, token)
}

export { claimReport, releaseReport }
