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
})

describe('words', () => {
  test('treats emphasis marks as punctuation, keeping an underscore inside a word', () => {
    expect(words('**Using.** _Also_ my_variable')).toEqual([
      { text: 'using', startsSentence: true, endsSentence: true },
      { text: 'also', startsSentence: true, endsSentence: false },
      { text: 'my_variable', startsSentence: false, endsSentence: true }
    ])
  })

  test('marks sentence boundaries across blocks', () => {
    const page = 'First one. Second\n\n<li>Third</li>\n<li>Fourth (x).</li>'

    expect(words(page)).toEqual([
      { text: 'first', startsSentence: true, endsSentence: false },
      { text: 'one', startsSentence: false, endsSentence: true },
      { text: 'second', startsSentence: true, endsSentence: true },
      { text: 'third', startsSentence: true, endsSentence: true },
      { text: 'fourth', startsSentence: true, endsSentence: false },
      { text: 'x', startsSentence: false, endsSentence: true }
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
