import { triageQuestions } from './questions.js'

/**
 * Generate session storage key for an answer
 * @param {string} slug - The question slug
 * @returns {string} The session key
 */
export function answerKey(slug) {
  return `answer-${slug}`
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @param {string} key
 * @returns {unknown}
 */
export function getAnswer(yar, key) {
  return yar.get(key) ?? null
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @param {string[]} slugs
 * @returns {Record<string, unknown>}
 */
export function getSessionData(yar, slugs) {
  const data = {}
  for (const slug of slugs) {
    data[slug] = yar.get(`answer-${slug}`) ?? null
  }
  return data
}

/**
 * Retrieve all session data for the triage questions
 * @param {import('@hapi/yar').Yar} yar - The session object
 * @returns {Record<string, unknown>} Session data for all questions
 */
export function getTriageSessionData(yar) {
  const slugs = triageQuestions.map((p) => p.split('/').at(-1))
  return getSessionData(yar, slugs)
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @param {string} key
 * @param {unknown} fields
 * @returns {void}
 */
export function setAnswer(yar, key, fields) {
  yar.set(key, fields)
}
