import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { Route } from '../types/route.types';
import APIError from '../utils/APIError';
import HttpStatus from '../utils/enums/HttpStatus';

class RoutesRepository {
  private route = prisma.route;

  async create(data: Route) {
    return await this.route.create({
      data,
    });
  }

  async find(options: Prisma.RouteFindManyArgs) {
    return await this.route.findMany(options);
  }

  async findUnassignedRoutes() {
    return await this.route.findMany({
      where: {
        status: 'UNASSIGNED',
      },
    });
  }

  async assignRoute(routeId: string, driverId: string) {
    await this.route.update({
      where: { id: routeId },
      data: {
        status: 'ASSIGNED',
        driverId: driverId,
      },
    });
  }

  async finishRoute(driverId: string) {
    const route = await this.route.updateMany({
      where: {
        status: 'ASSIGNED',
        driverId,
      },
      data: {
        status: 'FINISHED',
      },
    });

    if (route.count === 0)
      throw new APIError(
        'No assigned route found for this driver',
        HttpStatus.NotFound
      );
  }
}

export default new RoutesRepository();
