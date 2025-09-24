import { z } from 'zod';
import { CreateDriverSchema } from '../validation/driver.validation';

export type CreateDriverBody = z.output<typeof CreateDriverSchema>['body'];
