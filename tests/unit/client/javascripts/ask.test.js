/**
 * @vitest-environment jsdom
 */

/* global KeyboardEvent */

import { describe, test, expect, beforeEach, vi } from 'vitest'

import { initAsk } from '../../../../src/client/javascripts/ask.js'

describe('#initAsk', () => {
  let field
  let form
  let submitted

  beforeEach(() => {
    submitted = vi.fn()
    document.body.innerHTML = `
      <form>
        <textarea id="question" data-module="app-ask-question"></textarea>
        <button type="submit">Ask</button>
      </form>
    `
    field = document.querySelector('#question')
    form = document.querySelector('form')
    // Stubbed so the call can be asserted on without a real submission.
    form.requestSubmit = submitted
    initAsk()
  })

  /**
   * @param {object} [modifiers]
   * @returns {KeyboardEvent} The event after dispatch, to read defaultPrevented
   */
  function pressEnter (modifiers = {}) {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
      ...modifiers
    })
    field.dispatchEvent(event)
    return event
  }

  test('sends the question', () => {
    const event = pressEnter()

    expect(submitted).toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(true)
  })

  test.each([
    ['shift', { shiftKey: true }],
    ['alt', { altKey: true }],
    ['ctrl', { ctrlKey: true }],
    ['command', { metaKey: true }]
  ])('leaves Enter alone when %s is held, so a line break still works', (_name, modifiers) => {
    const event = pressEnter(modifiers)

    expect(submitted).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })

  test('leaves Enter alone mid-word in an input method editor', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true
    })
    Object.defineProperty(event, 'isComposing', { value: true })
    field.dispatchEvent(event)

    expect(submitted).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })

  test.each([
    ['a', { key: 'a' }],
    ['Escape', { key: 'Escape' }],
    ['Tab', { key: 'Tab' }]
  ])('ignores %s', (_name, init) => {
    field.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init })
    )

    expect(submitted).not.toHaveBeenCalled()
  })

  test('does nothing on a page with no question field', () => {
    document.body.innerHTML = '<p>No form here</p>'

    expect(() => initAsk()).not.toThrow()
  })

  test('leaves Enter alone in a browser without requestSubmit, rather than submitting around validation', () => {
    document.body.innerHTML = `
      <form>
        <textarea id="question" data-module="app-ask-question"></textarea>
        <button type="submit">Ask</button>
      </form>
    `
    form = document.querySelector('form')
    form.requestSubmit = undefined
    form.submit = submitted
    field = document.querySelector('#question')
    initAsk()

    const event = pressEnter()

    expect(submitted).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })
})
