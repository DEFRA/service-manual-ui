import fs from 'node:fs/promises'

import nock from 'nock'

import { submit } from './service.js'

vi.mock('crypto', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    randomBytes: vi.fn(() => Buffer.alloc(6, 0))
  }
})

async function loadSendEmailFixture (filename, onRequest) {
  const url = new URL(`./__fixtures__/${filename}`, import.meta.url)
  const [record] = JSON.parse(await fs.readFile(url, 'utf-8'))

  const scope = nock(record.scope)
    .post(record.path, (body) => {
      const expectedFields = Object.entries(record.body)
      const allMatch = expectedFields.every(
        ([key, value]) => JSON.stringify(body[key]) === JSON.stringify(value)
      )

      if (!allMatch) {
        return false
      }
      onRequest?.(body)
      return true
    })
    .reply(record.status, record.response)

  return { scope, record }
}

describe('aiTriageService', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01'))
    nock.disableNetConnect()
  })

  afterEach(() => {
    vi.useRealTimers()
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
    test('is sent to shared mailbox with correct content and reference', async () => {
      let requestBody

      const { scope: triageScope, record } = await loadSendEmailFixture(
        'submit-success.json',
        (body) => {
          requestBody = body
        }
      )

      await loadSendEmailFixture('confirm-success.json')

      const result = await submit(submission)

      expect(triageScope.isDone()).toBe(true)

      expect(result.triageResult).toEqual({
        success: true,
        data: record.response
      })

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
        reference: 'AICE-26-AAAAAA'
      })
    })

    test('when sending fails, returns failure with error details', async () => {
      const { record } = await loadSendEmailFixture('submit-error.json')

      const result = await submit(submission)

      expect(result.triageResult).toEqual({
        success: false,
        error: { details: record.response, status: record.status }
      })

      expect(result.confirmationResult).toBeUndefined()
    })
  })

  describe('confirmation email', () => {
    test('is sent to submitter with correct reference', async () => {
      await loadSendEmailFixture('submit-success.json')

      let requestBody

      const { scope, record } = await loadSendEmailFixture(
        'confirm-success.json',
        (body) => {
          requestBody = body
        }
      )

      const result = await submit(submission)

      expect(scope.isDone()).toBe(true)

      expect(result.triageResult.success).toBe(true)

      expect(result.confirmationResult).toEqual({
        success: true,
        data: record.response
      })

      expect(requestBody).toEqual({
        template_id: record.body.template_id,
        email_address: submission.email,
        reference: 'AICE-26-AAAAAA'
      })
    })

    test('is not sent when triage email fails', async () => {
      await loadSendEmailFixture('submit-error.json')

      const { scope } = await loadSendEmailFixture('confirm-success.json')

      const result = await submit(submission)

      expect(scope.isDone()).toBe(false)
      expect(result.triageResult.success).toBe(false)
      expect(result.confirmationResult).toBeUndefined()
    })

    test('when sending fails, returns failure with error details', async () => {
      await loadSendEmailFixture('submit-success.json')

      const { scope, record } = await loadSendEmailFixture('confirm-error.json')

      const result = await submit(submission)

      expect(scope.isDone()).toBe(true)
      expect(result.triageResult.success).toBe(true)
      expect(result.confirmationResult).toEqual({
        success: false,
        error: { details: record.response, status: record.status }
      })
    })

    test('when an unexpected error is thrown, returns failed confirmation result', async () => {
      await loadSendEmailFixture('submit-success.json')

      nock('https://api.notifications.service.gov.uk')
        .post('/v2/notifications/email')
        .replyWithError('Network failure')

      const result = await submit(submission)

      expect(result.triageResult.success).toBe(true)
      expect(result.confirmationResult).toEqual({
        success: false,
        error: { details: null, status: null }
      })
    })
  })
  describe('reference format', () => {
    test('generates a reference in the correct AICE-YY-XXXXXX format', async () => {
      await loadSendEmailFixture('submit-success.json')
      await loadSendEmailFixture('confirm-success.json')

      const result = await submit(submission)

      expect(result.reference).toMatch(/^AICE-\d{2}-[A-Z2-9]{6}$/)
    })

    test('reference does not contain ambiguous characters O, 0, I, 1', async () => {
      await loadSendEmailFixture('submit-success.json')
      await loadSendEmailFixture('confirm-success.json')

      const result = await submit(submission)

      const suffix = result.reference.split('-')[2]
      expect(suffix).not.toMatch(/[O0I1]/)
    })
  })
})
