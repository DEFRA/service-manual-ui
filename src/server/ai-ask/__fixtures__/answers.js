/**
 * Stub answers, used until ai-toolkit-chat-backend exists.
 *
 * These are in the wire shape agreed for the API, snake_case included, so the
 * mapping the real backend will exercise is the one exercised here.
 *
 * Selection is by keyword rather than at random, so a demonstration shows the
 * same answer to the same question every time.
 *
 * Every rule_verbatim.text below is copied exactly from the toolkit page it
 * cites. That is the point of the field: the model explains around a rule, it
 * never rewrites one.
 */

const personalDataAnswer = {
  status: 'answered',
  message:
    'Microsoft 365 Copilot is an enterprise tool inside the Defra tenant, so Defra\'s data boundary applies. That is not the same as clearance to use personal data in it.',
  rule_verbatim: {
    text: 'For personal data, the DPIA route is for a service you are building to process it, not a way to paste it into an everyday tool. For everyday use, remove personal data first.',
    source: {
      title: 'Using data with AI',
      url: '/ai-toolkit/guidance/using-data-with-ai',
      section: 'What the conditions mean'
    }
  },
  sources: [
    {
      title: 'Using data with AI',
      url: '/ai-toolkit/guidance/using-data-with-ai',
      section: 'What the conditions mean'
    },
    {
      title: 'Microsoft 365 Copilot',
      url: '/ai-toolkit/tools/microsoft-365-copilot',
      section: null
    }
  ]
}

const choosingAToolAnswer = {
  status: 'answered',
  message:
    'Start from the data you will use, then check the tools radar for a tool cleared for that classification. The radar entry tells you the status of the tool and any conditions on using it.',
  rule_verbatim: null,
  sources: [
    {
      title: 'Choosing a tool',
      url: '/ai-toolkit/guidance/choosing-a-tool',
      section: null
    },
    { title: 'Find a tool', url: '/ai-toolkit/tools', section: null }
  ]
}

const generalAnswer = {
  status: 'answered',
  message:
    'The AI digital toolkit covers choosing a tool, the data you can use with it, the patterns teams reuse, and how to get support. Ask about any of those and the answer will link to the guidance it came from.',
  rule_verbatim: null,
  sources: [
    { title: 'AI digital toolkit', url: '/ai-toolkit', section: null },
    {
      title: 'Deliver with AI',
      url: '/ai-toolkit/deliver-with-ai',
      section: null
    }
  ]
}

const matchers = [
  { keywords: ['personal data', 'copilot'], answer: personalDataAnswer },
  { keywords: ['tool', 'radar', 'approved'], answer: choosingAToolAnswer }
]

/**
 * Picks the stub answer for a question.
 * @param {string} question
 * @returns {object} An answer in the API wire shape
 */
export function fixtureAnswerFor (question) {
  const asked = question.toLowerCase()
  const match = matchers.find(({ keywords }) =>
    keywords.some((keyword) => asked.includes(keyword))
  )

  return match ? match.answer : generalAnswer
}
