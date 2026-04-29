/**
 * Pattern finder. Inline decision aid on /ai-playbook/patterns.
 *
 * Without JavaScript, the finder is hidden (`hidden` attribute on the wrapper)
 * and users see only the static catalogue and the "Patterns in flight" panel.
 *
 * With JavaScript, the finder is revealed: the user picks one priority from a
 * radio group, and a recommendation panel populates inline. The recommendations
 * are pre-rendered as <template> elements in the markdown, so editorial control
 * stays with content authors. JS just clones the right one into place.
 *
 * Accessibility:
 * - The result panel has aria-live="polite" so SR users hear the new
 *   recommendation when a radio changes.
 * - <template> contents are not in the accessibility tree until cloned.
 * - Form submission is prevented (no backend handler exists).
 */
export function initPatternFinder() {
  const root = document.querySelector('[data-pattern-finder]')
  if (!root) {
    return
  }

  // Reveal the finder (hidden in HTML for the no-JS fallback).
  root.removeAttribute('hidden')

  const form = root.querySelector('[data-pattern-finder-form]')
  const result = root.querySelector('[data-pattern-finder-result]')

  if (!form || !result) {
    return
  }

  // Prevent accidental form submission. The form has no action and there's
  // no backend handler. The recommendation appears via the change handler.
  form.addEventListener('submit', (event) => {
    event.preventDefault()
  })

  form.addEventListener('change', (event) => {
    const target = event.target
    if (target?.name !== 'finder') {
      return
    }

    const value = target.value
    const template = root.querySelector(`[data-pattern-finder-rec="${value}"]`)

    if (!template) {
      return
    }

    // Replace the result content. aria-live on the wrapper means
    // SR users hear the new recommendation announced.
    result.innerHTML = ''
    result.appendChild(template.content.cloneNode(true))
    result.hidden = false
  })
}
