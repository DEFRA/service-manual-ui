import { Cluster, Redis } from 'ioredis'

import { createLogger } from './logging/logger.js'
import { buildErrorLog, buildEventLog } from './logging/build-error-log.js'

function createRetryStrategy(
  maxRetries,
  retryDelayMs,
  logger,
  connectionType = 'single'
) {
  return (times) => {
    if (times > maxRetries) {
      const message =
        connectionType === 'cluster'
          ? 'Redis cluster max connection retries reached, giving up'
          : 'Redis max connection retries reached, giving up'
      logger.warn(
        {
          event: {
            type: 'redis_connection',
            action: 'retry',
            outcome: 'failure',
            reason: connectionType
          }
        },
        message
      )
      return null
    }

    return times * retryDelayMs
  }
}

/**
 * Setup Redis and provide a redis client.
 * Local development uses a single Redis instance; environments use Elasticache / Redis Cluster.
 */
export function buildRedisClient(redisConfig) {
  const logger = createLogger()
  const {
    port,
    db,
    keyPrefix,
    host,
    retryDelayMs,
    maxRetries,
    slotsRefreshTimeout
  } = redisConfig
  let redisClient

  const credentials =
    redisConfig.username === ''
      ? {}
      : { username: redisConfig.username, password: redisConfig.password }

  const tls = redisConfig.useTLS ? { tls: {} } : {}

  if (redisConfig.useSingleInstanceCache) {
    redisClient = new Redis({
      port,
      host,
      db,
      keyPrefix,
      connectTimeout: redisConfig.connectTimeout,
      commandTimeout: redisConfig.commandTimeout,
      keepAlive: redisConfig.keepAlive,
      enableReadyCheck: redisConfig.enableReadyCheck,
      maxRetriesPerRequest: redisConfig.maxRetriesPerRequest,
      retryStrategy: createRetryStrategy(
        maxRetries,
        retryDelayMs,
        logger,
        'single'
      ),
      ...credentials,
      ...tls
    })
  } else {
    redisClient = new Cluster([{ host, port }], {
      keyPrefix,
      slotsRefreshTimeout,
      dnsLookup: (address, callback) => callback(null, address),
      clusterRetryStrategy: createRetryStrategy(
        maxRetries,
        retryDelayMs,
        logger,
        'cluster'
      ),
      redisOptions: {
        db,
        connectTimeout: redisConfig.connectTimeout,
        commandTimeout: redisConfig.commandTimeout,
        keepAlive: redisConfig.keepAlive,
        enableReadyCheck: redisConfig.enableReadyCheck,
        maxRetriesPerRequest: redisConfig.maxRetriesPerRequest,
        ...credentials,
        ...tls
      }
    })
  }

  redisClient.on('connect', () => {
    logger.info(
      buildEventLog({ type: 'redis_connection', action: 'connect' }),
      'Connected to Redis server'
    )
  })

  redisClient.on('error', (error) => {
    logger.error(
      buildErrorLog(error, {
        type: 'redis_connection',
        action: 'connect'
      }),
      'Redis connection error'
    )
  })

  return redisClient
}
