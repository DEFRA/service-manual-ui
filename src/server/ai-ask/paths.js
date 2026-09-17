/**
 * Every address in Ask the toolkit, in one place, so the routes, the
 * redirects and the links in templates cannot drift apart.
 */
export const toolkitPath = '/ai-toolkit'
export const askPath = `${toolkitPath}/ask`
export const helpPath = `${askPath}/help`
export const restartPath = `${askPath}/restart`
export const stuckPath = `${askPath}/stuck`
export const answersPath = `${askPath}/answers`

/**
 * @param {number} number - Position of the answer in the conversation, 1-based
 * @returns {string}
 */
export function answerPath (number) {
  return `${answersPath}/${number}`
}
