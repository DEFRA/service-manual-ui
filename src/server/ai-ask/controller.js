import { getNavigation } from '../common/helpers/content-loader.js'
import { statusCodes } from '../common/constants/status-codes.js'

import {
  MAX_QUESTION_LENGTH,
  QUESTION_COUNT_THRESHOLD,
  QUESTION_ROWS,
  SUPPORT_BOX
} from './constants.js'
import { validateQuestion } from './question.js'
import { toViewModel } from './answer.js'
import { buildContactLink, toPlainText } from './transcript.js'
import { fixtureAnswerFor } from './__fixtures__/answers.js'
import * as session from './session.js'

const askPath = '/ai-toolkit/ask'
const answersPath = '/ai-toolkit/ask/answers'

/**
 * @param {number} number - Position of the answer in the conversation
 * @returns {string}
 */
function answerPath (number) {
  return `${answersPath}/${number}`
}

/**
 * Shared view data. Every page here carries the AI digital toolkit service
 * navigation, as the rest of the toolkit does. Toolkit pages get it from their
 * markdown frontmatter; these have none, so they read the same list from
 * navigation.yaml.
 * @returns {object}
 */
function baseView () {
  return {
    headerServiceName: 'AI digital toolkit',
    headerServiceUrl: '/ai-toolkit',
    customNav: getNavigation('nav-ai-toolkit'),
    questionRows: QUESTION_ROWS,
    maxQuestionLength: MAX_QUESTION_LENGTH,
    questionCountThreshold: QUESTION_COUNT_THRESHOLD,
    supportBox: SUPPORT_BOX,
    breadcrumbs: [
      { text: 'Digital Defra', href: '/' },
      { text: 'AI digital toolkit', href: '/ai-toolkit' },
      { text: 'Ask the toolkit' }
    ]
  }
}

/**
 * @param {object} h - Hapi response toolkit
 * @param {object} options
 * @returns {object} The front door
 */
function renderAsk (h, { question = '', error = null } = {}) {
  return h.view('ai-ask/ask', {
    ...baseView(),
    pageTitle: 'Ask the toolkit',
    question,
    error
  })
}

/**
 * One answer, at its own address.
 * @param {object} h - Hapi response toolkit
 * @param {object} params
 * @param {Array<object>} params.exchanges
 * @param {object} params.exchange
 * @param {number} params.number
 * @param {object} [options]
 * @returns {object}
 */
function renderAnswer (
  h,
  { exchanges, exchange, number },
  { question = '', error = null } = {}
) {
  const isLatest = number === exchanges.length

  return h.view('ai-ask/answer', {
    ...baseView(),
    pageTitle: exchange.question,
    questionLabel: 'Ask a follow-up question',
    questionHint:
      'It remembers this conversation, so you can build on the answer above.',
    questionFormClass: 'app-ask__followup',
    exchange,
    number,
    isLatest,
    // Only the newest answer can be followed on from. Asking from partway back
    // would either branch the conversation or silently jump you to the end,
    // and neither is worth explaining to someone mid-question.
    latestHref: answerPath(exchanges.length),
    thread: session.toThread(exchanges, number),
    question,
    error
  })
}

export const askController = {
  handler (request, h) {
    const exchanges = session.getExchanges(request.yar)

    // Someone with a conversation open goes to their latest answer rather than
    // a blank front door, because asking from here would silently append to a
    // conversation they cannot see. Starting a new one clears the session
    // first, so this redirect does not fire.
    if (exchanges.length) {
      return h.redirect(answerPath(exchanges.length)).code(statusCodes.seeOther)
    }

    return renderAsk(h)
  }
}

export const askPostController = {
  handler (request, h) {
    const { question, error } = validateQuestion(request.payload?.question)
    const exchanges = session.getExchanges(request.yar)

    if (error) {
      if (!exchanges.length) {
        return renderAsk(h, { question, error })
      }

      const number = exchanges.length

      return renderAnswer(
        h,
        { exchanges, exchange: exchanges[number - 1], number },
        { question, error }
      )
    }

    session.addExchange(request.yar, {
      question,
      answer: toViewModel(
        fixtureAnswerFor(question, {
          previousQuestion: exchanges.at(-1)?.question
        })
      )
    })

    // Every answer has an address, so asking takes you to a page of its own
    // rather than back to a growing list. Refreshing does not ask again, the
    // back button walks the conversation, and an answer can be linked to.
    return h.redirect(answerPath(exchanges.length + 1)).code(statusCodes.seeOther)
  }
}

export const answerController = {
  handler (request, h) {
    const exchanges = session.getExchanges(request.yar)
    const found = session.findExchange(exchanges, request.params.number)

    if (!found) {
      return h.redirect(askPath).code(statusCodes.seeOther)
    }

    return renderAnswer(h, { exchanges, ...found })
  }
}

export const restartController = {
  handler (request, h) {
    session.clearConversation(request.yar)

    return h.redirect(askPath).code(statusCodes.seeOther)
  }
}

export const helpController = {
  handler (request, h) {
    const exchanges = session.getExchanges(request.yar)

    if (!exchanges.length) {
      return h.redirect(askPath).code(statusCodes.seeOther)
    }

    return h.view('ai-ask/help', {
      ...baseView(),
      pageTitle: 'Speak to someone',
      backHref: answerPath(exchanges.length)
    })
  }
}

export const stuckController = {
  handler (request, h) {
    const exchanges = session.getExchanges(request.yar)

    if (!exchanges.length) {
      return h.redirect(askPath).code(statusCodes.seeOther)
    }

    // Nothing from the conversation is shared unless it was asked for.
    const includeConversation = request.payload?.includeConversation === 'yes'
    const { href, conversationIncluded } = buildContactLink({
      exchanges,
      includeConversation
    })

    return h.view('ai-ask/contact', {
      ...baseView(),
      pageTitle: 'Contact the AI Capability and Enablement team',
      contactHref: href,
      conversationIncluded,
      conversationRequested: includeConversation,
      transcript: toPlainText(exchanges),
      backHref: answerPath(exchanges.length)
    })
  }
}
