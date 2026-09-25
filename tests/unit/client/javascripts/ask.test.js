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

  test('marks the button aria-disabled, adds the busy spinner and announces the wait, keeping the label as Ask', () => {
    form.dispatchEvent(new Event('submit', { cancelable: true }))

    expect(button.getAttribute('aria-disabled')).toBe('true')
    expect(button.disabled).toBe(false)
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

  test('still marks the button aria-disabled when it has no text span or status region to update', () => {
    document.body.innerHTML = `
      <form>
        <button type="submit" class="app-ask__send" data-ask-submit>Ask</button>
      </form>
    `
    const plainForm = document.querySelector('form')
    const plainButton = document.querySelector('[data-ask-submit]')
    initAsk()

    expect(() => plainForm.dispatchEvent(new Event('submit', { cancelable: true }))).not.toThrow()
    expect(plainButton.getAttribute('aria-disabled')).toBe('true')
    expect(plainButton.disabled).toBe(false)
  })

  test('keeps the busy state on a page shown fresh rather than from the back-forward cache', () => {
    form.dispatchEvent(new Event('submit', { cancelable: true }))

    const shown = new Event('pageshow')
    Object.defineProperty(shown, 'persisted', { value: false })
    window.dispatchEvent(shown)

    expect(button.getAttribute('aria-disabled')).toBe('true')
  })

  test('resets the busy state when the page is restored from the back-forward cache', () => {
    form.dispatchEvent(new Event('submit', { cancelable: true }))

    const restored = new Event('pageshow')
    Object.defineProperty(restored, 'persisted', { value: true })
    window.dispatchEvent(restored)

    expect(button.hasAttribute('aria-disabled')).toBe(false)
    expect(button.classList.contains('app-ask__send--busy')).toBe(false)
    expect(status.textContent).toBe('')
  })
})

describe('initAsk quick replies and example questions', () => {
  let replies
  let first
  let second
  let quickStatus
  let questionForm

  /**
   * Submits a form as though one of its buttons was pressed. jsdom does not
   * submit forms, so the event is built by hand with its submitter set.
   * @param {HTMLFormElement} target
   * @param {HTMLButtonElement} [submitter]
   * @returns {Event}
   */
  function press (target, submitter) {
    const event = new Event('submit', { cancelable: true })
    Object.defineProperty(event, 'submitter', { value: submitter })
    target.dispatchEvent(event)
    return event
  }

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="replies" data-ask-quick-replies>
        <button type="submit" name="question" value="First">First</button>
        <button type="submit" name="question" value="Second">Second</button>
        <div data-ask-quick-status></div>
      </form>
      <form id="question-form">
        <textarea id="question" data-module="app-ask-question"></textarea>
        <button type="submit" class="app-ask__send" data-ask-submit>Ask</button>
      </form>
    `
    replies = document.querySelector('#replies')
    ;[first, second] = replies.querySelectorAll('button')
    quickStatus = document.querySelector('[data-ask-quick-status]')
    questionForm = document.querySelector('#question-form')
    initAsk()
  })

  test('marks the pressed reply busy and announces the wait, leaving it enabled so its value is sent', () => {
    const event = press(replies, first)

    expect(event.defaultPrevented).toBe(false)
    expect(first.getAttribute('aria-disabled')).toBe('true')
    expect(first.disabled).toBe(false)
    expect(first.classList.contains('app-ask__choice--busy')).toBe(true)
    expect(second.classList.contains('app-ask__choice--busy')).toBe(false)
    expect(quickStatus.textContent).toBe('Working on your answer. This can take up to 30 seconds.')
  })

  test('ignores a second reply once one is on its way', () => {
    press(replies, first)

    const again = press(replies, second)

    expect(again.defaultPrevented).toBe(true)
    expect(second.classList.contains('app-ask__choice--busy')).toBe(false)
  })

  test('ignores the question box once a reply is on its way, so only one question is sent', () => {
    press(replies, first)

    const typed = press(questionForm)

    expect(typed.defaultPrevented).toBe(true)
    expect(questionForm.querySelector('[data-ask-submit]').hasAttribute('aria-disabled')).toBe(false)
  })

  test('still marks the reply busy when the form has no status region to update', () => {
    quickStatus.remove()

    expect(() => press(replies, first)).not.toThrow()
    expect(first.getAttribute('aria-disabled')).toBe('true')
  })

  test('still announces the wait when the browser does not say which button was pressed', () => {
    expect(() => press(replies)).not.toThrow()
    expect(quickStatus.textContent).toBe('Working on your answer. This can take up to 30 seconds.')
  })

  test('lets the page send again when it is restored from the back-forward cache', () => {
    press(replies, first)

    const restored = new Event('pageshow')
    Object.defineProperty(restored, 'persisted', { value: true })
    window.dispatchEvent(restored)

    expect(first.hasAttribute('aria-disabled')).toBe(false)
    expect(first.classList.contains('app-ask__choice--busy')).toBe(false)
    expect(quickStatus.textContent).toBe('')
    expect(press(replies, second).defaultPrevented).toBe(false)
  })

  test('starts each page able to send, whatever the last page did', () => {
    press(replies, first)

    // A new page: fresh markup, and the script run once for it.
    document.body.innerHTML = `
      <form id="next-page">
        <button type="submit" class="app-ask__send" data-ask-submit>Ask</button>
      </form>
    `
    initAsk()

    expect(press(document.querySelector('#next-page')).defaultPrevented).toBe(false)
  })
})

describe('initAsk focus on a linked turn', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="turn-1"><h2 class="app-ask__speaker" tabindex="-1">You</h2></div>
      <div id="turn-2"><h2 class="app-ask__speaker" tabindex="-1">You</h2></div>
    `
  })

  test('moves focus to the heading of the turn the page opened at', () => {
    window.location.hash = '#turn-2'

    initAsk()

    expect(document.activeElement).toBe(document.querySelector('#turn-2 .app-ask__speaker'))
  })

  test.each([
    ['no turn in the address', ''],
    ['an anchor that is not a turn', '#main-content'],
    ['a turn that is not on the page', '#turn-9']
  ])('leaves focus alone with %s', (_description, hash) => {
    window.location.hash = hash
    document.body.focus()

    initAsk()

    expect(document.activeElement).toBe(document.body)
  })
})
