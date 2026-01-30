import { vi } from 'vitest'

const mockReadFileSync = vi.fn()
const mockStatSync = vi.fn()
const mockLoggerError = vi.fn()
const mockLoggerWarn = vi.fn()

vi.mock('node:fs', async () => {
  const nodeFs = await import('node:fs')

  return {
    ...nodeFs,
    readFileSync: (...args) => mockReadFileSync(...args),
    statSync: (...args) => mockStatSync(...args)
  }
})

vi.mock('../../../server/common/helpers/logging/logger.js', () => ({
  createLogger: () => ({
    error: (...args) => mockLoggerError(...args),
    warn: (...args) => mockLoggerWarn(...args)
  })
}))

// Set development mode so loadManifest is called on every context() call
vi.stubEnv('NODE_ENV', 'development')

const { context } = await import('./context.js')

describe('#context manifest reload', () => {
  const mockRequest = { path: '/' }

  beforeEach(() => {
    mockReadFileSync.mockReset()
    mockStatSync.mockReset()
    mockLoggerError.mockReset()
    mockLoggerWarn.mockReset()
  })

  test('Should log warning when reload fails but cached manifest exists', () => {
    // First call succeeds — loads manifest into cache
    mockStatSync.mockReturnValue({ mtimeMs: 1 })
    mockReadFileSync.mockReturnValue(`{
      "application.js": "javascripts/application.js"
    }`)
    context(mockRequest)

    expect(mockLoggerError).not.toHaveBeenCalled()

    // Second call — statSync throws, simulating file disappearing
    mockStatSync.mockImplementation(() => {
      throw new Error('ENOENT: file not found')
    })
    context(mockRequest)

    expect(mockLoggerWarn).toHaveBeenCalledWith(
      { err: expect.any(Error) },
      'Webpack assets-manifest.json reload failed, using cached version'
    )
    expect(mockLoggerError).not.toHaveBeenCalled()
  })
})
