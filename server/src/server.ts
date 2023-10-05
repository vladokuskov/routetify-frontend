const app = require('@/app')
import config from '@/config/index'
import Logger from '@/core/helpers/logger'

app
  .listen(config.port, (): void => {
    Logger.info(`
  ################################################
  🛡️  Server listening on port: ${config.port} 🛡️
  ################################################
`)
  })
  .on('error', (err: Express.Application) => {
    Logger.error(err)
  })
