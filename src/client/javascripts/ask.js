// Announced to screen readers once a question has been sent, so someone
// waiting for the backend has something to notice besides a page that
// appears to have stopped responding.
const BUSY_STATUS_TEXT = 'Working on your answer. This can take up to 30 seconds.'

/**
 * Ask the toolkit: send the question when Enter is pressed, and show a busy
 * state while an answer is on its way.
 */
export function initAsk () {
  initEnterToSend()
  initBusyState()
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
 * The button disables itself as its own guard against a second submit, from
 * a stray double click or a second Enter press before the page navigates
 * away. Nothing here helps without JavaScript: the static wait message
 * printed next to the button in the template is what covers that case.
 */
function initBusyState () {
  document.querySelectorAll('[data-ask-submit]').forEach((button) => {
    const form = button.form

    if (!form) {
      return
    }

    form.addEventListener('submit', (event) => {
      if (button.disabled) {
        // The button already shows the busy state, so a second submit
        // reaching here (Enter fired again before navigation) is a repeat,
        // not a new question.
        event.preventDefault()
        return
      }

      button.disabled = true
      button.classList.add('app-ask__send--busy')

      const status = form.querySelector('[data-ask-status]')
      if (status) {
        status.textContent = BUSY_STATUS_TEXT
      }
    })
  })
}
