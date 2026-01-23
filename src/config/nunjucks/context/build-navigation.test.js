import { buildNavigation } from './build-navigation.js'

function mockRequest(options) {
  return { ...options }
}

describe('#buildNavigation', () => {
  test('Should provide expected navigation details', () => {
    expect(
      buildNavigation(mockRequest({ path: '/non-existent-path' }))
    ).toEqual([
      {
        current: false,
        text: 'Home',
        href: '/service-manual'
      },
      {
        current: false,
        text: 'About',
        href: '/about'
      }
    ])
  })

  test('Should provide expected highlighted navigation details for service manual', () => {
    expect(buildNavigation(mockRequest({ path: '/service-manual' }))).toEqual([
      {
        current: true,
        text: 'Home',
        href: '/service-manual'
      },
      {
        current: false,
        text: 'About',
        href: '/about'
      }
    ])
  })
})
