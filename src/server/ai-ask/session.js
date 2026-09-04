const SESSION_KEY = 'ai-ask'

/**
 * The conversation is held in the server-side session, which expires after
 * four hours. Nothing is stored against a name, and there is no database, so
 * the retention promise on the front door is kept by doing nothing.
 *
 * It is stored as exchanges, a question with the answer it produced, rather
 * than a flat run of messages. The page shows the newest exchange in full and
 * folds the rest away, so the pairing is what the templates need.
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
 * Splits the conversation into the exchange to show in full and the rest.
 * @param {Array<object>} exchanges
 * @returns {{latest: object|null, previous: Array<object>}} Previous newest first
 */
export function splitConversation (exchanges) {
  if (!exchanges.length) {
    return { latest: null, previous: [] }
  }

  return {
    latest: exchanges.at(-1),
    previous: exchanges.slice(0, -1).reverse()
  }
}

/**
 * @param {import('@hapi/yar').Yar} yar
 * @returns {void}
 */
export function clearConversation (yar) {
  yar.clear(SESSION_KEY)
}
