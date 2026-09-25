// Announced to screen readers once a question has been sent, so someone
// waiting for the backend has something to notice besides a page that
// appears to have stopped responding.
const BUSY_STATUS_TEXT = 'Working on your answer. This can take up to 30 seconds.'

// aria-disabled rather than the disabled attribute, so a browser still
// submits the button's value: see initBusyState below.
const ARIA_DISABLED = 'aria-disabled'

// A page can hold more than one way to send: the question box, and quick
// replies or example questions. Only the first send counts, whichever it came
// from, until the page is left.
let sending = false

// Marks the quick reply or example question that was pressed.
const CHOICE_BUSY_CLASS = 'app-ask__choice--busy'

/**
 * Ask the toolkit: move focus to the turn the page opened at, send the
 * question when Enter is pressed, and show a busy state while an answer is on
 * its way.
 */
export function initAsk () {
  sending = false
  focusLinkedTurn()
  initEnterToSend()
  initBusyState()
  initQuickReplies()
}

/**
 * Send the question when Enter is pressed.
 *
 * The field is a textarea, so Enter would ordinarily add a line break. In a
 * box like this people expect Enter to send, and the alternative is reaching
 * for the mouse for every question.
 *
 * Shift and Enter still adds a line break, which is the convention people
 * carry over from other chat interfaces. Everything works unchanged without
 * this file: the button is a real submit button and the form posts on its own.
 */
function initEnterToSend () {
  const field = document.querySelector('[data-module="app-ask-question"]')

  // requestSubmit is the only way to submit from a key press that still runs
  // validation and submit handlers. A browser without it keeps the default
  // behaviour, where Enter adds a line break and the button posts the form,
  // rather than falling back to submit() and skipping both.
  if (!field?.form || typeof field.form.requestSubmit !== 'function') {
    return
  }

  field.addEventListener('keydown', (event) => {
    const isPlainEnter =
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey

    // isComposing is true while an input method editor is mid-word, where
    // Enter picks a candidate character and must not send the question.
    if (!isPlainEnter || event.isComposing) {
      return
    }

    event.preventDefault()
    field.form.requestSubmit()
  })
}

/**
 * Show a busy button and announce it once a question is on its way.
 *
 * The wait for an answer can run to 30 seconds, and asking is a full page
 * post rather than a fetch, so nothing else on the page will change again
 * until the answer page arrives. Without this, the only sign anything
 * happened is the browser's own loading indicator, which is easy to miss and
 * says nothing about how long is normal.
 *
 * The button marks itself busy with aria-disabled as its own guard against a
 * second submit, from a stray double click or a second Enter press before
 * the page navigates away. A real disabled attribute is not used because a
 * browser never sends a disabled button's value with the form, and the
 * options form on an answer page needs that value to tell a follow-up
 * question apart from Continue with nothing chosen. Nothing here helps
 * without JavaScript: the static wait message printed next to the button in
 * the template is what covers that case.
 */
function initBusyState () {
  document.querySelectorAll('[data-ask-submit]').forEach((button) => {
    const form = button.form

    if (!form) {
      return
    }

    form.addEventListener('submit', (event) => {
      if (sending || button.getAttribute(ARIA_DISABLED) === 'true') {
        // The button already shows the busy state, so a second submit
        // reaching here (Enter fired again before navigation) is a repeat,
        // not a new question.
        event.preventDefault()
        return
      }

      sending = true
      button.setAttribute(ARIA_DISABLED, 'true')
      button.classList.add('app-ask__send--busy')

      const status = form.querySelector('[data-ask-status]')
      if (status) {
        status.textContent = BUSY_STATUS_TEXT
      }
    })
  })

  // A page restored from the back-forward cache comes back mid-submit.
  // Put the buttons back to normal so the person can ask again.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) {
      return
    }

    sending = false
    document.querySelectorAll(`.${CHOICE_BUSY_CLASS}`).forEach((button) => {
      button.removeAttribute(ARIA_DISABLED)
      button.classList.remove(CHOICE_BUSY_CLASS)
    })
    document.querySelectorAll('[data-ask-quick-status]').forEach((status) => {
      status.textContent = ''
    })

    document.querySelectorAll('[data-ask-submit]').forEach((button) => {
      button.removeAttribute(ARIA_DISABLED)
      button.classList.remove('app-ask__send--busy')

      const status = button.form?.querySelector('[data-ask-status]')
      if (status) {
        status.textContent = ''
      }
    })
  })
}

/**
 * Quick replies and example questions send at once, so they get the same busy
 * state and the same guard against a second send as the question box.
 */
function initQuickReplies () {
  document.querySelectorAll('[data-ask-quick-replies]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      const button = event.submitter
      if (sending || button?.getAttribute(ARIA_DISABLED) === 'true') {
        event.preventDefault()
        return
      }
      sending = true
      if (button) {
        button.setAttribute(ARIA_DISABLED, 'true')
        button.classList.add(CHOICE_BUSY_CLASS)
      }
      const status = form.querySelector('[data-ask-quick-status]')
      if (status) {
        status.textContent = BUSY_STATUS_TEXT
      }
    })
  })
}

/**
 * When the page opens at a turn, move focus there too. Scrolling to an anchor
 * moves the view, not a screen reader, so without this someone hears the page
 * from the top again. The turn's heading takes focus, so a screen reader
 * starts at "You, question 3" rather than reading the whole turn as one block.
 */
function focusLinkedTurn () {
  const number = linkedTurnNumber()
  const heading = number && document.getElementById(`turn-${number}`)?.querySelector('.app-ask__speaker')

  if (heading) {
    heading.focus()
  }
}

/**
 * The turn the page was opened at: from the #turn-N anchor, or, for an
 * /answers/N address with no anchor, such as a bookmark, from the address.
 * Not from the address when the page leads with something that takes focus
 * itself, the report confirmation or an error summary, or has another anchor.
 * @returns {string|null}
 */
function linkedTurnNumber () {
  const fromAnchor = /^#turn-(\d+)$/.exec(window.location.hash)

  if (fromAnchor) {
    return fromAnchor[1]
  }

  if (window.location.hash || document.querySelector('.govuk-notification-banner, .govuk-error-summary')) {
    return null
  }

  return /\/answers\/(\d+)$/.exec(window.location.pathname)?.[1] ?? null
}
