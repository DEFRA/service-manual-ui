import { createLogger } from './logging/logger.js'

export function registerProcessErrorHandlers(process) {
  process.on('unhandledRejection', (error) => {
    const logger = createLogger()
    logger.error({ err: error }, 'Unhandled rejection')
    process.exitCode = 1
  })

  process.on('uncaughtException', (error) => {
    const logger = createLogger()
    logger.error({ err: error }, 'Uncaught exception')
    process.exitCode = 1
  })
}
