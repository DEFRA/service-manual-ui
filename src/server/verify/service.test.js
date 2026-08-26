import { MAX_CODE_ATTEMPTS, VERIFICATION_CODE_LENGTH } from './constants.js'

const mockTrySendEmail = vi.fn()
const mockCreateNotifyClient = vi.fn(() => ({ sendEmail: vi.fn() }))
const mockLoggerInfo = vi.fn()
const mockLoggerError = vi.fn()

vi.mock('../../notify/notify-client.js', () => ({
  createNotifyClient: (...args) => mockCreateNotifyClient(...args),
  trySendEmail: (...args) => mockTrySendEmail(...args)
}))

vi.mock('../common/helpers/logging/logger.js', () => ({
  createLogger: () => ({
    info: (...args) => mockLoggerInfo(...args),
    error: (...args) => mockLoggerError(...args)
  })
}))

const {
  generateVerificationCode,
  sendVerificationCode,
  checkVerificationCode
} = await import('./service.js')

describe('verify service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateVerificationCode', () => {
    test('returns a numeric code with the configured length', () => {
      for (let i = 0; i < 20; i++) {
        const code = generateVerificationCode()
        expect(code).toMatch(/^\d+$/)
        expect(code).toHaveLength(VERIFICATION_CODE_LENGTH)
      }
    })
  })

  describe('checkVerificationCode', () => {
    test('returns expired when no cached record exists', () => {
      expect(checkVerificationCode(null, '123456')).toEqual({
        status: 'expired'
      })
    })

    test('returns verified when submitted code matches cached code', () => {
      expect(
        checkVerificationCode({ verificationCode: '123456', attempts: 0 }, '123456')
      ).toEqual({
        status: 'verified'
      })
    })

    test('returns incorrect when submitted code is wrong and below lockout threshold', () => {
      expect(
        checkVerificationCode({ verificationCode: '123456', attempts: 0 }, '999999')
      ).toEqual({
        status: 'incorrect'
      })
    })

    test('returns locked-out when wrong code reaches max attempts', () => {
      expect(
        checkVerificationCode(
          { verificationCode: '123456', attempts: MAX_CODE_ATTEMPTS - 1 },
          '999999'
        )
      ).toEqual({
        status: 'locked-out'
      })
    })
  })

  describe('sendVerificationCode', () => {
    test('returns success with response payload when notify send succeeds', async () => {
      mockTrySendEmail.mockResolvedValue([
        { data: { reference: 'notify-ref-1' }, status: 201 },
        null
      ])

      const result = await sendVerificationCode('test@example.com', '123456')

      expect(result).toEqual({
        success: true,
        data: { reference: 'notify-ref-1' }
      })
      expect(mockTrySendEmail).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(String),
        'test@example.com',
        { personalisation: { verificationCode: '123456' } }
      )
      expect(mockLoggerInfo).toHaveBeenCalledWith(
        expect.any(Object),
        'Verification code email sent successfully via Notify'
      )
    })

    test('returns failure details when notify send fails', async () => {
      mockTrySendEmail.mockResolvedValue([
        null,
        { data: { errors: [{ error: 'bad request' }] }, status: 400 }
      ])

      const result = await sendVerificationCode('test@example.com', '123456')

      expect(result).toEqual({
        success: false,
        error: {
          details: { errors: [{ error: 'bad request' }] },
          status: 400
        }
      })
      expect(mockLoggerError).toHaveBeenCalledWith(
        expect.any(Object),
        'Failed to send verification code email via Gov.UK Notify'
      )
    })
  })
})
