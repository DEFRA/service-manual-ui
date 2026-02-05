import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { fileURLToPath } from 'node:url'

import { createLogger } from './logging/logger.js'

const logger = createLogger()
const dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = path.resolve(dirname, '../../../../src/content')

/**
 * Search scoring weights
 */
const SCORE_WEIGHTS = {
  TITLE_MATCH: 100,
  SECTION_MATCH: 50,
  DESCRIPTION_MATCH: 30,
  HEADING_MATCH: 20,
  CONTENT_MATCH: 10,
  TITLE_PHRASE_BOOST: 50,
  DESCRIPTION_PHRASE_BOOST: 20,
  CONTENT_PHRASE_BOOST: 15
}

const DEFAULT_RESULT_LIMIT = 20
const DEFAULT_SUGGESTION_LIMIT = 5

/**
 * Recursively find all markdown files in a directory
 * @param {string} dir - Directory to search
 * @param {string} basePath - Base path for URL generation
 * @returns {string[]} Array of file paths
 */
function findMarkdownFiles(dir, basePath = '') {
  const files = []
  let entries

  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch (error) {
    logger.error({ err: error, dir }, 'Failed to read content directory')
    return []
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.join(basePath, entry.name)

    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath, relativePath))
    } else if (entry.name.endsWith('.md')) {
      files.push(relativePath)
    } else {
      // Non-markdown files are intentionally skipped
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
  return markdown
    .replaceAll(/```[\s\S]*?```/g, '') // Remove code blocks
    .replaceAll(/`[^`]+`/g, '') // Remove inline code
    .replaceAll(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replaceAll(/!\[[^\]]*\]\([^)]+\)/g, '') // Remove images
    .replaceAll(/^#{1,6}\s+/gm, '') // Remove headers markdown but keep text
    .replaceAll(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1') // Remove bold/italic
    .replaceAll(/^[-*_]{3,}\s*$/gm, '') // Remove horizontal rules
    .replaceAll(/<[^>]+>/g, '') // Remove HTML tags
    .replaceAll(/\s+/g, ' ') // Normalise whitespace
    .trim()
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
    try {
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
    } catch (error) {
      logger.error(
        { err: error, filePath },
        'Failed to index markdown file, skipping'
      )
    }
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
 * Calculate match score for a single entry against query terms
 * @param {Object} entry - Search index entry
 * @param {string[]} queryTerms - Array of search terms
 * @param {string} queryLower - Full query in lowercase
 * @returns {{score: number, matched: boolean}} Score and match status
 */
function calculateEntryScore(entry, queryTerms, queryLower) {
  const titleLower = entry.title.toLowerCase()
  const descriptionLower = entry.description.toLowerCase()
  const sectionLower = entry.sectionTitle.toLowerCase()
  const headingsLower = entry.headings.join(' ').toLowerCase()
  const contentLower = entry.content.toLowerCase()

  let score = 0
  let matched = false

  for (const term of queryTerms) {
    if (titleLower.includes(term)) {
      score += SCORE_WEIGHTS.TITLE_MATCH
      matched = true
    }
    if (sectionLower.includes(term)) {
      score += SCORE_WEIGHTS.SECTION_MATCH
      matched = true
    }
    if (descriptionLower.includes(term)) {
      score += SCORE_WEIGHTS.DESCRIPTION_MATCH
      matched = true
    }
    if (headingsLower.includes(term)) {
      score += SCORE_WEIGHTS.HEADING_MATCH
      matched = true
    }
    if (contentLower.includes(term)) {
      score += SCORE_WEIGHTS.CONTENT_MATCH
      matched = true
    }
  }

  // Boost exact phrase matches (multi-word queries appearing together)
  if (queryTerms.length > 1) {
    if (titleLower.includes(queryLower)) {
      score += SCORE_WEIGHTS.TITLE_PHRASE_BOOST
    }
    if (descriptionLower.includes(queryLower)) {
      score += SCORE_WEIGHTS.DESCRIPTION_PHRASE_BOOST
    }
    if (contentLower.includes(queryLower)) {
      score += SCORE_WEIGHTS.CONTENT_PHRASE_BOOST
    }
  }

  return { score, matched }
}

/**
 * Search the index for matching results
 * @param {string} query - Search query
 * @param {number} limit - Maximum results to return
 * @returns {Object[]} Matching search results
 */
export function searchContent(query, limit = DEFAULT_RESULT_LIMIT) {
  if (!query || typeof query !== 'string') {
    return []
  }

  const searchIdx = getSearchIndex()
  const queryLower = query.toLowerCase().trim()
  const queryTerms = queryLower.split(/\s+/).filter(Boolean)

  if (queryTerms.length === 0) {
    return []
  }

  const results = []

  for (const entry of searchIdx) {
    const { score, matched } = calculateEntryScore(
      entry,
      queryTerms,
      queryLower
    )

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
export function getSuggestions(query, limit = DEFAULT_SUGGESTION_LIMIT) {
  return searchContent(query, limit)
}
