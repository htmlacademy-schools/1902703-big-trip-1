import { generatePoint } from './mock/destinationPoint.js';
import { convertPoint } from './utils/converter.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic 1ZOvgl381fLgRaHQDfBq';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const POINT_COUNT = 5;
const points = Array.from({ length: POINT_COUNT }, () => convertPoint(generatePoint()));

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(pointsModel, filterModel);
tripPresenter.init();
pointsModel.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

document.querySelector('.trip-main__event-add-btn').disabled = true;

