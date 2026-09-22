import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

import { describe, test, expect, vi } from 'vitest'

import { loadContent } from '../../../../src/server/common/helpers/content-loader.js'
import { toViewModel, quoteAppearsOnPage } from '../../../../src/server/ai-ask/answer.js'
import { fixtureAnswerFor } from '../../../../src/server/ai-ask/__fixtures__/answers.js'

const logger = vi.hoisted(() => ({ warn: vi.fn(), error: vi.fn() }))

// Both are modules this repo owns. The logger is replaced so the log lines can
// be asserted on; the content loader is wrapped, not replaced, so every other
// test here still reads the real guidance.
vi.mock('../../../../src/server/common/helpers/logging/logger.js', () => ({
  createLogger: () => logger
}))

vi.mock('../../../../src/server/common/helpers/content-loader.js', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, loadContent: vi.fn(actual.loadContent) }
})

const dataGuidanceUrl = '/ai-toolkit/guidance/using-data-with-ai'

// Copied from src/content/ai-toolkit/guidance/using-data-with-ai.md
const realQuote =
  'For personal data, the DPIA route is for a service you are building to process it, not a way to paste it into an everyday tool. For everyday use, remove personal data first.'

const contentRoot = join('src', 'content')
const shortestRule = 20

/**
 * @param {string} dir
 * @returns {Array<string>} Every markdown file below dir
 */
function markdownFilesIn (dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      return markdownFilesIn(path)
    }
    return path.endsWith('.md') ? [path] : []
  })
}

/**
 * Every rule the toolkit writes as `<li><strong>The rule.</strong> …</li>`,
 * paired with the address of the page it is on. A word-for-word quote of one
 * of these does not appear in the source, because a closing tag sits inside
 * the sentence, so each is a case the verifier has to strip markup to accept.
 * @returns {Array<[string, string]>} Page address and rule text
 */
