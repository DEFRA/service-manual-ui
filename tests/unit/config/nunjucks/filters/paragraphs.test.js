import { describe, test, expect } from 'vitest'

import { paragraphs } from '../../../../../src/config/nunjucks/filters/paragraphs.js'

describe('paragraphs', () => {
  test('gives one paragraph per block of text between line breaks', () => {
    expect(paragraphs('First point.\n\nSecond point.\nThird point.')).toEqual([
      'First point.',
      'Second point.',
      'Third point.'
    ])
  })

  test('drops blank lines and trims each paragraph', () => {
    expect(paragraphs('  One. \r\n   \r\n Two.  \n')).toEqual(['One.', 'Two.'])
  })

  test('keeps text with no line breaks as a single paragraph', () => {
    expect(paragraphs('Just one.')).toEqual(['Just one.'])
  })

  test.each([undefined, null, ''])('gives no paragraphs for %s', (text) => {
    expect(paragraphs(text)).toEqual([])
  })
})
