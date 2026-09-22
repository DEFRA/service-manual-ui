/**
 * Does a quoted rule appear, word for word, on the page it cites?
 *
 * The golden set defines an exact quote: the words and their order match the
 * source, and differences in spacing, line breaks and surrounding punctuation
 * do not count. A quote fails if a word is changed, added or removed, or if a
 * condition is dropped. The third failure is the one that matters, so it is
 * reported separately: a service that quotes accurately but selectively is
 * more dangerous than one that paraphrases openly.
 *
 * The comparison is made against the page as a reader sees it. Many rules are
 * written inside markup, `<li><strong>The rule.</strong> The explanation.</li>`,
 * or hold a Markdown link, and a word-for-word quote of either does not appear
 * in the raw source. Tags, link targets and emphasis marks are removed first.
 *
 * service-manual-chat-backend has the same check in `app/ask/quote_check.py`,
 * and both are run against the one list of cases in
 * `tests/unit/server/ai-ask/quote-check-cases.json`. Change all three together.
 */

/**
 * Tags that sit inside a sentence. Every other tag ends a block, and a block
 * boundary is a sentence boundary: a list item that is a fragment with no
 * full stop is still a whole thing to quote.
 */
const inlineTags = new Set([
  'a', 'abbr', 'b', 'br', 'code', 'em', 'i', 'kbd', 'mark', 'small', 'span',
  'strong', 'sub', 'sup'
])

const tag = /<\s*\/?\s*([a-zA-Z][a-zA-Z0-9]*)[^<>]*>/g
const image = /!\[([^\]]*)\]\([^)]*\)/g
const link = /\[([^\]]*)\]\([^)]*\)/g
// Emphasis marks sit at a word boundary; an underscore inside a word does not.
const emphasis = /(?<!\w)[*_]+|[*_]+(?!\w)/g
// Heading marks, list markers and block quotes at the start of a line.
const blockMarker = /^[ \t]*(?:#{1,6}[ \t]+|[-*+][ \t]+|\d+[.)][ \t]+|>[ \t]*)/gm
const blankLine = /\n[ \t]*\n/
const punctuationAtEnds = /^[^\p{L}\p{N}_]+|[^\p{L}\p{N}_]+$/gu
const closers = /["')\]]+$/
const sentenceEnd = /[.!?:]$/

const entities = {
  '&amp;': '&',
  '&nbsp;': ' ',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
}

const typography = {
  '‘': "'", // left single quotation mark
  '’': "'", // right single quotation mark
  '“': '"', // left double quotation mark
  '”': '"', // right double quotation mark
  '‐': '-', // hyphen
  '‑': '-', // non-breaking hyphen
  '‒': '-', // figure dash
  ' ': ' ' // no-break space
}

const typographyPattern = new RegExp(`[${Object.keys(typography).join('')}]`, 'g')

/**
 * The page with `<strong>`, `<a>` and the like removed, blocks intact. This
 * is what the model is given, so it is never asked to quote through markup it
 * cannot see the point of.
 * @param {string} markdown
 * @returns {string}
 */
export function stripInlineTags (markdown) {
  return markdown.replace(tag, (whole, name) =>
    inlineTags.has(name.toLowerCase()) ? '' : whole
  )
}

/**
 * The page as a reader sees it, with a blank line between blocks.
 * @param {string} markdown
 * @returns {string}
 */
export function plainText (markdown) {
  let text = markdown
    .replace(blockMarker, '\n\n')
    .replace(tag, (_whole, name) => (inlineTags.has(name.toLowerCase()) ? ' ' : '\n\n'))
    .replace(image, '$1')
    .replace(link, '$1')

  for (const [entity, char] of Object.entries(entities)) {
    text = text.replaceAll(entity, char)
  }

  return text
    .replace(typographyPattern, (char) => typography[char])
    .replace(emphasis, ' ')
}

/**
 * @param {string} token
 * @returns {boolean}
 */
function endsSentence (token) {
  return sentenceEnd.test(token.replace(closers, ''))
}

/**
 * @typedef {object} Word
 * @property {string} text
 * @property {boolean} startsSentence
 * @property {boolean} endsSentence
 */

/**
 * The page's words in order, each knowing whether a sentence starts or ends
 * on it.
 * @param {string} markdown
 * @returns {Array<Word>}
 */
export function words (markdown) {
  const result = []

  for (const block of plainText(markdown).split(blankLine)) {
    // Punctuation at either end of a token is not part of the word. "(ATRS)."
    // and "ATRS" are the same word; a bare "-" is no word at all.
    const kept = block
      .split(/\s+/)
      .map((token) => ({ word: token.replace(punctuationAtEnds, '').toLowerCase(), token }))
      .filter(({ word }) => word !== '')

    kept.forEach(({ word, token }, i) => {
      const first = i === 0
      const last = i === kept.length - 1
      result.push({
        text: word,
        startsSentence: first || endsSentence(kept[i - 1].token),
        endsSentence: last || endsSentence(token)
      })
    })
  }

  return result
}

/**
 * Whether the quote is on the page, word for word and whole.
 *
 * `ok`: the words appear in order and run from the start of a sentence to the
 * end of one. `partial`: the words appear but the quote starts or stops part
 * way through a sentence, so a condition may have been dropped. `not_found`: a
 * word was changed, added or removed. `empty`: nothing left to check once
 * markup and whitespace are gone, which would otherwise match every page.
 * @param {string} quote
 * @param {string} pageMarkdown
 * @returns {'ok'|'not_found'|'partial'|'empty'}
 */
export function checkQuote (quote, pageMarkdown) {
  const wanted = words(quote).map((word) => word.text)

  if (wanted.length === 0) {
    return 'empty'
  }

  const page = words(pageMarkdown)
  const n = wanted.length
  let found = false

  for (let start = 0; start + n <= page.length; start++) {
    if (!wanted.every((word, i) => page[start + i].text === word)) {
      continue
    }
    found = true
    if (page[start].startsSentence && page[start + n - 1].endsSentence) {
      return 'ok'
    }
  }

  return found ? 'partial' : 'not_found'
}
