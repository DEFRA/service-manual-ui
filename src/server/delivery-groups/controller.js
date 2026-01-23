const PAGE_TITLE = 'Delivery Groups'
const DEFRA_DIGITAL = 'Defra Digital'

export const deliveryGroupsController = {
  handler(_request, h) {
    return h.view('delivery-groups/delivery-groups', {
      pageTitle: PAGE_TITLE,
      heading: PAGE_TITLE,
      headerServiceName: DEFRA_DIGITAL,
      headerServiceUrl: '/',
      hideServiceNavigation: true,
      breadcrumbs: [{ text: DEFRA_DIGITAL, href: '/' }, { text: PAGE_TITLE }]
    })
  }
}
