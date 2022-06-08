import { generatePoint } from './mock/destinationPoint.js';
import { convertPoint } from './utils/converter.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model';

const POINT_COUNT = 10;
const points = Array.from({ length: POINT_COUNT }, () => convertPoint(generatePoint()));

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(pointsModel, filterModel);
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
