import { statusCodes } from '../common/constants/status-codes.js'

/**
 * 301 redirects for renamed URLs.
 *
 * The architecture role page was previously served at
 * /architecture-and-software-development, before software development was
 * split out to its own page. The common tools pages still live under the
 * old path, so only the exact parent path redirects.
 *
 * The AI toolkit was previously served at /ai-playbook. URLs were renamed to
 * /ai-toolkit to match the user-facing brand ("AI digital toolkit"). Anyone
 * who bookmarked or linked the old paths during dev is redirected to the
 * new equivalents permanently.
 */
export const redirects = {
  plugin: {
    name: 'redirects',
    register (server) {
      server.route({
        method: 'GET',
        path: '/architecture-and-software-development',
        handler (_request, h) {
          return h.redirect('/architecture').code(statusCodes.movedPermanently)
        }
      })

      server.route([
        {
          method: 'GET',
          path: '/ai-playbook',
          handler (_request, h) {
            return h.redirect('/ai-toolkit').code(statusCodes.movedPermanently)
          }
        },
        {
          method: 'GET',
          path: '/ai-playbook/{rest*}',
          handler (request, h) {
            return h
              .redirect(`/ai-toolkit/${request.params.rest}`)
              .code(statusCodes.movedPermanently)
          }
        }
      ])
    }
  }
}
