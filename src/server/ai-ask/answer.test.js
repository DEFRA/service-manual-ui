import { describe, test, expect } from 'vitest'

import { toViewModel, quoteAppearsOnPage } from './answer.js'
import { fixtureAnswerFor } from './__fixtures__/answers.js'

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

    expect(view.sources).toHaveLength(raw.sources.length)

    if (raw.rule_verbatim) {
      expect(view.rule).not.toBeNull()
    }
  })
})
