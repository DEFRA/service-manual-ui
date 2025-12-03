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

export function markdown(content) {
  if (!content) return ''
  return md.render(content)
}

