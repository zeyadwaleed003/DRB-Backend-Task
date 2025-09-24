import { Router } from 'express';

import validate from '../../middlewares/validate';
import { CreateDriverSchema } from '../../validation/driver.validation';
import {
  createDriver,
  finishTrip,
  getPastRoutes,
  getSchedule,
} from '../../controllers/driver.controller';
import { IdSchema } from '../../validation/api.validation';

const router = Router();

router.route('/').post(validate(CreateDriverSchema), createDriver);

router.patch('/:id/finish-trip', validate(IdSchema), finishTrip);
router.get('/:id/history', validate(IdSchema), getPastRoutes);

router.get('/schedule', getSchedule);

export const driverRoutes = router;
