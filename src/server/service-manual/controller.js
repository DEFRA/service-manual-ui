const PAGE_TITLE = 'Service Manual'
const DEFRA_DIGITAL = 'Defra Digital'

/**
 * Service manual home page controller.
 */
export const serviceManualController = {
  handler(_request, h) {
    return h.view('service-manual/service-manual', {
      pageTitle: PAGE_TITLE,
      heading: PAGE_TITLE,
      headerServiceName: 'Digital service manual',
      headerServiceUrl: '/service-manual',
      breadcrumbs: [{ text: DEFRA_DIGITAL, href: '/' }, { text: PAGE_TITLE }]
    })
  }
}
