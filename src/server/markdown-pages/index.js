import { getMarkdownPage } from './controller.js'

export const markdownPages = {
  plugin: {
    name: 'markdown-pages',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/service-standard',
          handler: getMarkdownPage('service-standard.md')
        },
        {
          method: 'GET',
          path: '/architecture-and-software-development',
          handler: getMarkdownPage('architecture-and-software-development.md')
        },
        {
          method: 'GET',
          path: '/accessibility',
          handler: getMarkdownPage('accessibility.md')
        },
        {
          method: 'GET',
          path: '/components',
          handler: getMarkdownPage('components.md')
        },
        {
          method: 'GET',
          path: '/patterns',
          handler: getMarkdownPage('patterns.md')
        },
        {
          method: 'GET',
          path: '/working-with-defra',
          handler: getMarkdownPage('working-with-defra.md')
        },
        {
          method: 'GET',
          path: '/sustainability',
          handler: getMarkdownPage('sustainability.md')
        },
        {
          method: 'GET',
          path: '/sustainability/objectives',
          handler: getMarkdownPage('sustainability/objectives.md')
        },
        {
          method: 'GET',
          path: '/sustainability/process',
          handler: getMarkdownPage('sustainability/process.md')
        },
        {
          method: 'GET',
          path: '/sustainability/metrics',
          handler: getMarkdownPage('sustainability/metrics.md')
        }
      ])
    }
  }
}
