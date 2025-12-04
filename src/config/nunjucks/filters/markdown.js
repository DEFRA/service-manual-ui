import markdownIt from 'markdown-it'
import markdownItGovuk from 'markdown-it-govuk'

const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true
})

md.use(markdownItGovuk, {
  headingsStartWith: 'l',
  calvert: true
})

// Custom render for hr to add govuk class
md.renderer.rules.hr = (tokens, idx, options, env, self) => {
  return '<hr class="govuk-section-break govuk-section-break--visible govuk-section-break--xl">'
}

// Custom render for links - external links open in new tab
const defaultLinkRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
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

  return defaultLinkRender(tokens, idx, options, env, self)
}

export function markdown(content) {
  if (!content) return ''
  return md.render(content)
}
