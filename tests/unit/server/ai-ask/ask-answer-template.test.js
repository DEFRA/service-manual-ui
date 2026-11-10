import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nunjucks from 'nunjucks'
import { describe, test, expect } from 'vitest'

import { answerBlocks } from '../../../../src/config/nunjucks/filters/answer-blocks.js'

/**
 * Renders ask-answer.njk directly, bypassing quoteAppearsOnPage, so a list
 * item carrying markup can be checked without needing a real page quote to
 * match against: the escaping is the template's job, the same for a message
 * and a rule.
 */
const dirname = path.dirname(fileURLToPath(import.meta.url))
const templatesDir = path.resolve(dirname, '../../../../src/server/common/templates')
const environment = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(templatesDir),
  { autoescape: true, throwOnUndefined: false, trimBlocks: true, lstripBlocks: true }
)
environment.addFilter('answerBlocks', answerBlocks)

/**
 * @param {object} answer
 * @returns {string}
 */
function renderAnswer (answer) {
  return environment.render('partials/ask-answer.njk', {
    answer,
    answerNumber: 1,
    isLatestTurn: true,
    canFollowUp: false,
    paths: { help: '/ai-toolkit/ask/help', ask: '/ai-toolkit/ask' }
  })
}

describe('ask-answer.njk list rendering', () => {
  test('escapes markup inside a bulleted list item in the message', () => {
    const html = renderAnswer({
      status: 'answered',
      message: '- <b>x</b> & y',
      sources: []
    })

    expect(html).toEqual(expect.stringContaining('<li>&lt;b&gt;x&lt;/b&gt; &amp; y</li>'))
    expect(html).not.toEqual(expect.stringContaining('<b>x</b>'))
  })

  test('escapes markup inside a bulleted list item in a quoted rule', () => {
    const html = renderAnswer({
      status: 'answered',
      message: 'Explanation.',
      rule: {
        text: '- <b>x</b> & y',
        source: { title: 'Example', url: '/example' }
      },
      sources: []
    })

    const rule = html.slice(html.indexOf('app-ask__rule-text'))
    expect(rule).toEqual(expect.stringContaining('<li>&lt;b&gt;x&lt;/b&gt; &amp; y</li>'))
    expect(html).not.toEqual(expect.stringContaining('<b>x</b>'))
  })

  test('escapes markup inside a numbered list item', () => {
    const html = renderAnswer({
      status: 'answered',
      message: 'Explanation.',
      rule: {
        text: '1. <i>first</i> step & this one',
        source: { title: 'Example', url: '/example' }
      },
      sources: []
    })

    expect(html).toEqual(expect.stringContaining('<li value="1">&lt;i&gt;first&lt;/i&gt; step &amp; this one</li>'))
    expect(html).not.toEqual(expect.stringContaining('<i>first</i>'))
  })
})
