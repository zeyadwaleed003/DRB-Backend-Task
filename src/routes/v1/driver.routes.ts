import { Router } from 'express';

import validate from '../../middlewares/validate';
import { CreateDriverSchema } from '../../validation/driver.validation';
import { createDriver, getSchedule } from '../../controllers/driver.controller';

const router = Router();

router.route('/').post(validate(CreateDriverSchema), createDriver);

router.get('/schedule', getSchedule);

export const driverRoutes = router;
