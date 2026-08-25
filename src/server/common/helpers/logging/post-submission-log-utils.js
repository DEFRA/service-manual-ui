export const buildPostSubmissionErrorLog = (error, reference) => ({
  event: {
    type: 'post_triage_submission',
    action: 'post',
    outcome: 'failure',
    reference
  },
  error: {
    code: error?.status ?? error?.code,
    message: error?.message,
    stack_trace: error?.stack,
    type: error?.name ?? 'Error'
  }
})

export const buildPostSubmissionSuccessLog = (reference) => ({
  event: {
    type: 'post_triage_submission',
    action: 'post',
    outcome: 'success',
    reference
  }
})
