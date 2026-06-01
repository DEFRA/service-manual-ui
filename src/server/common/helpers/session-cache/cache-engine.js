import { Engine as CatboxRedis } from '@hapi/catbox-redis'
import { Engine as CatboxMemory } from '@hapi/catbox-memory'

import { createLogger } from '../logging/logger.js'
import { buildEventLog } from '../logging/build-error-log.js'
import { buildRedisClient } from '../redis-client.js'
import { config } from '../../../../config/config.js'

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
    const redisClient = buildRedisClient(config.get('redis'))
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
