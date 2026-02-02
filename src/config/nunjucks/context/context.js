import path from 'node:path'
import { readFileSync, statSync } from 'node:fs'

import { config } from '../../config.js'
import { buildNavigation } from './build-navigation.js'
import { createLogger } from '../../../server/common/helpers/logging/logger.js'

const logger = createLogger()
const assetPath = config.get('assetPath')
const manifestPath = path.join(
  config.get('root'),
  '.public/assets-manifest.json'
)
const isDevelopment = process.env.NODE_ENV === 'development'

let webpackManifest
let manifestMtime = 0

function loadManifest() {
  try {
    const stats = statSync(manifestPath)
    // Only reload if file has changed (or is new)
    if (!webpackManifest || stats.mtimeMs !== manifestMtime) {
      webpackManifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
      manifestMtime = stats.mtimeMs
    }
  } catch (error) {
    if (webpackManifest) {
      logger.warn(
        { err: error },
        `Webpack ${path.basename(manifestPath)} reload failed, using cached version`
      )
    } else {
      logger.error(
        { err: error },
        `Webpack ${path.basename(manifestPath)} not found`
      )
    }
  }
}

export function context(request) {
  // In development, always check for updated manifest
  // In production, only load once for performance
  if (isDevelopment || !webpackManifest) {
    loadManifest()
  }

  return {
    assetPath: `${assetPath}/assets`,
    serviceName: config.get('serviceName'),
    serviceUrl: '/',
    breadcrumbs: [],
    navigation: buildNavigation(request),
    getAssetPath(asset) {
      const webpackAssetPath = webpackManifest?.[asset]
      return `${assetPath}/${webpackAssetPath ?? asset}`
    }
  }
}
