import { config } from '../../config/config.js'

import { helpPath } from './paths.js'

/**
 * Ask the toolkit constants.
 */

// The team behind the toolkit. Used by the phase banner, the support box and
// the email built when someone is stuck. Read from config, as the triage
// mailbox is, so it is set in one place and can be overridden per
// environment without a code change.
export const TEAM_EMAIL = config.get('aiContent.teamEmail')

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

// Rows on the question field. Roomier than a search box, which invites a few
// keywords, and research on retrieval systems across GOV.UK found that vague
// questions produce vague, dead-end answers. Not roomier than that: Enter
// sends, so a field that looks made for paragraphs would invite the line
// break that sends half a question, and a four-row field outweighed the
// answer above it on the page.
export const QUESTION_ROWS = 3

// How many turns of a conversation show in full before the rest sit behind
// "Show earlier questions". Enough to read the thread you are in without the
// newest answer drifting far down a long page.
export const VISIBLE_TURNS = 3

// Longest report we accept on "Report a problem with this answer". The same
// bound as a question, for the same reason: enough to say what is wrong,
// short enough to keep an email readable.
export const MAX_REPORT_LENGTH = MAX_QUESTION_LENGTH

// Offered on the front door so nobody has to ask "where do I start?". Each is
// a question the guidance answers directly, so each belongs in the golden set
// too: an example that answers badly is worse than none. No "get help"
// question: the support box below answers that without a wait. No incident
// question: an incident needs the incident page at once, not an AI answer.
export const EXAMPLE_QUESTIONS = [
  'What data can I use with AI tools?',
  'Can I use any AI tool at Defra?',
  'What should I check before using an AI agent?'
]

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
    `<a href="mailto:${TEAM_EMAIL}?subject=Ask%20the%20toolkit%3A%20help%20with%20my%20project" class="govuk-link">Email the AI Capability and Enablement team</a>`
  ]
}

export const ANSWER_SUPPORT_BOX = {
  ...SUPPORT_BOX,
  items: [
    `<a href="${helpPath}" class="govuk-link">Email the AI Capability and Enablement team</a>`
  ]
}
