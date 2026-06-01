import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, test, expect, beforeEach, afterEach, vi } from 'vitest'

beforeEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
})

describe('content-loader navigation resolution', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('resolves a string key to an array from navigation.yaml', async () => {
    vi.doMock('node:fs', () => ({
      default: {
        existsSync: () => true,
        readFileSync: (p) => {
          if (p.includes('navigation.yaml')) {
            return `
myNavKey:
  - title: Item 1
    url: /item-1
`
          }
          return `---
customNav: myNavKey
---
Body`
        }
      },
      existsSync: () => true,
      readFileSync: (p) => {
        if (p.includes('navigation.yaml')) {
          return `
myNavKey:
  - title: Item 1
    url: /item-1
`
        }
        return `---
customNav: myNavKey
---
Body`
      }
    }))

    const { loadContent } = await import('./content-loader.js')
    const out = loadContent('any.md')
    expect(Array.isArray(out.meta.customNav)).toBe(true)
    expect(out.meta.customNav[0].title).toBe('Item 1')
  })

  it('throws when navigation key is missing from navigation.yaml', async () => {
    vi.doMock('node:fs', () => ({
      default: {
        existsSync: () => true,
        readFileSync: (p) => {
          if (p.includes('navigation.yaml')) {
            return `
otherKey:
  - title: Something
`
          }
          return `---
customNav: missingKey
---
Body`
        }
      },
      existsSync: () => true,
      readFileSync: (p) => {
        if (p.includes('navigation.yaml')) {
          return `
otherKey:
  - title: Something
`
        }
        return `---
customNav: missingKey
---
Body`
      }
    }))

    const { loadContent } = await import('./content-loader.js')
    expect(() => loadContent('any.md')).toThrow(/not found in navigation.yaml/)
  })

  it('skips resolution when navigation.yaml cannot be read (disabled) and returns the original string', async () => {
    vi.doMock('node:fs', () => ({
      default: {
        existsSync: () => true,
        readFileSync: (p) => {
          if (p.includes('navigation.yaml')) {
            throw new Error('read error')
          }
          return `---
customNav: missingKey
---
Body`
        }
      },
      existsSync: () => true,
      readFileSync: (p) => {
        if (p.includes('navigation.yaml')) {
          throw new Error('read error')
        }
        return `---
customNav: missingKey
---
Body`
      }
    }))

    const { loadContent } = await import('./content-loader.js')
    const out = loadContent('any.md')
    expect(out.meta.customNav).toBe('missingKey')
  })
  afterEach(() => {
    vi.doUnmock('node:fs')
  })
})

const CONTENT_DIR = path.resolve(
  fileURLToPath(new URL('../../../../src/content', import.meta.url))
)

beforeEach(() => {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true })
  }
})

afterEach(() => {
  const files = ['bad-frontmatter.md', 'nav-missing.md']
  files.forEach((f) => {
    const p = path.join(CONTENT_DIR, f)
    if (fs.existsSync(p)) {
      fs.unlinkSync(p)
    }
  })
})

describe('#loadContent', () => {
  describe('when loading a valid markdown file', () => {
    test('Should return meta and content', async () => {
      const { loadContent } = await import('./content-loader.js')
      const result = loadContent('architecture-and-software-development.md')
      expect(result).toHaveProperty('meta')
      expect(result).toHaveProperty('content')
    })

    test('Should parse frontmatter into meta object', async () => {
      const { loadContent } = await import('./content-loader.js')
      const { meta } = loadContent('architecture-and-software-development.md')
      expect(meta).toHaveProperty('title')
      expect(meta).toHaveProperty('layout')
      expect(meta.title).toBe('Architecture and software development')
    })

    test('Should return markdown content as string', async () => {
      const { loadContent } = await import('./content-loader.js')
      const { content } = loadContent(
        'architecture-and-software-development.md'
      )
      expect(typeof content).toBe('string')
      expect(content.length).toBeGreaterThan(0)
    })
  })

  describe('when loading a non-existent file', () => {
    test('Should throw an error', async () => {
      const { loadContent } = await import('./content-loader.js')
      expect(() => loadContent('non-existent-file.md')).toThrow(
        'Content file not found: non-existent-file.md'
      )
    })
  })

  describe('error paths that affect coverage', () => {
    test('wraps parse errors with contextual message and cause', async () => {
      const { loadContent } = await import('./content-loader.js')
      const p = path.join(CONTENT_DIR, 'bad-frontmatter.md')
      fs.writeFileSync(p, '---\nnotvalid: [unclosed\n---\ncontent')

      try {
        loadContent('bad-frontmatter.md')
        throw new Error('expected loadContent to throw')
      } catch (err) {
        expect(err.message).toMatch(
          /Failed to read or parse content file|failed to read or parse/i
        )
        expect(err.cause || err).toBeDefined()
      }
    })

    test('errors when customNav references missing nav key', async () => {
      const { loadContent } = await import('./content-loader.js')
      const p = path.join(CONTENT_DIR, 'nav-missing.md')
      fs.writeFileSync(p, '---\ncustomNav: "nonexistent"\n---\ncontent')

      try {
        loadContent('nav-missing.md')
        throw new Error('expected loadContent to throw')
      } catch (err) {
        const msg =
          err.message + (err.cause?.message ? ` ${err.cause.message}` : '')
        expect(msg).toMatch(
          /Navigation reference "nonexistent" not found|no.?t found in navigation.yaml/
        )
      }
    })
  })
})
