import { PrismaClient } from '@prisma/client';

import logger from './logger';

const prisma = new PrismaClient();

const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
  } catch (err) {
    logger.error('Database connection failed:', err);
  }
};

testDatabaseConnection();

export default prisma;
