import { loadContent } from '../common/helpers/content-loader.js'
import {
  buildErrorLog,
  buildEventLog
} from '../common/helpers/logging/build-error-log.js'
import { createLogger } from '../common/helpers/logging/logger.js'
import { getEnabledMarkdownRoutes } from '../markdown-pages/index.js'

/**
 * Normalises an answer from the API into what the templates render.
 *
 * Two guarantees are enforced here rather than trusted from the API, because
 * a wrong answer about a rule is the failure that would matter most:
 *
 * 1. A source is kept only if it points at a page this service actually
 *    serves. That stops an answer citing a page that 404s, or linking out to
 *    somewhere we do not control.
 * 2. A quoted rule is rendered only if the quote really appears on the page it
 *    cites. If the model has reworded it, the quote is dropped and the answer
 *    falls back to its explanation plus the link. Better to show less than to
 *    present a paraphrase as the wording of a rule.
 */

/**
 * Collapses runs of whitespace so a quote still matches text that is wrapped
 * differently in the markdown source.
 * @param {string} text
 * @returns {string}
 */
function normalise (text) {
  return text.replace(/\s+/g, ' ').trim()
}

/**
 * @param {string} url - Internal path, e.g. /ai-toolkit/guidance/using-data-with-ai
 * @returns {boolean}
 */
function isServedPage (url) {
  return getEnabledMarkdownRoutes().includes(url)
}

/**
 * @param {string} quote
 * @param {string} url
 * @returns {boolean}
 */
export function quoteAppearsOnPage (quote, url) {
  if (!isServedPage(url)) {
    return false
  }

  const logger = createLogger()
  let content

  try {
    content = loadContent(`${url.slice(1)}.md`).content
  } catch (error) {
    // loadContent logs the read failure itself. This records the
    // consequence: an answer went out without the rule it meant to quote.
    logger.error(
      buildErrorLog(error, {
        type: 'ask_quoted_rule',
        action: 'load_source',
        reference: url
      }),
      'Ask the toolkit: dropped a quoted rule because its source page could not be loaded'
    )
    return false
  }

  const found = normalise(content).includes(normalise(quote))

  if (!found) {
    // A content defect: the model quoted words that are not on the page it
    // cites. Logged by page and length only. The quote is model output and
    // could echo what the person typed, which must never reach the logs.
    logger.warn(
      buildEventLog({
        type: 'ask_quoted_rule',
        action: 'verify',
        outcome: 'not_found',
        reference: url,
        reason: `quote_length_${quote.length}`
      }),
      'Ask the toolkit: dropped a quoted rule not found on its source page'
    )
  }

  return found
}

/**
 * @param {Array<object>} [sources]
 * @returns {Array<object>} Only those pointing at pages this service serves
 */
function usableSources (sources) {
  return (sources ?? [])
    .filter((source) => source?.url && isServedPage(source.url))
    .map(({ title, url, section }) => ({ title, url, section: section ?? null }))
}

/**
 * @param {object|null} [ruleVerbatim] - The rule_verbatim field from the API
 * @returns {object|null} The rule to render, or null if it cannot be trusted
 */
function usableRule (ruleVerbatim) {
  const text = ruleVerbatim?.text
  const source = ruleVerbatim?.source

  if (!text || !source?.url || !quoteAppearsOnPage(text, source.url)) {
    return null
  }

  return {
    text,
    source: {
      title: source.title,
      url: source.url,
      section: source.section ?? null
    }
  }
}

/**
 * Maps an answer from the API wire shape into the view model.
 *
 * snake_case to camelCase happens here and nowhere else, so the rest of the
 * service never sees the wire shape.
 * @param {object} apiAnswer
 * @returns {object}
 */
export function toViewModel (apiAnswer) {
  const rule = usableRule(apiAnswer.rule_verbatim)

  // A page already linked from the quotation is not listed again underneath
  // it. The quotation names where its wording came from, so repeating the same
  // page two lines below adds nothing and reads as a mistake.
  const sources = usableSources(apiAnswer.sources).filter(
    (source) => source.url !== rule?.source.url
  )

  return {
    status: apiAnswer.status,
    message: apiAnswer.message ?? null,
    rule,
    sources
  }
}
