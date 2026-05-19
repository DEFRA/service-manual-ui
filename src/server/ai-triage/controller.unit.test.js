import { describe, test, beforeEach, expect, vi } from 'vitest'

const mockLoadContent = vi.fn()
vi.mock('../common/helpers/content-loader.js', () => ({
  loadContent: (...args) => mockLoadContent(...args)
}))

const mockGetAnswer = vi.fn()
const mockSetAnswer = vi.fn()
const mockGetTriageSessionData = vi.fn()
const mockClearTriageSession = vi.fn()

vi.mock('./session.js', () => ({
  getAnswer: (...args) => mockGetAnswer(...args),
  setAnswer: (...args) => mockSetAnswer(...args),
  getTriageSessionData: (...args) => mockGetTriageSessionData(...args),
  clearTriageSession: (...args) => mockClearTriageSession(...args)
}))

const mockTriageSubmissionFromSessionData = vi.fn()
const mockTriageSummaryFromSessionData = vi.fn()
vi.mock('./model.js', () => ({
  TriageSubmission: {
    fromSessionData: (...args) => mockTriageSubmissionFromSessionData(...args)
  },
  TriageSummaryViewModel: {
    fromSessionData: (...args) => mockTriageSummaryFromSessionData(...args)
  }
}))

const mockSubmit = vi.fn()
vi.mock('./service.js', () => ({
  submit: (...args) => mockSubmit(...args)
}))

const {
  getTriagePage,
  postTriagePage,
  getSummaryPage,
  postSummaryPage,
  getThankYouPage
} = await import('./controller.js')

const mockView = vi.fn()
const mockRedirect = vi.fn()
const mockLoggerError = vi.fn()

const buildH = () => ({
  view: mockView,
  redirect: mockRedirect
})

const mockYar = {
  get: vi.fn(),
  set: vi.fn()
}

const buildRequest = ({
  path = '/ai-toolkit/triage/question-1',
  payload = {},
  query = {}
} = {}) => ({
  path,
  payload,
  query,
  yar: mockYar,
  logger: { error: mockLoggerError }
})

beforeEach(() => {
  vi.clearAllMocks()
})

describe('#getTriagePage', () => {
  test('renders the question template with meta and content', async () => {
    mockLoadContent.mockReturnValue({
      meta: {
        title: 'Test Question',
        questionSubmitHref: '/current',
        questionContinueHref: '/next',
        layout: 'question'
      },
      content: ''
    })
    mockGetAnswer.mockReturnValue({ answer: 'previous answer' })

    const handler = getTriagePage('ai-toolkit/triage/question-1.md')
    await handler(buildRequest(), buildH())

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/question',
      expect.objectContaining({
        title: 'Test Question',
        questionValue: 'previous answer',
        currentUrl: '/ai-toolkit/triage/question-1'
      })
    )
  })

  test('rehydrates the session value using the slug as the answer key', async () => {
    mockLoadContent.mockReturnValue({ meta: {}, content: '' })
    mockGetAnswer.mockReturnValue({ answer: 'stored answer' })

    const handler = getTriagePage('ai-toolkit/triage/question-2.md')
    await handler(
      buildRequest({ path: '/ai-toolkit/triage/question-2' }),
      buildH()
    )

    expect(mockGetAnswer).toHaveBeenCalledWith(mockYar, 'question-2')
  })

  test('renders with null if no answer stored', async () => {
    mockLoadContent.mockReturnValue({ meta: {}, content: '' })
    mockGetAnswer.mockReturnValue(null)

    const handler = getTriagePage('ai-toolkit/triage/question-1.md')
    await handler(buildRequest(), buildH())

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/question',
      expect.objectContaining({ questionValue: null })
    )
  })

  test('logs and re-throws on error', async () => {
    const boom = new Error('Failed to load content')
    mockLoadContent.mockImplementation(() => { throw boom })

    const handler = getTriagePage('missing.md')
    await expect(handler(buildRequest(), buildH())).rejects.toThrow(boom)
    expect(mockLoggerError).toHaveBeenCalled()
  })
})

