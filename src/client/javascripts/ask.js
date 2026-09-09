/**
 * Ask the toolkit: send the question when Enter is pressed.
 *
 * The field is a textarea, so Enter would ordinarily add a line break. In a
 * box like this people expect Enter to send, and the alternative is reaching
 * for the mouse for every question.
 *
 * Shift and Enter still adds a line break, which is the convention people
 * carry over from other chat interfaces. Everything works unchanged without
 * this file: the button is a real submit button and the form posts on its own.
 */
export function initAsk () {
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
