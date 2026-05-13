import { config } from '../../config/config.js'

import * as controller from './controller.js'
import { triageQuestions } from './questions.js'
import { statusCodes } from '../common/constants/status-codes.js'

const checkYourAnswersPath = '/ai-toolkit/triage/check-your-answers'

/**
 * Post-handler to convert file not found errors to 404 responses
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {object} Response or re-thrown error
 */
const handleFileNotFound = (request, h) => {
  const response = request.response

  if (response.isBoom) {
    const originalError = response.cause || response.data
    if (originalError?.code === 'ENOENT') {
      return h.response('Page not found').code(statusCodes.notFound).takeover()
    }
  }

  return h.continue
}

export const aiTriage = {
  plugin: {
    name: 'ai-triage',
    register: async (server) => {
      if (!config.get('aiContent.enabled')) {
        return
      }

      const triageRoutes = triageQuestions.flatMap((path) => {
        const filename = `${path.slice(1)}.md`
        return [
          {
            method: 'GET',
            path,
            handler: controller.getTriagePage(filename),
            options: {
              ext: {
                onPreResponse: { method: handleFileNotFound }
              }
            }
          },
          {
            method: 'POST',
            path,
            handler: controller.postTriagePage(filename),
            options: {
              payload: {
                parse: true,
                allow: 'application/x-www-form-urlencoded'
              },
              ext: {
                onPreResponse: { method: handleFileNotFound }
              }
            }
          }
        ]
      })

      server.route(triageRoutes)

      server.route([
        {
          method: 'GET',
          path: checkYourAnswersPath,
          handler: controller.getSummaryPage,
          options: {
            ext: {
              onPreResponse: { method: handleFileNotFound }
            }
          }
        },
        {
          method: 'POST',
          path: checkYourAnswersPath,
          handler: controller.postSummaryPage,
          options: {
            payload: {
              parse: true,
              allow: 'application/x-www-form-urlencoded'
            },
            ext: {
              onPreResponse: { method: handleFileNotFound }
            }
          }
        },
        {
          method: 'GET',
          path: '/ai-toolkit/triage/thank-you',
          handler: controller.getThankYouPage,
          options: {
            ext: { 
              onPreResponse: { method: handleFileNotFound } }
          }
        }
      ])
    }
  }
}
