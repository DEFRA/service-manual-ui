import { describe, test, expect } from 'vitest'

import { buildReportErrorLog } from '../../../../src/server/ai-ask/report-email.js'

describe('buildReportErrorLog', () => {
  test('carries what Notify said went wrong', () => {
    const log = buildReportErrorLog({
      status: 400,
      data: { errors: [{ message: 'Missing personalisation' }, { message: 'Bad template' }] }
    })

    expect(log).toEqual({
      event: { type: 'ask_report', action: 'send', outcome: 'failure' },
      error: { code: 400, message: 'Missing personalisation, Bad template', type: 'NotifyError' }
    })
  })

  test('falls back to the network error when Notify was not reached', () => {
    const log = buildReportErrorLog({ status: null, data: null, message: 'ECONNRESET' })

    expect(log.error).toEqual({ code: null, message: 'ECONNRESET', type: 'NotifyError' })
  })
})
