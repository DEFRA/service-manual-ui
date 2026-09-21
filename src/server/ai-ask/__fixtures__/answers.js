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
    'Start from the data you will use, because the classification decides which kind of tool you can put it into. The tools radar shows how established each tool is at Defra, not whether you are allowed to use it.',
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

const needMoreDetailAnswer = {
  status: 'need_more_detail',
  message:
    'The toolkit covers a few different things. Which is closest to what you are asking?',
  rule_verbatim: null,
  sources: [],
  options: [
    'What data am I allowed to use with an AI tool?',
    'Which AI tool should I use for my project?',
    'What patterns have other teams already built?',
    'How do I get started with the AI digital toolkit?'
  ]
}

// The four outcomes below are stub text only. Chris owns the final wording
// (card 012); these exist to get the shape, and each screen, working without
// the backend.
const cannotAnswerOutsideToolkitAnswer = {
  status: 'cannot_answer',
  message: 'That is outside what the AI digital toolkit covers.',
  reason: 'outside_toolkit',
  rule_verbatim: null,
  sources: []
}

const cannotAnswerNoGuidanceYetAnswer = {
  status: 'cannot_answer',
  message: 'The toolkit does not have guidance on this yet.',
  reason: 'no_guidance_yet',
  rule_verbatim: null,
  sources: [
    {
      title: 'Choosing a tool',
      url: '/ai-toolkit/guidance/choosing-a-tool',
      section: null
    }
  ]
}

const talkToAPersonAnswer = {
  status: 'talk_to_a_person',
  message:
    'This depends on your project, so it needs a conversation with the team rather than a general answer.',
  rule_verbatim: null,
  sources: []
}

// Never says the question was flagged, filtered, unsafe or violated anything,
// per the one wording rule already agreed for this outcome.
const blockedAnswer = {
  status: 'blocked',
  message:
    'This is outside what Ask the toolkit can help with. Try asking about choosing a tool, using data with AI, or the patterns other teams have built.',
  rule_verbatim: null,
  sources: []
}

const errorAnswer = {
  status: 'error',
  message: 'Something went wrong answering this. No answer was generated.',
  rule_verbatim: null,
  sources: []
}

const matchers = [
  { keywords: ['personal data', 'copilot'], answer: personalDataAnswer },
  { keywords: ['tool', 'radar', 'approved'], answer: choosingAToolAnswer },
  { keywords: ['help me', 'where do i start'], answer: needMoreDetailAnswer },
  {
    keywords: ['pension', 'expenses', 'parking'],
    answer: cannotAnswerOutsideToolkitAnswer
  },
  {
    keywords: ['buying', 'procurement'],
    answer: cannotAnswerNoGuidanceYetAnswer
  },
  {
    keywords: ['my project', 'do we need a dpia'],
    answer: talkToAPersonAnswer
  },
  { keywords: ['legal advice', 'medical'], answer: blockedAnswer },
  { keywords: ['simulate an error'], answer: errorAnswer }
]

// Openings that mean "carry on from what I just asked" rather than "here is a
// new subject". A short question does the same job: "what about agents?" only
// makes sense against the question before it.
const FOLLOW_UP_OPENINGS = [
  'what about',
  'and ',
  'but ',
  'so ',
  'why',
  'how about',
  'what if',
  'does that',
  'is that',
  'can i still'
]

// Words that only mean something against the question before them. "Can I use
// it with research data?" is a follow-up; the same sentence naming the tool is
// not.
const REFERRING_WORDS = [
  'it',
  'that',
  'this',
  'they',
  'them',
  'those',
  'these',
  'instead'
]
const FOLLOW_UP_WORD_COUNT = 8

/**
 * @param {string} asked - Lower-cased question
 * @returns {boolean}
 */
function readsAsFollowUp (asked) {
  // Digits stay: "article 9" is two words, not one.
  const words = asked.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean)

  return (
    FOLLOW_UP_OPENINGS.some((opening) => asked.startsWith(opening)) ||
    words.length <= FOLLOW_UP_WORD_COUNT ||
    REFERRING_WORDS.some((word) => words.includes(word))
  )
}

/**
 * Picks the stub answer for a question.
 *
 * The real service is meant to hold a conversation: the API contract carries a
 * conversation_id and a reply_to, and the GOV.UK analysis of real question and
 * answer pairs found that following up is the normal case, not the exception.
 * A stub that answered every question from scratch made the page feel like a
 * row of separate searches, and there was no way to tell whether that was the
 * design or the stub. So a question that reads as a follow-up is answered as
 * one, naming what it is following on from.
 * @param {string} question
 * @param {object} [context]
 * @param {string} [context.previousQuestion] The question asked before this one
 * @returns {object} An answer in the API wire shape
 */
export function fixtureAnswerFor (question, { previousQuestion } = {}) {
  const asked = question.toLowerCase()
  const match = matchers.find(({ keywords }) =>
    keywords.some((keyword) => asked.includes(keyword))
  )
  const answer = match ? match.answer : generalAnswer

  if (!previousQuestion || !readsAsFollowUp(asked)) {
    return answer
  }

  return {
    ...answer,
    message: `Still on "${previousQuestion}": ${answer.message}`
  }
}
