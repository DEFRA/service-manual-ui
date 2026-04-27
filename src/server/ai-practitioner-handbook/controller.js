const PAGE_TITLE = 'AI practitioner handbook'

/**
 * AI practitioner handbook landing page controller.
 */
export const aiPractitionerHandbookController = {
  handler(_request, h) {
    return h.view('ai-practitioner-handbook/ai-practitioner-handbook', {
      pageTitle: PAGE_TITLE,
      heading: PAGE_TITLE,
      headerServiceName: 'AI practitioner handbook',
      headerServiceUrl: '/ai-practitioner-handbook'
    })
  }
}
