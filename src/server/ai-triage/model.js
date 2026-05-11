import { loadContent } from '../common/helpers/content-loader.js'

import { triageQuestions } from './questions.js'

function slugFromQuestionPath(questionPath) {
  return questionPath.split('/').at(-1)
}

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
  constructor(email, problem, users, benefits, solutionAttempts) {
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
  static fromSessionData(sessionData) {
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
  constructor(rows) {
    this.rows = rows
  }

  static fromSessionData(sessionData) {
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

    return new TriageSummaryViewModel(rows)
  }
}
