export const buildSendConfirmationEmailErrorLog = (error) => ({
  event: {
    type: 'send_confirmation_email',
    action: 'send',
    outcome: 'failure'
  },
  error: {
    code: error.status,
    message: error.data.errors.map((e) => e.message).join(', '),
    type: 'NotifyError'
  }
})

export const buildSendConfirmationEmailSuccessLog = (reference) => ({
  event: {
    type: 'send_confirmation_email',
    action: 'send',
    outcome: 'success',
    reference
  }
})
