import { randomUUID } from 'node:crypto'

import { getNavigation } from '../common/helpers/content-loader.js'
import { buildErrorLog } from '../common/helpers/logging/build-error-log.js'
import { statusCodes } from '../common/constants/status-codes.js'

import {
  ANSWER_SUPPORT_BOX,
  EXAMPLE_QUESTIONS,
  MAX_EXCHANGES,
  MAX_QUESTION_LENGTH,
  MAX_REPORT_LENGTH,
  QUESTION_COUNT_THRESHOLD,
  QUESTION_ROWS,
  SUPPORT_BOX,
  TEAM_EMAIL,
  VISIBLE_TURNS
} from './constants.js'
import {
  answerPath,
  askPath,
  helpPath,
  reportPath,
  restartPath,
  stuckPath,
  toolkitPath,
  turnPath
} from './paths.js'
import { validateQuestion } from './question.js'
import { toViewModel } from './answer.js'
import { buildContactLink, toPlainText } from './transcript.js'
import { answerFor } from './chat-api.js'
import { buildReportErrorLog, canSendReports, sendReport } from './report-email.js'
import { claimReport, releaseReport } from './report-claim.js'
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
    paths: {
      ask: askPath,
      help: helpPath,
      restart: restartPath,
      stuck: stuckPath,
      toolkit: toolkitPath
    },
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
function renderAsk (h, { question = '', error = null, notice = null } = {}) {
  return h.view('ai-ask/ask', {
    ...baseView(),
    pageTitle: 'Ask the toolkit',
    exampleQuestions: EXAMPLE_QUESTIONS,
    question,
    error,
    notice
  })
}

/**
 * Which turns the page shows in full. The last few, so the newest answer stays
 * near the top of a long conversation, unless the person asked for the rest
 * or opened an answer that would otherwise be hidden.
 * @param {number} total - Turns in the conversation
 * @param {number} number - The answer this address is for, 1-based
 * @param {boolean} showAll - Whether "Show earlier questions" was followed
 * @returns {number} How many turns are hidden before the first one shown
 */
function hiddenTurns (total, number, showAll) {
  const hidden = Math.max(0, total - VISIBLE_TURNS)

  return showAll || number <= hidden ? 0 : hidden
}

/**
 * The whole conversation on one page, opened at one answer. Every answer
 * keeps its own address, so back, refresh and links behave as they do on the
 * rest of GOV.UK, but each address shows the thread around the answer rather
 * than the answer on its own.
 * @param {object} h - Hapi response toolkit
 * @param {object} params
 * @param {Array<object>} params.exchanges
 * @param {number} params.number
 * @param {object} [options]
 * @returns {object}
 */
