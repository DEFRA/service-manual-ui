import { config } from '../../config/config.js'
import * as controller from './controller.js'
import { triageQuestions } from './questions.js'

const checkYourAnswersPath = '/ai-toolkit/triage/check-your-answers'

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
            handler: controller.getTriagePage(filename)
          },
          {
            method: 'POST',
            path,
            handler: controller.postTriagePage(filename),
            options: {
              payload: {
                parse: true,
                allow: 'application/x-www-form-urlencoded'
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
          handler: controller.getSummaryPage
        },
        {
          method: 'POST',
          path: checkYourAnswersPath,
          handler: controller.postSummaryPage,
          options: {
            payload: {
              parse: true,
              allow: 'application/x-www-form-urlencoded'
            }
          }
        }
      ])
    }
  }
}
