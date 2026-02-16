import { interruptionController } from './controller.js'
import Joi from 'joi'

export const interruption = {
  plugin: {
    name: 'interruption',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/interruption-card',
          options: {
            validate: {
              query: Joi.object({
                targetUrl: Joi.string().uri().required()
              })
            }
          },
          handler: interruptionController.handler
        }
      ])
    }
  }
}
