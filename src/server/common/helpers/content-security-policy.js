import Blankie from 'blankie'

import { config } from '../../../config/config.js'

const gaMeasurementId = config.get('googleAnalytics.measurementId')
const GA_ANALYTICS_DOMAIN = 'https://www.google-analytics.com'

const gaScriptSrc = gaMeasurementId
  ? ['https://www.googletagmanager.com', GA_ANALYTICS_DOMAIN]
  : []

const gaConnectSrc = gaMeasurementId
  ? [
      GA_ANALYTICS_DOMAIN,
      'https://analytics.google.com',
      'https://region1.google-analytics.com'
    ]
  : []

const gaImgSrc = gaMeasurementId ? [GA_ANALYTICS_DOMAIN] : []

/**
 * Manage content security policies.
 * @satisfies {import('@hapi/hapi').Plugin}
 */
const contentSecurityPolicy = {
  plugin: Blankie,
  options: {
    // Hash 'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw=' is to support a GOV.UK frontend script bundled within Nunjucks macros
    // https://frontend.design-system.service.gov.uk/import-javascript/#if-our-inline-javascript-snippet-is-blocked-by-a-content-security-policy
    defaultSrc: ['self'],
    fontSrc: ['self', 'data:'],
    connectSrc: ['self', 'wss', 'data:', ...gaConnectSrc],
    mediaSrc: ['self'],
    styleSrc: ['self'],
    scriptSrc: [
      'self',
      "'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw='",
      ...gaScriptSrc
    ],
    imgSrc: ['self', 'data:', ...gaImgSrc],
    frameSrc: ['self', 'data:'],
    objectSrc: ['none'],
    frameAncestors: ['none'],
    formAction: ['self'],
    manifestSrc: ['self'],
    generateNonces: false
  }
}

export { contentSecurityPolicy }
