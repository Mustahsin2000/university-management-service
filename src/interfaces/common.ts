import { IGenericErrorMessage } from './error';

export type IGenicErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
