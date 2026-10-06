/**
 * Entries for "What's changed" in the AI digital toolkit.
 *
 * Each entry is a markdown file in src/content/whats-changed, with
 * its details in frontmatter and the post itself as the body. The file name
 * is the slug. An entry with an href points at the page that changed and has
 * no page of its own; every other entry is a post at /ai-toolkit/whats-changed
 * /<slug>. Entries are checked when first read, so a typo in the frontmatter
 * stops the server starting rather than showing a broken page.
 *
 * The folder sits outside src/content/ai-toolkit on purpose: Ask the toolkit's
 * backend answers from every page in there, and posts are not guidance.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { format } from 'date-fns'
import matter from 'gray-matter'
import Joi from 'joi'

const whatsChangedPath = '/ai-toolkit/whats-changed'
// A common figure for adults reading on screen. Rounded up, so a short post
// still says "1 minute read".
const WORDS_PER_MINUTE = 200

const ENTRIES_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../content/whats-changed'
)

const TYPES = [
  'Blog post',
  'Project update',
  'Guidance updated',
  'Service updated'
]

const entrySchema = Joi.object({
  title: Joi.string().trim().required(),
  date: Joi.date().required(),
  type: Joi.string().valid(...TYPES).required(),
  summary: Joi.string().trim().required(),
  author: Joi.string().trim(),
  authorRole: Joi.string().trim(),
  href: Joi.string().trim()
})

/**
 * How long a post takes to read. Markup is left out, so a picture's
 * description does not count as reading time.
 * @param {string} markdown - The post's body
 * @returns {number} Whole minutes, at least 1
 */
function readingMinutes (markdown) {
  const words = markdown.replace(/<[^<>]*>/g, ' ').split(/\s+/).filter(Boolean)

  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE))
}

/**
 * Reads and checks one entry file.
 * @param {string} dir - Folder holding the entry
 * @param {string} name - File name, which becomes the slug
 * @returns {object} The entry
 * @throws {Error} If the frontmatter is missing something or has a typo
 */
function readEntry (dir, name) {
  const { data, content } = matter(fs.readFileSync(path.join(dir, name), 'utf8'))
  const { error, value } = entrySchema.validate(data, { abortEarly: false })

  if (error) {
    throw new Error(`What's changed entry ${name}: ${error.message}`)
  }

  const slug = name.replace(/\.md$/, '')

  return {
    ...value,
    slug,
    body: content,
    url: value.href ?? `${whatsChangedPath}/${slug}`,
    hasPage: !value.href,
    month: format(value.date, 'MMMM yyyy'),
    readingMinutes: readingMinutes(content)
  }
}

/**
 * Reads every entry in a folder.
 * @param {string} dir - Folder of markdown entry files
 * @returns {object[]} Entries, newest first
 */
function loadEntries (dir) {
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => readEntry(dir, name))
    .sort((a, b) => b.date - a.date || a.slug.localeCompare(b.slug))
}

let cachedEntries = null

/**
 * The toolkit's entries, read once and then kept.
 * @returns {object[]} Entries, newest first
 */
function getEntries () {
  cachedEntries ??= loadEntries(ENTRIES_DIR)
  return cachedEntries
}

/**
 * The newest entries, for the block on the toolkit home page.
 * @param {number} count - How many to return
 * @returns {object[]} Entries, newest first
 */
function latestChanges (count) {
  return getEntries().slice(0, count)
}

/**
 * Groups entries under the month they were published.
 * @param {object[]} entries - Entries, newest first
 * @returns {{ month: string, entries: object[] }[]} Months, newest first
 */
function groupByMonth (entries) {
  const months = new Map()

  for (const entry of entries) {
    months.set(entry.month, [...(months.get(entry.month) ?? []), entry])
  }

  return [...months].map(([month, monthEntries]) => ({
    month,
    entries: monthEntries
  }))
}

export {
  getEntries,
  groupByMonth,
  latestChanges,
  loadEntries,
  whatsChangedPath
}
