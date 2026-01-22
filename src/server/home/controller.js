/**
 * Service manual home page controller.
 */
export const homeController = {
  handler(_request, h) {
    return h.view('home/service-manual', {
      pageTitle: 'Service Manual',
      heading: 'Service Manual',
      headerServiceName: 'Digital service manual',
      headerServiceUrl: '/'
    })
  }
}
