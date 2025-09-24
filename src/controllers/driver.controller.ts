import { RequestHandler } from 'express';
import sendResponse from '../utils/sendResponse';
import driverService from '../services/driver.service';

export const createDriver: RequestHandler = async (req, res, next) => {
  const result = await driverService.createDriver(req.body);
  sendResponse(res, result);
};

export const getSchedule: RequestHandler = async (req, res, next) => {
  const result = await driverService.getSchedule();
  sendResponse(res, result);
};
