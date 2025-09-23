import ResponseStatus from './enums/ResponseStatus';

class APIError extends Error {
  isOperational: boolean;
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = this.statusCode.toString().startsWith('4')
      ? ResponseStatus.FAIL
      : ResponseStatus.ERROR;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;
