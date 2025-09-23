import { Router } from 'express';

import validate from '../../middlewares/validate';
import { createRoute } from '../../controllers/route.controller';
import { CreateRouteSchema } from '../../validation/route.validation';

const router = Router();

router.route('/').post(validate(CreateRouteSchema), createRoute);

export const routesRoutes = router;
