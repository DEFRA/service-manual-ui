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
const conversationPath = '/ai-toolkit/ask/conversation'

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
    supportBox: SUPPORT_BOX
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
    breadcrumbs: [
      { text: 'Digital Defra', href: '/' },
      { text: 'AI digital toolkit', href: '/ai-toolkit' },
      { text: 'Ask the toolkit' }
    ],
    question,
    error
  })
}

/**
 * The answer just given leads the page, so the page is titled and headed by
 * the question that produced it. Everything earlier folds away below.
 * @param {object} h - Hapi response toolkit
 * @param {Array<object>} exchanges
 * @param {object} options
 * @returns {object} The conversation
 */
function renderConversation (
  h,
  exchanges,
  { question = '', error = null } = {}
) {
  const { latest, previous } = session.splitConversation(exchanges)

  return h.view('ai-ask/conversation', {
    ...baseView(),
    pageTitle: latest.question,
    questionLabel: 'Ask a follow-up question',
    questionHint:
      'It remembers this conversation, so you can build on the answer above. Do not include personal or sensitive information.',
    questionFormClass: 'app-ask__followup',
    latest,
    previous,
    question,
    error
  })
}

export const askController = {
  handler (request, h) {
    // Someone with a conversation open goes back to it rather than to a blank
    // front door, because asking from here would silently append to a
    // conversation they cannot see. Starting a new one clears the session
    // first, so this redirect does not fire.
    if (session.getExchanges(request.yar).length) {
      return h.redirect(conversationPath).code(statusCodes.seeOther)
    }

    return renderAsk(h)
  }
}

export const askPostController = {
  handler (request, h) {
    const { question, error } = validateQuestion(request.payload?.question)
    const exchanges = session.getExchanges(request.yar)

    if (error) {
      return exchanges.length
        ? renderConversation(h, exchanges, { question, error })
        : renderAsk(h, { question, error })
    }

    session.addExchange(request.yar, {
      question,
      answer: toViewModel(
        fixtureAnswerFor(question, {
          previousQuestion: exchanges.at(-1)?.question
        })
      )
    })

    // Redirect after a successful post, so a refresh does not ask again. The
    // new answer leads the page, so this lands at the top of it and needs no
    // fragment to skip past what has already been read.
    return h.redirect(conversationPath).code(statusCodes.seeOther)
  }
}

export const conversationController = {
  handler (request, h) {
    const exchanges = session.getExchanges(request.yar)

    if (!exchanges.length) {
      return h.redirect(askPath).code(statusCodes.seeOther)
    }

    return renderConversation(h, exchanges)
  }
}

export const restartController = {
  handler (request, h) {
    session.clearConversation(request.yar)

    return h.redirect(askPath).code(statusCodes.seeOther)
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
      transcript: toPlainText(exchanges)
    })
  }
}
