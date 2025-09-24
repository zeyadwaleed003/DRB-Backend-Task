import { Router } from 'express';

import validate from '../../middlewares/validate';
import { createDriver } from '../../controllers/driver.controller';
import { CreateDriverSchema } from '../../validation/driver.validation';

const router = Router();

router.route('/').post(validate(CreateDriverSchema), createDriver);

export const driverRoutes = router;
