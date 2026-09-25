const SESSION_KEY = 'ai-ask'
const REPORTED_KEY = 'ai-ask-reported'

/**
 * The conversation is held in the server-side session, which expires after
 * four hours. Nothing is stored against a name, and there is no database, so
 * the retention promise on the front door is kept by doing nothing.
 *
 * It is stored as exchanges, a question with the answer it produced, rather
 * than a flat run of messages. Each exchange is a page of its own, so the
 * pairing is what the templates need.
 */

/**
 * @param {import('@hapi/yar').Yar} yar
 * @returns {Array<{question: string, answer: object}>} Oldest first
 */
export function getExchanges (yar) {
  return yar.get(SESSION_KEY) ?? []
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @param {{question: string, answer: object}} exchange
 * @returns {void}
 */
export function addExchange (yar, exchange) {
  yar.set(SESSION_KEY, [...getExchanges(yar), exchange])
}

/**
 * Reads one answer by its position in the conversation.
 *
 * Answers are numbered by where they fall in the conversation, which is enough
 * while the conversation lives in the session and belongs to one person. A
 * durable identifier has to come from the backend, along with a decision about
 * how long an answer stays retrievable.
 * @param {Array<object>} exchanges
 * @param {string} number - The 1-based position from the URL
 * @returns {{exchange: object, number: number}|null}
 */
export function findExchange (exchanges, number) {
  const position = Number(number)

  if (!Number.isInteger(position) || position < 1 || position > exchanges.length) {
    return null
  }

  return { exchange: exchanges[position - 1], number: position }
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @returns {void}
 */
export function clearConversation (yar) {
  yar.clear(SESSION_KEY)
}

/**
 * Records that an answer was reported, on the answer itself, so it is sent
 * once however many times the form is sent, and forgotten with the
 * conversation.
 * @param {import('@hapi/yar').Yar} yar
 * @param {number} number - The answer reported, 1-based
 * @returns {void}
 */
export function markReported (yar, number) {
  yar.set(
    SESSION_KEY,
    getExchanges(yar).map((exchange, index) =>
      index === number - 1 ? { ...exchange, reported: true } : exchange
    )
  )
}

/**
 * Remembers, for the next page only, which answer was just reported, so the
 * conversation can confirm it once. A flash rather than a query string, so
 * refreshing the page does not confirm it again.
 * @param {import('@hapi/yar').Yar} yar
 * @param {number} number - The answer reported, 1-based
 * @returns {void}
 */
export function flashReported (yar, number) {
  yar.flash(REPORTED_KEY, number, true)
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @returns {number|null} The answer just reported, if there was one
 */
export function takeReported (yar) {
  const reported = yar.flash(REPORTED_KEY)

  return Number.isInteger(reported) ? reported : null
}
