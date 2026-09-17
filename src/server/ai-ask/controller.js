import { getNavigation } from '../common/helpers/content-loader.js'
import { statusCodes } from '../common/constants/status-codes.js'

import {
  ANSWER_SUPPORT_BOX,
  MAX_EXCHANGES,
  MAX_QUESTION_LENGTH,
  QUESTION_COUNT_THRESHOLD,
  QUESTION_ROWS,
  SUPPORT_BOX,
  TEAM_EMAIL
} from './constants.js'
import {
  answerPath,
  askPath,
  helpPath,
  restartPath,
  stuckPath,
  toolkitPath
} from './paths.js'
import { validateQuestion } from './question.js'
import { toViewModel } from './answer.js'
import { buildContactLink, toPlainText } from './transcript.js'
import { fixtureAnswerFor } from './__fixtures__/answers.js'
import * as session from './session.js'

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
    headerServiceUrl: toolkitPath,
    customNav: getNavigation('nav-ai-toolkit'),
    teamEmail: TEAM_EMAIL,
    // Form actions and links in the templates come from here, never typed in.
    paths: { ask: askPath, help: helpPath, restart: restartPath, stuck: stuckPath },
    questionRows: QUESTION_ROWS,
    maxQuestionLength: MAX_QUESTION_LENGTH,
    questionCountThreshold: QUESTION_COUNT_THRESHOLD,
    supportBox: SUPPORT_BOX,
    breadcrumbs: [
      { text: 'Digital Defra', href: '/' },
      { text: 'AI digital toolkit', href: toolkitPath },
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
    // A back link rather than breadcrumbs. A conversation is a journey, and
    // the Design System says a journey gets a back link and never both. The
    // route out of the service is already in the toolkit navigation above, so
    // nothing is lost by dropping the crumbs.
    //
    // It never steps back one answer at a time. Someone who jumped to answer
    // two of ten wants to return to where they were, not walk forward through
    // eight pages, and the list beside the answer already reaches any single
    // answer in one hop. So back means the way out: to where you got to if
    // you are reading an earlier answer, and out of the service if you are
    // already at the end.
    backLink: isLatest
      ? { href: toolkitPath, text: 'Back to the AI digital toolkit' }
      : { href: answerPath(exchanges.length), text: 'Back to where you got to' },
    // The support box on an answer page goes through the help route, which
    // offers to send the conversation along, rather than straight to email.
    supportBox: ANSWER_SUPPORT_BOX,
    questionLabel: 'Ask a follow-up question',
    // Set as a turn label rather than a section heading, so the box reads as
    // the next turn of the conversation instead of a form appended to it.
    questionLabelClass: 'app-ask__eyebrow-label',
    // No hint. The privacy reminder sits on the front door, where a question
    // starts. Repeated under every follow-up it read as nagging.
    questionHint: false,
    questionFormClass: 'app-ask__followup',
    exchange,
    number,
    isLatest,
    // Only the newest answer can be followed on from. Asking from partway back
    // would either branch the conversation or silently jump you to the end,
    // and neither is worth explaining to someone mid-question.
    canFollowUp: isLatest && exchanges.length < MAX_EXCHANGES,
    maxExchanges: MAX_EXCHANGES,
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

    // A full conversation takes no more questions. The page stopped offering
    // the field, so this only catches a stale tab or a hand-made request.
    if (exchanges.length >= MAX_EXCHANGES) {
      return h.redirect(answerPath(exchanges.length)).code(statusCodes.seeOther)
    }

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

/**
 * Asks before throwing a conversation away. The conversation is only in the
 * session, so once it is gone it is gone, and a link that deletes on a click
 * would also be reachable by anything that prefetches links. So the link
 * shows this page, and only the button on it clears anything.
 */
export const restartController = {
  handler (request, h) {
    const exchanges = session.getExchanges(request.yar)

    if (!exchanges.length) {
      return h.redirect(askPath).code(statusCodes.seeOther)
    }

    return h.view('ai-ask/restart', {
      ...baseView(),
      pageTitle: 'Start a new conversation',
      questionCount: exchanges.length,
      backHref: answerPath(exchanges.length)
    })
  }
}

export const restartPostController = {
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
