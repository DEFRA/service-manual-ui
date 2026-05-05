import { Cluster, Redis } from 'ioredis'

import { createLogger } from './logging/logger.js'

const RETRY_DELAY_MS = 50

function createRetryStrategy(maxRetries, logger, connectionType = 'single') {
  return (times) => {
    if (times > maxRetries) {
      const message =
        connectionType === 'cluster'
          ? 'Redis cluster max connection retries reached, giving up'
          : 'Redis max connection retries reached, giving up'
      logger.warn(message)
      return null
    }

    return times * RETRY_DELAY_MS
  }
}

/**
 * Setup Redis and provide a redis client.
 * Local development uses a single Redis instance; environments use Elasticache / Redis Cluster.
 */
export function buildRedisClient(redisConfig) {
  const logger = createLogger()
  const port = 6379
  const db = 0
  const { keyPrefix, host } = redisConfig
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
        redisConfig.maxRetriesPerRequest,
        logger,
        'single'
      ),
      ...credentials,
      ...tls
    })
  } else {
    redisClient = new Cluster([{ host, port }], {
      keyPrefix,
      slotsRefreshTimeout: 10000,
      dnsLookup: (address, callback) => callback(null, address),
      clusterRetryStrategy: createRetryStrategy(
        redisConfig.maxRetriesPerRequest,
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
    logger.info('Connected to Redis server')
  })

  redisClient.on('error', (error) => {
    logger.error(`Redis connection error ${error}`)
  })

  return redisClient
}
