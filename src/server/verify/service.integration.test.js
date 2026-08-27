import fs from 'node:fs/promises'

import nock from 'nock'

import { sendVerificationCode } from './service.js'

async function loadSendEmailFixture (filename, onRequest) {
  const url = new URL(`./__fixtures__/${filename}`, import.meta.url)
  const [record] = JSON.parse(await fs.readFile(url, 'utf-8'))

  const scope = nock(record.scope)
    .post(record.path, (body) => {
      const expectedFields = Object.entries(record.body)
      const allMatch = expectedFields.every(
        ([key, value]) => JSON.stringify(body[key]) === JSON.stringify(value)
      )

      if (!allMatch) {
        return false
      }
      onRequest?.(body)
      return true
    })
    .reply(record.status, record.response)

  return { scope, record }
}

describe('verify service', () => {
  beforeEach(() => {
    nock.disableNetConnect()
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })

  describe('sendVerificationCode', () => {
    test('sends the code to Notify with the correct template and personalisation', async () => {
      let requestBody

      const { scope, record } = await loadSendEmailFixture(
        'send-success.json',
        (body) => {
          requestBody = body
        }
      )

      const result = await sendVerificationCode('test@example.com', '123456')

      expect(scope.isDone()).toBe(true)

      expect(result).toEqual({
        success: true,
        data: record.response
      })

      expect(requestBody).toEqual({
        template_id: record.body.template_id,
        email_address: 'test@example.com',
        personalisation: {
          verificationCode: '123456'
        }
      })
    })

    test('when sending fails, returns failure with error details', async () => {
      const { record } = await loadSendEmailFixture('send-error.json')

      const result = await sendVerificationCode('test@example.com', '123456')

      expect(result).toEqual({
        success: false,
        error: { details: record.response, status: record.status }
      })
    })

    test('when an unexpected error is thrown, returns failed result', async () => {
      nock('https://api.notifications.service.gov.uk')
        .post('/v2/notifications/email')
        .replyWithError('Network failure')

      const result = await sendVerificationCode('test@example.com', '123456')

      expect(result).toEqual({
        success: false,
        error: { details: null, status: null }
      })
    })
  })
})
