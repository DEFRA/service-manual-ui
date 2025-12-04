import { loadContent } from './content-loader.js'

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
      expect(() => {
        loadContent('non-existent-file.md')
      }).toThrow('Content file not found')
    })
  })
})
