/**
 * @vitest-environment jsdom
 */

/* global KeyboardEvent */

import { describe, test, expect, beforeEach, vi } from 'vitest'

import { initAsk } from '../../../../src/client/javascripts/ask.js'

describe('initAsk', () => {
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

describe('initAsk busy state', () => {
  let form
  let button
  let text
  let status

  beforeEach(() => {
    document.body.innerHTML = `
      <form>
        <textarea id="question" data-module="app-ask-question"></textarea>
        <button type="submit" class="app-ask__send" data-ask-submit>
          <span class="app-ask__send-text">Ask<span class="govuk-visually-hidden"> the toolkit</span></span>
        </button>
        <div data-ask-status></div>
      </form>
    `
    form = document.querySelector('form')
    button = document.querySelector('[data-ask-submit]')
    text = document.querySelector('.app-ask__send-text')
    status = document.querySelector('[data-ask-status]')

    // jsdom does not implement form submission, so a plain submit event is
    // dispatched instead of requestSubmit(), which is enough to exercise the
    // handler under test.
    initAsk()
  })

  test('disables the button, adds the busy spinner and announces the wait, keeping the label as Ask', () => {
    form.dispatchEvent(new Event('submit', { cancelable: true }))

    expect(button.disabled).toBe(true)
    expect(button.classList.contains('app-ask__send--busy')).toBe(true)
    expect(text.textContent).toBe('Ask the toolkit')
    expect(status.textContent).toBe('Working on your answer. This can take up to 30 seconds.')
  })

  test('ignores a second submit once busy, rather than announcing again', () => {
    form.dispatchEvent(new Event('submit', { cancelable: true }))
    status.textContent = 'changed'

    const secondEvent = new Event('submit', { cancelable: true })
    form.dispatchEvent(secondEvent)

    expect(secondEvent.defaultPrevented).toBe(true)
    expect(status.textContent).toBe('changed')
  })

  test('does nothing on a page with no submit button to enhance', () => {
    document.body.innerHTML = '<form><button type="submit">Ask</button></form>'

    expect(() => initAsk()).not.toThrow()
  })

  test('does nothing for a button carrying the hook outside a form', () => {
    document.body.innerHTML = `
      <button type="button" class="app-ask__send" data-ask-submit>
        <span class="app-ask__send-text">Ask</span>
      </button>
    `

    expect(() => initAsk()).not.toThrow()
  })

  test('still disables the button when it has no text span or status region to update', () => {
    document.body.innerHTML = `
      <form>
        <button type="submit" class="app-ask__send" data-ask-submit>Ask</button>
      </form>
    `
    const plainForm = document.querySelector('form')
    const plainButton = document.querySelector('[data-ask-submit]')
    initAsk()

    expect(() => plainForm.dispatchEvent(new Event('submit', { cancelable: true }))).not.toThrow()
    expect(plainButton.disabled).toBe(true)
  })
})
