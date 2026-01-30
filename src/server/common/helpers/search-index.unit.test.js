import { vi } from 'vitest'

const mockLoggerError = vi.fn()

vi.mock('./logging/logger.js', () => ({
  createLogger: () => ({
    info: vi.fn(),
    error: (...args) => mockLoggerError(...args)
  })
}))

const mockReaddirSync = vi.fn()
const mockReadFileSync = vi.fn()

vi.mock('node:fs', async () => {
  const actual = await import('node:fs')
  return {
    ...actual,
    default: {
      ...actual.default,
      readdirSync: (...args) => mockReaddirSync(...args),
      readFileSync: (...args) => mockReadFileSync(...args)
    }
  }
})

const { buildSearchIndex } = await import('./search-index.js')

describe('#searchIndex error handling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When content directory cannot be read', () => {
    test('Should log error and return empty index', () => {
      mockReaddirSync.mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory')
      })

      const index = buildSearchIndex()

      expect(index).toEqual([])
      expect(mockLoggerError).toHaveBeenCalledWith(
        expect.objectContaining({ err: expect.any(Error) }),
        'Failed to read content directory'
      )
    })
  })

  describe('When a single file fails to read', () => {
    test('Should skip the bad file and continue building the index', () => {
      mockReaddirSync.mockReturnValue([
        { name: 'good.md', isDirectory: () => false },
        { name: 'bad.md', isDirectory: () => false }
      ])

      let callCount = 0
      mockReadFileSync.mockImplementation(() => {
        callCount++
        if (callCount === 2) {
          throw new Error('EACCES: permission denied')
        }
        return '---\ntitle: Good Page\n---\nContent here'
      })

      const index = buildSearchIndex()

      expect(index).toHaveLength(1)
      expect(index[0].title).toBe('Good Page')
      expect(mockLoggerError).toHaveBeenCalledWith(
        expect.objectContaining({
          err: expect.any(Error),
          filePath: 'bad.md'
        }),
        'Failed to index markdown file, skipping'
      )
    })
  })
})
