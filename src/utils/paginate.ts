import { Prisma } from '@prisma/client';

import { QueryString } from '../types/api.types';

export default (qs: QueryString) => {
  const page = Number(qs.page) || 1;
  const take = Number(qs.limit) || 100;
  const skip = (page - 1) * take;

  const queryOptions: Prisma.RouteFindManyArgs = {
    skip,
    take,
  };

  return queryOptions;
};
