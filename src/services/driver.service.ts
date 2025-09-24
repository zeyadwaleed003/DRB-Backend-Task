import { APIResponse } from '../types/api.types';
import HttpStatus from '../utils/enums/HttpStatus';
import { CreateDriverBody } from '../types/driver.types';
import ResponseStatus from '../utils/enums/ResponseStatus';
import driverRepository from '../repository/driver.repository';

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
}

export default new DriverService();
