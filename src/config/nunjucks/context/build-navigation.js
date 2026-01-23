export function buildNavigation(request) {
  return [
    {
      text: 'Home',
      href: '/service-manual',
      current: request?.path === '/service-manual'
    },
    {
      text: 'About',
      href: '/about',
      current: request?.path === '/about'
    }
  ]
}
