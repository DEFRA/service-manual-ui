/**
 * Home page controller.
 */
export const homeController = {
  handler(_request, h) {
    return h.view('home/home', {
      pageTitle: 'Welcome to Defra digital',
      heading: 'Deliver digital services at Defra',
      headerServiceName: 'Defra digital',
      headerServiceUrl: '/'
    })
  }
}
