import {
  buildPostSubmissionErrorLog,
  buildPostSubmissionSuccessLog
} from './post-submission-log-utils.js'

describe('#postSubmissionLogUtils', () => {
  describe('buildPostSubmissionErrorLog', () => {
    test('carries the reference and the backend status', () => {
      const error = Object.assign(new Error('Backend rejected it'), {
        status: 503
      })

      expect(buildPostSubmissionErrorLog(error, 'AICE-26-A7K2')).toEqual({
        event: {
          type: 'post_triage_submission',
          action: 'post',
          outcome: 'failure',
          reference: 'AICE-26-A7K2'
        },
        error: {
          code: 503,
          message: 'Backend rejected it',
          stack_trace: error.stack,
          type: 'Error'
        }
      })
    })

    test('falls back to the error code when there is no status', () => {
      const error = Object.assign(new Error('connect ECONNREFUSED'), {
        code: 'ECONNREFUSED',
        name: 'TypeError'
      })

      const log = buildPostSubmissionErrorLog(error, 'AICE-26-A7K2')

      expect(log.error.code).toBe('ECONNREFUSED')
      expect(log.error.type).toBe('TypeError')
    })
  })

  describe('buildPostSubmissionSuccessLog', () => {
    test('records the reference against a successful post', () => {
      expect(buildPostSubmissionSuccessLog('AICE-26-A7K2')).toEqual({
        event: {
          type: 'post_triage_submission',
          action: 'post',
          outcome: 'success',
          reference: 'AICE-26-A7K2'
        }
      })
    })
  })
})
