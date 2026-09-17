import { answerPath } from './paths.js'

const SESSION_KEY = 'ai-ask'

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
 * Turns the conversation into the index shown beside every answer: one entry
 * per question, in the order they were asked, each addressing its own page.
 * @param {Array<object>} exchanges
 * @param {number} [currentNumber] The answer being read, 1-based
 * @returns {Array<{number: number, question: string, href: string, isCurrent: boolean}>}
 */
export function toThread (exchanges, currentNumber) {
  return exchanges.map((exchange, index) => {
    const number = index + 1

    return {
      number,
      question: exchange.question,
      href: answerPath(number),
      isCurrent: number === currentNumber
    }
  })
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