function rulesWrittenInsideMarkup () {
  return markdownFilesIn(join(contentRoot, 'ai-toolkit')).flatMap((file) => {
    const page = relative(contentRoot, file).split(sep).join('/')
    const url = `/${page.replace(/\.md$/, '')}`

    return [...readFileSync(file, 'utf8').matchAll(/<li><strong>([\s\S]*?)<\/li>/g)]
      .map((match) => match[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim())
      .filter((rule) => rule.length > shortestRule && !rule.includes('href'))
      .map((rule) => [url, rule])
  })
}

describe('quoteAppearsOnPage', () => {
  test('accepts a quote that is on the page it cites', () => {
    expect(quoteAppearsOnPage(realQuote, dataGuidanceUrl)).toBe(true)
  })

  test('accepts a quote that is wrapped differently to the source', () => {
    const rewrapped = realQuote.replace(' not a way', '\n  not a way')

    expect(quoteAppearsOnPage(rewrapped, dataGuidanceUrl)).toBe(true)
  })

  test('rejects a paraphrase, however close', () => {
    const paraphrase = realQuote.replace('remove personal data first', 'remove personal data')

    expect(quoteAppearsOnPage(paraphrase, dataGuidanceUrl)).toBe(false)
  })

  test('rejects a quote attributed to the wrong page', () => {
    expect(quoteAppearsOnPage(realQuote, '/ai-toolkit/tools')).toBe(false)
  })

  test('rejects a page this service does not serve', () => {
    expect(quoteAppearsOnPage(realQuote, '/ai-toolkit/invented')).toBe(false)
  })

  // Every string contains the empty string, so a quote with no words left in
  // it after normalising would otherwise be accepted against any page and
  // rendered as a verified rule.
  test.each([
    ['markup and nothing else', '<strong></strong>'],
    ['a single tag', '<br>'],
    ['whitespace only', '   \n  '],
    ['nothing at all', '']
  ])('rejects %s rather than matching every page', (_description, quote) => {
    expect(quoteAppearsOnPage(quote, dataGuidanceUrl)).toBe(false)
  })

  test('logs an emptied quote as its own outcome, still without the words', () => {
    quoteAppearsOnPage('<strong></strong>', dataGuidanceUrl)

    expect(logger.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({
          outcome: 'empty',
          reference: dataGuidanceUrl
        })
      }),
      expect.stringContaining('no words in it')
    )
  })

  // Twenty-seven rules across six pages are written inside markup, as
  // <li><strong>The rule.</strong> The explanation.</li>. Quoting one of them
  // word for word produces text that is not in the source, because a closing
  // tag sits inside the sentence. Every one of these was dropped as a
  // misquote until normalise learned to strip tags.
  describe('a rule written inside markup', () => {
    const incidentUrl = '/ai-toolkit/guidance/report-an-ai-incident'

    test.each([
      [
        'one step, rule and explanation either side of a closing tag',
        'Do not delete or change anything. The people handling the incident need to see clearly what happened.'
      ],
      [
        'the bold part on its own',
        'Stop using the AI tool immediately.'
      ],
      [
        'a rule that runs out of the bold and into the sentence',
        "Report it through Defra's security incident process so the information security team can assess it."
      ],
      [
        'all four steps, which are four separate list items',
        "Stop using the AI tool immediately. Do not delete or change anything. The people handling the incident need to see clearly what happened. Tell your line manager and your team's information asset owner. Give a short description of what happened and what data was involved. Report it through Defra's security incident process so the information security team can assess it."
      ]
    ])('accepts %s', (_description, quote) => {
      expect(quoteAppearsOnPage(quote, incidentUrl)).toBe(true)
    })

    test('still rejects a paraphrase of a rule written inside markup', () => {
      const paraphrase = 'Do not delete or alter anything.'

      expect(quoteAppearsOnPage(paraphrase, incidentUrl)).toBe(false)
    })

    test('does not join words across a stripped tag', () => {
      // "anything.</strong> The" must not become "anything.The".
      expect(
        quoteAppearsOnPage('anything.The people handling', incidentUrl)
      ).toBe(false)
    })

    // Our pages are written with straight apostrophes. A model that types a
    // typographic one has not changed a word, so dropping the quote over it
    // would be a misquote of our own making.
    test.each([
      ['a typographic apostrophe', '’'],
      ['a straight apostrophe', "'"]
    ])('accepts a rule quoted with %s', (_description, apostrophe) => {
      const quote = `Tell your line manager and your team${apostrophe}s information asset owner.`

      expect(quoteAppearsOnPage(quote, incidentUrl)).toBe(true)
    })
  })

  test('accepts a condition from the data table, also written inside markup', () => {
    const condition =
      'With privacy settings on. Model training and chat history are turned off.'

    expect(quoteAppearsOnPage(condition, dataGuidanceUrl)).toBe(true)
  })

  // Reads the real content rather than a fixture, so a rule written in a
  // shape the verifier cannot handle fails here rather than in production,
  // where it would show only as the service quietly declining to quote.
  describe('every rule the toolkit writes inside markup', () => {
    test.each(rulesWrittenInsideMarkup())(
      'can be quoted word for word from %s',
      (url, rule) => {
        expect(quoteAppearsOnPage(rule, url)).toBe(true)
      }
    )
  })

  test('logs a dropped paraphrase as a content defect, by page and length, never the words', () => {
    const paraphrase = realQuote.replace('remove personal data first', 'remove personal data')

    quoteAppearsOnPage(paraphrase, dataGuidanceUrl)

    expect(logger.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({
          outcome: 'not_found',
          reference: dataGuidanceUrl
        })
      }),
      expect.stringContaining('not found on its source page')
    )
    expect(JSON.stringify(logger.warn.mock.calls)).not.toContain('personal data')
  })

  test('says nothing in the log when the quote checks out', () => {
    quoteAppearsOnPage(realQuote, dataGuidanceUrl)

    expect(logger.warn).not.toHaveBeenCalled()
    expect(logger.error).not.toHaveBeenCalled()
  })

  test('drops the quote and logs an error when the source page cannot be loaded', () => {
    loadContent.mockImplementationOnce(() => {
      throw new Error('read failed')
    })

    expect(quoteAppearsOnPage(realQuote, dataGuidanceUrl)).toBe(false)
    expect(logger.error).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({
          outcome: 'failure',
          reference: dataGuidanceUrl
        })
      }),
      expect.stringContaining('did not load')
    )
  })
})

