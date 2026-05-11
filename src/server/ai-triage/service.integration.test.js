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
})
