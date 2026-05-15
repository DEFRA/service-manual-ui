import { loadContent } from '../common/helpers/content-loader.js'
import { statusCodes } from '../common/constants/status-codes.js'
import { getErrorHeading } from '../common/helpers/errors.js'
import { buildErrorLog } from '../common/helpers/logging/build-error-log.js'

import * as model from './model.js'
import * as sessionHelper from './session.js'
import * as aiTriageService from './service.js'

import schemas from './schemas/index.js'
import submissionSchema from './schemas/submission.js'

function slugFromPath(requestPath) {
  return requestPath.split('/').at(-1)
}

async function renderSummaryWithErrors(request, h, errorState) {
  const { meta } = loadContent('ai-toolkit/triage/check-your-answers.md')
  const sessionData = sessionHelper.getTriageSessionData(request.yar)
  const viewModel = model.TriageSummaryViewModel.fromSessionData(sessionData)

  return h.view('common/templates/layouts/check-your-answers', {
    ...meta,
    rows: viewModel.rows,
    ...errorState
  })
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

      return h.view('common/templates/layouts/question', {
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
      return h
        .response(getErrorHeading(statusCodes.notFound))
        .code(statusCodes.notFound)
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
        return h.view('common/templates/layouts/question', {
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
      return h
        .response(getErrorHeading(statusCodes.notFound))
        .code(statusCodes.notFound)
    }
  }
}

export const getSummaryPage = async (request, h) => {
  try {
    const { meta } = loadContent('ai-toolkit/triage/check-your-answers.md')
    const sessionData = sessionHelper.getTriageSessionData(request.yar)
    const viewModel = model.TriageSummaryViewModel.fromSessionData(sessionData)

    return h.view('common/templates/layouts/check-your-answers', {
      ...meta,
      rows: viewModel.rows
    })
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
    return h
      .response(getErrorHeading(statusCodes.notFound))
      .code(statusCodes.notFound)
  }
}

export const postSummaryPage = async (request, h) => {
  try {
    const sessionData = sessionHelper.getTriageSessionData(request.yar)
    const submission = model.TriageSubmission.fromSessionData(sessionData)

    const { error: validationError } = submissionSchema.validate(submission, {
      abortEarly: false
    })

    if (validationError) {
      const errors = validationError.details.map((d) => d.message)
      return renderSummaryWithErrors(request, h, { sendError: false, errors })
    }

    const { triageResult, reference } = await aiTriageService.submit(submission)

    if (!triageResult.success) {
      return renderSummaryWithErrors(request, h, {
        sendError: true,
        errors: []
      })
    }

    sessionHelper.setReference(request.yar, reference)
    sessionHelper.clearTriageSession(request.yar)

    return h.redirect('/ai-toolkit/triage/thank-you')
  } catch (error) {
    request.logger.error(
      buildErrorLog(error, {
        type: 'form_submit',
        action: 'submit_triage',
        category: 'ai_triage'
      }),
      'Failed to process ai-triage summary form'
    )
    return h
      .response(getErrorHeading(statusCodes.notFound))
      .code(statusCodes.notFound)
  }
}

export const getThankYouPage = async (request, h) => {
  try {
    const reference = sessionHelper.getReference(request.yar)
    sessionHelper.clearReference(request.yar)

    return h.view('common/templates/layouts/confirmation', {
      title: 'Submission received',
      reference
    })
  } catch (error) {
    request.logger.error(
      { err: error },
      'Failed to load ai-triage thank-you page'
    )
    return h
      .response(getErrorHeading(statusCodes.notFound))
      .code(statusCodes.notFound)
  }
}
