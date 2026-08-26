import { config } from '../../config/config.js'

import { composeSubmissionText, postSubmission } from './automation-api.js'

vi.mock('./automation-token.js', () => ({
  getToken: vi.fn()
}))

const { getToken } = await import('./automation-token.js')

const submission = {
  email: 'someone@defra.gov.uk',
  problem: 'A problem description',
  users: 'Some users',
  benefits: 'Some benefits',
  solutionAttempts: 'Previous attempts',
  dataReadiness: 'Data sources and owners'
}

describe('#automationApi', () => {
  let originalConfig

  beforeEach(() => {
    originalConfig = {
      automationEnabled: config.get('aiTriage.automationEnabled'),
      automationUrl: config.get('aiTriage.automationUrl'),
      automationTimeoutMs: config.get('aiTriage.automationTimeoutMs')
    }
    getToken.mockResolvedValue(null)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, status: 202 })
    )
  })

  afterEach(() => {
    config.set('aiTriage.automationEnabled', originalConfig.automationEnabled)
    config.set('aiTriage.automationUrl', originalConfig.automationUrl)
    config.set('aiTriage.automationTimeoutMs', originalConfig.automationTimeoutMs)
    vi.unstubAllGlobals()
  })

  describe('composeSubmissionText', () => {
    test('has the five substantive answers, labelled, in question order', () => {
      expect(composeSubmissionText(submission)).toBe(
        [
          'Problem: A problem description',
          'Users affected: Some users',
          'Expected benefits: Some benefits',
          'Solutions already tried: Previous attempts',
          'Data readiness: Data sources and owners'
        ].join('\n\n')
      )
    })

    test('does not contain the submitter email address', () => {
      expect(composeSubmissionText(submission)).not.toContain(
        'someone@defra.gov.uk'
      )
      expect(composeSubmissionText(submission)).not.toContain('Email')
    })
  })

  describe('postSubmission', () => {
    test('posts the submission to the aice-triage-automation intake endpoint', async () => {
      config.set('aiTriage.automationEnabled', true)
      config.set('aiTriage.automationUrl', 'https://automation.example')

      const result = await postSubmission({
        submissionId: 'AICE-26-A7K2',
        submission,
        submittedAt: '2026-01-01T00:00:00.000Z'
      })

      expect(result).toEqual({ posted: true })
      expect(fetch).toHaveBeenCalledTimes(1)

      const [url, options] = fetch.mock.calls[0]

      expect(url).toBe('https://automation.example/submissions')
      expect(options.method).toBe('POST')
      expect(options.headers['content-type']).toBe('application/json')
      expect(JSON.parse(options.body)).toEqual({
        submissionId: 'AICE-26-A7K2',
        text: composeSubmissionText(submission),
        submittedAt: '2026-01-01T00:00:00.000Z'
      })
      expect(options.signal).toBeInstanceOf(AbortSignal)
    })

    test('does not double up the slash when the base URL has a trailing one', async () => {
      config.set('aiTriage.automationEnabled', true)
      config.set('aiTriage.automationUrl', 'https://automation.example/')

      await postSubmission({ submissionId: 'AICE-26-A7K2', submission })

      expect(fetch.mock.calls[0][0]).toBe('https://automation.example/submissions')
    })

    test('is disabled by default, so nothing is posted unless it is turned on', () => {
      expect(config.default('aiTriage.automationEnabled')).toBe(false)
      expect(config.default('aiTriage.authEnabled')).toBe(false)
    })

    test('makes no request at all when the integration is disabled', async () => {
      config.set('aiTriage.automationEnabled', false)

      const result = await postSubmission({
        submissionId: 'AICE-26-A7K2',
        submission
      })

      expect(result).toEqual({ posted: false })
      expect(fetch).not.toHaveBeenCalled()
      expect(getToken).not.toHaveBeenCalled()
    })

    test('sends the bearer token when the token helper returns one', async () => {
      config.set('aiTriage.automationEnabled', true)
      getToken.mockResolvedValue('a-web-identity-token')

      await postSubmission({ submissionId: 'AICE-26-A7K2', submission })

      expect(fetch.mock.calls[0][1].headers.authorization).toBe(
        'Bearer a-web-identity-token'
      )
    })

    test('sends no authorization header when there is no token', async () => {
      config.set('aiTriage.automationEnabled', true)
      getToken.mockResolvedValue(null)

      await postSubmission({ submissionId: 'AICE-26-A7K2', submission })

      expect(fetch.mock.calls[0][1].headers).not.toHaveProperty('authorization')
    })

    test('passes the STS client to the token helper', async () => {
      config.set('aiTriage.automationEnabled', true)
      const stsClient = { send: vi.fn() }

      await postSubmission({
        submissionId: 'AICE-26-A7K2',
        submission,
        stsClient
      })

      expect(getToken).toHaveBeenCalledWith(stsClient)
    })

    test('throws with the status when aice-triage-automation responds with an error', async () => {
      config.set('aiTriage.automationEnabled', true)
      fetch.mockResolvedValue({ ok: false, status: 503 })

      await expect(
        postSubmission({ submissionId: 'AICE-26-A7K2', submission })
      ).rejects.toMatchObject({
        status: 503,
        message: expect.stringContaining('503')
      })
    })

    test('throws when the request times out', async () => {
      config.set('aiTriage.automationEnabled', true)
      fetch.mockRejectedValue(
        Object.assign(new Error('The operation was aborted'), {
          name: 'TimeoutError'
        })
      )

      await expect(
        postSubmission({ submissionId: 'AICE-26-A7K2', submission })
      ).rejects.toThrow('The operation was aborted')
    })

    test('uses the configured timeout for the abort signal', async () => {
      config.set('aiTriage.automationEnabled', true)
      config.set('aiTriage.automationTimeoutMs', 25)

      await postSubmission({ submissionId: 'AICE-26-A7K2', submission })

      const { signal } = fetch.mock.calls[0][1]

      expect(signal.aborted).toBe(false)

      await new Promise((resolve) => setTimeout(resolve, 50))

      expect(signal.aborted).toBe(true)
    })
  })
})
