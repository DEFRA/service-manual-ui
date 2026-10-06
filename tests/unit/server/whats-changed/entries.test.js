import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, test, expect } from 'vitest'

import {
  getEntries,
  groupByMonth,
  loadEntries,
  published
} from '../../../../src/server/whats-changed/entries.js'

const fixtures = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../fixtures/whats-changed'
)

describe('loadEntries', () => {
  const entries = loadEntries(path.join(fixtures, 'valid'))

  test('reads only the markdown files, newest first', () => {
    expect(entries.map((entry) => entry.slug)).toEqual([
      'newer-post',
      'guidance-change',
      'older-post'
    ])
  })

  test('gives a post its own page, named after the file', () => {
    expect(entries[0]).toMatchObject({
      title: 'A newer post',
      url: '/ai-toolkit/whats-changed/newer-post',
      hasPage: true,
      month: 'October 2026',
      body: expect.stringContaining('The body of the newer post.')
    })
  })

  test('sends an entry with an href to the page that changed, with no page of its own', () => {
    expect(entries[1]).toMatchObject({
      url: '/ai-toolkit/guidance/report-an-ai-incident',
      hasPage: false
    })
  })

  test('gives a short post a reading time of 1 minute, not 0', () => {
    expect(entries[0].readingMinutes).toBe(1)
  })

  test('counts the words people read, not the markup around a picture', () => {
    const [post] = loadEntries(path.join(fixtures, 'long'))

    expect(post.readingMinutes).toBe(2)
  })

  test.each([
    ['a missing title', 'no-title', /"title" is required/],
    ['a type that is not on the list', 'wrong-type', /"type" must be one of/]
  ])('refuses an entry with %s, naming the file', (_description, folder, message) => {
    expect(() => loadEntries(path.join(fixtures, 'invalid', folder))).toThrow(
      new RegExp(`${folder}\\.md: .*${message.source}`)
    )
  })
})

describe('groupByMonth', () => {
  test('puts entries under the month they were published, newest month first', () => {
    const months = groupByMonth(loadEntries(path.join(fixtures, 'valid')))

    expect(
      months.map(({ month, entries }) => [month, entries.map((e) => e.slug)])
    ).toEqual([
      ['October 2026', ['newer-post', 'guidance-change']],
      ['September 2026', ['older-post']]
    ])
  })
})

describe('published', () => {
  const entries = loadEntries(path.join(fixtures, 'valid'))

  test('leaves out an entry dated after now, so a post can be merged ahead of its day', () => {
    const slugs = published(entries, new Date('2026-10-03')).map((e) => e.slug)

    expect(slugs).toEqual(['guidance-change', 'older-post'])
  })

  test('includes an entry from the start of its own day', () => {
    const slugs = published(entries, new Date('2026-10-04')).map((e) => e.slug)

    expect(slugs).toContain('newer-post')
  })
})

describe('getEntries', () => {
  test('reads the real entries without a frontmatter error', () => {
    expect(getEntries().length).toBeGreaterThan(0)
  })
})
