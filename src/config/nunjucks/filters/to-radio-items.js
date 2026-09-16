/**
 * Turns a list of plain strings into the item shape govukRadios expects.
 *
 * Nunjucks has no equivalent of Jinja's `namespace()`, so building this array
 * inside a template loop cannot carry values out of the loop's own scope.
 * A filter sidesteps that: it runs once, over the whole list.
 * @param {Array<string>} [options]
 * @returns {Array<{ value: string, text: string }>}
 */
export function toRadioItems (options) {
  return (options ?? []).map((option) => ({ value: option, text: option }))
}
