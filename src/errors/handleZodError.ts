import { ZodError, ZodIssue } from 'zod';
import { IGenicErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenicErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleZodError;
