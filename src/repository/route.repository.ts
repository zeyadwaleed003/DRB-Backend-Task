import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { Route } from '../types/route.types';

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
}

export default new RoutesRepository();
