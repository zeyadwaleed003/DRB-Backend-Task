import { z } from 'zod';

import { CreateRouteSchema } from '../validation/route.validation';

export type CreateRouteBody = z.output<typeof CreateRouteSchema>['body'];

export type Route = {
  distance: number;
  estimatedTime: number;
} & CreateRouteBody;
