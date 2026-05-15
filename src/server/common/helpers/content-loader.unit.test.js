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

    const [payload, message] = mockLoggerError.mock.calls[0]
    expect(message).toBe('Failed to read or parse content file')
    expect(Object.keys(payload).sort()).toEqual(['error', 'event'])
    expect(payload.event).toMatchObject({
      type: 'content_load',
      action: 'read',
      reference: 'some-page.md',
      outcome: 'failure'
    })
    expect(payload.event.reason).toContain('some-page.md')
    expect(payload.error).toMatchObject({
      message: 'EACCES: permission denied',
      type: 'Error'
    })
  })
})
