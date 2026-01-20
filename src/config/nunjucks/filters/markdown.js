import markdownIt from 'markdown-it'
import markdownItGovuk from 'markdown-it-govuk'

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true
})

md.use(markdownItGovuk, {
  headingsStartWith: 'l',
  calvert: true,
  govspeak: true
})

// Custom render for hr to add govuk class
md.renderer.rules.hr = () => {
  return '<hr class="govuk-section-break govuk-section-break--visible govuk-section-break--xl">'
}

// Custom render for information callout to use GOV.UK inset text class
md.renderer.rules.govspeak_information_callout_open = () => {
  return '<div class="govuk-inset-text">'
}

md.renderer.rules.govspeak_information_callout_close = () => {
  return '</div>'
}

// Custom render for warning callout to use GOV.UK warning text class
md.renderer.rules.govspeak_warning_callout_open = () => {
  return '<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>'
}

md.renderer.rules.govspeak_warning_callout_close = () => {
  return '</strong></div>'
}

// Custom render for links - external links open in new tab
const defaultLinkRender =
  md.renderer.rules.link_open ||
  function (_tokens, _idx, _options, _env, self) {
    return self.renderToken(_tokens, _idx, _options)
  }

md.renderer.rules.link_open = function (tokens, idx, options, _env, self) {
  const token = tokens[idx]
  const hrefIndex = token.attrIndex('href')

  if (hrefIndex >= 0) {
    const href = token.attrs[hrefIndex][1]
    // Check if external link (starts with http:// or https://)
    if (href.startsWith('http://') || href.startsWith('https://')) {
      token.attrPush(['target', '_blank'])
      token.attrPush(['rel', 'noreferrer noopener'])
    }
  }

  return defaultLinkRender(tokens, idx, options, _env, self)
}

export function markdown(content) {
  if (!content) {
    return ''
  }
  return md.render(content)
}
