import { Router } from 'express';
import { v1Routes } from './v1';

const router = Router();

router.use('/v1', v1Routes);
// router.use('/v2', v2Routes); Apply Versioning when needed, Not in this project tho :)

export const apiRoutes = router;
