/**
 * Turns a list of plain strings into the item shape govukRadios expects.
 *
 * A filter keeps this mapping in one place, alongside the other view-model
 * shaping, rather than repeated inline wherever a template loops over
 * `answer.options`.
 * @param {Array<string>} [options]
 * @returns {Array<{ value: string, text: string }>}
 */
export function toRadioItems (options) {
  return (options ?? []).map((option) => ({ value: option, text: option }))
}
