import hapiPino from 'hapi-pino'

import { loggerOptions } from './logger-options.js'

export const requestLogger = {
  plugin: hapiPino,
  options: loggerOptions
}
