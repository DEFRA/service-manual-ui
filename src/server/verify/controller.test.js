// Everything else in controller.js is covered end-to-end via server.inject in
// verify.test.js. This file exists only for startVerification's optional
// codeSubmitHref/changeEmailHref overrides, which no route in this repo
// currently passes - postEmailPage always calls it with defaults - so there
// is no real request that can drive this path yet.

vi.mock('./service.js', () => ({
  generateVerificationCode: vi.fn(),
  sendVerificationCode: vi.fn()
}))

vi.mock('./session.js', () => ({
  createPendingCode: vi.fn(),
  setPendingLogin: vi.fn()
}))

import * as controller from './controller.js'
import * as loginService from './service.js'
import * as sessionHelper from './session.js'

describe('startVerification', () => {
  test('threads custom codeSubmitHref/changeEmailHref through to the stored pending login', async () => {
    const request = { yar: {}, server: { app: { codeCache: {} } } }
    const h = { redirect: vi.fn() }

    loginService.generateVerificationCode.mockReturnValue('123456')
    sessionHelper.createPendingCode.mockResolvedValue('pending-id-1')
    loginService.sendVerificationCode.mockResolvedValue({ success: true })

    await controller.startVerification(request, h, 'test@example.com', '/next', {
      codeSubmitHref: '/custom/code',
      changeEmailHref: '/custom/email'
    })

    expect(sessionHelper.setPendingLogin).toHaveBeenCalledWith(request.yar, {
      pendingId: 'pending-id-1',
      email: 'test@example.com',
      returnUrl: '/next',
      codeSubmitHref: '/custom/code',
      changeEmailHref: '/custom/email'
    })
    expect(h.redirect).toHaveBeenCalledWith('/verify/code')
  })
})
