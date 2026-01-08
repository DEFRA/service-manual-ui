import { statusCodes } from '../constants/status-codes.js'

/**
 * Get user-friendly heading for error status codes
 * Following GOV.UK Design System guidance - no technical jargon or error codes
 * @param {number} statusCode - HTTP status code
 * @returns {string} User-friendly error heading
 */
function getErrorHeading(statusCode) {
  switch (statusCode) {
    case statusCodes.notFound:
      return 'Page not found'
    case statusCodes.forbidden:
      return 'Access denied'
    case statusCodes.unauthorized:
      return 'Sign in required'
    case statusCodes.badRequest:
      return 'Bad request'
    default:
      return 'Sorry, there is a problem with the service'
  }
}

/**
 * Hapi onPreResponse extension to catch and render error pages
 * Follows GOV.UK Design System error page patterns
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {object} Rendered error view or continue
 */
export function catchAll(request, h) {
  const { response } = request

  if (!('isBoom' in response)) {
    return h.continue
  }

  const statusCode = response.output.statusCode
  const heading = getErrorHeading(statusCode)

  if (statusCode >= statusCodes.internalServerError) {
    request.logger.error(response?.stack)
  }

  return h
    .view('error/index', {
      pageTitle: heading,
      heading,
      statusCode
    })
    .code(statusCode)
}
