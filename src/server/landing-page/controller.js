/**
 * Landing page controller.
 */
export const landingPageController = {
  handler(_request, h) {
    return h.view('landing-page/landing-page', {
      pageTitle: 'Welcome to Defra Service Manual',
      heading: 'Deliver digital services at Defra',
      headerServiceName: 'Defra Digital',
      headerServiceUrl: '/',
      hideServiceNavigation: true
    })
  }
}
