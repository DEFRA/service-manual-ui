import { vi } from 'vitest'

import { Cluster, Redis } from 'ioredis'

import { config } from '../../../config/config.js'

const capturedHandlers = { connect: null, error: null }
const mockLoggerInfo = vi.fn()
const mockLoggerWarn = vi.fn()
const mockLoggerError = vi.fn()

vi.mock('ioredis', async () => ({
  ...(await vi.importActual('ioredis')),
  Cluster: vi.fn(function () {
    return {
      on: (event, cb) => {
        capturedHandlers[event] = cb
      }
    }
  }),
  Redis: vi.fn(function () {
    return {
      on: (event, cb) => {
        capturedHandlers[event] = cb
      }
    }
  })
}))

vi.mock('./logging/logger.js', () => ({
  createLogger: () => ({
    info: (...args) => mockLoggerInfo(...args),
    warn: (...args) => mockLoggerWarn(...args),
    error: (...args) => mockLoggerError(...args)
  })
}))

const { buildRedisClient } = await import('./redis-client.js')

describe('#buildRedisClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    capturedHandlers.connect = null
    capturedHandlers.error = null
  })

  describe('When Redis Single InstanceCache is requested', () => {
    beforeEach(() => {
      buildRedisClient(config.get('redis'))
    })

    test('Should instantiate a single Redis client', () => {
      expect(Redis).toHaveBeenCalledWith({
        db: 0,
        host: '127.0.0.1',
        keyPrefix: 'service-manual-ui:',
        port: 6379,
        connectTimeout: 5000,
        commandTimeout: 5000,
        keepAlive: 30000,
        enableReadyCheck: true,
        maxRetriesPerRequest: 3,
        retryStrategy: expect.any(Function)
      })
    })

    test('Should log connect event in ECS shape', () => {
      capturedHandlers.connect()

      expect(mockLoggerInfo).toHaveBeenCalledWith(
        {
          event: {
            type: 'redis_connection',
            action: 'connect',
            outcome: 'success'
          }
        },
        'Connected to Redis server'
      )
    })

    test('Should log connection error in ECS shape', () => {
      const error = new Error('ECONNREFUSED')
      capturedHandlers.error(error)

      const [payload, message] = mockLoggerError.mock.calls[0]
      expect(message).toBe('Redis connection error')
      expect(Object.keys(payload).sort()).toEqual(['error', 'event'])
      expect(payload.event).toEqual({
        type: 'redis_connection',
        action: 'connect',
        outcome: 'failure'
      })
      expect(payload.error).toMatchObject({
        message: 'ECONNREFUSED',
        type: 'Error'
      })
    })

    test('Should warn in ECS shape when single-instance max retries exceeded', () => {
      const { retryStrategy } = Redis.mock.calls[0][0]
      const result = retryStrategy(999)

      expect(result).toBeNull()
      expect(mockLoggerWarn).toHaveBeenCalledWith(
        {
          event: {
            type: 'redis_connection',
            action: 'retry',
            outcome: 'failure',
            reason: 'single'
          }
        },
        'Redis max connection retries reached, giving up'
      )
    })

    test('Should return backoff delay below the retry limit', () => {
      const { retryStrategy } = Redis.mock.calls[0][0]

      expect(retryStrategy(1)).toBe(1 * config.get('redis').retryDelayMs)
      expect(mockLoggerWarn).not.toHaveBeenCalled()
    })
  })

  describe('When a Redis Cluster is requested', () => {
    beforeEach(() => {
      buildRedisClient({
        ...config.get('redis'),
        useSingleInstanceCache: false,
        useTLS: true,
        username: 'user',
        password: 'pass'
      })
    })

    test('Should instantiate a Redis Cluster client', () => {
      expect(Cluster).toHaveBeenCalledWith(
        [{ host: '127.0.0.1', port: 6379 }],
        {
          clusterRetryStrategy: expect.any(Function),
          dnsLookup: expect.any(Function),
          keyPrefix: 'service-manual-ui:',
          redisOptions: {
            db: 0,
            connectTimeout: 5000,
            commandTimeout: 5000,
            keepAlive: 30000,
            enableReadyCheck: true,
            maxRetriesPerRequest: 3,
            password: 'pass',
            tls: {},
            username: 'user'
          },
          slotsRefreshTimeout: 10000
        }
      )
    })

    test('Should warn in ECS shape when cluster max retries exceeded', () => {
      const { clusterRetryStrategy } = Cluster.mock.calls[0][1]
      const result = clusterRetryStrategy(999)

      expect(result).toBeNull()
      expect(mockLoggerWarn).toHaveBeenCalledWith(
        {
          event: {
            type: 'redis_connection',
            action: 'retry',
            outcome: 'failure',
            reason: 'cluster'
          }
        },
        'Redis cluster max connection retries reached, giving up'
      )
    })
  })
})
