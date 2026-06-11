import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import { fileURLToPath } from 'node:url'

import { createLogger } from './logging/logger.js'
import { buildErrorLog } from './logging/build-error-log.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = path.resolve(dirname, '../../../../src/content')
const NAV_CONFIG_PATH = path.resolve(
  dirname,
  '../../../../src/config/navigation.yaml'
)

// Cache for navigation config (loaded once at startup)
let navigationConfig = null

/**
 * Load navigation configuration from YAML file
 * @returns {Object} Navigation configuration object
 */
function loadNavigationConfig () {
  if (navigationConfig) {
    return navigationConfig
  }

  try {
    const configContent = fs.readFileSync(NAV_CONFIG_PATH, 'utf8')
    navigationConfig = yaml.load(configContent)
    return navigationConfig
  } catch (error) {
    const logger = createLogger()
    navigationConfig = {} // cache "disabled" state so we don't keep re-reading
    logger.warn(
      buildErrorLog(error, {
        type: 'navigation_load',
        action: 'read',
        reference: NAV_CONFIG_PATH
      }),
      `Navigation config not found at ${NAV_CONFIG_PATH}. Nav resolution disabled.`
    )
    return navigationConfig
  }
}

/**
 * Resolve navigation reference to full navigation structure
 * @param {string|Array|undefined} navValue - Navigation value from frontmatter
 * @param {string} navType - Type of nav ('customNav' or 'sectionNav') for error messages
 * @returns {Array|undefined} Resolved navigation array or original value
 */
function resolveNavReference (navValue, navType = 'navigation') {
  if (Array.isArray(navValue)) {
    return navValue
  }

  if (typeof navValue === 'string') {
    const navConfig = loadNavigationConfig()

    // If navConfig is empty (loading disabled), skip resolution to avoid breaking rendering
    if (!navConfig || Object.keys(navConfig).length === 0) {
      return navValue
    }

    // Use own-property check to distinguish missing keys from falsy values
    if (!Object.prototype.hasOwnProperty.call(navConfig, navValue)) {
      throw new Error(
        `Navigation reference "${navValue}" not found in navigation.yaml (${navType})`
      )
    }

    return navConfig[navValue]
  }

  return navValue
}

export function loadContent (filename) {
  const logger = createLogger()
  const fullPath = path.join(CONTENT_DIR, filename)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Content file not found: ${filename}`)
  }

  try {
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContent)

    // Resolve customNav if it's a reference
    if (data.customNav) {
      data.customNav = resolveNavReference(data.customNav, 'customNav')
    }

    // Resolve sectionNav if it's a reference
    if (data.sectionNav) {
      data.sectionNav = resolveNavReference(data.sectionNav, 'sectionNav')
    }

    return {
      meta: data,
      content
    }
  } catch (error) {
    logger.error(
      buildErrorLog(error, {
        type: 'content_load',
        action: 'read',
        reference: filename,
        reason: fullPath
      }),
      'Failed to read or parse content file'
    )

    const newError = new Error(
      `Failed to read or parse content file "${filename}": ${error.message}`,
      { cause: error }
    )
    throw newError
  }
}
