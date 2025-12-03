import { statusCodes } from '../common/constants/status-codes.js'

/**
 * A generic health-check endpoint. Used by the platform to check if the service is up and handling requests.
 */
export const healthController = {
  handler(_request, h) {
    return h.response({ message: 'success' }).code(statusCodes.ok)
  }
}
