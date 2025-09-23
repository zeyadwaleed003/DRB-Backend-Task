import { NextFunction, Request, Response } from 'express';

import APIError from '../utils/APIError';
import HttpStatus from '../utils/enums/HttpStatus';

export default (req: Request, res: Response, next: NextFunction) => {
  next(
    new APIError(
      `Could not find ${req.originalUrl} on the server!`,
      HttpStatus.NotFound
    )
  );
};
