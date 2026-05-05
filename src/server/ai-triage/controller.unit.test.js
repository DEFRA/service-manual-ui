import { describe, it, beforeEach, expect, vi } from 'vitest'
import { statusCodes } from '../common/constants/status-codes.js'

const mockLoadContent = vi.fn()
vi.mock('../common/helpers/content-loader.js', () => ({
  loadContent: (...args) => mockLoadContent(...args)
}))

const mockGetAnswer = vi.fn()
const mockSetAnswer = vi.fn()
const mockGetAnswers = vi.fn()
vi.mock('./service.js', () => ({
  getAnswer: (...args) => mockGetAnswer(...args),
  setAnswer: (...args) => mockSetAnswer(...args),
  getAnswers: (...args) => mockGetAnswers(...args)
}))

const { getTriagePage, postTriagePage, getSummaryPage, postSummaryPage } =
  await import('./controller.js')

const mockView = vi.fn()
const mockRedirect = vi.fn()
const mockLoggerError = vi.fn()

const buildH = () => ({
  view: mockView,
  redirect: mockRedirect,
  response: vi
    .fn()
    .mockReturnValue({ code: vi.fn().mockReturnValue('not-found') })
})

const mockYar = {
  get: vi.fn(),
  set: vi.fn()
}

const buildRequest = ({
  path = '/ai-toolkit/triage/question-1',
  payload = {}
} = {}) => ({
  path,
  payload,
  yar: mockYar,
  logger: { error: mockLoggerError }
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('#getTriagePage', () => {
  it('renders the question template with meta and content', async () => {
    mockLoadContent.mockReturnValue({
      meta: {
        title: 'Test Question',
        questionSubmitHref: '/current',
        questionContinueHref: '/next',
        layout: 'question'
      },
      content: ''
    })
    mockGetAnswer.mockReturnValue('previous answer')

    const handler = getTriagePage('ai-toolkit/triage/question-1.md')
    await handler(buildRequest(), buildH())

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/question.njk',
      expect.objectContaining({
        title: 'Test Question',
        questionValue: 'previous answer',
        currentUrl: '/ai-toolkit/triage/question-1'
      })
    )
  })

  it('rehydrates the session value using the slug as the answer key', async () => {
    mockLoadContent.mockReturnValue({ meta: {}, content: '' })
    mockGetAnswer.mockReturnValue('stored answer')

    const handler = getTriagePage('ai-toolkit/triage/question-2.md')
    await handler(
      buildRequest({ path: '/ai-toolkit/triage/question-2' }),
      buildH()
    )

    expect(mockGetAnswer).toHaveBeenCalledWith(mockYar, 'answer-question-2')
  })

  it('renders with null if no answer stored', async () => {
    mockLoadContent.mockReturnValue({ meta: {}, content: '' })
    mockGetAnswer.mockReturnValue(null)

    const handler = getTriagePage('ai-toolkit/triage/question-1.md')
    await handler(buildRequest(), buildH())

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/question.njk',
      expect.objectContaining({ questionValue: null })
    )
  })

  it('handles errors gracefully', async () => {
    mockLoadContent.mockImplementation(() => {
      throw new Error('Failed to load content')
    })

    const handler = getTriagePage('missing.md')
    const h = buildH()
    await handler(buildRequest(), h)

    expect(mockLoggerError).toHaveBeenCalled()
    expect(h.response).toHaveBeenCalledWith('Page not found')
  })
})

