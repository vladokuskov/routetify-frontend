import app from 'app'
import api from 'api'
import config from 'config/index'
import Logger from 'core/helpers/logger'

app.use(api)

app
  .listen(config.port, (): void => {
    Logger.info(`
  ################################################
  🛡️  Server listening on port: ${config.port} 🛡️
  ################################################
`)
  })
  .on('error', (err) => {
    Logger.error(err)
    process.exit(1)
  })
