import { MAX_QUESTION_LENGTH } from './constants.js'

/**
 * Validates a submitted question.
 *
 * Error messages say what to do, not what is wrong, and avoid "valid" and
 * "invalid" as the content rules require.
 * @param {string} [question] - Raw value from the form
 * @returns {{ question: string, error: string|null }}
 */
export function validateQuestion (question) {
  const trimmed = (question ?? '').trim()

  if (!trimmed) {
    return { question: trimmed, error: 'Enter your question' }
  }

  if (trimmed.length > MAX_QUESTION_LENGTH) {
    return {
      question: trimmed,
      error: `Your question must be ${MAX_QUESTION_LENGTH} characters or fewer`
    }
  }

  return { question: trimmed, error: null }
}
