const SESSION_KEY = 'ai-ask'

/**
 * The conversation is held in the server-side session, which expires after
 * four hours. Nothing is stored against a name, and there is no database, so
 * the retention promise on the front door is kept by doing nothing.
 */

/**
 * @param {import('@hapi/yar').Yar} yar
 * @returns {Array<object>} Messages so far, oldest first
 */
export function getMessages (yar) {
  return yar.get(SESSION_KEY) ?? []
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @param {object} message
 * @returns {void}
 */
export function addMessage (yar, message) {
  yar.set(SESSION_KEY, [...getMessages(yar), message])
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @returns {void}
 */
export function clearConversation (yar) {
  yar.clear(SESSION_KEY)
}
