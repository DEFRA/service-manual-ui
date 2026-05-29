import { createServer } from '../../server.js'
import { config } from '../../../config/config.js'
import { buildEventLog } from './logging/build-error-log.js'

async function startServer () {
  const server = await createServer()
  await server.start()

  const port = config.get('port')

  server.logger.info(
    buildEventLog({ type: 'server_start', action: 'listen', reference: port }),
    'Server started successfully'
  )
  server.logger.info(
    buildEventLog({ type: 'server_start', action: 'listen', reference: port }),
    `Access your frontend on http://localhost:${port}`
  )

  return server
}

export { startServer }
