import { getMarkdownPage } from './controller.js'

export const markdownPages = {
  plugin: {
    name: 'markdown-pages',
    register: async (server, options) => {
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
        }
      ])
    }
  }
}

