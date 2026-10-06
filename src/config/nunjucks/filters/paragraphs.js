const LINE_BREAKS = /\r?\n+/

/**
 * Splits plain text into its paragraphs, so a template can give each one its
 * own <p>. The model marks paragraphs and numbered points with line breaks,
 * which HTML would otherwise run together. Text, not markdown: the pieces are
 * still escaped by the template, so nothing in a model answer becomes markup.
 *
 * @param {string} [text]
 * @returns {string[]} the non-blank paragraphs, trimmed
 */
function paragraphs (text) {
  return (text ?? '')
    .split(LINE_BREAKS)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export { paragraphs }