function renderAnswer (
  h,
  { exchanges, number },
  { question = '', error = null, serviceProblem = null } = {}
) {
  const isLatest = number === exchanges.length
  const hidden = hiddenTurns(exchanges.length, number, h.request.query?.all === '1')
  const reportsOn = canSendReports()

  return h.view('ai-ask/answer', {
    ...baseView(),
    // The question is deliberately not the page title. Analytics records the
    // title of every page it sees, so a question in the title would send what
    // someone typed to a third party. The position still tells tabs apart.
    pageTitle: `Question ${number}, Ask the toolkit`,
    // A back link rather than breadcrumbs. A conversation is a journey, and
    // the Design System says a journey gets a back link and never both. It
    // never steps back one answer at a time: back means the way out, to where
    // you got to if you are reading an earlier answer, and out of the service
    // if you are already at the end.
    backLink: isLatest
      ? { href: toolkitPath, text: 'Back to the AI digital toolkit' }
      : { href: turnPath(exchanges.length), text: 'Back to where you got to' },
    // The support box on an answer page goes through the help route, which
    // offers to send the conversation along, rather than straight to email.
    supportBox: ANSWER_SUPPORT_BOX,
    turns: exchanges.slice(hidden).map((exchange, index) => {
      const turnNumber = hidden + index + 1

      return {
        number: turnNumber,
        question: exchange.question,
        answer: exchange.answer,
        isLatest: turnNumber === exchanges.length,
        reported: Boolean(exchange.reported),
        reportHref: reportsOn ? reportPath(turnNumber) : null
      }
    }),
    hiddenCount: hidden,
    showEarlierHref: `${answerPath(number)}?all=1#turn-1`,
    reported: session.takeReported(h.request.yar),
    // Only the newest answer can be followed on from, and only until the
    // conversation is full. Asking from partway back would either branch the
    // conversation or silently jump you to the end.
    canContinue: exchanges.length < MAX_EXCHANGES,
    maxExchanges: MAX_EXCHANGES,
    questionLabel: 'Your question',
    // A turn label rather than a section heading, so the box reads as the
    // next turn of the conversation instead of a form appended to it.
    questionLabelClass: 'app-ask__speaker-label',
    // One row that grows as you type, with the button beside it, as the next
    // message in a conversation rather than a second front door.
    questionRows: 1,
    // No hint. The personal data reminder sits on the front door, where a
    // question starts, and repeated under every follow-up it read as nagging.
    questionHint: false,
    questionFormClass: 'app-ask__followup',
    question,
    error,
    serviceProblem
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
      return h.redirect(turnPath(exchanges.length)).code(statusCodes.seeOther)
    }

    // Set when a route that needs a conversation redirected here because
    // there wasn't one, so the front door can say why instead of silently
    // landing back on it.
    const notice = ['no-conversation', 'not-found'].includes(request.query.notice)
      ? request.query.notice
      : null

    return renderAsk(h, { notice })
  }
}

// Shown in the error summary when the backend does not answer. Says what to
// do, as the content rules require, and no more: the cause is in the logs.
export const NO_ANSWER_ERROR = 'The toolkit could not answer just now. Try again in a minute.'

/**
 * Shows the page the question was asked from again, with the question kept:
 * the front door for a first question, the conversation for a follow-up.
 * @param {object} h - Hapi response toolkit
 * @param {Array<object>} exchanges
 * @param {object} options
 * @returns {object}
 */
function renderQuestionError (h, exchanges, options) {
  if (!exchanges.length) {
    return renderAsk(h, options)
  }

  return renderAnswer(h, { exchanges, number: exchanges.length }, options)
}

/**
 * The backend gave no answer. That is a problem with the service, not with the
 * question, so on the conversation it goes in the summary with no field to
 * fix. The front door has no conversation to keep, so it points at the field
 * as before.
 * @param {object} h - Hapi response toolkit
 * @param {Array<object>} exchanges
 * @param {string} question
 * @returns {object}
 */
function renderNoAnswer (h, exchanges, question) {
  return exchanges.length
    ? renderQuestionError(h, exchanges, { question, serviceProblem: NO_ANSWER_ERROR })
    : renderQuestionError(h, exchanges, { question, error: NO_ANSWER_ERROR })
}