describe('toViewModel', () => {
  test('maps the wire shape to the view model', () => {
    const view = toViewModel({
      status: 'answered',
      message: 'Some explanation.',
      rule_verbatim: null,
      sources: []
    })

    expect(view).toEqual({
      status: 'answered',
      message: 'Some explanation.',
      reason: null,
      rule: null,
      sources: [],
      options: []
    })
  })

  test('maps reason for cannot_answer', () => {
    const view = toViewModel({
      status: 'cannot_answer',
      message: 'That is outside what the toolkit covers.',
      reason: 'outside_toolkit'
    })

    expect(view.reason).toBe('outside_toolkit')
  })

  test('defaults reason to null when the backend sends none', () => {
    const view = toViewModel({
      status: 'answered',
      message: 'Some explanation.'
    })

    expect(view.reason).toBeNull()
  })

  test('maps options for need_more_detail, in the order sent', () => {
    const view = toViewModel({
      status: 'need_more_detail',
      message: 'Which is closest?',
      options: ['First option', 'Second option', 'Third option']
    })

    expect(view.options).toEqual(['First option', 'Second option', 'Third option'])
  })

  test('defaults options to an empty list when the backend sends none', () => {
    const view = toViewModel({
      status: 'answered',
      message: 'Some explanation.'
    })

    expect(view.options).toEqual([])
  })

  test.each([
    ['an external site', 'https://example.com/guidance'],
    ['a protocol-relative address', '//example.com/guidance'],
    ['a page that does not exist', '/ai-toolkit/invented']
  ])('drops a source pointing at %s', (_description, url) => {
    const view = toViewModel({
      status: 'answered',
      message: 'Some explanation.',
      sources: [{ title: 'Somewhere else', url }]
    })

    expect(view.sources).toEqual([])
  })

  test('keeps a source pointing at a page this service serves', () => {
    const view = toViewModel({
      status: 'answered',
      message: 'Some explanation.',
      sources: [
        { title: 'Using data with AI', url: dataGuidanceUrl, section: 'A part' }
      ]
    })

    expect(view.sources).toEqual([
      { title: 'Using data with AI', url: dataGuidanceUrl, section: 'A part' }
    ])
  })

  test('renders a rule that is genuinely quoted from its source', () => {
    const view = toViewModel({
      status: 'answered',
      message: 'Some explanation.',
      rule_verbatim: {
        text: realQuote,
        source: { title: 'Using data with AI', url: dataGuidanceUrl }
      }
    })

    expect(view.rule.text).toBe(realQuote)
    expect(view.rule.source.url).toBe(dataGuidanceUrl)
  })

  test('drops a rule the model has reworded', () => {
    const view = toViewModel({
      status: 'answered',
      message: 'Some explanation.',
      rule_verbatim: {
        text: 'Never put personal data into an everyday AI tool.',
        source: { title: 'Using data with AI', url: dataGuidanceUrl }
      }
    })

    expect(view.rule).toBeNull()
  })
})

describe('the stub answers', () => {
  test.each([
    ['Can I use Microsoft 365 Copilot with personal data?'],
    ['Which AI tools are approved for OFFICIAL data?'],
    ['Something the toolkit has never heard of']
  ])('every source and rule in the answer to "%s" survives checking', (question) => {
    const raw = fixtureAnswerFor(question)
    const view = toViewModel(raw)

    // A page the quotation already links to is not listed again below it.
    const repeated = raw.sources.filter(
      (source) => source.url === raw.rule_verbatim?.source.url
    ).length

    expect(view.sources).toHaveLength(raw.sources.length - repeated)

    if (raw.rule_verbatim) {
      expect(view.rule).not.toBeNull()
    }
  })
})

