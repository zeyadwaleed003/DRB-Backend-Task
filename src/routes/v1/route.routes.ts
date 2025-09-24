import { Router } from 'express';

import validate from '../../middlewares/validate';
import { PaginationSchema } from '../../validation/api.validation';
import { CreateRouteSchema } from '../../validation/route.validation';
import { createRoute, getRoutes } from '../../controllers/route.controller';

const router = Router();

router
  .route('/')
  .get(validate(PaginationSchema), getRoutes)
  .post(validate(CreateRouteSchema), createRoute);

export const routeRoutes = router;
