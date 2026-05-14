import { buildErrorLog, buildEventLog } from './build-error-log.js'

describe('#buildErrorLog', () => {
  test('Should nest event fields under event and force outcome to failure', () => {
    const error = new Error('boom')
    const payload = buildErrorLog(error, {
      type: 'demo_event',
      action: 'do_thing',
      reference: 'ref-1'
    })

    expect(payload.event).toEqual({
      type: 'demo_event',
      action: 'do_thing',
      reference: 'ref-1',
      outcome: 'failure'
    })
  })

  test('Should override a caller-supplied outcome with failure', () => {
    const payload = buildErrorLog(new Error('x'), {
      type: 'demo_event',
      outcome: 'success'
    })

    expect(payload.event.outcome).toBe('failure')
  })

  test('Should populate error.* from an Error instance', () => {
    const error = new TypeError('something went wrong')

    const payload = buildErrorLog(error, { type: 'demo_event' })

    expect(payload.error).toEqual({
      code: undefined,
      message: 'something went wrong',
      stack_trace: error.stack,
      type: 'TypeError'
    })
  })

  test('Should prefer error.code, falling back to error.status', () => {
    const codeError = { code: 'ENOENT', message: 'no file', stack: 's' }
    const statusError = { status: 503, message: 'unavailable', stack: 's' }

    expect(buildErrorLog(codeError, { type: 'x' }).error.code).toBe('ENOENT')
    expect(buildErrorLog(statusError, { type: 'x' }).error.code).toBe(503)
  })

  test('Should default type to Error when name is missing', () => {
    const payload = buildErrorLog({ message: 'no name' }, { type: 'x' })

    expect(payload.error.type).toBe('Error')
  })

  test('Should produce only event and error top-level keys', () => {
    const payload = buildErrorLog(new Error('x'), { type: 'x' })

    expect(Object.keys(payload).sort()).toEqual(['error', 'event'])
  })
})

describe('#buildEventLog', () => {
  test('Should default outcome to success', () => {
    const payload = buildEventLog({ type: 'demo_event', action: 'do_thing' })

    expect(payload).toEqual({
      event: {
        type: 'demo_event',
        action: 'do_thing',
        outcome: 'success'
      }
    })
  })

  test('Should allow caller to override outcome', () => {
    const payload = buildEventLog({ type: 'demo_event', outcome: 'unknown' })

    expect(payload.event.outcome).toBe('unknown')
  })

  test('Should produce only an event top-level key', () => {
    const payload = buildEventLog({ type: 'x' })

    expect(Object.keys(payload)).toEqual(['event'])
  })
})
