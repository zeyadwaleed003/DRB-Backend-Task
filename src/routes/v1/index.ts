import { Router } from 'express';
import env from '../../config/env';
import { routesRoutes } from './route.routes';

const router = Router();

env.BASE_URL += '/v1';

router.use('/routes', routesRoutes);

export const v1Routes = router;
