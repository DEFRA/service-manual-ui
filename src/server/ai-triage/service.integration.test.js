import nock from 'nock'

import { submit } from './service.js'

import triageSuccessFixture from './__fixtures__/submit-success.json' with { type: 'json' }
import triageErrorFixture from './__fixtures__/submit-error.json' with { type: 'json' }
import confirmSuccessFixture from './__fixtures__/confirm-success.json' with { type: 'json' }
import confirmErrorFixture from './__fixtures__/confirm-error.json' with { type: 'json' }

function loadSendEmailFixture(fixture) {
  const [record] = fixture

  const scope = nock(record.scope)
    .post(record.path, (body) => body.template_id === record.body.template_id)
    .reply(record.status, record.response)

  return { scope, record }
}


describe('aiTriageService', () => {
  beforeEach(() => {
    nock.disableNetConnect()
    vi.spyOn(Date, 'now').mockReturnValue(1700000000000)
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
    vi.restoreAllMocks()
  })

  const submission = {
    email: 'test@example.com',
    problem: 'Test problem description',
    users: 'Test users description',
    benefits: 'Test benefits description',
    solutionAttempts: 'Test solution attempts description'
  }

  describe('triage email', () => {
    test('submit sends triage email successfully', async () => {
      const [record] = triageSuccessFixture
      let requestBody
      const triageScope = nock(record.scope)
        .post(record.path, (body) => {
          requestBody = body
          return body.template_id === record.body.template_id
        })
        .reply(record.status, record.response)

      loadSendEmailFixture(confirmSuccessFixture)

      const result = await submit(submission)

      expect(triageScope.isDone()).toBe(true)
      expect(result.triageResult).toEqual({ success: true, data: record.response })
      expect(requestBody).toEqual({
        template_id: record.body.template_id,
        email_address: process.env.AICE_SHARED_MAILBOX_EMAIL,
        personalisation: {
          emailAddress: submission.email,
          problem: submission.problem,
          users: submission.users,
          benefits: submission.benefits,
          solutionAttempts: submission.solutionAttempts
        },
        reference: 'triage-1700000000000'
      })
    })

    test('when triage email sending fails, submit returns false', async () => {
      const { record } = loadSendEmailFixture(triageErrorFixture)

      const result = await submit(submission)

      expect(result.triageResult).toEqual({
        success: false,
        error: { details: record.response, status: record.status }
      })
    })
  })

  describe('confirmation email', () => {
    test('sends confirmation email to user after successful triage submission', async () => {
      loadSendEmailFixture(triageSuccessFixture)
      const { scope, record } = loadSendEmailFixture(confirmSuccessFixture)

      const result = await submit(submission)

      expect(scope.isDone()).toBe(true)
      expect(result.confirmationResult).toEqual({ success: true, data: record.response })
    })

    test('does not send confirmation email if triage submission fails', async () => {
      loadSendEmailFixture(triageErrorFixture)
      const { scope } = loadSendEmailFixture(confirmSuccessFixture)

      const result = await submit(submission)

      expect(scope.isDone()).toBe(false)
      expect(result.triageResult.success).toBe(false)
      expect(result.confirmationResult).toBeUndefined()
    })

    test('if confirmation email fails, triage is still considered successful', async () => {
      loadSendEmailFixture(triageSuccessFixture)
      const { scope, record } = loadSendEmailFixture(confirmErrorFixture)

      const result = await submit(submission)

      expect(scope.isDone()).toBe(true)
      expect(result.triageResult.success).toBe(true)
      expect(result.confirmationResult).toEqual({
        success: false,
        error: { details: record.response, status: record.status }
      })
    })
  })
})
