/* eslint-disable no-console */
import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './share/logger'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})
let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to database')
    server = app.listen(config.port, () => {
      logger.info(`Server started on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(err)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully')
  if (server) {
    server.close(() => {
      logger.info('Process terminated')
    })
  }
})
