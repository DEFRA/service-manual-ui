import { describe, test, expect } from 'vitest'
import {
  buildSendConfirmationEmailErrorLog,
  buildSendConfirmationEmailSuccessLog
} from './send-confirmation-email-log-utils.js'

describe('buildSendConfirmationEmailErrorLog', () => {
  test('builds error log with code, joined messages, and type', () => {
    const error = {
      status: 400,
      data: {
        errors: [
          { message: 'template_id is not a valid UUID' },
          { message: 'email_address is required' }
        ]
      }
    }

    expect(buildSendConfirmationEmailErrorLog(error)).toEqual({
      event: { type: 'send_confirmation_email', action: 'send', outcome: 'failure' },
      error: {
        code: 400,
        message: 'template_id is not a valid UUID, email_address is required',
        type: 'NotifyError'
      }
    })
  })

  test('builds error log with a single error message', () => {
    const error = {
      status: 403,
      data: { errors: [{ message: 'Invalid token' }] }
    }

    expect(buildSendConfirmationEmailErrorLog(error)).toEqual({
      event: { type: 'send_confirmation_email', action: 'send', outcome: 'failure' },
      error: { code: 403, message: 'Invalid token', type: 'NotifyError' }
    })
  })
})

describe('buildSendConfirmationEmailSuccessLog', () => {
  test('builds success log with reference', () => {
    expect(buildSendConfirmationEmailSuccessLog('triage-1700000000000')).toEqual({
      event: {
        type: 'send_confirmation_email',
        action: 'send',
        outcome: 'success',
        reference: 'triage-1700000000000'
      }
    })
  })
})