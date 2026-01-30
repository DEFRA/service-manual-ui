import { vi } from 'vitest'

import { statusCodes } from '../common/constants/status-codes.js'

vi.mock('../common/helpers/content-loader.js', () => ({
  loadContent: () => {
    throw new Error('Content file not found: missing.md')
  }
}))

const { getMarkdownPage } = await import('./controller.js')

describe('#getMarkdownPage error handling', () => {
  test('Should log error and return 404 when loadContent throws', () => {
    const mockLoggerError = vi.fn()
    const mockCode = vi.fn().mockReturnValue('not found response')
    const mockResponse = vi.fn().mockReturnValue({ code: mockCode })

    const request = {
      path: '/missing-page',
      logger: { error: mockLoggerError }
    }
    const h = { response: mockResponse }

    const handler = getMarkdownPage('missing.md')
    const result = handler(request, h)

    expect(mockLoggerError).toHaveBeenCalledWith(
      { err: expect.any(Error) },
      'Failed to load markdown page'
    )
    expect(mockResponse).toHaveBeenCalledWith('Page not found')
    expect(mockCode).toHaveBeenCalledWith(statusCodes.notFound)
    expect(result).toBe('not found response')
  })
})
