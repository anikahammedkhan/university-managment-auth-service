import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './share/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to database')
    app.listen(config.port, () => {
      logger.info(`Server started on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(err)
  }
}

bootstrap()
