export const buildErrorLog = (error, event) => ({
  event: { ...event, outcome: 'failure' },
  error: {
    code: error?.code ?? error?.status,
    message: error?.message,
    stack_trace: error?.stack,
    type: error?.name ?? 'Error'
  }
})

export const buildEventLog = (event) => ({
  event: { outcome: 'success', ...event }
})
