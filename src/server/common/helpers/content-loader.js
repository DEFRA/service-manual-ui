import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = path.resolve(dirname, '../../../../src/content')

export function loadContent(filename) {
  const fullPath = path.join(CONTENT_DIR, filename)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Content file not found: ${filename}`)
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    meta: data,
    content
  }
}
