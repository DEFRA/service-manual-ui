/**
 * Get a single answer from the yar session by key.
 * @param {Object} yar - Hapi yar session object (request.yar)
 * @param {string} key - e.g., 'answer-question-1'
 * @returns {string|null} Stored answer or null
 */
export function getAnswer(yar, key) {
  return yar.get(key) ?? null
}

/**
 * Store an answer in the yar session.
 * @param {Object} yar - Hapi yar session object (request.yar)
 * @param {string} key - e.g., 'answer-question-1'
 * @param {string} value - Answer value
 */
export function setAnswer(yar, key, value) {
  yar.set(key, value)
}

/**
 * Retrieve answers for a list of slugs from the yar session.
 * @param {Object} yar - Hapi yar session object (request.yar)
 * @param {string[]} slugs - e.g., ['question-1', 'question-2']
 * @returns {{ slug: string, answer: string|null }[]}
 */
export function getAnswers(yar, slugs) {
  return slugs.map((slug) => ({
    slug,
    answer: yar.get(`answer-${slug}`) ?? null
  }))
}
