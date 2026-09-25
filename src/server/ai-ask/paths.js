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

/**
 * An answer page opened at its own turn, so the page lands on that turn
 * rather than the top of the conversation.
 * @param {number} number - Position of the answer in the conversation, 1-based
 * @returns {string}
 */
export function turnPath (number) {
  return `${answerPath(number)}#turn-${number}`
}

/**
 * @param {number} number - Position of the answer being reported, 1-based
 * @returns {string}
 */
export function reportPath (number) {
  return `${answerPath(number)}/report`
}
