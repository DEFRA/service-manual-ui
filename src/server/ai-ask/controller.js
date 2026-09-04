import { getNavigation } from '../common/helpers/content-loader.js'
import { statusCodes } from '../common/constants/status-codes.js'

import { QUESTION_ROWS, SUPPORT_BOX } from './constants.js'
import { validateQuestion } from './question.js'
import { toViewModel } from './answer.js'
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
 * @param {object} h - Hapi response toolkit
 * @param {Array<object>} messages
 * @param {object} options
 * @returns {object} The conversation
 */
function renderConversation (h, messages, { question = '', error = null } = {}) {
  return h.view('ai-ask/conversation', {
    ...baseView(),
    pageTitle: 'Your questions and answers',
    questionLabel: 'Ask another question',
    messages,
    question,
    error
  })
}

export const askController = {
  handler (request, h) {
    // A question in the query string means someone picked an example. It is
    // put in the box rather than asked, so they can change it first.
    const question = request.query.question ?? ''

    return renderAsk(h, { question })
  }
}

export const askPostController = {
  handler (request, h) {
    const { question, error } = validateQuestion(request.payload?.question)
    const messages = session.getMessages(request.yar)

    if (error) {
      return messages.length
        ? renderConversation(h, messages, { question, error })
        : renderAsk(h, { question, error })
    }

    session.addMessage(request.yar, { type: 'question', text: question })
    session.addMessage(request.yar, {
      type: 'answer',
      answer: toViewModel(fixtureAnswerFor(question))
    })

    // Redirect after a successful post, so a refresh does not ask again.
    return h.redirect(conversationPath).code(statusCodes.seeOther)
  }
}

export const conversationController = {
  handler (request, h) {
    const messages = session.getMessages(request.yar)

    if (!messages.length) {
      return h.redirect(askPath).code(statusCodes.seeOther)
    }

    return renderConversation(h, messages)
  }
}

export const restartController = {
  handler (request, h) {
    session.clearConversation(request.yar)

    return h.redirect(askPath).code(statusCodes.seeOther)
  }
}
