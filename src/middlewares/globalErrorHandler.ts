/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import mongoose from 'mongoose'
import config from '../config/index'
import ApiError from '../errors/ApiError'
import handleValidationError from '../errors/handleValidationError'
import { IGenericErrorMessages } from '../interfaces/error'
import { errorLogger } from '../share/logger'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development' ? console.log(err) : errorLogger.error(err)
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessage: IGenericErrorMessages[] = []

  if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(
      err as mongoose.Error.ValidationError
    )
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    const error = err as ApiError
    statusCode = error.statusCode
    message = error.message
    errorMessage = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err.message
    errorMessage = err.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env === 'development' ? err.stack : undefined,
  })

  next()
}

export default globalErrorHandler
