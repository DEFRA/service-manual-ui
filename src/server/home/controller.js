/**
 * Home page controller.
 */
export const homeController = {
  handler(_request, h) {
    return h.view('home/home', {
      pageTitle: 'Welcome to Defra service manual',
      heading: 'Deliver digital services at Defra',
      headerServiceName: 'Defra digital',
      headerServiceUrl: '/',
      hideServiceNavigation: true
    })
  }
}
