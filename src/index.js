import process from 'node:process'

import { startServer } from './server/common/helpers/start-server.js'
import { registerProcessErrorHandlers } from './server/common/helpers/process-error-handlers.js'

registerProcessErrorHandlers(process)

await startServer()
