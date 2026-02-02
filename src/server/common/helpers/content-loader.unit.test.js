import { vi } from 'vitest'

const mockLoggerError = vi.fn()

vi.mock('./logging/logger.js', () => ({
  createLogger: () => ({
    info: vi.fn(),
    error: (...args) => mockLoggerError(...args)
  })
}))

vi.mock('node:fs', async () => {
  const actual = await import('node:fs')
  return {
    ...actual,
    default: {
      ...actual.default,
      existsSync: () => true,
      readFileSync: () => {
        throw new Error('EACCES: permission denied')
      }
    }
  }
})

const { loadContent } = await import('./content-loader.js')

describe('#loadContent error handling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('Should log error and rethrow when readFileSync fails', () => {
    expect(() => loadContent('some-page.md')).toThrow(
      'EACCES: permission denied'
    )

    expect(mockLoggerError).toHaveBeenCalledWith(
      expect.objectContaining({
        err: expect.any(Error),
        filename: 'some-page.md',
        fullPath: expect.stringContaining('some-page.md')
      }),
      'Failed to read or parse content file'
    )
  })
})
