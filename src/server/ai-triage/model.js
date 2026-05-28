import { loadContent } from '../common/helpers/content-loader.js'

import { triageQuestions } from './questions.js'

function slugFromQuestionPath (questionPath) {
  return questionPath.split('/').at(-1)
}
/**
 * @typedef {Object} SubmitResult
 * @property {import('joi').ValidationError} [validationError] - Validation error if submission failed
 * @property {Array<{message: string}>} [validationError.details] - Validation error details
 * @property {Object} [triageResult] - Triage service result
 * @property {boolean} [triageResult.success] - Whether triage submission succeeded
 * @property {Object} [confirmationResult] - Email confirmation result
 * @property {boolean} [confirmationResult.success] - Whether confirmation email sent
 */
/**
 * A submission created from triage questionnaire session data.
 */
export class TriageSubmission {
  /**
   * @param {string|null} email
   * @param {string|null} problem
   * @param {string|null} users
   * @param {string|null} benefits
   * @param {string|null} solutionAttempts
   */
  constructor (email, problem, users, benefits, solutionAttempts) {
    this.email = email
    this.problem = problem
    this.users = users
    this.benefits = benefits
    this.solutionAttempts = solutionAttempts
  }

  /**
   * Build a TriageSubmission from session data.
   * @param {Record<string, any>} sessionData
   * @returns {TriageSubmission}
   */
  static fromSessionData (sessionData) {
    const payload = {}

    for (const questionPath of triageQuestions) {
      const slug = slugFromQuestionPath(questionPath)
      const filename = `${questionPath.slice(1)}.md`
      const { meta } = loadContent(filename)
      const stored = sessionData[slug]

      if (!stored || !meta.fields) {
        continue
      }

      for (const [inputName, serviceKey] of Object.entries(meta.fields)) {
        if (stored[inputName] != null) {
          payload[serviceKey] = stored[inputName]
        }
      }
    }

    return new TriageSubmission(
      payload.email,
      payload.problem,
      payload.users,
      payload.benefits,
      payload.solutionAttempts
    )
  }
}

export class TriageSummaryViewModel {
  /**
   * @param {Array} rows
   * @param {{ type: 'validation', messages: string[] } | { type: 'send' } | null} error
   */
  constructor (rows, error = null) {
    this.rows = rows
    this.error = error
  }

  /**
   * @param {Record<string, any>} sessionData
   * @param {SubmitResult} submitResult
   */
  static fromSessionData (sessionData, submitResult = {}) {
    const rows = triageQuestions.map((questionPath) => {
      const slug = slugFromQuestionPath(questionPath)
      const filename = `${questionPath.slice(1)}.md`
      const { meta } = loadContent(filename)
      const stored = sessionData[slug]

      const answer = stored?.answer ?? null

      return {
        slug,
        title: meta.title,
        answer,
        changeHref: questionPath
      }
    })

    if (submitResult.validationError) {
      const messages = submitResult.validationError.details.map(
        (d) => d.message
      )

      return new TriageSummaryViewModel(rows, { type: 'validation', messages })
    }

    if (submitResult.triageResult?.success === false) {
      return new TriageSummaryViewModel(rows, { type: 'send' })
    }

    return new TriageSummaryViewModel(rows)
  }
}