describe('the stub answering "help me get started"', () => {
  test('returns need_more_detail with two to four options, mapped in order', () => {
    const raw = fixtureAnswerFor('help me get started')
    const view = toViewModel(raw)

    expect(view.status).toBe('need_more_detail')
    expect(view.options.length).toBeGreaterThanOrEqual(2)
    expect(view.options.length).toBeLessThanOrEqual(4)
    expect(view.options).toEqual(raw.options)
  })
})

describe('the stub answers for the four outcomes with no answer', () => {
  test.each([
    ['a pension question', 'What is my pension entitlement?', 'cannot_answer', 'outside_toolkit'],
    ['an expenses question', 'How do I claim expenses?', 'cannot_answer', 'outside_toolkit'],
    ['a parking question', 'What is the parking policy?', 'cannot_answer', 'outside_toolkit'],
    ['a buying question', 'How do I go about buying a licence?', 'cannot_answer', 'no_guidance_yet'],
    ['a procurement question', 'What is the procurement process?', 'cannot_answer', 'no_guidance_yet'],
    ['a project-specific question', 'Can I use this for my project?', 'talk_to_a_person', null],
    ['a DPIA question', 'Do we need a DPIA for this?', 'talk_to_a_person', null],
    ['a legal advice question', 'Can you give me legal advice?', 'blocked', null],
    ['a medical question', 'Can I use this for medical advice?', 'blocked', null],
    ['a simulated error', 'simulate an error please', 'error', null]
  ])('maps %s to %s', (_description, question, status, reason) => {
    const raw = fixtureAnswerFor(question)
    const view = toViewModel(raw)

    expect(view.status).toBe(status)
    expect(view.reason).toBe(reason)
  })

  test('never describes a blocked answer as flagged, filtered, unsafe or violating anything', () => {
    const raw = fixtureAnswerFor('Can you give me legal advice?')

    expect(raw.message.toLowerCase()).not.toMatch(/flagged|filtered|unsafe|violat/)
  })
})

describe('the stub answering a follow-up', () => {
  test.each([
    ['what about personal data?'],
    ['and agents?'],
    ['why is that?'],
    ['is that still true?']
  ])('names what "%s" follows on from', (question) => {
    const answer = fixtureAnswerFor(question, {
      previousQuestion: 'Can I use GitHub Copilot?'
    })

    expect(answer.message).toEqual(
      expect.stringContaining('Still on "Can I use GitHub Copilot?"')
    )
  })

  test('answers a fresh subject on its own terms', () => {
    const answer = fixtureAnswerFor(
      'Which AI tools are approved for OFFICIAL data across Defra?',
      { previousQuestion: 'Can I use GitHub Copilot?' }
    )

    expect(answer.message).not.toEqual(expect.stringContaining('Still on'))
  })

  test('has nothing to follow on from at the start of a conversation', () => {
    const answer = fixtureAnswerFor('what about agents?')

    expect(answer.message).not.toEqual(expect.stringContaining('Still on'))
  })
})

describe('sources the quotation already links to', () => {
  const dataGuidance = {
    title: 'Using data with AI',
    url: '/ai-toolkit/guidance/using-data-with-ai',
    section: null
  }

  test('are not listed again underneath it', () => {
    const view = toViewModel({
      status: 'answered',
      message: 'Some explanation.',
      rule_verbatim: { text: realQuote, source: dataGuidance },
      sources: [dataGuidance, { title: 'Find a tool', url: '/ai-toolkit/tools' }]
    })

    expect(view.rule.source.url).toBe(dataGuidance.url)
    expect(view.sources.map((source) => source.url)).toEqual([
      '/ai-toolkit/tools'
    ])
  })

  test('are left alone when there is no quotation', () => {
    const view = toViewModel({
      status: 'answered',
      message: 'Some explanation.',
      sources: [dataGuidance, { title: 'Find a tool', url: '/ai-toolkit/tools' }]
    })

    expect(view.sources).toHaveLength(2)
  })
})
