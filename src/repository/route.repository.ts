import prisma from '../config/prisma';
import { Route } from '../types/route.types';

class RoutesRepository {
  private route = prisma.route;

  async create(data: Route) {
    return await this.route.create({
      data,
    });
  }
}

export default new RoutesRepository();
