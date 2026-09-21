export const buildSendVerificationCodeEmailErrorLog = (error) => ({
  event: { type: 'send_verification_code_email', action: 'send', outcome: 'failure' },
  error: {
    code: error.status,
    message:
      error.data?.errors?.map((e) => e.message).join(', ') ?? error.message,
    type: 'NotifyError'
  }
})

export const buildSendVerificationCodeEmailSuccessLog = (reference) => ({
  event: {
    type: 'send_verification_code_email',
    action: 'send',
    outcome: 'success',
    reference
  }
})