describe('#postTriagePage', () => {
  it('stores answer and redirects on valid submission', async () => {
    mockLoadContent.mockReturnValue({
      meta: {
        title: 'Test Question',
        questionContinueHref: '/next',
        layout: 'question',
        questionSchema: 'email-required'
      },
      content: ''
    })

    const handler = postTriagePage('ai-toolkit/triage/question-1.md')
    await handler(
      buildRequest({
        path: '/ai-toolkit/triage/question-1',
        payload: { answer: 'test@example.com' }
      }),
      buildH()
    )

    expect(mockSetAnswer).toHaveBeenCalledWith(
      mockYar,
      'answer-question-1',
      'test@example.com'
    )
    expect(mockRedirect).toHaveBeenCalledWith('/next')
  })

  it('trims answer before storing', async () => {
    mockLoadContent.mockReturnValue({
      meta: {
        questionContinueHref: '/next',
        questionSchema: 'text-required'
      },
      content: ''
    })

    const handler = postTriagePage('ai-toolkit/triage/question-3.md')
    await handler(
      buildRequest({
        path: '/ai-toolkit/triage/question-3',
        payload: { answer: '  answer with spaces  ' }
      }),
      buildH()
    )

    expect(mockSetAnswer).toHaveBeenCalledWith(
      mockYar,
      'answer-question-3',
      'answer with spaces'
    )
  })

  it('renders form with error on validation failure', async () => {
    mockLoadContent.mockReturnValue({
      meta: {
        title: 'Email Question',
        questionSchema: 'email-required'
      },
      content: ''
    })

    const handler = postTriagePage('ai-toolkit/triage/question-1.md')
    await handler(
      buildRequest({
        path: '/ai-toolkit/triage/question-1',
        payload: { answer: 'invalid-email' }
      }),
      buildH()
    )

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/question.njk',
      expect.objectContaining({
        title: 'Email Question',
        questionError: 'Enter a valid email address',
        questionValue: 'invalid-email'
      })
    )
    expect(mockSetAnswer).not.toHaveBeenCalled()
  })

  it('handles errors gracefully', async () => {
    mockLoadContent.mockImplementation(() => {
      throw new Error('Failed to load content')
    })

    const handler = postTriagePage('missing.md')
    const h = buildH()
    await handler(buildRequest({ payload: { answer: 'test' } }), h)

    expect(mockLoggerError).toHaveBeenCalled()
    expect(h.response).toHaveBeenCalledWith('Page not found')
  })
})

describe('#getSummaryPage', () => {
  const mockQuestionMeta = (n) => ({
    title: `Question ${n} title`,
    questionSubmitHref: `/ai-toolkit/triage/question-${n}`
  })

  beforeEach(() => {
    mockGetAnswers.mockReturnValue([
      { slug: 'question-1', answer: 'test@example.com' },
      { slug: 'question-2', answer: 'Some problem description' },
      { slug: 'question-3', answer: 'Many users' },
      { slug: 'question-4', answer: 'Big benefit' },
      { slug: 'question-5', answer: 'Tried nothing' }
    ])
    mockLoadContent.mockImplementation((filename) => {
      const match = filename.match(/question-(\d)/)
      if (match) {
        return { meta: mockQuestionMeta(match[1]), content: '' }
      }
      return {
        meta: {
          title: 'Check your answers',
          questionSubmitHref: '/ai-toolkit/triage/check-your-answers'
        },
        content: ''
      }
    })
  })

  it('renders the check-your-answers template with summary rows', async () => {
    const request = buildRequest({
      path: '/ai-toolkit/triage/check-your-answers'
    })
    await getSummaryPage(request, buildH())

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/check-your-answers.njk',
      expect.objectContaining({
        title: 'Check your answers',
        rows: expect.arrayContaining([
          expect.objectContaining({
            slug: 'question-1',
            answer: 'test@example.com',
            changeHref: '/ai-toolkit/triage/question-1'
          })
        ])
      })
    )
  })

  it('includes a row for each triage question', async () => {
    const request = buildRequest({
      path: '/ai-toolkit/triage/check-your-answers'
    })
    await getSummaryPage(request, buildH())

    const [, viewData] = mockView.mock.calls[0]
    expect(viewData.rows).toHaveLength(5)
  })

  it('handles errors gracefully', async () => {
    mockLoadContent.mockImplementation(() => {
      throw new Error('Failed to load')
    })

    const h = buildH()
    await getSummaryPage(buildRequest(), h)

    expect(mockLoggerError).toHaveBeenCalled()
    expect(h.response).toHaveBeenCalledWith('Page not found')
  })
})

describe('#postSummaryPage', () => {
  it('redirects to thank-you', async () => {
    const h = buildH()
    await postSummaryPage(buildRequest(), h)
    expect(mockRedirect).toHaveBeenCalledWith('/ai-toolkit/triage/thank-you')
  })
})
