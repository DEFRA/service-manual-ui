import { config } from '../../config/config.js'
import { statusCodes } from '../common/constants/status-codes.js'
import { getNavigation } from '../common/helpers/content-loader.js'
import {
  getEntries,
  groupByMonth,
  publishedEntries,
  whatsChangedPath
} from './entries.js'

const pageTitle = "What's changed"

const toolkitCrumbs = [
  { text: 'Digital Defra', href: '/' },
  { text: 'AI digital toolkit', href: '/ai-toolkit' }
]

/**
 * What every page in this section shares with the rest of the toolkit.
 * @returns {object} View context
 */
function toolkitView () {
  return {
    headerServiceName: 'AI digital toolkit',
    headerServiceUrl: '/ai-toolkit',
    customNav: getNavigation('nav-ai-toolkit')
  }
}

function listHandler (_request, h) {
  return h.view('whats-changed/list', {
    ...toolkitView(),
    pageTitle,
    breadcrumbs: toolkitCrumbs,
    months: groupByMonth(publishedEntries())
  })
}

function entryHandler (request, h) {
  const posts = publishedEntries().filter((entry) => entry.hasPage)
  const index = posts.findIndex((entry) => entry.slug === request.params.slug)

  if (index === -1) {
    return h.response('Page not found').code(statusCodes.notFound)
  }

  return h.view('whats-changed/entry', {
    ...toolkitView(),
    pageTitle: posts[index].title,
    breadcrumbs: [...toolkitCrumbs, { text: pageTitle, href: whatsChangedPath }],
    entry: posts[index],
    newer: posts[index - 1],
    older: posts[index + 1]
  })
}

/**
 * What's changed: changes to the toolkit and posts from the team.
 *
 * Registered only when featureFlags.whatsChangedEnabled is on, so an
 * environment with the feature off has no route to reach. The block on the
 * toolkit home page checks the same flag. Proved both ways in
 * controller.test.js and controller-gated.test.js.
 */
export const whatsChanged = {
  plugin: {
    name: 'whats-changed',
    register (server) {
      if (!config.get('featureFlags.whatsChangedEnabled')) {
        return
      }

      // Read every entry now, so bad frontmatter fails the deploy rather
      // than the first request.
      getEntries()

      server.route([
        { method: 'GET', path: whatsChangedPath, handler: listHandler },
        {
          method: 'GET',
          path: `${whatsChangedPath}/{slug}`,
          handler: entryHandler
        }
      ])
    }
  }
}
