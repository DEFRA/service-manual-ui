import { vi } from 'vitest'

const mockLoggerError = vi.fn()

vi.mock('./logging/logger.js', () => ({
  createLogger: () => ({
    error: (...args) => mockLoggerError(...args)
  })
}))

const { registerProcessErrorHandlers } = await import(
  './process-error-handlers.js'
)

describe('#registerProcessErrorHandlers', () => {
  let mockProcess
  const handlers = {}

  beforeEach(() => {
    vi.clearAllMocks()
    mockProcess = {
      exitCode: 0,
      on: (event, handler) => {
        handlers[event] = handler
      }
    }
    registerProcessErrorHandlers(mockProcess)
  })

  describe('unhandledRejection', () => {
    test('Should log error and set exit code', () => {
      const error = new Error('test rejection')
      handlers.unhandledRejection(error)

      expect(mockLoggerError).toHaveBeenCalledWith(
        { err: error },
        'Unhandled rejection'
      )
      expect(mockProcess.exitCode).toBe(1)
    })
  })

  describe('uncaughtException', () => {
    test('Should log error and set exit code', () => {
      const error = new Error('test exception')
      handlers.uncaughtException(error)

      expect(mockLoggerError).toHaveBeenCalledWith(
        { err: error },
        'Uncaught exception'
      )
      expect(mockProcess.exitCode).toBe(1)
    })
  })
})
