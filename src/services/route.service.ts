import { APIResponse, QueryString } from '../types/api.types';
import HttpStatus from '../utils/enums/HttpStatus';
import ResponseStatus from '../utils/enums/ResponseStatus';
import routeRepository from '../repository/route.repository';
import { CreateRouteBody, Route } from '../types/route.types';
import paginate from '../utils/paginate';

class RoutesService {
  private avgSpeed = 50;
  // assuming that the average speed is 50 km/h (This data could come from anywhere else (e.g. API Call) but I am assuming that this app from a small city with limited average car speed)

  private calcRouteDistance(data: CreateRouteBody) {
    const R = 6371; // Earth radius
    const dLat = ((data.endLat - data.startLat) * Math.PI) / 180;
    const dLon = ((data.endLong - data.startLong) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((data.startLat * Math.PI) / 180) *
        Math.cos((data.endLat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private calcRouteEstimatedTime(distance: number) {
    // This will return the estimated time in minutes
    return (distance / this.avgSpeed) * 60;
  }

  async createRoute(data: CreateRouteBody): Promise<APIResponse> {
    const distance = this.calcRouteDistance(data);
    const estimatedTime = this.calcRouteEstimatedTime(distance);

    const finalData: Route = {
      ...data,
      distance,
      estimatedTime,
    };

    const route = await routeRepository.create(finalData);

    const result: APIResponse = {
      status: ResponseStatus.SUCCESS,
      statusCode: HttpStatus.Created,
      data: route,
    };

    return result;
  }

  async getRoutes(queryString: QueryString): Promise<APIResponse> {
    const routes = await routeRepository.find(paginate(queryString));

    const result: APIResponse = {
      status: ResponseStatus.SUCCESS,
      statusCode: HttpStatus.Ok,
      size: routes.length,
      data: routes,
    };

    return result;
  }
}
export default new RoutesService();
