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
}

export default new RoutesRepository();
