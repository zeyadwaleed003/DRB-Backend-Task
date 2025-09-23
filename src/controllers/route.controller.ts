import { RequestHandler } from 'express';

import sendResponse from '../utils/sendResponse';
import routeService from '../services/route.service';

export const createRoute: RequestHandler = async (req, res, next) => {
  const result = await routeService.createRoute(req.body);
  sendResponse(res, result);
};
