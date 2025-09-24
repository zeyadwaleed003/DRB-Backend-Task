import prisma from '../config/prisma';
import { CreateDriverBody } from '../types/driver.types';

class DriverRepository {
  private driver = prisma.driver;

  async create(data: CreateDriverBody) {
    return await this.driver.create({
      data,
    });
  }

  async findAvailableDrivers() {
    return await this.driver.findMany({
      where: {
        availability: true,
      },
    });
  }

  async markDriverUnavailable(id: string) {
    await this.driver.update({
      where: { id },
      data: {
        availability: false,
      },
    });
  }
}

export default new DriverRepository();
