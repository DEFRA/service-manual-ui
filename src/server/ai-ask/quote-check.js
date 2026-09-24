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
 * in the raw source. Tags and link targets are removed first, and emphasis
 * marks count as punctuation.
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

// After the tag name comes either `>` or a space or slash and then whatever,
// so the name and the rest never overlap and the scan is linear.
const tag = /<\/?([a-zA-Z][a-zA-Z0-9]*)(?:[\s/][^<>]*)?>/g
// A link target is either wrapped in angle brackets, which is how Markdown
// writes a URL holding parentheses, or runs to the first closing one.
const image = /!\[([^[\]]*)\]\((?:<[^<>]*>|[^()<>]*)\)/g
const link = /\[([^[\]]*)\]\((?:<[^<>]*>|[^()<>]*)\)/g
// Heading marks, list markers and block quotes at the start of a line.
const blockMarker = /^ *(?:#{1,6}|[-*+]|\d+[.)]) +/gm
const blockQuote = /^ *> */gm
const blankLine = /\n[ \t]*\n/
// A table cell's opening tag. Each cell becomes its own block, marked so a
// quote cannot be stitched together out of cells: a row read across is not a
// sentence, however whole each cell is.
const cellOpen = /<\s*t[dh]\b[^<>]*>/gi
const cellMark = '\uE000' // private use: never on a page, dropped before matching
const wordChar = /[\p{L}\p{N}]/u
const sentenceEnd = /[.!?:]$/
// What can follow a full stop and still be the same sentence end: closing
// quotes and brackets, and Markdown emphasis marks.
const closers = new Set(['"', "'", ')', ']', '*', '_'])

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
    .replace(blockQuote, '\n\n')
    .replace(tag, (_whole, name) => (inlineTags.has(name.toLowerCase()) ? ' ' : '\n\n'))
    .replace(image, '$1')
    .replace(link, '$1')

  for (const [entity, char] of Object.entries(entities)) {
    text = text.replaceAll(entity, char)
  }

  return text.replace(typographyPattern, (char) => typography[char])
}

/**
 * The token without the punctuation, brackets or emphasis marks at either
 * end. "(ATRS)." and "ATRS" are the same word, "**Using.**" is "Using", and
 * a bare "-" is no word at all. Written as loops rather than a regex so the
 * cost is linear in the token however it is made up.
 * @param {string} token
 * @returns {string}
 */
function trimPunctuation (token) {
  let start = 0
  let end = token.length
  while (start < end && !wordChar.test(token[start])) {
    start++
  }
  while (end > start && !wordChar.test(token[end - 1])) {
    end--
  }
  return token.slice(start, end)
}

/**
 * @param {string} token
 * @returns {boolean}
 */
function endsSentence (token) {
  let end = token.length
  while (end > 0 && closers.has(token[end - 1])) {
    end--
  }
  return sentenceEnd.test(token.slice(0, end))
}

/**
 * Adds a token to the block's words. Punctuation on its own, as in
 * `<a href="/x">this</a>.` once the tag is gone, belongs to the word before
 * it: that is where the sentence ends. Before any word there is nothing for
 * it to belong to.
 * @param {Array<{word: string, token: string}>} kept
 * @param {string} token
 */
function keep (kept, token) {
  const word = trimPunctuation(token).toLowerCase()
  if (word !== '') {
    kept.push({ word, token })
    return
  }
  const previous = kept.at(-1)
  if (previous) {
    previous.token += token
  }
}

/**
 * @typedef {object} Word
 * @property {string} text
 * @property {boolean} startsSentence
 * @property {boolean} endsSentence
 * @property {number|null} cell
 */

/**
 * The page's words in order, each knowing whether a sentence starts or ends
 * on it and which table cell, if any, it sits in.
 * @param {string} markdown
 * @returns {Array<Word>}
 */
export function words (markdown) {
  const result = []
  const marked = markdown.replace(cellOpen, (whole) => whole + cellMark)
  let cells = 0

  for (let block of plainText(marked).split(blankLine)) {
    let cell = null
    if (block.includes(cellMark)) {
      cells += 1
      cell = cells
      block = block.replaceAll(cellMark, ' ')
    }

    const kept = []

    for (const token of block.split(/\s+/)) {
      keep(kept, token)
    }

    kept.forEach(({ word, token }, i) => {
      const first = i === 0
      const last = i === kept.length - 1
      result.push({
        text: word,
        startsSentence: first || endsSentence(kept[i - 1].token),
        endsSentence: last || endsSentence(token),
        cell
      })
    })
  }

  return result
}

/**
 * Whether the quote is on the page, word for word and whole.
 *
 * `ok`: the words appear in order and run from the start of a sentence to the
 * end of one. `stitched`: the words appear in order but the match takes in a
 * table cell and something outside it, another cell or the text around the
 * table, so they were never one sentence. A quote may still run across whole
 * list items: the four incident steps are one quote. `partial`: the words
 * appear but the quote starts or stops part way through a sentence, so a
 * condition may have been dropped. `not_found`: a word was changed, added or
 * removed. `empty`: nothing left to check once markup and whitespace are
 * gone, which would otherwise match every page.
 * @param {string} quote
 * @param {string} pageMarkdown
 * @returns {'ok'|'not_found'|'partial'|'stitched'|'empty'}
 */
export function checkQuote (quote, pageMarkdown) {
  const wanted = words(quote).map((word) => word.text)

  if (wanted.length === 0) {
    return 'empty'
  }

  const page = words(pageMarkdown)
  const n = wanted.length
  let outcome = 'not_found'

  for (let start = 0; start + n <= page.length; start++) {
    if (!wanted.every((word, i) => page[start + i].text === word)) {
      continue
    }
    const matched = page.slice(start, start + n)
    const cells = new Set(matched.map((word) => word.cell))
    if (cells.size > 1) {
      outcome = 'stitched'
      continue
    }
    if (matched[0].startsSentence && matched[n - 1].endsSentence) {
      return 'ok'
    }
    if (outcome === 'not_found') {
      outcome = 'partial'
    }
  }

  return outcome
}
