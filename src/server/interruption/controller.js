import { statusCodes } from '../common/constants/status-codes.js'

export const interruptionController = {
  async handler(request, h) {
    const { targetUrl } = request.query || {}

    return h
      .view('interruption/view.njk', {
        targetUrl,
        pageTitle: 'You are going to an internal service'
      })
      .code(statusCodes.ok)
  }
}
