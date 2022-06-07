import { generatePoint } from './mock/destinationPoint.js';
import { convertPoint } from './utils/converter.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const POINT_COUNT = 10;
const points = Array.from({ length: POINT_COUNT }, () => convertPoint(generatePoint()));

const pointsModel = new PointsModel();
pointsModel.points = points;

const tripPresenter = new TripPresenter(pointsModel);
tripPresenter.init();
