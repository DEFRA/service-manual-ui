import { loadContent } from '../common/helpers/content-loader.js'
import { statusCodes } from '../common/constants/status-codes.js'
import { getErrorHeading } from '../common/helpers/errors.js'
import * as sessionService from './service.js'
import schemas from './schemas/index.js'
import { triageQuestions } from './questions.js'

function slugFromPath(requestPath) {
  return requestPath.split('/').at(-1)
}

function answerKey(slug) {
  return `answer-${slug}`
}

/**
 * Load and validate answer using schema from frontmatter.
 * If no schema is specified, validation is skipped (question is optional).
 * @param {string} answer - Raw answer from form
 * @param {Object} meta - Frontmatter metadata (questionSchema field)
 * @returns {string|null} Error message or null
 */
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
      const questionValue = sessionService.getAnswer(
        request.yar,
        answerKey(slug)
      )

      return h.view('common/templates/layouts/question.njk', {
        ...meta,
        content,
        currentUrl: request.path,
        questionValue
      })
    } catch (error) {
      request.logger.error({ err: error }, 'Failed to load ai-triage page')
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
        return h.view('common/templates/layouts/question.njk', {
          ...meta,
          content,
          currentUrl: request.path,
          questionValue: answer,
          questionError: error
        })
      }

      const slug = slugFromPath(request.path)
      sessionService.setAnswer(request.yar, answerKey(slug), answer.trim())

      return h.redirect(meta.questionContinueHref)
    } catch (error) {
      request.logger.error({ err: error }, 'Failed to process ai-triage form')
      return h
        .response(getErrorHeading(statusCodes.notFound))
        .code(statusCodes.notFound)
    }
  }
}

/**
 * Build a slug from the last segment of a URL path.
 * e.g. '/ai-toolkit/triage/question-2' → 'question-2'
 */
function slugFromQuestionPath(questionPath) {
  return questionPath.split('/').at(-1)
}

/**
 * Load question titles and pair them with session answers.
 * @param {Object} yar - Hapi yar session
 * @returns {{ slug: string, title: string, answer: string|null, changeHref: string }[]}
 */
function buildSummaryRows(yar) {
  const slugs = triageQuestions.map(slugFromQuestionPath)
  const sessionAnswers = sessionService.getAnswers(yar, slugs)

  return triageQuestions.map((questionPath, i) => {
    const filename = `${questionPath.slice(1)}.md`
    const { meta } = loadContent(filename)
    return {
      slug: slugs[i],
      title: meta.title,
      answer: sessionAnswers[i].answer,
      changeHref: questionPath
    }
  })
}

export const getSummaryPage = async (request, h) => {
  try {
    const { meta } = loadContent('ai-toolkit/triage/check-your-answers.md')
    const rows = buildSummaryRows(request.yar)

    return h.view('common/templates/layouts/check-your-answers.njk', {
      ...meta,
      rows
    })
  } catch (error) {
    request.logger.error(
      { err: error },
      'Failed to load ai-triage summary page'
    )
    return h
      .response(getErrorHeading(statusCodes.notFound))
      .code(statusCodes.notFound)
  }
}

export const postSummaryPage = async (request, h) => {
  try {
    return h.redirect('/ai-toolkit/triage/thank-you')
  } catch (error) {
    request.logger.error(
      { err: error },
      'Failed to process ai-triage summary form'
    )
    return h
      .response(getErrorHeading(statusCodes.notFound))
      .code(statusCodes.notFound)
  }
}
