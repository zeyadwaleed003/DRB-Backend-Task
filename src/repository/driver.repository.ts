import prisma from '../config/prisma';
import { CreateDriverBody } from '../types/driver.types';

class DriverRepository {
  private driver = prisma.driver;

  async create(data: CreateDriverBody) {
    return await this.driver.create({
      data,
    });
  }
}

export default new DriverRepository();
