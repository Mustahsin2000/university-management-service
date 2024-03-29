import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handlevalidationerror';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { errorlogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log('globalErrorHandler', error)
    : errorlogger.error('globalErrorHandler', error);

  let statusCode = 500;
  let message = 'Something went fisshy!';
  let errorMessages: IGenericErrorMessage[] = [];
  //   if (err instanceof Error) {
  //     res.status(400).json({ error: err })
  //   } else {
  //     res.status(500).json({ error: 'something went wrong' })
  //   }
  //   res.status(400).json({ trustme: err })

  if (error?.name === 'ValidationError') {
    const simplyfyError = handleValidationError(error);
    statusCode = simplyfyError.statusCode;
    message = simplyfyError.message;
    errorMessages = simplyfyError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
