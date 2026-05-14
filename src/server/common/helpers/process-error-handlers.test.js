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
    test('Should log error in ECS shape and set exit code', () => {
      const error = new Error('test rejection')
      handlers.unhandledRejection(error)

      const [payload, message] = mockLoggerError.mock.calls[0]
      expect(message).toBe('Unhandled rejection')
      expect(Object.keys(payload).sort()).toEqual(['error', 'event'])
      expect(payload.event).toEqual({
        type: 'process_error',
        action: 'unhandled_rejection',
        outcome: 'failure'
      })
      expect(payload.error).toMatchObject({
        message: 'test rejection',
        type: 'Error'
      })
      expect(payload.error.stack_trace).toBe(error.stack)
      expect(mockProcess.exitCode).toBe(1)
    })
  })

  describe('uncaughtException', () => {
    test('Should log error in ECS shape and set exit code', () => {
      const error = new Error('test exception')
      handlers.uncaughtException(error)

      const [payload, message] = mockLoggerError.mock.calls[0]
      expect(message).toBe('Uncaught exception')
      expect(Object.keys(payload).sort()).toEqual(['error', 'event'])
      expect(payload.event).toEqual({
        type: 'process_error',
        action: 'uncaught_exception',
        outcome: 'failure'
      })
      expect(payload.error).toMatchObject({
        message: 'test exception',
        type: 'Error'
      })
      expect(mockProcess.exitCode).toBe(1)
    })
  })
})
