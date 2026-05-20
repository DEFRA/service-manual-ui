import { loadContent } from '../common/helpers/content-loader.js'
import { statusCodes } from '../common/constants/status-codes.js'
import { buildErrorLog } from '../common/helpers/logging/build-error-log.js'

export const getMarkdownPage = (filename) => {
  return (request, h) => {
    try {
      const { meta, content } = loadContent(filename)
      const layout = meta.layout || 'page'
      const template = `common/templates/layouts/${layout}.njk`

      return h.view(template, {
        ...meta,
        content,
        currentUrl: request.path
      })
    } catch (error) {
      request.logger.error(
        buildErrorLog(error, {
          type: 'page_load',
          action: 'render',
          category: 'markdown_pages',
          reference: filename
        }),
        'Failed to load markdown page'
      )
      return h.response('Page not found').code(statusCodes.notFound)
    }
  }
}
