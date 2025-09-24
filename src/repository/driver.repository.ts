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

  async markDriverAvailable(id: string) {
    await this.driver.update({
      where: { id },
      data: {
        availability: true,
      },
    });
  }

  async getSchedule() {
    const drivers = await this.driver.findMany({
      select: {
        id: true,
        name: true,
        Route: {
          where: {
            status: 'ASSIGNED',
          },
        },
      },
    });

    return drivers.map((driver) => ({
      driverId: driver.id,
      name: driver.name,
      route: driver.Route,
    }));
  }
}

export default new DriverRepository();
