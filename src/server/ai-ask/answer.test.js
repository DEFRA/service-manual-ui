import { describe, test, expect, vi } from 'vitest'

import { loadContent } from '../common/helpers/content-loader.js'
import { toViewModel, quoteAppearsOnPage } from './answer.js'
import { fixtureAnswerFor } from './__fixtures__/answers.js'

const logger = vi.hoisted(() => ({ warn: vi.fn(), error: vi.fn() }))

// Both are modules this repo owns. The logger is replaced so the log lines can
// be asserted on; the content loader is wrapped, not replaced, so every other
// test here still reads the real guidance.
vi.mock('../common/helpers/logging/logger.js', () => ({
  createLogger: () => logger
}))

vi.mock('../common/helpers/content-loader.js', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, loadContent: vi.fn(actual.loadContent) }
})

const dataGuidanceUrl = '/ai-toolkit/guidance/using-data-with-ai'

// Copied from src/content/ai-toolkit/guidance/using-data-with-ai.md
const realQuote =
  'For personal data, the DPIA route is for a service you are building to process it, not a way to paste it into an everyday tool. For everyday use, remove personal data first.'

describe('#quoteAppearsOnPage', () => {
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

describe('#toViewModel', () => {
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
      rule: null,
      sources: []
    })
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
