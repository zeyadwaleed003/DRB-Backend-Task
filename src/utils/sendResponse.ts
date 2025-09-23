import { Response } from 'express';

import { APIResponse } from '../types/api.types';

const sendResponse = (res: Response, result: APIResponse) => {
  res.status(result.statusCode).json({
    status: result.status,
    size: result.size,
    message: result.message,
    data: result.data,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    timestamp: result.timestamp,
  });
};

export default sendResponse;
