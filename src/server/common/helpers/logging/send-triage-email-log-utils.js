export const buildSendTriageEmailErrorLog = (error) => ({
  event: { type: 'send_triage_email', action: 'send', outcome: 'failure' },
  error: {
    code: error.status,
    message:
      error.data?.errors?.map((e) => e.message).join(', ') ?? error.message,
    type: 'NotifyError'
  }
})

export const buildSendTriageEmailSuccessLog = (reference) => ({
  event: {
    type: 'send_triage_email',
    action: 'send',
    outcome: 'success',
    reference
  }
})
