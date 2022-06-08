import { FilterType } from '../const';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((p) =>
    p.dateFrom >= Date.now()
    || p.dateFrom <= Date.now() && p.dateTo >= Date.now()),
  [FilterType.PAST]: (points) => points.filter((p) =>
    p.dateTo < Date.now()
    || p.dateFrom <= Date.now() && p.dateTo >= Date.now()),
};
