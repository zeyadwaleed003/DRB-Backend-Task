import { NextFunction, Request, Response } from 'express';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

import env from '../config/env';
import APIError from '../utils/APIError';
import HttpStatus from '../utils/HttpStatus';

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: APIError | unknown, res: Response) => {
  if (err instanceof APIError && err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  return res.status(HttpStatus.InternalServerError).json({
    status: 'error',
    message: 'Something went wrong, Please try again later.',
  });
};

const handlePrismaError = (err: unknown): APIError => {
  if (err instanceof PrismaClientKnownRequestError) {
    let message = 'Database operation failed';
    let statusCode = HttpStatus.BadRequest;

    switch (err.code) {
      case 'P2002':
        message = `Duplicate value for ${err.meta?.target}`;
        statusCode = HttpStatus.Conflict;
        break;
      case 'P2025':
        message = 'Record not found';
        statusCode = HttpStatus.NotFound;
        break;
      case 'P2003':
        message = 'Foreign key constraint violation';
        statusCode = HttpStatus.BadRequest;
        break;
      case 'P2014':
        message = 'Invalid relation data';
        statusCode = HttpStatus.BadRequest;
        break;
      default:
        message = `Database error: ${err.message}`;
    }

    return new APIError(message, statusCode);
  }

  if (err instanceof PrismaClientValidationError) {
    return new APIError('Invalid data provided', HttpStatus.BadRequest);
  }

  if (err instanceof PrismaClientUnknownRequestError) {
    return new APIError(
      'Database connection error',
      HttpStatus.InternalServerError
    );
  }

  return new APIError((err as any).message, HttpStatus.InternalServerError);
};

const handlePostgreSQLError = (err: any): APIError => {
  let message = 'Database error';
  let statusCode = HttpStatus.InternalServerError;

  if (err.code) {
    switch (err.code) {
      case '23505':
        message = 'Duplicate entry found';
        statusCode = HttpStatus.Conflict;
        break;
      case '23503':
        message = 'Referenced record does not exist';
        statusCode = HttpStatus.BadRequest;
        break;
      case '23514':
        message = 'Data validation failed';
        statusCode = HttpStatus.BadRequest;
        break;
      case '23502':
        message = 'Required field is missing';
        statusCode = HttpStatus.BadRequest;
        break;
      case '08003':
        message = 'Database connection error';
        statusCode = HttpStatus.ServiceUnavailable;
        break;
      default:
        message = `Database error: ${err.message}`;
    }
  }

  return new APIError(message, statusCode);
};

const isPrismaError = (err: unknown) => {
  return (
    (typeof err === 'object' &&
      'name' in err! &&
      typeof err.name === 'string' &&
      err.name.includes('Prisma')) ||
    err instanceof PrismaClientKnownRequestError
  );
};

const isPostgresError = (err: unknown) => {
  return (
    typeof err === 'object' &&
    'code' in err! &&
    typeof err.code === 'string' &&
    err.code.match(/^\d{5}$/)
  );
};

const processProductionError = (err: unknown) => {
  if (isPrismaError(err)) return handlePrismaError(err);
  if (isPostgresError(err)) return handlePostgreSQLError(err);

  return err;
};

export default (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (env.NODE_ENV === 'development') sendErrorDev(err, res);
  if (env.NODE_ENV === 'production') {
    const processedError = processProductionError(err);
    sendErrorProd(processedError, res);
  }
};
