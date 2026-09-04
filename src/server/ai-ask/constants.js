/**
 * Ask the toolkit constants.
 */

// Longest question we accept. Long enough for a real question with context,
// short enough to keep what reaches the model bounded.
export const MAX_QUESTION_LENGTH = 500

// Route payload cap for the question form (8 KB in bytes).
// 500 chars URL-encoded (~3 bytes/char worst case) plus field overhead.
export const MAX_PAYLOAD_BYTES = 8192

// Rows on the question field. Two suggests a sentence rather than an essay,
// while still showing the whole of most questions as they are typed, and it
// keeps the field close enough in height to the button beside it.
export const QUESTION_ROWS = 2

/**
 * The route to a person, shown in the standard support box.
 *
 * Every other page in the toolkit ends with one of these, so the answer to
 * "what if this cannot help me" is in the place people already look for it.
 */
export const SUPPORT_BOX = {
  title: 'Get help from a person',
  description:
    'Ask the toolkit answers from published guidance. It cannot see your project and it cannot approve anything.',
  items: [
    'Email: <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Ask%20the%20toolkit" class="govuk-link">AICapabilityAndEnablement@defra.gov.uk</a>',
    'Want someone to look at your idea? <a href="/ai-toolkit/triage/question-1" class="govuk-link">Tell the AI Capability and Enablement team about it</a>'
  ]
}
