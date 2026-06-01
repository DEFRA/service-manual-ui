import {
  createMetricsLogger,
  Unit,
  StorageResolution
} from 'aws-embedded-metrics'

import { config } from '../../../config/config.js'
import { createLogger } from './logging/logger.js'
import { buildErrorLog } from './logging/build-error-log.js'

/**
 * Aws embedded metrics wrapper
 */
export async function metricsCounter (metricName, value = 1) {
  const isMetricsEnabled = config.get('isMetricsEnabled')

  if (!isMetricsEnabled) {
    return
  }

  try {
    const metricsLogger = createMetricsLogger()
    metricsLogger.putMetric(
      metricName,
      value,
      Unit.Count,
      StorageResolution.Standard
    )
    await metricsLogger.flush()
  } catch (error) {
    createLogger().error(
      buildErrorLog(error, {
        type: 'metrics_send',
        action: 'put_metric',
        reference: metricName
      }),
      'Failed to send metrics'
    )
  }
}