export const askPostController = {
  async handler (request, h) {
    const exchanges = session.getExchanges(request.yar)

    // A question handed over from site search is filled in, not sent. The
    // words were typed for search, where there is no personal data hint, so
    // the person sees the hint here and presses Ask themselves.
    if (request.payload?.prefill === 'yes') {
      const handedOver = String(request.payload?.question ?? '').trim()

      // A full conversation has no box to put it in, so it goes through
      // starting again, which carries it to the new front door.
      if (exchanges.length >= MAX_EXCHANGES) {
        return renderRestart(h, exchanges, handedOver)
      }

      return renderQuestionError(h, exchanges, { question: handedOver })
    }

    const { question, error: questionError } = validateQuestion(request.payload?.question)

    // A full conversation takes no more questions. The page stopped offering
    // the field, so this only catches a stale tab or a hand-made request.
    if (exchanges.length >= MAX_EXCHANGES) {
      return h.redirect(turnPath(exchanges.length)).code(statusCodes.seeOther)
    }

    if (questionError) {
      return renderQuestionError(h, exchanges, { question, error: questionError })
    }

    let answer

    // The mapping sits inside the try as well as the fetch, so a 200 carrying
    // something that is not an answer gets the same message as no answer at
    // all, rather than the generic error page.
    try {
      answer = toViewModel(
        await answerFor(question, { previousQuestion: exchanges.at(-1)?.question })
      )
    } catch (error) {
      // The question is never logged: it is what the person typed.
      request.logger.error(
        buildErrorLog(error, { type: 'ask_answer', action: 'fetch' }),
        'Ask the toolkit got no answer from the backend'
      )

      return renderNoAnswer(h, exchanges, question)
    }

    // A 200 that answered, but with nothing to show: the same handling as a
    // failed fetch, so a failed turn is never saved as part of the
    // conversation and the question is not lost.
    if (answer.status === 'error') {
      return renderNoAnswer(h, exchanges, question)
    }

    // An id of its own, so anything keyed to this answer, such as a report
    // claim, cannot be mistaken for the answer in the same place in a later
    // conversation in the same session.
    session.addExchange(request.yar, { id: randomUUID(), question, answer })

    // Every answer has an address, so asking takes you to a page of its own
    // rather than back to a growing list. Refreshing does not ask again, the
    // back button walks the conversation, and an answer can be linked to. The
    // page opens at the new turn, and the script moves focus there too.
    return h.redirect(turnPath(exchanges.length + 1)).code(statusCodes.seeOther)
  }
}

export const answerController = {
  handler (request, h) {
    const exchanges = session.getExchanges(request.yar)
    const found = session.findExchange(exchanges, request.params.number)

    // An address with no answer behind it, because the conversation expired,
    // was never started or is shorter than the link. The front door says so
    // rather than silently landing there, and it cannot tell those apart, so
    // the notice is true of all of them.
    if (!found) {
      return h.redirect(exchanges.length ? turnPath(exchanges.length) : `${askPath}?notice=not-found`)
        .code(statusCodes.seeOther)
    }

    return renderAnswer(h, { exchanges, number: found.number })
  }
}

/**
 * @param {object} h - Hapi response toolkit
 * @param {Array<object>} exchanges
 * @param {string} [question] - A question to carry to the new conversation
 * @returns {object}
 */
function renderRestart (h, exchanges, question = '') {
  return h.view('ai-ask/restart', {
    ...baseView(),
    pageTitle: 'Start a new conversation',
    questionCount: exchanges.length,
    question,
    backHref: turnPath(exchanges.length)
  })
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

    return renderRestart(h, exchanges)
  }
}

export const restartPostController = {
  handler (request, h) {
    session.clearConversation(request.yar)

    // A question carried here from search, because the old conversation was
    // full, is filled in on the new front door rather than lost.
    const carried = String(request.payload?.question ?? '').trim()

    return carried
      ? renderAsk(h, { question: carried })
      : h.redirect(askPath).code(statusCodes.seeOther)
  }
}

export const helpController = {
  handler (request, h) {
    const exchanges = session.getExchanges(request.yar)

    if (!exchanges.length) {
      return h.redirect(`${askPath}?notice=no-conversation`).code(statusCodes.seeOther)
    }

    return h.view('ai-ask/help', {
      ...baseView(),
      pageTitle: 'Get help from a person',
      backHref: turnPath(exchanges.length)
    })
  }
}

/**
 * The report page for one answer, or the way back when there is nothing to
 * report: reports switched off here, or an answer that is not in the
 * conversation.
 * @param {object} request - Hapi request
 * @param {object} h - Hapi response toolkit
 * @returns {{found: object, exchanges: Array<object>} | {redirect: object}}
 */
