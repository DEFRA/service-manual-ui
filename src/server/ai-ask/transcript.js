import { MAX_MAILTO_LENGTH } from './constants.js'

const AICE_EMAIL = 'AICapabilityAndEnablement@defra.gov.uk'
const SUBJECT = 'Ask the toolkit: I need help'

/**
 * Renders the conversation as plain text, for a person to send on or keep.
 * @param {Array<object>} messages
 * @returns {string}
 */
export function toPlainText (exchanges) {
  return exchanges
    .map(({ question, answer }) => {
      const parts = [
        `You asked:\n${question}`,
        `Ask the toolkit answered:\n${answer.message ?? ''}`
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
  const base = `mailto:${AICE_EMAIL}?subject=${encodeURIComponent(SUBJECT)}`

  if (!includeConversation) {
    return { href: base, conversationIncluded: false }
  }

  const body = `I could not find what I needed with Ask the toolkit.\n\nHere is what I asked:\n\n${toPlainText(exchanges)}`
  const href = `${base}&body=${encodeURIComponent(body)}`

  return href.length > MAX_MAILTO_LENGTH
    ? { href: base, conversationIncluded: false }
    : { href, conversationIncluded: true }
}
