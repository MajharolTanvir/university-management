import { IGenericErrorMessage } from './error';

export type GenericResponse<T> = {
  meta: {
    page?: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
