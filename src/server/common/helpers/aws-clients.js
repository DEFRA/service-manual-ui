import { STSClient } from '@aws-sdk/client-sts'

// The SDK sets no connection or request timeout of its own: @smithy's
// setConnectionTimeout takes 0 as its default and returns immediately when it
// is falsy. The token call sits in the submitter's path, ahead of the post and
// outside the AbortSignal that bounds it, and it reaches STS directly rather
// than through the forward proxy. Somewhere that path is blocked, an
// unbounded client would hold the submit page open for the operating system's
// TCP timeout, once per attempt. These are ceilings, not tunables: both emails
// have already been sent by the time the token is asked for, so failing
// quickly costs nothing and waiting costs the submitter.
export const STS_CLIENT_CONFIG = {
  requestHandler: { connectionTimeout: 2000, requestTimeout: 3000 },
  maxAttempts: 2
}

/**
 * Creates the AWS clients the service needs once at start-up and makes them
 * available as `server.stsClient` and `request.stsClient`.
 *
 * Constructing the client makes no network call — credentials and region are
 * resolved lazily on the first send — so this is safe to register in every
 * environment, including locally and in tests where AWS is unreachable.
 */
export const awsClients = {
  plugin: {
    name: 'aws-clients',
    register (server) {
      const stsClient = new STSClient(STS_CLIENT_CONFIG)

      server.decorate('server', 'stsClient', stsClient)
      server.decorate('request', 'stsClient', stsClient)

      server.events.on('stop', () => {
        stsClient.destroy()
      })
    }
  }
}
