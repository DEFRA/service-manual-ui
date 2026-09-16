import { config } from '../../config/config.js'

import { fixtureAnswerFor } from './__fixtures__/answers.js'

const ASK_PATH = '/ask'

/**
 * Where the answers come from.
 *
 * With no API URL configured the page answers from its fixtures, as it did
 * before service-manual-chat-backend existed, so an environment that has not
 * been given a backend behaves exactly as it does today. With one configured
 * the question is posted to the backend and its answer, in the same wire
 * shape, is returned untouched: answer.js does the mapping and the checks.
 */

/**
 * @returns {string} The configured base URL, or '' for fixtures
 */
export function askApiUrl () {
  return config.get('aiContent.askApiUrl')
}

// URL resolves the path against the configured base, so a base with or
// without a trailing slash gives the same answer.
function askUrl () {
  return new URL(ASK_PATH, askApiUrl()).toString()
}

/**
 * Fetches the answer to a question.
 *
 * Any failure to get an answer from the backend, whether a non-2xx status, a
 * timeout or a refused connection, throws for the controller to log and turn
 * into a message on the page.
 * @param {string} question
 * @param {object} [context]
 * @param {string} [context.previousQuestion] The question asked before this one
 * @returns {Promise<object>} An answer in the API wire shape
 */
export async function answerFor (question, { previousQuestion } = {}) {
  if (!askApiUrl()) {
    return fixtureAnswerFor(question, { previousQuestion })
  }

  const response = await fetch(askUrl(), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      question,
      previous_question: previousQuestion ?? null
    }),
    signal: AbortSignal.timeout(config.get('aiContent.askApiTimeoutMs'))
  })

  if (!response.ok) {
    const error = new Error(
      `service-manual-chat-backend answered with status ${response.status}`
    )
    error.status = response.status
    throw error
  }

  return response.json()
}
