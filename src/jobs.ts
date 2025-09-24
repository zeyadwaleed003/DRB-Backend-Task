import { scheduleJob } from 'node-schedule';

import logger from './config/logger';
import routeRepository from './repository/route.repository';
import driverRepository from './repository/driver.repository';

// Automatically assign unassigned routes to available drivers every minute
export default () =>
  scheduleJob('0 * * * * *', async () => {
    try {
      logger.info('Starting route assignment job');

      const unassignedRoutes = await routeRepository.findUnassignedRoutes();

      const availableDrivers = await driverRepository.findAvailableDrivers();

      const assignmentsToMake = Math.min(
        unassignedRoutes.length,
        availableDrivers.length
      );

      for (let i = 0; i < assignmentsToMake; i++) {
        const route = unassignedRoutes[i];
        const driver = availableDrivers[i];

        await routeRepository.assignRoute(route!.id, driver!.id);

        await driverRepository.markDriverUnavailable(driver!.id);

        logger.info(
          `Assigned route ${route!.id} to driver ${driver!.name} (${
            driver!.id
          })`
        );
      }

      logger.info(
        `Route assignment job completed. Made ${assignmentsToMake} assignments.`
      );
    } catch (error) {
      logger.error('Error in route assignment job:', error);
    }
  });
