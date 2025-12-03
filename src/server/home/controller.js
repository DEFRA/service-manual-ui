/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 */
export const homeController = {
  handler(_request, h) {
    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'Home'
    })
  }
}

export const serviceManualController = {
  handler(_request, h) {
    return h.view('home/service-manual', {
      pageTitle: 'Service Manual',
      heading: 'Service Manual'
    })
  }
}
