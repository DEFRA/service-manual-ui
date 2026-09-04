import { describe, test, expect } from 'vitest'

import { toPlainText, buildContactLink } from './transcript.js'
import { MAX_MAILTO_LENGTH } from './constants.js'

const conversation = [
  { type: 'question', text: 'Can I use Copilot with personal data?' },
  {
    type: 'answer',
    answer: {
      status: 'answered',
      message: 'Defra data boundary applies.',
      rule: {
        text: 'Remove personal data first.',
        source: { title: 'Using data with AI', url: '/ai-toolkit/guidance/using-data-with-ai', section: null }
      },
      sources: [
        { title: 'Using data with AI', url: '/ai-toolkit/guidance/using-data-with-ai', section: null }
      ]
    }
  }
]

describe('#toPlainText', () => {
  test.each([
    ['the question', 'Can I use Copilot with personal data?'],
    ['who asked it', 'You asked:'],
    ['who answered', 'Ask the toolkit answered:'],
    ['the answer', 'Defra data boundary applies.'],
    ['any quoted rule', 'Remove personal data first.'],
    ['the guidance used', '/ai-toolkit/guidance/using-data-with-ai']
  ])('includes %s', (_description, expected) => {
    expect(toPlainText(conversation)).toEqual(expect.stringContaining(expected))
  })
})

describe('#buildContactLink', () => {
  test('leaves the conversation out unless it was asked for', () => {
    const { href, conversationIncluded } = buildContactLink({
      messages: conversation,
      includeConversation: false
    })

    expect(conversationIncluded).toBe(false)
    expect(href).not.toEqual(expect.stringContaining('body='))
    expect(href).not.toEqual(expect.stringContaining('Copilot'))
  })

  test('includes the conversation when it was asked for', () => {
    const { href, conversationIncluded } = buildContactLink({
      messages: conversation,
      includeConversation: true
    })

    expect(conversationIncluded).toBe(true)
    expect(href).toEqual(expect.stringContaining('body='))
    expect(decodeURIComponent(href)).toEqual(
      expect.stringContaining('Can I use Copilot with personal data?')
    )
  })

  test('drops it rather than letting a mail client cut it short', () => {
    const long = Array.from({ length: 40 }, () => conversation).flat()

    const { href, conversationIncluded } = buildContactLink({
      messages: long,
      includeConversation: true
    })

    expect(conversationIncluded).toBe(false)
    expect(href).not.toEqual(expect.stringContaining('body='))
    expect(href.length).toBeLessThanOrEqual(MAX_MAILTO_LENGTH)
  })

  test('always addresses the team', () => {
    const { href } = buildContactLink({
      messages: conversation,
      includeConversation: true
    })

    expect(href).toEqual(
      expect.stringContaining('mailto:AICapabilityAndEnablement@defra.gov.uk')
    )
  })
})
