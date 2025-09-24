import { Router } from 'express';
import env from '../../config/env';
import { routeRoutes } from './route.routes';
import { driverRoutes } from './driver.routes';

const router = Router();

env.BASE_URL += '/v1';

router.use('/routes', routeRoutes);
router.use('/drivers', driverRoutes);

export const v1Routes = router;
