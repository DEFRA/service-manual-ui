import querystring from 'node:querystring'

import { loadContent } from '../common/helpers/content-loader.js'
import { buildErrorLog } from '../common/helpers/logging/build-error-log.js'

import * as model from './model.js'
import * as sessionHelper from './session.js'
import * as aiTriageService from './service.js'

import schemas from './schemas/index.js'

const QUESTION_TEMPLATE = 'common/templates/layouts/question'
const CHECK_YOUR_ANSWERS_TEMPLATE =
  'common/templates/layouts/check-your-answers'
const CHECK_YOUR_ANSWERS_CONTENT = 'ai-toolkit/triage/check-your-answers.md'
const THANK_YOU_CONTENT = 'ai-toolkit/triage/thank-you.md'

function slugFromPath(requestPath) {
  return requestPath.split('/').at(-1)
}

function validateAnswer(answer, meta) {
  const schemaName = meta.questionSchema

  if (!schemaName) {
    return null
  }

  const schema = schemas[schemaName]

  if (!schema) {
    throw new Error(
      `Schema "${schemaName}" not found for question "${meta.title}"`
    )
  }

  const { error } = schema.validate(answer)
  return error ? error.message : null
}

export const getTriagePage = (filename) => {
  return async (request, h) => {
    try {
      const { meta, content } = loadContent(filename)
      const slug = slugFromPath(request.path)
      const stored = sessionHelper.getAnswer(request.yar, slug)
      const questionValue = stored?.answer ?? null

      return h.view(QUESTION_TEMPLATE, {
        ...meta,
        content,
        currentUrl: request.path,
        questionValue
      })
    } catch (error) {
      request.logger.error(
        buildErrorLog(error, {
          type: 'page_load',
          action: 'render',
          category: 'ai_triage',
          reference: filename
        }),
        'Failed to load ai-triage page'
      )
      throw error
    }
  }
}

export const postTriagePage = (filename) => {
  return async (request, h) => {
    try {
      const { meta, content } = loadContent(filename)
      const answer = request.payload?.answer ?? ''

      const error = validateAnswer(answer, meta)

      if (error) {
        return h.view(QUESTION_TEMPLATE, {
          ...meta,
          content,
          currentUrl: request.path,
          questionValue: answer,
          questionError: error
        })
      }

      const slug = slugFromPath(request.path)
      sessionHelper.setAnswer(request.yar, slug, { answer: answer.trim() })

      return h.redirect(meta.questionContinueHref)
    } catch (error) {
      request.logger.error(
        buildErrorLog(error, {
          type: 'form_submit',
          action: 'process_answer',
          category: 'ai_triage',
          reference: filename
        }),
        'Failed to process ai-triage form'
      )
      throw error
    }
  }
}

export const getSummaryPage = async (request, h) => {
  try {
    const { meta } = loadContent(CHECK_YOUR_ANSWERS_CONTENT)

    const sessionData = sessionHelper.getTriageSessionData(request.yar)
    const viewModel = model.TriageSummaryViewModel.fromSessionData(sessionData)

    return h.view(CHECK_YOUR_ANSWERS_TEMPLATE, { ...meta, ...viewModel })
  } catch (error) {
    request.logger.error(
      buildErrorLog(error, {
        type: 'page_load',
        action: 'render',
        category: 'ai_triage',
        reference: 'check-your-answers'
      }),
      'Failed to load ai-triage summary page'
    )

    throw error
  }
}

export const postSummaryPage = async (request, h) => {
  try {
    const sessionData = sessionHelper.getTriageSessionData(request.yar)
    const submission = model.TriageSubmission.fromSessionData(sessionData)

    const result = await aiTriageService.submit(submission)

    if (result.validationError || !result.triageResult.success) {
      const { meta } = loadContent(CHECK_YOUR_ANSWERS_CONTENT)

      const viewModel = model.TriageSummaryViewModel.fromSessionData(
        sessionData,
        result
      )

      return h.view(CHECK_YOUR_ANSWERS_TEMPLATE, { ...meta, ...viewModel })
    }

    sessionHelper.clearTriageSession(request.yar)

    const confirmationFailed = result.confirmationResult.success === false

    const qs = confirmationFailed
      ? `?${querystring.stringify({ confirmationFailed: true })}`
      : ''

    return h.redirect(`/ai-toolkit/triage/thank-you${qs}`)
  } catch (error) {
    request.logger.error(
      buildErrorLog(error, {
        type: 'form_submit',
        action: 'submit_triage',
        category: 'ai_triage'
      }),
      'Failed to process ai-triage summary form'
    )

    throw error
  }
}

export const getThankYouPage = async (request, h) => {
  try {
    const { meta, content } = loadContent(THANK_YOU_CONTENT)

    return h.view(QUESTION_TEMPLATE, {
      ...meta,
      content,
      currentUrl: request.path,
      confirmationEmailFailed: request.query.confirmationFailed === 'true'
    })
  } catch (error) {
    request.logger.error(
      buildErrorLog(error, {
        type: 'page_load',
        action: 'render',
        category: 'ai_triage',
        reference: 'thank-you'
      }),
      'Failed to load ai-triage thank-you page'
    )

    throw error
  }
}

