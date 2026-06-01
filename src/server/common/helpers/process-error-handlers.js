import { createLogger } from './logging/logger.js'
import { buildErrorLog } from './logging/build-error-log.js'

export function registerProcessErrorHandlers (process) {
  process.on('unhandledRejection', (error) => {
    const logger = createLogger()
    logger.error(
      buildErrorLog(error, {
        type: 'process_error',
        action: 'unhandled_rejection'
      }),
      'Unhandled rejection'
    )
    process.exitCode = 1
  })

  process.on('uncaughtException', (error) => {
    const logger = createLogger()
    logger.error(
      buildErrorLog(error, {
        type: 'process_error',
        action: 'uncaught_exception'
      }),
      'Uncaught exception'
    )
    process.exitCode = 1
  })
}
