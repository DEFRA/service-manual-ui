import { loadContent } from '../common/helpers/content-loader.js'

import * as model from './model.js'
import * as sessionHelper from './session.js'
import * as aiTriageService from './service.js'

import schemas from './schemas/index.js'
import submissionSchema from './schemas/submission.js'

/**
 * Extract the slug (last path segment) from a request path
 * @param {string} requestPath - The request path
 * @returns {string} The slug
 */
function slugFromPath(requestPath) {
  return requestPath.split('/').at(-1)
}

/**
 * Render the summary page with error state
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @param {{sendError: boolean, errors: string[]}} errorState - Error state to render
 * @returns {Promise} Rendered check-your-answers page
 */
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

/**
 * Validate an answer against its schema
 * @param {string} answer - The answer value
 * @param {object} meta - The question metadata containing questionSchema
 * @returns {string|null} Error message if invalid, null if valid
 */
function validateAnswer(answer, meta) {
  const schemaName = meta.questionSchema

  if (!schemaName) {
    return null
  }

  const schema = schemas[schemaName]

  if (!schema) {
    return `Schema not found: ${schemaName}`
  }

  const { error } = schema.validate(answer)

  return error?.message ?? null
}

/**
 * GET handler for triage question pages
 * Loads the question content and displays any previously stored answer
 * @param {string} filename - The content file to load
 * @returns {Function} Express-like handler function
 */
export const getTriagePage = (filename) => {
  return async (request, h) => {
    const { meta, content } = loadContent(filename)
    const slug = slugFromPath(request.path)
    const stored = sessionHelper.getAnswer(request.yar, sessionHelper.answerKey(slug))
    const questionValue = stored?.answer ?? null

    return h.view('common/templates/layouts/question', {
      ...meta,
      content,
      currentUrl: request.path,
      questionValue
    })
}
}

/**
 * POST handler for triage question pages
 * Validates the answer, stores it in session, and redirects to next question
 * @param {string} filename - The content file to load for validation
 * @returns {Function} Express-like handler function
 */
export const postTriagePage = (filename) => {
  return async (request, h) => {
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

    sessionHelper.setAnswer(request.yar, sessionHelper.answerKey(slug), {
      answer: answer.trim()
    })

    return h.redirect(meta.questionContinueHref)
  }
}

/**
 * GET handler for triage summary (check your answers) page
 * Loads all session data and displays answers in review format
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {Promise} Rendered summary page or error response
 */
export const getSummaryPage = async (request, h) => {
  const { meta } = loadContent('ai-toolkit/triage/check-your-answers.md')
  const sessionData = sessionHelper.getTriageSessionData(request.yar)
  const viewModel = model.TriageSummaryViewModel.fromSessionData(sessionData)

  return h.view('common/templates/layouts/check-your-answers', {
    ...meta,
    rows: viewModel.rows
  })
}

/**
 * POST handler for triage submission
 * Validates the complete submission and sends via GovUK Notify
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {Promise} Redirect to thank you page or error page with messages
 */
export const postSummaryPage = async (request, h) => {
  const sessionData = sessionHelper.getTriageSessionData(request.yar)
  const submission = model.TriageSubmission.fromSessionData(sessionData)

  const { error: validationError } = submissionSchema.validate(submission, {
    abortEarly: false
  })

  if (validationError) {
    const errors = validationError.details.map((d) => d.message)
    return renderSummaryWithErrors(request, h, { sendError: false, errors })
  }

  const { triageResult } = await aiTriageService.submit(submission)

  if (!triageResult.success) {
    return renderSummaryWithErrors(request, h, { sendError: true, errors: [] })
  }

  return h.redirect('/ai-toolkit/triage/thank-you')
}
