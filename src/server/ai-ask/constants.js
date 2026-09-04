/**
 * Ask the toolkit constants.
 */

// Longest question we accept. Long enough for a real question with context,
// short enough to keep what reaches the model bounded.
export const MAX_QUESTION_LENGTH = 500

// Longest mailto link we will build. Mail clients and browsers start dropping
// or refusing longer ones, and a silently truncated email is worse than one
// the person pastes into themselves.
export const MAX_MAILTO_LENGTH = 1900

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
 */
export const SUPPORT_BOX = {
  title: 'Get help from a person',
  description:
    'For advice on your own project, or anything that needs a decision, the team is there to help.',
  items: [
    'Email the <a href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Ask%20the%20toolkit" class="govuk-link">AI Capability and Enablement team</a>'
  ]
}
