import { z } from 'zod';

export const CreateDriverSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(3, 'Name cannot be less than 3 characters')
        .max(32, 'Name cannot be more than 32 characters'),
      licenseType: z.enum(['A', 'B', 'C', 'D', 'E']),
      availability: z.boolean().default(true),
    })
    .strict(),
});
