/**
 * Ask the toolkit constants.
 */

// The team behind the toolkit. Used by the phase banner, the support box and
// the email built when someone is stuck.
export const TEAM_EMAIL = 'AICapabilityAndEnablement@defra.gov.uk'

// Longest conversation we hold. Answers live in the session until it expires,
// so this bounds what one person can accumulate there, and it bounds the
// transcript they can send on. Past it, the answer page offers a fresh start
// instead of the follow-up field.
export const MAX_EXCHANGES = 20

// Longest question we accept. Long enough for a real question with context,
// short enough to keep what reaches the model bounded.
export const MAX_QUESTION_LENGTH = 500

// Longest mailto link we will build. Mail clients and browsers start dropping
// or refusing longer ones, and a silently truncated email is worse than one
// the person pastes into themselves.
export const MAX_MAILTO_LENGTH = 1900

// How full the field has to be before the character count appears, as a
// percentage. A count sitting there from the start is noise on a question
// most people will answer in a line.
export const QUESTION_COUNT_THRESHOLD = 90

// Route payload cap for the question form (8 KB in bytes).
// 500 chars URL-encoded (~3 bytes/char worst case) plus field overhead.
export const MAX_PAYLOAD_BYTES = 8192

// Rows on the question field. Deliberately roomy: a field the size of a search
// box invites a few keywords, and research on retrieval systems across GOV.UK
// found that vague questions are what produce vague, dead-end answers. A field
// that looks like somewhere to write a sentence asks for one.
export const QUESTION_ROWS = 4

/**
 * The route to a person, shown in the standard support box.
 *
 * Every other page in the toolkit ends with one of these, so the answer to
 * "what if this cannot help me" is in the place people already look for it.
 * The front door links the email directly. An answer page links the help
 * route instead, which offers to send the conversation along with it.
 */
export const SUPPORT_BOX = {
  title: 'Get help from a person',
  description: 'For advice on your own project, or a decision, the team can help.',
  items: [
    `Email the <a href="mailto:${TEAM_EMAIL}?subject=Ask%20the%20toolkit%3A%20help%20with%20my%20project" class="govuk-link">AI Capability and Enablement team</a>`
  ]
}

export const ANSWER_SUPPORT_BOX = {
  ...SUPPORT_BOX,
  items: [
    '<a href="/ai-toolkit/ask/help" class="govuk-link">Speak to the AI Capability and Enablement team</a>'
  ]
}
