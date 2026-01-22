import { deliveryGroupsController } from './controller.js'

export const deliveryGroups = {
  plugin: {
    name: 'delivery-groups',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/delivery-groups',
          ...deliveryGroupsController
        }
      ])
    }
  }
}
