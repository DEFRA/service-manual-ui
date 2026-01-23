export const deliveryGroupsController = {
  handler(_request, h) {
    return h.view('delivery-groups/delivery-groups', {
      pageTitle: 'Delivery Groups',
      heading: 'Delivery Groups',
      headerServiceName: 'Defra Digital',
      headerServiceUrl: '/',
      hideServiceNavigation: true,
      breadcrumbs: [
        { text: 'Defra Digital', href: '/' },
        { text: 'Delivery Groups' }
      ]
    })
  }
}
