/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import { handleValidationError } from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { ErrorRequestHandler } from 'express'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'Development'
    ? console.log('🚀 globalErrorHandler ~', err)
    : errorLogger.error('🚀 globalErrorHandler ~', err)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidatorError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
