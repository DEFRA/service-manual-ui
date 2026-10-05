import { MAX_MAILTO_LENGTH, TEAM_EMAIL } from './constants.js'
const SUBJECT = 'Ask the toolkit: I need help'

// The fixed words partials/ask-answer.njk shows for these outcomes. Change
// them in both places: the transcript is what the person saw, so the help
// page and the emails to the team must not carry words the screen hid.
const SHOWN = {
  blocked: 'This question cannot be answered here.',
  outsideToolkit:
    'The toolkit cannot answer this. It covers choosing a tool, the data you can use with it, and the patterns other teams have built.',
  noGuidanceYet:
    'The toolkit does not cover this yet. The closest guidance is below.',
  forTheTeam: 'This one is for the team.'
}

/**
 * The words an answer showed on screen. For blocked and cannot_answer that
 * is fixed wording, never the backend's message.
 * @param {object} answer
 * @returns {string}
 */
function shownText (answer) {
  if (answer.status === 'blocked') {
    return SHOWN.blocked
  }

  if (answer.status === 'cannot_answer') {
    return answer.reason === 'no_guidance_yet'
      ? SHOWN.noGuidanceYet
      : SHOWN.outsideToolkit
  }

  if (answer.status === 'talk_to_a_person') {
    return [SHOWN.forTheTeam, answer.message].filter(Boolean).join('\n')
  }

  return answer.message ?? ''
}

/**
 * Renders the conversation as plain text, for a person to send on or keep.
 * @param {Array<object>} exchanges
 * @returns {string}
 */
export function toPlainText (exchanges) {
  return exchanges
    .map(({ question, answer }) => {
      const parts = [
        `You asked:\n${question}`,
        `Ask the toolkit answered:\n${shownText(answer)}`
      ]

      if (answer.rule) {
        parts.push(
          `It quoted this rule:\n"${answer.rule.text}"\nFrom: ${answer.rule.source.title}`
        )
      }

      if (answer.sources.length) {
        const sources = answer.sources
          .map((source) => `- ${source.title} (${source.url})`)
          .join('\n')
        parts.push(`Guidance it used:\n${sources}`)
      }

      return parts.join('\n\n')
    })
    .join('\n\n---\n\n')
}

/**
 * Builds the mailto link for contacting the team.
 *
 * The conversation is included only when the person asked for it, and only
 * when the whole link stays within a length mail clients handle. Past that,
 * the link carries no conversation and the page tells them to paste it in,
 * rather than the mail client silently cutting the end off.
 * @param {object} params
 * @param {Array<object>} params.exchanges
 * @param {boolean} params.includeConversation
 * @returns {{ href: string, conversationIncluded: boolean }}
 */
export function buildContactLink ({ exchanges, includeConversation }) {
  const base = `mailto:${TEAM_EMAIL}?subject=${encodeURIComponent(SUBJECT)}`

  if (!includeConversation) {
    return { href: base, conversationIncluded: false }
  }

  const body = `I could not find what I needed with Ask the toolkit.\n\nHere is what I asked:\n\n${toPlainText(exchanges)}`
  const href = `${base}&body=${encodeURIComponent(body)}`

  return href.length > MAX_MAILTO_LENGTH
    ? { href: base, conversationIncluded: false }
    : { href, conversationIncluded: true }
}
