import { getMarkdownPage } from './controller.js'

/**
 * Markdown page routes - maps URL paths to markdown files
 */
const markdownRoutes = [
  '/service-standard',
  '/service-assessments',
  '/architecture-and-software-development',
  '/architecture-and-software-development/core-delivery-platform',
  '/architecture-and-software-development/defra-customer-identity',
  '/architecture-and-software-development/defra-accessible-maps',
  '/accessibility',
  '/components',
  '/patterns',
  '/working-with-defra',
  '/sustainability',
  '/sustainability/objectives',
  '/sustainability/process',
  '/sustainability/metrics'
]

export const markdownPages = {
  plugin: {
    name: 'markdown-pages',
    register: async (server) => {
      const routes = markdownRoutes.map((path) => ({
        method: 'GET',
        path,
        handler: getMarkdownPage(`${path.slice(1)}.md`)
      }))

      server.route(routes)
    }
  }
}
