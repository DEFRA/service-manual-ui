import { loadContent } from '../common/helpers/content-loader.js'

export const getMarkdownPage = (filename) => {
  return (request, h) => {
    try {
      const { meta, content } = loadContent(filename)
      const layout = meta.layout || 'page' // Default to page if not specified, though prompt implies specific layouts
      const template = `common/templates/layouts/${layout}.njk`
      
      return h.view(template, {
        ...meta,
        content,
        currentUrl: request.path
      })
    } catch (error) {
      console.error(error)
      // If file not found or other error, return 404
      return h.response('Page not found').code(404)
    }
  }
}

