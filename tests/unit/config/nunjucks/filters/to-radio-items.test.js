import { toRadioItems } from '../../../../../src/config/nunjucks/filters/to-radio-items.js'

describe('toRadioItems', () => {
  test('maps each option to a govukRadios item, value and text the same', () => {
    expect(toRadioItems(['First', 'Second'])).toEqual([
      { value: 'First', text: 'First' },
      { value: 'Second', text: 'Second' }
    ])
  })

  test('returns an empty list when there are no options', () => {
    expect(toRadioItems([])).toEqual([])
  })

  test('returns an empty list when options is undefined', () => {
    expect(toRadioItems(undefined)).toEqual([])
  })
})
