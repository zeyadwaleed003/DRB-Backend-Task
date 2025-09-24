import { z } from 'zod';

export const CreateRouteSchema = z.object({
  body: z
    .object({
      startLocation: z
        .string()
        .max(32, 'Start location cannot be more than 32 characters'),
      endLocation: z
        .string()
        .max(32, 'Start location cannot be more than 32 characters'),

      startLat: z
        .number()
        .min(-90, 'Latitude must be between -90 and 90 degrees')
        .max(90, 'Latitude must be between -90 and 90 degrees'),
      startLong: z
        .number()
        .min(-180, 'Longitude must be between -180 and 180 degrees')
        .max(180, 'Longitude must be between -180 and 180 degrees'),
      endLat: z
        .number()
        .min(-90, 'Latitude must be between -90 and 90 degrees')
        .max(90, 'Latitude must be between -90 and 90 degrees'),
      endLong: z
        .number()
        .min(-180, 'Longitude must be between -180 and 180 degrees')
        .max(180, 'Longitude must be between -180 and 180 degrees'),
    })
    .strict(),
});
