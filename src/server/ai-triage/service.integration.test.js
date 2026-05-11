import fs from 'node:fs'
import path from 'node:path'

import nock from 'nock'

import { submit } from './service.js'

describe('aiTriageService', () => {
  beforeEach(() => {
    nock.disableNetConnect()
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  test('submit sends triage email successfully', async () => {
    const fixturesDir = path.join(
      process.cwd(),
      'src/server/ai-triage/__fixtures__'
    )
    const fixture = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, 'submit-success.json'), 'utf-8')
    )
    const [record] = fixture

    const baseUrl = 'https://api.notifications.service.gov.uk'

    let requestBody
    const scope = nock(baseUrl)
      .post(record.path, (body) => {
        requestBody = body
        return body.reference?.startsWith('triage-')
      })
      .reply(record.status, record.response)

    const submission = {
      email: 'test@example.com',
      problem: 'Test problem description',
      users: 'Test users description',
      benefits: 'Test benefits description',
      solutionAttempts: 'Test solution attempts description'
    }

    const result = await submit(submission)

    expect(result.triageResult).toEqual({
      success: true,
      data: record.response
    })

    expect(scope.isDone()).toBe(true)

    expect(requestBody).toEqual(
      expect.objectContaining({
        personalisation: expect.objectContaining({
          emailAddress: submission.email,
          problem: submission.problem,
          users: submission.users,
          benefits: submission.benefits,
          solutionAttempts: submission.solutionAttempts
        }),
        reference: expect.stringMatching(/^triage-\d+$/)
      })
    )

    expect(record.response.id).toBeDefined()
    expect(record.response.id).toMatch(/^[a-f0-9-]+$/)
    expect(record.response.reference).toMatch(/^triage-/)
  })

  test('when triage email sending fails, submit returns false', async () => {
    const fixturesDir = path.join(
      process.cwd(),
      'src/server/ai-triage/__fixtures__'
    )
    const fixture = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, 'submit-error.json'), 'utf-8')
    )
    const [record] = fixture

    const baseUrl = 'https://api.notifications.service.gov.uk'

    nock(baseUrl).post(record.path).reply(record.status, record.response)

    const submission = {
      email: 'test@example.com',
      problem: 'Test problem',
      users: 'Test users',
      benefits: 'Test benefits',
      solutionAttempts: 'Test attempts'
    }

    const result = await submit(submission)

    expect(result.triageResult).toEqual({
      success: false,
      error: {
        details: record.response,
        status: record.status
      }
    })
  })

  test('sends confirmation email to user after successful triage submission', async () => {
    const fixturesDir = path.join(
      process.cwd(),
      'src/server/ai-triage/__fixtures__'
    )
    const triageFixture = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, 'submit-success.json'), 'utf-8')
    )[0]
    // Simulate confirmation email Notify response
    const confirmationResponse = {
      id: 'confirmation-id',
      reference: 'triage-123'
    }
    const baseUrl = 'https://api.notifications.service.gov.uk'

    // Mock triage email
    const triageScope = nock(baseUrl)
      .post(triageFixture.path)
      .reply(triageFixture.status, triageFixture.response)

    // Mock confirmation email (template ID must match your config/env)
    const confirmationScope = nock(baseUrl)
      .post('/v2/notifications/email', (body) => {
        // Check correct template ID and recipient
        return (
          body.template_id ===
            process.env.AI_TOOLKIT_CONFIRMATION_TEMPLATE_ID &&
          body.email_address === 'test@example.com'
        )
      })
      .reply(201, confirmationResponse)

    const submission = {
      email: 'test@example.com',
      problem: 'Test problem description',
      users: 'Test users description',
      benefits: 'Test benefits description',
      solutionAttempts: 'Test solution attempts description'
    }

    const result = await submit(submission)

    expect(triageScope.isDone()).toBe(true)
    expect(confirmationScope.isDone()).toBe(true)
    expect(result.confirmationResult).toEqual({
      success: true,
      data: confirmationResponse
    })
  })

  test('does not send confirmation email if triage submission fails', async () => {
    const fixturesDir = path.join(
      process.cwd(),
      'src/server/ai-triage/__fixtures__'
    )
    const triageFixture = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, 'submit-error.json'), 'utf-8')
    )[0]
    const baseUrl = 'https://api.notifications.service.gov.uk'

    // Mock triage email to fail
    const triageScope = nock(baseUrl)
      .post(triageFixture.path)
      .reply(triageFixture.status, triageFixture.response)

    // Set up a nock for confirmation email that will error if called
    const confirmationScope = nock(baseUrl)
      .post('/v2/notifications/email')
      .reply(() => {
        throw new Error('Confirmation email should not be sent')
      })

    const submission = {
      email: 'test@example.com',
      problem: 'Test problem',
      users: 'Test users',
      benefits: 'Test benefits',
      solutionAttempts: 'Test attempts'
    }

    const result = await submit(submission)

    expect(triageScope.isDone()).toBe(true)
    expect(confirmationScope.isDone()).toBe(false)
    expect(result.triageResult.success).toBe(false)
  })

  test('if confirmation email fails, triage is still considered successful', async () => {
    const fixturesDir = path.join(
      process.cwd(),
      'src/server/ai-triage/__fixtures__'
    )
    const triageFixture = JSON.parse(
      fs.readFileSync(path.join(fixturesDir, 'submit-success.json'), 'utf-8')
    )[0]
    const baseUrl = 'https://api.notifications.service.gov.uk'

    // Mock triage email to succeed
    const triageScope = nock(baseUrl)
      .post(triageFixture.path)
      .reply(triageFixture.status, triageFixture.response)

    // Mock confirmation email to fail
    const confirmationScope = nock(baseUrl)
      .post('/v2/notifications/email')
      .reply(500, { message: 'Notify error' })

    const submission = {
      email: 'test@example.com',
      problem: 'Test problem description',
      users: 'Test users description',
      benefits: 'Test benefits description',
      solutionAttempts: 'Test solution attempts description'
    }

    const result = await submit(submission)

    expect(triageScope.isDone()).toBe(true)
    expect(confirmationScope.isDone()).toBe(true)
    expect(result.triageResult.success).toBe(true)
    expect(result.confirmationResult.success).toBe(false)
    expect(result.confirmationResult.error).toBeDefined()
  })
})
