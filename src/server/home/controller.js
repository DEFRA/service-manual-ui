/**
 * Home page controller.
 */
export const homeController = {
  handler(_request, h) {
    return h.view('home/home', {
      pageTitle: 'Welcome to Defra Service Manual',
      heading: 'Deliver digital services at Defra',
      headerServiceName: 'Defra Digital',
      headerServiceUrl: '/',
      hideServiceNavigation: true
    })
  }
}
