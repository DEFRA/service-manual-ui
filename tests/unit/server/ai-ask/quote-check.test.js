import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, test, expect } from 'vitest'

import {
  checkQuote,
  plainText,
  stripInlineTags,
  words
} from '../../../../src/server/ai-ask/quote-check.js'

// Shared with service-manual-chat-backend, which runs the same file against
// its own checker, so the two cannot drift apart without one of them failing.
const shared = JSON.parse(
  readFileSync(join(import.meta.dirname, 'quote-check-cases.json'), 'utf8')
)

describe('checkQuote', () => {
  test.each(shared.cases.map((c) => [c.name, c]))('%s', (_name, c) => {
    expect(checkQuote(c.quote, shared.pages[c.page])).toBe(c.outcome)
  })

  test('every shared page is used by a case', () => {
    const used = new Set(shared.cases.map((c) => c.page))
    expect([...used].sort()).toEqual(Object.keys(shared.pages).sort())
  })
})

describe('plainText', () => {
  test('removes link targets and tags', () => {
    const text = plainText(
      'See the [tools radar](/ai-toolkit/tools) and <a href="/x">this</a>.'
    )

    expect(text.split(/\s+/).join(' ')).toBe('See the tools radar and this .')
  })

  test('removes a link target written in angle brackets, parentheses and all', () => {
    const text = plainText(
      'See [Travelling securely](<https://intranet.example/Travel(1).aspx>) first.'
    )

    expect(text).toBe('See Travelling securely first.')
  })
})

describe('words', () => {
  test('treats emphasis marks as punctuation, keeping an underscore inside a word', () => {
    expect(words('**Using.** _Also_ my_variable')).toEqual([
      { text: 'using', startsSentence: true, endsSentence: true, cell: null },
      { text: 'also', startsSentence: true, endsSentence: false, cell: null },
      { text: 'my_variable', startsSentence: false, endsSentence: true, cell: null }
    ])
  })

  test('gives punctuation left on its own by a stripped tag to the word before it', () => {
    expect(words('Read <a href="/x">this</a>. Then that')).toEqual([
      { text: 'read', startsSentence: true, endsSentence: false, cell: null },
      { text: 'this', startsSentence: false, endsSentence: true, cell: null },
      { text: 'then', startsSentence: true, endsSentence: false, cell: null },
      { text: 'that', startsSentence: false, endsSentence: true, cell: null }
    ])
  })

  test('marks sentence boundaries across blocks', () => {
    const page = 'First one. Second\n\n<li>Third</li>\n<li>Fourth (x).</li>'

    expect(words(page)).toEqual([
      { text: 'first', startsSentence: true, endsSentence: false, cell: null },
      { text: 'one', startsSentence: false, endsSentence: true, cell: null },
      { text: 'second', startsSentence: true, endsSentence: true, cell: null },
      { text: 'third', startsSentence: true, endsSentence: true, cell: null },
      { text: 'fourth', startsSentence: true, endsSentence: false, cell: null },
      { text: 'x', startsSentence: false, endsSentence: true, cell: null }
    ])
  })
})

describe('stripInlineTags', () => {
  test('keeps block tags', () => {
    const body =
      '<ul class="x">\n<li><strong>Stop.</strong> Now <a href="/y">go</a>.</li>\n</ul>'

    expect(stripInlineTags(body)).toBe('<ul class="x">\n<li>Stop. Now go.</li>\n</ul>')
  })
})

describe('words in a table', () => {
  test('numbers each cell and leaves the text around the table unnumbered', () => {
    const page = 'Before.\n\n<table><tr><th>A b</th><td>C</td></tr></table>\n\nAfter.'
    expect(words(page).map(({ text, cell }) => [text, cell])).toEqual([
      ['before', null], ['a', 1], ['b', 1], ['c', 2], ['after', null]
    ])
  })
})
