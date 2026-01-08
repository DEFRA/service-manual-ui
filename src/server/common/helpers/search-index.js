import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = path.resolve(dirname, '../../../../src/content')

/**
 * Recursively find all markdown files in a directory
 * @param {string} dir - Directory to search
 * @param {string} basePath - Base path for URL generation
 * @returns {string[]} Array of file paths
 */
function findMarkdownFiles(dir, basePath = '') {
  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.join(basePath, entry.name)

    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath, relativePath))
    } else if (entry.name.endsWith('.md')) {
      files.push(relativePath)
    }
  }

  return files
}

/**
 * Extract searchable text from markdown content
 * Strips markdown syntax and returns plain text
 * @param {string} markdown - Raw markdown content
 * @returns {string} Plain text content
 */
function extractText(markdown) {
  return (
    markdown
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      // Remove inline code
      .replace(/`[^`]+`/g, '')
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove images
      .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
      // Remove headers markdown but keep text
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic
      .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
      // Remove horizontal rules
      .replace(/^[-*_]{3,}\s*$/gm, '')
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Normalise whitespace
      .replace(/\s+/g, ' ')
      .trim()
  )
}

/**
 * Extract section headings from markdown
 * @param {string} markdown - Raw markdown content
 * @returns {string[]} Array of heading texts
 */
function extractHeadings(markdown) {
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push(match[1].trim())
  }

  return headings
}

/**
 * Build the search index from all markdown files
 * @returns {Object[]} Array of search index entries
 */
export function buildSearchIndex() {
  const markdownFiles = findMarkdownFiles(CONTENT_DIR)
  const index = []

  for (const filePath of markdownFiles) {
    const fullPath = path.join(CONTENT_DIR, filePath)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContent)

    // Convert file path to URL path
    // e.g., 'accessibility/manage-accessibility.md' -> '/accessibility/manage-accessibility'
    const url = '/' + filePath.replace(/\.md$/, '')

    const entry = {
      title: data.title || '',
      description: data.description || '',
      caption: data.caption || '',
      sectionTitle: data.sectionTitle || '',
      url,
      headings: extractHeadings(content),
      content: extractText(content)
    }

    index.push(entry)
  }

  return index
}

/**
 * Get the search index (builds it on first call, then caches)
 */
let cachedIndex = null

export function getSearchIndex() {
  if (!cachedIndex) {
    cachedIndex = buildSearchIndex()
  }
  return cachedIndex
}

/**
 * Search the index for matching results
 * @param {string} query - Search query
 * @param {number} limit - Maximum results to return
 * @returns {Object[]} Matching search results
 */
export function searchContent(query, limit = 20) {
  if (!query || typeof query !== 'string') {
    return []
  }

  const searchIndex = getSearchIndex()
  const queryLower = query.toLowerCase().trim()
  const queryTerms = queryLower.split(/\s+/).filter(Boolean)

  if (queryTerms.length === 0) {
    return []
  }

  const results = []

  for (const entry of searchIndex) {
    const titleLower = entry.title.toLowerCase()
    const descriptionLower = entry.description.toLowerCase()
    const sectionLower = entry.sectionTitle.toLowerCase()
    const headingsLower = entry.headings.join(' ').toLowerCase()
    const contentLower = entry.content.toLowerCase()

    let score = 0
    let matched = false

    for (const term of queryTerms) {
      // Title matches score highest
      if (titleLower.includes(term)) {
        score += 100
        matched = true
      }
      // Section title matches
      if (sectionLower.includes(term)) {
        score += 50
        matched = true
      }
      // Description matches
      if (descriptionLower.includes(term)) {
        score += 30
        matched = true
      }
      // Heading matches
      if (headingsLower.includes(term)) {
        score += 20
        matched = true
      }
      // Content matches
      if (contentLower.includes(term)) {
        score += 10
        matched = true
      }
    }

    // Boost exact phrase matches
    if (titleLower.includes(queryLower)) {
      score += 50
    }
    if (descriptionLower.includes(queryLower)) {
      score += 20
    }

    if (matched) {
      results.push({
        title: entry.title,
        description: entry.description,
        sectionTitle: entry.sectionTitle,
        url: entry.url,
        score
      })
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score)

  return results.slice(0, limit)
}

/**
 * Get suggestions for autocomplete
 * @param {string} query - Partial search query
 * @param {number} limit - Maximum suggestions to return
 * @returns {Object[]} Suggested results for autocomplete
 */
export function getSuggestions(query, limit = 5) {
  return searchContent(query, limit)
}
