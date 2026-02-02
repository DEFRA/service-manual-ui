const PAGE_TITLE = 'Digital Service Manual'

/**
 * Service manual home page controller.
 */
export const serviceManualController = {
  handler(_request, h) {
    return h.view('service-manual/service-manual', {
      pageTitle: PAGE_TITLE,
      heading: PAGE_TITLE,
      headerServiceName: 'Digital service manual',
      headerServiceUrl: '/service-manual'
    })
  }
}
