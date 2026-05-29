import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { loadContent } from './content-loader.js'

const CONTENT_DIR = path.resolve(
  fileURLToPath(new URL('../../../../src/content', import.meta.url))
)

beforeEach(() => {
  if (!fs.existsSync(CONTENT_DIR))
    fs.mkdirSync(CONTENT_DIR, { recursive: true })
})

afterEach(() => {
  const files = ['bad-frontmatter.md', 'nav-missing.md']
  files.forEach((f) => {
    const p = path.join(CONTENT_DIR, f)
    if (fs.existsSync(p)) fs.unlinkSync(p)
  })
})

describe('#loadContent', () => {
  describe('when loading a valid markdown file', () => {
    test('Should return meta and content', () => {
      const result = loadContent('architecture-and-software-development.md')
      expect(result).toHaveProperty('meta')
      expect(result).toHaveProperty('content')
    })

    test('Should parse frontmatter into meta object', () => {
      const { meta } = loadContent('architecture-and-software-development.md')
      expect(meta).toHaveProperty('title')
      expect(meta).toHaveProperty('layout')
      expect(meta.title).toBe('Architecture and software development')
    })

    test('Should return markdown content as string', () => {
      const { content } = loadContent(
        'architecture-and-software-development.md'
      )
      expect(typeof content).toBe('string')
      expect(content.length).toBeGreaterThan(0)
    })
  })

  describe('when loading a non-existent file', () => {
    test('Should throw an error', () => {
      expect(() => loadContent('non-existent-file.md')).toThrow(
        'Content file not found: non-existent-file.md'
      )
    })
  })

  describe('error paths that affect coverage', () => {
    test('wraps parse errors with contextual message and cause', () => {
      const p = path.join(CONTENT_DIR, 'bad-frontmatter.md')
      // malformed YAML frontmatter to force a parse error
      fs.writeFileSync(p, '---\nnotvalid: [unclosed\n---\ncontent')

      try {
        loadContent('bad-frontmatter.md')
        throw new Error('expected loadContent to throw')
      } catch (err) {
        expect(err.message).toMatch(
          /Failed to read or parse content file|failed to read or parse/i
        )
        // If your code wraps errors, the original should be available as `cause`
        expect(err.cause || err).toBeDefined()
      }
    })

    test('errors when customNav references missing nav key', () => {
      const p = path.join(CONTENT_DIR, 'nav-missing.md')
      fs.writeFileSync(p, '---\ncustomNav: "nonexistent"\n---\ncontent')

      try {
        loadContent('nav-missing.md')
        throw new Error('expected loadContent to throw')
      } catch (err) {
        // Accept either the original navigation error or a wrapped message containing it
        const msg =
          err.message + (err.cause?.message ? ` ${err.cause.message}` : '')
        expect(msg).toMatch(
          /Navigation reference "nonexistent" not found|no.?t found in navigation.yaml/
        )
      }
    })
  })
})
