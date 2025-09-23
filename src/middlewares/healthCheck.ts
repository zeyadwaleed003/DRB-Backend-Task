import { NextFunction, Request, Response } from 'express';

import { APIResponse } from '../types/api.types';
import sendResponse from '../utils/sendResponse';
import HttpStatus from '../utils/HttpStatus';

export default (req: Request, res: Response, next: NextFunction) => {
  const result: APIResponse = {
    status: 'OK',
    statusCode: HttpStatus.OK,
    message: `Health check passed - API is operational`,
    timestamp: new Date().toISOString(),
  };

  sendResponse(res, result);
};
