const LINE_BREAKS = /\r?\n+/
const BULLET_MARKER = /^[-*]\s+(.*)$/
const NUMBER_MARKER = /^(\d+)[.)]\s+(.*)$/

/**
 * Splits plain text into the blocks a template renders: a run of consecutive
 * lines starting "- " or "* " is one bulleted list, a run starting "1. " (or
 * "2) " etc.) is one numbered list, and every other line is its own
 * paragraph. Only the marker is read - everything else, including the rest
 * of a list item, is unchanged plain text for the template to escape, so no
 * other Markdown the model writes becomes markup.
 *
 * A quote can open mid-list, so each numbered item keeps the page's own step
 * number rather than being renumbered from 1.
 *
 * @param {string} [text]
 * @returns {Array<{type: 'paragraph', text: string}
 *   | {type: 'bullets', items: string[]}
 *   | {type: 'numbers', items: Array<{text: string, number: number}>}>}
 */
function answerBlocks (text) {
  const lines = (text ?? '')
    .split(LINE_BREAKS)
    .map((line) => line.trim())
    .filter(Boolean)

  const blocks = []

  for (const line of lines) {
    const bullet = line.match(BULLET_MARKER)
    const number = !bullet && line.match(NUMBER_MARKER)
    const last = blocks.at(-1)

    if (bullet) {
      if (last?.type === 'bullets') {
        last.items.push(bullet[1])
      } else {
        blocks.push({ type: 'bullets', items: [bullet[1]] })
      }
    } else if (number) {
      const item = { text: number[2], number: Number(number[1]) }
      if (last?.type === 'numbers') {
        last.items.push(item)
      } else {
        blocks.push({ type: 'numbers', items: [item] })
      }
    } else {
      blocks.push({ type: 'paragraph', text: line })
    }
  }

  return blocks
}

export { answerBlocks }
