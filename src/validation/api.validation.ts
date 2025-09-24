import { z } from 'zod';

export const PaginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(100),
  }),
});

export const IdSchema = z.object({
  params: z
    .object({
      id: z.uuid('Provided id must be in valid UUID format'),
    })
    .strict(),
});