function findReportable (request, h) {
  const exchanges = session.getExchanges(request.yar)
  const found = session.findExchange(exchanges, request.params.number)

  if (!found) {
    const back = exchanges.length ? turnPath(exchanges.length) : `${askPath}?notice=not-found`

    return { redirect: h.redirect(back).code(statusCodes.seeOther) }
  }

  // Reports switched off here, or this answer already reported: back to the
  // answer, where the link is gone or already says "Report sent", so a
  // resent form never sends a second email.
  if (!canSendReports() || found.exchange.reported) {
    return { redirect: h.redirect(turnPath(found.number)).code(statusCodes.seeOther) }
  }

  return { found, exchanges }
}

/**
 * @param {object} h - Hapi response toolkit
 * @param {object} found - The exchange and its position
 * @param {object} [options]
 * @returns {object}
 */
function renderReport (h, found, { problem = '', error = null, sendFailed = false } = {}) {
  return h.view('ai-ask/report', {
    ...baseView(),
    pageTitle: 'Report a problem with this answer',
    reportedQuestion: found.exchange.question,
    reportAction: reportPath(found.number),
    exchangeId: found.exchange.id,
    backHref: turnPath(found.number),
    maxReportLength: MAX_REPORT_LENGTH,
    problem,
    error,
    sendFailed
  })
}

export const reportController = {
  handler (request, h) {
    const { found, redirect } = findReportable(request, h)

    return redirect ?? renderReport(h, found)
  }
}

export const reportPostController = {
  async handler (request, h) {
    const { found, exchanges, redirect } = findReportable(request, h)

    if (redirect) {
      return redirect
    }

    // The form names the answer it was opened for. If the conversation has
    // changed since, in another tab, the number now points at a different
    // answer, so nothing is sent and the person goes back to the conversation
    // as it is now.
    if (request.payload?.exchange !== found.exchange.id) {
      return h.redirect(turnPath(exchanges.length)).code(statusCodes.seeOther)
    }

    const problem = String(request.payload?.problem ?? '').trim()

    if (problem.length > MAX_REPORT_LENGTH) {
      return renderReport(h, found, {
        problem,
        error: `Your report must be ${MAX_REPORT_LENGTH} characters or less`
      })
    }

    // The session says whether this answer was reported by an earlier request
    // that finished. The claim covers one that is still going, on any
    // instance. Keyed by the answer's own id, not its place, because starting
    // again keeps the session and reuses the places.
    const claim = `${request.yar.id}:${found.exchange.id}`
    let token

    try {
      token = await claimReport(claim)
    } catch (error) {
      // Without the claim there is no way to know this is the only send, so
      // nothing is sent, and the person is asked to try again.
      request.logger.error(
        buildErrorLog(error, { type: 'ask_report', action: 'claim' }),
        'Ask the toolkit could not claim a reported problem'
      )

      return renderReport(h, found, { problem, sendFailed: true })
    }

    if (!token) {
      return h.redirect(turnPath(found.number)).code(statusCodes.seeOther)
    }

    const result = await sendReport({ number: found.number, exchange: found.exchange, problem })

    if (!result.success) {
      request.logger.error(
        buildReportErrorLog(result.error),
        'Ask the toolkit could not send a reported problem'
      )

      try {
        await releaseReport(claim, token)
      } catch (error) {
        // The claim expires on its own, so the person can try again shortly.
        request.logger.error(
          buildErrorLog(error, { type: 'ask_report', action: 'release' }),
          'Ask the toolkit could not release a report claim'
        )
      }

      return renderReport(h, found, { problem, sendFailed: true })
    }

    session.markReported(request.yar, found.number)
    session.flashReported(request.yar, found.number)

    // Back to the end of the conversation, where the confirmation shows at the
    // top. No anchor, so the page opens at the confirmation, not below it.
    return h.redirect(answerPath(exchanges.length)).code(statusCodes.seeOther)
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
      backHref: turnPath(exchanges.length)
    })
  }
}
