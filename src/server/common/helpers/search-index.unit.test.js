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
      const [payload, message] = mockLoggerError.mock.calls[0]
      expect(message).toBe('Failed to read content directory')
      expect(Object.keys(payload).sort()).toEqual(['error', 'event'])
      expect(payload.event).toMatchObject({
        type: 'search_index_build',
        action: 'read_dir',
        outcome: 'failure'
      })
      expect(payload.error.message).toContain('ENOENT')
    })
  })

  describe('When a single file fails to read', () => {
    test('Should skip the bad file and continue building the index', () => {
      // Use filenames that map to real registered routes so the index
      // filter does not drop them before the read is attempted.
      mockReaddirSync.mockReturnValue([
        { name: 'accessibility.md', isDirectory: () => false },
        { name: 'patterns.md', isDirectory: () => false }
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
      const [payload, message] = mockLoggerError.mock.calls[0]
      expect(message).toBe('Failed to index markdown file, skipping')
      expect(Object.keys(payload).sort()).toEqual(['error', 'event'])
      expect(payload.event).toMatchObject({
        type: 'search_index_build',
        action: 'index_file',
        reference: 'patterns.md',
        outcome: 'failure'
      })
      expect(payload.error.message).toContain('EACCES')
    })
  })
})
