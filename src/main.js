import TripPresenter from './presenter/trip-presenter.js';
import { generatePoint } from './mock/destinationPoint.js';
import { sortPointsByDate } from './utils/point-tools.js';
import { convertPoint } from './utils/converter.js';

const POINT_COUNT = 20;
const points = sortPointsByDate(Array.from({ length: POINT_COUNT }, () => convertPoint(generatePoint())));

const tripPresenter = new TripPresenter();
tripPresenter.init(points);
