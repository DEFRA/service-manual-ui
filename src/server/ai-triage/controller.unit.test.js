import { describe, test, beforeEach, expect, vi } from 'vitest'

const mockLoadContent = vi.fn()
vi.mock('../common/helpers/content-loader.js', () => ({
  loadContent: (...args) => mockLoadContent(...args)
}))

const mockGetAnswer = vi.fn()
const mockSetAnswer = vi.fn()
const mockGetTriageSessionData = vi.fn()
const mockClearTriageSession = vi.fn()
const mockSetReference = vi.fn()
const mockGetReference = vi.fn()
const mockClearReference = vi.fn()

vi.mock('./session.js', () => ({
  getAnswer: (...args) => mockGetAnswer(...args),
  setAnswer: (...args) => mockSetAnswer(...args),
  getTriageSessionData: (...args) => mockGetTriageSessionData(...args),
  clearTriageSession: (...args) => mockClearTriageSession(...args),
  setReference: (...args) => mockSetReference(...args),
  getReference: (...args) => mockGetReference(...args),
  clearReference: (...args) => mockClearReference(...args)
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

const mockConfigGet = vi.fn()
vi.mock('../../config/config.js', () => ({
  config: {
    get: (...args) => mockConfigGet(...args)
  }
}))

vi.mock('./email-allow-list.js', () => ({
  isEmailDomainAllowed: () => true
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

  test('handles errors gracefully', async () => {
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

  test('handles errors gracefully', async () => {
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
        {
          slug: 'question-1',
          title: 'Question 1',
          answer: 'test@example.com',
          changeHref: '/ai-toolkit/triage/question-1'
        },
        {
          slug: 'question-2',
          title: 'Question 2',
          answer: 'Some problem description',
          changeHref: '/ai-toolkit/triage/question-2'
        },
        {
          slug: 'question-3',
          title: 'Question 3',
          answer: 'Many users',
          changeHref: '/ai-toolkit/triage/question-3'
        },
        {
          slug: 'question-4',
          title: 'Question 4',
          answer: 'Big benefit',
          changeHref: '/ai-toolkit/triage/question-4'
        },
        {
          slug: 'question-5',
          title: 'Question 5',
          answer: 'Tried nothing',
          changeHref: '/ai-toolkit/triage/question-5'
        }
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

    const viewData = mockView.mock.calls[0][1]
    expect(viewData.rows).toHaveLength(5)
    expect(viewData.error).toBeNull()
  })

  test('handles errors gracefully', async () => {
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
  beforeEach(() => {
    mockGetTriageSessionData.mockReturnValue({
      'question-1': { answer: 'test@example.com' },
      'question-2': { answer: 'A problem' },
      'question-3': { answer: 'Users' },
      'question-4': { answer: 'Benefits' },
      'question-5': { answer: 'Attempts' }
    })
    mockTriageSubmissionFromSessionData.mockReturnValue({
      email: 'test@example.com',
      problem: 'A problem',
      users: 'Users',
      benefits: 'Benefits',
      solutionAttempts: 'Attempts'
    })
    mockSubmit.mockResolvedValue({
      triageResult: { success: true },
      reference: 'AICE-26-TEST01',
      confirmationResult: { success: true }
    })
  })

  test('redirects to thank-you', async () => {
    const submitResult = {
      triageResult: { success: true },
      confirmationResult: { success: true }
    }
    mockSubmit.mockResolvedValue(submitResult)
    mockTriageSummaryFromSessionData.mockReturnValue({
      rows: [],
      error: null
    })
    mockLoadContent.mockReturnValue({
      meta: { title: 'Check your answers' },
      content: ''
    })

    const h = buildH()
    await postSummaryPage(buildRequest(), h)

    expect(mockTriageSummaryFromSessionData).toHaveBeenCalledWith(
      expect.any(Object),
      submitResult
    )
    expect(mockRedirect).toHaveBeenCalledWith('/ai-toolkit/triage/thank-you')
  })
  test('includes confirmationFailed=true in redirect when confirmation email fails', async () => {
    const submitResult = {
      triageResult: { success: true },
      confirmationResult: { success: false }
    }
    mockSubmit.mockResolvedValue(submitResult)
    mockTriageSummaryFromSessionData.mockReturnValue({
      rows: [],
      error: null
    })
    mockLoadContent.mockReturnValue({
      meta: { title: 'Check your answers' },
      content: ''
    })
    const h = buildH()
    await postSummaryPage(buildRequest(), h)

    expect(mockRedirect).toHaveBeenCalledWith(
      '/ai-toolkit/triage/thank-you?confirmationFailed=true'
    )
  })

  test('redirects to thank-you without query param when confirmation email succeeds', async () => {
    const submitResult = {
      triageResult: { success: true },
      confirmationResult: { success: true }
    }
    mockSubmit.mockResolvedValue(submitResult)
    mockTriageSummaryFromSessionData.mockReturnValue({
      rows: [],
      error: null
    })
    mockLoadContent.mockReturnValue({
      meta: { title: 'Check your answers' },
      content: ''
    })

    const h = buildH()
    await postSummaryPage(buildRequest(), h)

    expect(mockRedirect).toHaveBeenCalledWith('/ai-toolkit/triage/thank-you')
  })

  test('clears the triage session on successful submit', async () => {
    const submitResult = {
      triageResult: { success: true },
      confirmationResult: { success: true }
    }
    mockSubmit.mockResolvedValue(submitResult)
    mockTriageSummaryFromSessionData.mockReturnValue({
      rows: [],
      error: null
    })
    mockLoadContent.mockReturnValue({
      meta: { title: 'Check your answers' },
      content: ''
    })

    await postSummaryPage(buildRequest(), buildH())
    expect(mockClearTriageSession).toHaveBeenCalledWith(mockYar)
  })

  test('does not clear session when validation fails', async () => {
    const sessionData = {
      'question-1': { answer: 'test@example.com' },
      'question-2': { answer: 'A problem' },
      'question-3': { answer: 'Users' },
      'question-4': { answer: 'Benefits' },
      'question-5': { answer: 'Attempts' }
    }
    const submitResult = {
      validationError: {
        details: [{ message: 'Enter a description of the problem' }]
      }
    }

    mockLoadContent.mockReturnValue({
      meta: { title: 'Check your answers' },
      content: ''
    })
    mockTriageSummaryFromSessionData.mockReturnValue({
      rows: [],
      error: {
        type: 'validation',
        messages: ['Enter a description of the problem']
      }
    })
    mockSubmit.mockResolvedValue(submitResult)

    await postSummaryPage(buildRequest(), buildH())

    expect(mockTriageSummaryFromSessionData).toHaveBeenCalledWith(
      sessionData,
      submitResult
    )
    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/check-your-answers',
      expect.objectContaining({
        error: { type: 'validation', messages: expect.any(Array) }
      })
    )
    expect(mockClearTriageSession).not.toHaveBeenCalled()
  })

  test('does not clear session when submit fails', async () => {
    const sessionData = {
      'question-1': { answer: 'test@example.com' },
      'question-2': { answer: 'A problem' },
      'question-3': { answer: 'Users' },
      'question-4': { answer: 'Benefits' },
      'question-5': { answer: 'Attempts' }
    }
    const submitResult = { triageResult: { success: false } }

    mockLoadContent.mockReturnValue({
      meta: { title: 'Check your answers' },
      content: ''
    })
    mockTriageSummaryFromSessionData.mockReturnValue({
      rows: [],
      error: { type: 'send' }
    })
    mockSubmit.mockResolvedValue(submitResult)

    await postSummaryPage(buildRequest(), buildH())

    expect(mockTriageSummaryFromSessionData).toHaveBeenCalledWith(
      sessionData,
      submitResult
    )
    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/check-your-answers',
      expect.any(Object)
    )
    expect(mockClearTriageSession).not.toHaveBeenCalled()
  })

  test('logs and re-throws on unexpected error', async () => {
    const boom = new Error('Unexpected failure')
    mockSubmit.mockRejectedValue(boom)

    await expect(postSummaryPage(buildRequest(), buildH())).rejects.toThrow(
      boom
    )
    expect(mockLoggerError).toHaveBeenCalled()
  })
})

describe('#getThankYouPage', () => {
  beforeEach(() => {
    mockLoadContent.mockReturnValue({
      meta: { title: 'Thank you', isResult: true },
      content: '<p>What happens next...</p>'
    })
    mockGetReference.mockReturnValue('AICE-26-TEST01')
    mockConfigGet.mockReturnValue(false) // ← Add this line
  })

  test('renders confirmation template with reference and content', async () => {
    await getThankYouPage(
      buildRequest({ path: '/ai-toolkit/triage/thank-you', query: {} }),
      buildH()
    )

    expect(mockView).toHaveBeenCalledWith(
      'common/templates/layouts/confirmation',
      expect.objectContaining({
        title: 'Thank you',
        reference: 'AICE-26-TEST01',
        content: '<p>What happens next...</p>',
        confirmationEmailFailed: false,
        showReference: expect.any(Boolean)
      })
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
      'common/templates/layouts/confirmation',
      expect.objectContaining({
        confirmationEmailFailed: true,
        reference: 'AICE-26-TEST01'
      })
    )
  })

  test('clears the reference after reading it', async () => {
    await getThankYouPage(buildRequest(), buildH())
    expect(mockClearReference).toHaveBeenCalledWith(mockYar)
  })

  test('handles errors gracefully', async () => {
    mockLoadContent.mockImplementation(() => {
      throw new Error('Failed to load content')
    })

    const h = buildH()
    await getThankYouPage(
      buildRequest({ path: '/ai-toolkit/triage/thank-you', query: {} }),
      h
    )

    expect(mockLoggerError).toHaveBeenCalled()
    expect(h.response).toHaveBeenCalledWith('Page not found')
  })
})