describe('#postTriagePage', () => {
  test('stores answer and redirects on valid submission', async () => {
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

    expect(mockSetAnswer).toHaveBeenCalledWith(mockYar, 'question-1', {
      answer: 'test@example.com'
    })
    expect(mockRedirect).toHaveBeenCalledWith('/next')
  })

  test('trims answer before storing', async () => {
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

    expect(mockSetAnswer).toHaveBeenCalledWith(mockYar, 'question-3', {
      answer: 'answer with spaces'
    })
  })

  test('renders form with error on validation failure', async () => {
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
      'common/templates/layouts/question',
      expect.objectContaining({
        title: 'Email Question',
        questionError: 'Enter a valid email address',
        questionValue: 'invalid-email'
      })
    )
    expect(mockSetAnswer).not.toHaveBeenCalled()
  })

  test('logs and re-throws on error', async () => {
    const boom = new Error('Failed to load content')
    mockLoadContent.mockImplementation(() => { throw boom })

    const handler = postTriagePage('missing.md')
    await expect(
      handler(buildRequest({ payload: { answer: 'test' } }), buildH())
    ).rejects.toThrow(boom)
    expect(mockLoggerError).toHaveBeenCalled()
  })
})

describe('#getSummaryPage', () => {
  beforeEach(() => {
    mockGetTriageSessionData.mockReturnValue({
      'question-1': { answer: 'test@example.com' },
      'question-2': { answer: 'Some problem description' },
      'question-3': { answer: 'Many users' },
      'question-4': { answer: 'Big benefit' },
      'question-5': { answer: 'Tried nothing' }
    })
    mockTriageSummaryFromSessionData.mockReturnValue({
      rows: [
        { slug: 'question-1', title: 'Question 1', answer: 'test@example.com', changeHref: '/ai-toolkit/triage/question-1' },
        { slug: 'question-2', title: 'Question 2', answer: 'Some problem description', changeHref: '/ai-toolkit/triage/question-2' },
        { slug: 'question-3', title: 'Question 3', answer: 'Many users', changeHref: '/ai-toolkit/triage/question-3' },
        { slug: 'question-4', title: 'Question 4', answer: 'Big benefit', changeHref: '/ai-toolkit/triage/question-4' },
        { slug: 'question-5', title: 'Question 5', answer: 'Tried nothing', changeHref: '/ai-toolkit/triage/question-5' }
      ],
      error: null
    })
    mockLoadContent.mockReturnValue({
      meta: { title: 'Check your answers' },
      content: ''
    })
  })

  test('renders the check-your-answers template with summary rows', async () => {
    const request = buildRequest({
      path: '/ai-toolkit/triage/check-your-answers'
    })
    await getSummaryPage(request, buildH())

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/check-your-answers',
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

  test('includes a row for each triage question', async () => {
    const request = buildRequest({
      path: '/ai-toolkit/triage/check-your-answers'
    })
    await getSummaryPage(request, buildH())

    const [, viewData] = mockView.mock.calls[0]
    expect(viewData.rows).toHaveLength(5)
  })

  test('logs and re-throws on error', async () => {
    const boom = new Error('Failed to load')
    mockLoadContent.mockImplementation(() => { throw boom })

    await expect(getSummaryPage(buildRequest(), buildH())).rejects.toThrow(boom)
    expect(mockLoggerError).toHaveBeenCalled()
  })
})

describe('#postSummaryPage', () => {
  const sessionData = {
    'question-1': { answer: 'test@example.com' },
    'question-2': { answer: 'A problem' },
    'question-3': { answer: 'Users' },
    'question-4': { answer: 'Benefits' },
    'question-5': { answer: 'Attempts' }
  }

  const mockSubmission = { email: 'test@example.com' }

  beforeEach(() => {
    mockGetTriageSessionData.mockReturnValue(sessionData)
    mockTriageSubmissionFromSessionData.mockReturnValue(mockSubmission)
    mockTriageSummaryFromSessionData.mockReturnValue({ rows: [], error: null })
    mockLoadContent.mockReturnValue({ meta: { title: 'Check your answers' }, content: '' })
    mockSubmit.mockResolvedValue({
      triageResult: { success: true },
      confirmationResult: { success: true }
    })
  })

  test('redirects to thank-you on success', async () => {
    await postSummaryPage(buildRequest(), buildH())
    expect(mockRedirect).toHaveBeenCalledWith('/ai-toolkit/triage/thank-you')
  })

  test('includes confirmationFailed=true in redirect when confirmation email fails', async () => {
    mockSubmit.mockResolvedValue({
      triageResult: { success: true },
      confirmationResult: { success: false }
    })
    await postSummaryPage(buildRequest(), buildH())
    expect(mockRedirect).toHaveBeenCalledWith('/ai-toolkit/triage/thank-you?confirmationFailed=true')
  })

  test('redirects without query param when confirmation email succeeds', async () => {
    await postSummaryPage(buildRequest(), buildH())
    expect(mockRedirect).toHaveBeenCalledWith('/ai-toolkit/triage/thank-you')
  })

  test('clears the triage session on successful submit', async () => {
    await postSummaryPage(buildRequest(), buildH())
    expect(mockClearTriageSession).toHaveBeenCalledWith(mockYar)
  })

  test('renders summary with errors when validation fails', async () => {
    const submitResult = {
      validationError: { details: [{ message: 'Enter an email address' }] }
    }
    mockSubmit.mockResolvedValue(submitResult)
    await postSummaryPage(buildRequest(), buildH())
    expect(mockTriageSummaryFromSessionData).toHaveBeenCalledWith(sessionData, submitResult)
    expect(mockView).toHaveBeenCalledWith('common/templates/layouts/check-your-answers', expect.any(Object))
    expect(mockClearTriageSession).not.toHaveBeenCalled()
  })

  test('renders summary with service error flag when submit fails', async () => {
    const submitResult = { triageResult: { success: false } }
    mockSubmit.mockResolvedValue(submitResult)
    await postSummaryPage(buildRequest(), buildH())
    expect(mockTriageSummaryFromSessionData).toHaveBeenCalledWith(sessionData, submitResult)
    expect(mockView).toHaveBeenCalledWith('common/templates/layouts/check-your-answers', expect.any(Object))
    expect(mockClearTriageSession).not.toHaveBeenCalled()
  })

  test('logs and re-throws on unexpected error', async () => {
    const boom = new Error('Unexpected failure')
    mockSubmit.mockRejectedValue(boom)
    await expect(postSummaryPage(buildRequest(), buildH())).rejects.toThrow(boom)
    expect(mockLoggerError).toHaveBeenCalled()
  })
})

describe('#getThankYouPage', () => {
  beforeEach(() => {
    mockLoadContent.mockReturnValue({
      meta: { title: 'Thank you', isResult: true },
      content: ''
    })
  })

  test('renders with confirmationEmailFailed false when no query param', async () => {
    await getThankYouPage(
      buildRequest({ path: '/ai-toolkit/triage/thank-you', query: {} }),
      buildH()
    )

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/question',
      expect.objectContaining({ confirmationEmailFailed: false })
    )
  })

  test('renders with confirmationEmailFailed true when query param is set', async () => {
    await getThankYouPage(
      buildRequest({
        path: '/ai-toolkit/triage/thank-you',
        query: { confirmationFailed: 'true' }
      }),
      buildH()
    )

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/question',
      expect.objectContaining({ confirmationEmailFailed: true })
    )
  })

  test('logs and re-throws on error', async () => {
    const boom = new Error('Failed to load content')
    mockLoadContent.mockImplementation(() => { throw boom })

    await expect(
      getThankYouPage(buildRequest({ path: '/ai-toolkit/triage/thank-you', query: {} }), buildH())
    ).rejects.toThrow(boom)
    expect(mockLoggerError).toHaveBeenCalled()
  })
})

