const SESSION_KEY = 'ai-triage'

/**
 * @param {import('@hapi/yar').Yar} yar
 * @param {string} slug
 * @returns {unknown}
 */
export function getAnswer(yar, slug) {
  const data = yar.get(SESSION_KEY)
  return data?.[slug] ?? null
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @param {string} slug
 * @param {unknown} fields
 * @returns {void}
 */
export function setAnswer(yar, slug, fields) {
  const data = yar.get(SESSION_KEY) ?? {}
  yar.set(SESSION_KEY, { ...data, [slug]: fields })
}

/**
 * Retrieve all session data for the triage questions
 * @param {import('@hapi/yar').Yar} yar
 * @returns {Record<string, unknown>}
 */
export function getTriageSessionData(yar) {
  return yar.get(SESSION_KEY) ?? {}
}

/**
 * Clear all triage session data
 * @param {import('@hapi/yar').Yar} yar
 * @returns {void}
 */
export function clearTriageSession(yar) {
  yar.clear(SESSION_KEY)
}

