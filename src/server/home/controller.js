/**
 * Home page controller.
 */
export const homeController = {
  handler(_request, h) {
    return h.view('home/home', {
      pageTitle: 'Welcome to Digital Defra',
      heading: 'Deliver digital services at Defra',
      headerServiceName: 'Digital Defra',
      headerServiceUrl: '/'
    })
  }
}
