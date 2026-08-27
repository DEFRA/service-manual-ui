import { GetWebIdentityTokenCommand } from '@aws-sdk/client-sts'

import { config } from '../../config/config.js'

// The platform's guide supports RS256 and ES384; aice-triage-automation verifies RS256.
const SIGNING_ALGORITHM = 'RS256'

/**
 * Asks the AWS Security Token Service for a short-lived WebIdentity token to
 * present to aice-triage-automation as `Authorization: Bearer …`.
 *
 * Returns null when authentication is disabled, which is the default and what
 * runs locally, where the token service is unavailable. The token is not cached:
 * this service asks for at most one per form submission.
 *
 * The `Tags` parameter is deliberately not sent — the platform's guide notes it
 * fails with permission denied on a container role.
 *
 * @param {import('@aws-sdk/client-sts').STSClient} [stsClient]
 * @returns {Promise<string|null>}
 */
export async function getToken (stsClient) {
  if (!config.get('aiTriage.authEnabled')) {
    return null
  }

  if (!stsClient) {
    throw new Error('No STS client available to get an aice-triage-automation auth token')
  }

  const response = await stsClient.send(
    new GetWebIdentityTokenCommand({
      Audience: [config.get('aiTriage.automationAudience')],
      DurationSeconds: config.get('aiTriage.tokenDurationSeconds'),
      SigningAlgorithm: SIGNING_ALGORITHM
    })
  )

  if (!response.WebIdentityToken) {
    throw new Error('STS returned no WebIdentity token')
  }

  return response.WebIdentityToken
}
