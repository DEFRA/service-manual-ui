import { constants as http2Constants } from 'node:http2'

import * as controller from './controller.js'
import * as schemas from './schemas/index.js'
import * as sessionHelper from './session.js'
import {
  ENTER_EMAIL_TEMPLATE,
  ENTER_CODE_TEMPLATE,
  DEFAULT_CODE_SUBMIT_PATH,
  DEFAULT_CHANGE_EMAIL_PATH
} from './constants.js'

/**
 * Sets up the routes used in the verification code verify flow.
 * These routes are registered in src/server/router.js.
 *
 * The auth: false options on these routes are redundant since no default
 * authentication strategy is set globally. They are kept for clarity and to
 * make the routes more resilient if a default strategy is added in future.
 */
export const verify = {
  plugin: {
    name: 'verify',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/verify',
          handler: controller.getEmailPage,
          options: { auth: false }
        },
        {
          method: 'POST',
          path: '/verify',
          handler: controller.postEmailPage,
          options: {
            auth: false,
            validate: {
              payload: {
                email: schemas.emailSchema.required(),
                returnUrl: schemas.returnUrlSchema
              },
              failAction: async (request, h, err) => {
                const returnUrl = sessionHelper.resolveReturnUrl(
                  request.payload?.returnUrl ?? request.query?.returnUrl
                )
                return h.view(ENTER_EMAIL_TEMPLATE, {
                  pageTitle: 'Sign in',
                  returnUrl,
                  email: request.payload?.email,
                  error: err.message
                }).code(http2Constants.HTTP_STATUS_OK).takeover()
              }
            }
          }
        },
        {
          method: 'GET',
          path: '/verify/code',
          handler: controller.getCodePage,
          options: { auth: false }
        },
        {
          method: 'POST',
          path: '/verify/code',
          handler: controller.postCodePage,
          options: {
            auth: false,
            validate: {
              payload: {
                code: schemas.codeSchema
              },
              failAction: async (request, h, err) => {
                const pendingLogin = sessionHelper.getPendingLogin(request.yar)

                return h.view(ENTER_CODE_TEMPLATE, {
                  pageTitle: 'Enter your code',
                  email: pendingLogin?.email,
                  codeSubmitHref: pendingLogin?.codeSubmitHref ?? DEFAULT_CODE_SUBMIT_PATH,
                  changeEmailHref: pendingLogin?.changeEmailHref ?? DEFAULT_CHANGE_EMAIL_PATH,
                  error: err.message
                }).code(http2Constants.HTTP_STATUS_OK).takeover()
              }
            }
          }
        },
        {
          method: 'POST',
          path: '/verify/sign-out',
          handler: controller.postSignOut,
          options: {
            // Users can only post to sign-out if they have a valid session,
            // but we allow unauthenticated requests too (safe idempotent operation).
            auth: false
          }
        }
      ])
    }
  }
}
