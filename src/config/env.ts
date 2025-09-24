import { z } from 'zod';
import { config } from 'dotenv';

config({ quiet: true });

const envConfig = z
  .object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(['development', 'production']).default('development'),

    LOG_LEVEL: z
      .enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
      .default('info'),

    PROD_BASE_URL: z
      .url('PROD_BASE_URL must be a valid URL (e.g., https://example.com)')
      .optional(),

    DATABASE_URL: z
      .string()
      .refine(
        (url) =>
          url.startsWith('postgresql://') || url.startsWith('postgres://'),
        'DATABASE_URL must be a PostgreSQL connection string'
      ),
  })
  .parse(process.env);

let BASE_URL = `http://localhost:${envConfig.PORT}/api`;
if (envConfig.NODE_ENV === 'production') BASE_URL += '/api';

export default {
  ...envConfig,
  BASE_URL,
};
