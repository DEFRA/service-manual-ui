import { tracing } from '@defra/hapi-tracing'

import { config } from '../../../config/config.js'

export const requestTracing = {
  plugin: tracing.plugin,
  options: { tracingHeader: config.get('tracing.header') }
}
