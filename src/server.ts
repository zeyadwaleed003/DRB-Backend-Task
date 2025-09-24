import app from './app';
import jobs from './jobs';
import env from './config/env';
import logger from './config/logger';

process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION` + err);
  process.exit(1);
});

const server = app.listen(3000, () => {
  logger.info(`Server is running on port: ${env.PORT}`);
  jobs();
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION' + err);
  server.close(() => {
    process.exit(1);
  });
});
