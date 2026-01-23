const PAGE_TITLE = 'Delivery groups'

export const deliveryGroupsController = {
  handler(_request, h) {
    return h.view('delivery-groups/delivery-groups', {
      pageTitle: PAGE_TITLE,
      heading: PAGE_TITLE,
      headerServiceName: 'Defra digital',
      headerServiceUrl: '/'
    })
  }
}
