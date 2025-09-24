import { APIResponse } from '../types/api.types';
import HttpStatus from '../utils/enums/HttpStatus';
import { CreateDriverBody } from '../types/driver.types';
import ResponseStatus from '../utils/enums/ResponseStatus';
import driverRepository from '../repository/driver.repository';
import routeRepository from '../repository/route.repository';

class DriverService {
  async createDriver(data: CreateDriverBody): Promise<APIResponse> {
    const driver = await driverRepository.create(data);

    const result: APIResponse = {
      status: ResponseStatus.SUCCESS,
      statusCode: HttpStatus.Created,
      data: driver,
    };

    return result;
  }

  async getSchedule(): Promise<APIResponse> {
    const routes = await driverRepository.getSchedule();

    const result: APIResponse = {
      status: ResponseStatus.SUCCESS,
      statusCode: HttpStatus.Created,
      data: routes,
    };

    return result;
  }

  async finishTrip(id: string): Promise<APIResponse> {
    await driverRepository.markDriverAvailable(id);
    await routeRepository.finishRoute(id);

    const result: APIResponse = {
      status: ResponseStatus.SUCCESS,
      statusCode: HttpStatus.Ok,
      message: 'Trip finished successfully',
    };

    return result;
  }
}

export default new DriverService();
