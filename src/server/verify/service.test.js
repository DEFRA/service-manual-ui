import { MAX_CODE_ATTEMPTS, VERIFICATION_CODE_LENGTH } from './constants.js'
import { generateVerificationCode, checkVerificationCode } from './service.js'

describe('verify service', () => {
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
})
