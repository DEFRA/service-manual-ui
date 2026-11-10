import { describe, test, expect } from 'vitest'

import { answerBlocks } from '../../../../../src/config/nunjucks/filters/answer-blocks.js'

describe('answerBlocks', () => {
  test('groups consecutive bulleted lines into one list', () => {
    expect(answerBlocks('Includes:\n\n- names\n- email addresses\n\nSome are sensitive.')).toEqual([
      { type: 'paragraph', text: 'Includes:' },
      { type: 'bullets', items: ['names', 'email addresses'] },
      { type: 'paragraph', text: 'Some are sensitive.' }
    ])
  })

  test('accepts * as a bullet marker too', () => {
    expect(answerBlocks('* one\n* two')).toEqual([
      { type: 'bullets', items: ['one', 'two'] }
    ])
  })

  test('a single bulleted line is still a list', () => {
    expect(answerBlocks('- only one')).toEqual([
      { type: 'bullets', items: ['only one'] }
    ])
  })

  test('groups consecutive numbered lines into one list, keeping each step number', () => {
    expect(answerBlocks('1. Stop.\n2. Report it.')).toEqual([
      {
        type: 'numbers',
        items: [
          { text: 'Stop.', number: 1 },
          { text: 'Report it.', number: 2 }
        ]
      }
    ])
  })

  test('keeps the page\'s own step number when a quote opens mid-list', () => {
    expect(answerBlocks('2. Do not delete anything.\n3. Tell your manager.')).toEqual([
      {
        type: 'numbers',
        items: [
          { text: 'Do not delete anything.', number: 2 },
          { text: 'Tell your manager.', number: 3 }
        ]
      }
    ])
  })

  test('keeps plain text as paragraphs when there is no list marker', () => {
    expect(answerBlocks('First point.\n\nSecond point.\nThird point.')).toEqual([
      { type: 'paragraph', text: 'First point.' },
      { type: 'paragraph', text: 'Second point.' },
      { type: 'paragraph', text: 'Third point.' }
    ])
  })

  test('a list between two paragraphs stays three separate blocks', () => {
    expect(answerBlocks('Before.\n\n- one\n- two\n\nAfter.')).toEqual([
      { type: 'paragraph', text: 'Before.' },
      { type: 'bullets', items: ['one', 'two'] },
      { type: 'paragraph', text: 'After.' }
    ])
  })

  test('a marker that is not at the start of a line is just text', () => {
    expect(answerBlocks('Use a dash - like this mid-sentence.')).toEqual([
      { type: 'paragraph', text: 'Use a dash - like this mid-sentence.' }
    ])
  })

  test('drops blank lines and trims each line', () => {
    expect(answerBlocks('  One. \r\n   \r\n Two.  \n')).toEqual([
      { type: 'paragraph', text: 'One.' },
      { type: 'paragraph', text: 'Two.' }
    ])
  })

  test.each([undefined, null, ''])('gives no blocks for %s', (text) => {
    expect(answerBlocks(text)).toEqual([])
  })
})
