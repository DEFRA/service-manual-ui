import { Engine as CatboxRedis } from '@hapi/catbox-redis'
import { Engine as CatboxMemory } from '@hapi/catbox-memory'

import { createLogger } from '../logging/logger.js'
import { buildEventLog } from '../logging/build-error-log.js'
import { buildRedisClient } from '../redis-client.js'
import { config } from '../../../../config/config.js'

// The Redis client the session cache uses, once one has been made. Shared so
// other short-lived server-side state, such as Ask the toolkit's report
// claims, sits in the same store as the sessions without a second connection.
let redisClient = null

/**
 * @returns {import('ioredis').Redis | import('ioredis').Cluster | null} The
 *   session cache's Redis client, or null where sessions are in memory
 */
export function getRedisClient () {
  return redisClient
}

export function getCacheEngine (engine) {
  const logger = createLogger()

  if (engine === 'redis') {
    logger.info(
      buildEventLog({
        type: 'session_cache_init',
        action: 'select',
        reason: 'redis'
      }),
      'Using Redis session cache'
    )
    redisClient = buildRedisClient(config.get('redis'))
    return new CatboxRedis({ client: redisClient })
  }

  if (config.get('isProduction')) {
    logger.error(
      {
        event: {
          type: 'session_cache_init',
          action: 'select',
          reason: 'catbox_memory',
          outcome: 'failure'
        }
      },
      'Catbox Memory is for local development only, it should not be used in production!'
    )
  }

  logger.info(
    buildEventLog({
      type: 'session_cache_init',
      action: 'select',
      reason: 'catbox_memory'
    }),
    'Using Catbox Memory session cache'
  )
  return new CatboxMemory()
}
