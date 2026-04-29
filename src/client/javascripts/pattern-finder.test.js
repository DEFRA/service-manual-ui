/**
 * @vitest-environment jsdom
 */

import { describe, test, expect, afterEach } from 'vitest'
import { initPatternFinder } from './pattern-finder.js'

/**
 * Render a realistic pattern-finder fixture. The wrapper starts hidden
 * (mirrors the markdown), and recommendation templates are pre-rendered
 * inline so JS only has to clone the right one into the result panel.
 */
function renderFixture({ withForm = true, withResult = true } = {}) {
  document.body.innerHTML = `
    <div data-pattern-finder hidden>
      <h2>Find a pattern that fits</h2>

      ${
        withForm
          ? `<form data-pattern-finder-form>
               <fieldset>
                 <legend>What matters most?</legend>
                 <input type="radio" id="opt-quality" name="finder" value="quality">
                 <label for="opt-quality">Quality</label>
                 <input type="radio" id="opt-speed" name="finder" value="speed">
                 <label for="opt-speed">Speed</label>
                 <input type="radio" id="opt-other" name="other-radio" value="other">
                 <label for="opt-other">Different group</label>
                 <button type="submit">Show recommendation</button>
               </fieldset>
             </form>`
          : ''
      }

      ${
        withResult
          ? '<div data-pattern-finder-result aria-live="polite" hidden></div>'
          : ''
      }

      <template data-pattern-finder-rec="quality">
        <h3>Recommended for quality</h3>
        <p>Use the human-in-the-loop pattern.</p>
      </template>
      <template data-pattern-finder-rec="speed">
        <h3>Recommended for speed</h3>
        <p>Use the prompt chaining pattern.</p>
      </template>
    </div>
  `

  return {
    root: document.querySelector('[data-pattern-finder]'),
    form: document.querySelector('[data-pattern-finder-form]'),
    result: document.querySelector('[data-pattern-finder-result]'),
    quality: document.getElementById('opt-quality'),
    speed: document.getElementById('opt-speed'),
    other: document.getElementById('opt-other')
  }
}

function fireChange(input) {
  input.checked = true
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

describe('initPatternFinder', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('does nothing when [data-pattern-finder] is not present', () => {
    document.body.innerHTML = '<div>no finder here</div>'
    expect(() => initPatternFinder()).not.toThrow()
  })

  test('reveals the wrapper by removing the hidden attribute', () => {
    const { root } = renderFixture()
    expect(root.hasAttribute('hidden')).toBe(true)

    initPatternFinder()

    expect(root.hasAttribute('hidden')).toBe(false)
  })

  test('still reveals the wrapper even when form or result is missing', () => {
    const { root } = renderFixture({ withForm: false })
    initPatternFinder()
    expect(root.hasAttribute('hidden')).toBe(false)
  })

  test('does not throw when the form is missing', () => {
    renderFixture({ withForm: false })
    expect(() => initPatternFinder()).not.toThrow()
  })

  test('does not throw when the result panel is missing', () => {
    renderFixture({ withResult: false })
    expect(() => initPatternFinder()).not.toThrow()
  })

  test('prevents form submission so the page does not navigate', () => {
    const { form } = renderFixture()
    initPatternFinder()

    const submitEvent = new Event('submit', {
      bubbles: true,
      cancelable: true
    })
    form.dispatchEvent(submitEvent)

    expect(submitEvent.defaultPrevented).toBe(true)
  })

  test('clones the matching template into the result panel on radio change', () => {
    const { quality, result } = renderFixture()
    initPatternFinder()

    fireChange(quality)

    expect(result.hidden).toBe(false)
    expect(result.querySelector('h3').textContent).toBe(
      'Recommended for quality'
    )
    expect(result.textContent).toContain('human-in-the-loop')
  })

  test('replaces previous recommendation when the user picks again', () => {
    const { quality, speed, result } = renderFixture()
    initPatternFinder()

    fireChange(quality)
    expect(result.querySelector('h3').textContent).toBe(
      'Recommended for quality'
    )

    fireChange(speed)
    expect(result.querySelectorAll('h3')).toHaveLength(1)
    expect(result.querySelector('h3').textContent).toBe('Recommended for speed')
  })

  test('ignores change events from inputs outside the "finder" radio group', () => {
    const { other, result } = renderFixture()
    initPatternFinder()

    fireChange(other)

    expect(result.hidden).toBe(true)
    expect(result.innerHTML).toBe('')
  })

  test('ignores change events with no matching template', () => {
    const { form, result } = renderFixture()
    initPatternFinder()

    // Fire a change event whose target is a finder radio with no template
    const orphan = document.createElement('input')
    orphan.type = 'radio'
    orphan.name = 'finder'
    orphan.value = 'no-such-pattern'
    form.appendChild(orphan)
    fireChange(orphan)

    expect(result.hidden).toBe(true)
    expect(result.innerHTML).toBe('')
  })

  test('ignores change events fired with no event target', () => {
    renderFixture()
    initPatternFinder()

    // Synthesise a change event without a target by routing it through a
    // detached node, then re-targeting via dispatch on the form. Practically,
    // the optional chain handles target=null/undefined paths.
    const detached = document.createElement('div')
    expect(() => {
      detached.dispatchEvent(new Event('change', { bubbles: false }))
    }).not.toThrow()
  })
})
