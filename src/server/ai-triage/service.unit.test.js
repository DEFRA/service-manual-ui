const logger = {
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn()
}

const sendEmail = vi.fn()
const trySendEmail = vi.fn()

vi.mock('../common/helpers/logging/logger.js', () => ({
  createLogger: () => logger
}))

vi.mock('../../notify/notify-client.js', () => ({
  createNotifyClient: () => ({ sendEmail }),
  trySendEmail
}))

vi.mock('./automation-api.js', () => ({
  postSubmission: vi.fn()
}))

const { postSubmission } = await import('./automation-api.js')
const { submit } = await import('./service.js')

const submission = {
  email: 'someone@defra.gov.uk',
  problem: 'A problem description',
  users: 'Some users',
  benefits: 'Some benefits',
  solutionAttempts: 'Previous attempts',
  dataReadiness: 'Data sources and owners'
}

describe('#submit posting to aice-triage-automation', () => {
  beforeEach(() => {
    sendEmail.mockResolvedValue({
      data: { reference: 'notify-reference' },
      status: 201
    })
    trySendEmail.mockResolvedValue([
      { data: { reference: 'notify-reference' }, status: 201 },
      null
    ])
    postSubmission.mockResolvedValue({ posted: true })
  })

  test('posts with the same reference that goes on both emails', async () => {
    const result = await submit(submission)

    expect(postSubmission).toHaveBeenCalledTimes(1)

    const [{ submissionId, submission: posted, submittedAt }] =
      postSubmission.mock.calls[0]

    expect(submissionId).toBe(result.reference)
    expect(submissionId).toMatch(/^AICE-\d{2}-[A-Z2-9]+$/)
    expect(posted).toBe(submission)
    expect(new Date(submittedAt).toISOString()).toBe(submittedAt)
  })

  test('passes the STS client through from the caller', async () => {
    const stsClient = { send: vi.fn() }

    await submit(submission, { stsClient })

    expect(postSubmission.mock.calls[0][0].stsClient).toBe(stsClient)
  })

  test('posts after both Notify emails have been sent', async () => {
    const order = []

    trySendEmail.mockImplementation(() => {
      order.push('email')
      return Promise.resolve([
        { data: { reference: 'notify-reference' }, status: 201 },
        null
      ])
    })
    postSubmission.mockImplementation(() => {
      order.push('post')
      return Promise.resolve({ posted: true })
    })

    await submit(submission)

    expect(order).toEqual(['email', 'email', 'post'])
  })

  test('does not post when the triage email failed', async () => {
    const error = {
      response: { data: { errors: [{ message: 'Notify is down' }] }, status: 500 }
    }
    sendEmail.mockRejectedValue(error)
    trySendEmail.mockResolvedValue([
      null,
      { data: error.response.data, status: error.response.status }
    ])

    await submit(submission)

    expect(postSubmission).not.toHaveBeenCalled()
  })

  test('leaves the result unchanged and logs when the post fails', async () => {
    postSubmission.mockRejectedValue(
      Object.assign(new Error('aice-triage-automation rejected the submission with status 503'), {
        status: 503
      })
    )

    const result = await submit(submission)

    expect(result.triageResult.success).toBe(true)
    expect(result.confirmationResult.success).toBe(true)
    expect(result.reference).toMatch(/^AICE-/)

    expect(logger.error).toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({
          type: 'post_triage_submission',
          outcome: 'failure',
          reference: result.reference
        }),
        error: expect.objectContaining({ code: 503 })
      }),
      'Failed to post triage submission to aice-triage-automation'
    )
  })

  test('logs nothing about aice-triage-automation when the post was skipped', async () => {
    postSubmission.mockResolvedValue({ posted: false })

    const result = await submit(submission)

    expect(result.reference).toMatch(/^AICE-/)
    expect(logger.error).not.toHaveBeenCalled()
    expect(logger.info).not.toHaveBeenCalledWith(
      expect.objectContaining({
        event: expect.objectContaining({ type: 'post_triage_submission' })
      }),
      expect.anything()
    )
  })

  test('does not post when the submission fails validation', async () => {
    const { validationError } = await submit({ ...submission, problem: '' })

    expect(validationError).toBeDefined()
    expect(postSubmission).not.toHaveBeenCalled()
  })
})
