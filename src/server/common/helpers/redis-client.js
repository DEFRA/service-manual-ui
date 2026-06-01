import { Cluster, Redis } from 'ioredis'

import { createLogger } from './logging/logger.js'
import { buildErrorLog, buildEventLog } from './logging/build-error-log.js'

function createRetryStrategy (
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

function buildCredentials (redisConfig) {
  if (redisConfig.username === '') {
    return {}
  }
  return { username: redisConfig.username, password: redisConfig.password }
}

function buildSingleInstanceRedis (redisConfig, logger) {
  return new Redis({
    port: redisConfig.port,
    host: redisConfig.host,
    db: redisConfig.db,
    keyPrefix: redisConfig.keyPrefix,
    connectTimeout: redisConfig.connectTimeout,
    commandTimeout: redisConfig.commandTimeout,
    keepAlive: redisConfig.keepAlive,
    enableReadyCheck: redisConfig.enableReadyCheck,
    maxRetriesPerRequest: redisConfig.maxRetriesPerRequest,
    retryStrategy: createRetryStrategy(
      redisConfig.maxRetries,
      redisConfig.retryDelayMs,
      logger,
      'single'
    ),
    ...buildCredentials(redisConfig),
    ...(redisConfig.useTLS ? { tls: {} } : {})
  })
}

function buildClusterRedis (redisConfig, logger) {
  return new Cluster([{ host: redisConfig.host, port: redisConfig.port }], {
    keyPrefix: redisConfig.keyPrefix,
    slotsRefreshTimeout: redisConfig.slotsRefreshTimeout,
    dnsLookup: (address, callback) => callback(null, address),
    clusterRetryStrategy: createRetryStrategy(
      redisConfig.maxRetries,
      redisConfig.retryDelayMs,
      logger,
      'cluster'
    ),
    redisOptions: {
      db: redisConfig.db,
      connectTimeout: redisConfig.connectTimeout,
      commandTimeout: redisConfig.commandTimeout,
      keepAlive: redisConfig.keepAlive,
      enableReadyCheck: redisConfig.enableReadyCheck,
      maxRetriesPerRequest: redisConfig.maxRetriesPerRequest,
      ...buildCredentials(redisConfig),
      ...(redisConfig.useTLS ? { tls: {} } : {})
    }
  })
}

function attachConnectionLogging (redisClient, logger) {
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
}

/**
 * Setup Redis and provide a redis client.
 * Local development uses a single Redis instance; environments use Elasticache / Redis Cluster.
 */
export function buildRedisClient (redisConfig) {
  const logger = createLogger()
  const redisClient = redisConfig.useSingleInstanceCache
    ? buildSingleInstanceRedis(redisConfig, logger)
    : buildClusterRedis(redisConfig, logger)

  attachConnectionLogging(redisClient, logger)
  return redisClient
}
