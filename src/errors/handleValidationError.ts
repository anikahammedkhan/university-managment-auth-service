import mongoose from 'mongoose'
import { IGenericErrorResponse } from '../interfaces/common'
import { IGenericErrorMessages } from '../interfaces/error'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = Object.values(err.errors).map(el => {
    return {
      path: el?.path,
      message: el?.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
