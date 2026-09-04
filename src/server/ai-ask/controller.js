/**
 * Ask the toolkit.
 *
 * Placeholder page. The front door content, the question form and the
 * conversation states are still to build; this exists so the route and its
 * feature flag can be reviewed on their own, before any content lands.
 */
export const askController = {
  handler (_request, h) {
    return h.view('ai-ask/ask', {
      pageTitle: 'Ask the toolkit',
      breadcrumbs: [
        { text: 'Digital Defra', href: '/' },
        { text: 'AI digital toolkit', href: '/ai-toolkit' },
        { text: 'Ask the toolkit' }
      ]
    })
  }
}
