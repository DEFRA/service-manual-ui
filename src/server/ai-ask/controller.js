import { getNavigation } from '../common/helpers/content-loader.js'

/**
 * Ask the toolkit.
 *
 * Placeholder page. The front door content, the question form and the
 * conversation states are still to build; this exists so the route and its
 * feature flag can be reviewed on their own, before any content lands.
 *
 * The page carries the AI digital toolkit service navigation, as every other
 * toolkit page does. Those pages get it from their markdown frontmatter; this
 * one has no frontmatter, so it reads the same list from navigation.yaml.
 * layouts/page.njk appends the Ask the toolkit item itself, behind the flag.
 */
export const askController = {
  handler (_request, h) {
    return h.view('ai-ask/ask', {
      pageTitle: 'Ask the toolkit',
      headerServiceName: 'AI digital toolkit',
      headerServiceUrl: '/ai-toolkit',
      customNav: getNavigation('nav-ai-toolkit'),
      breadcrumbs: [
        { text: 'Digital Defra', href: '/' },
        { text: 'AI digital toolkit', href: '/ai-toolkit' },
        { text: 'Ask the toolkit' }
      ]
    })
  }
}
