import AbstractObservable from '../utils/abstract-observable.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends AbstractObservable {
  _destinations = [];
  _offers = [];
  #apiService = null;
  #points = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;

  }

  init = async () => {
    const points = await this.#apiService.points;
    this.#points = points.map(this.#adaptToClient);

    this._destinations = await this.#apiService.destinations;
    this._offers = await this.#apiService.offers;

    try {
      const pointsRetry = await this.#apiService.points;
      this.#points = pointsRetry.map(this.#adaptToClient);

      this._destinations = await this.#apiService.destinations;
      this._offers = await this.#apiService.offers;
    }
    catch (err) {
      this.#points = [];
      this._destinations = [];
      this._offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  set points(points) {
    this.#points = [...points];
  }

  get points() {
    return this.#points;
  }

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#apiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    }
    catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#apiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        update,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    }
    catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#apiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    }
    catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  updateView = (updateType) => {
    this._notify(updateType);
  }

  #adaptToClient = (point) => {
    const adaptedpoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: new Date(point['date_from']),
      dateTo: new Date(point['date_to']),
      isFavorite: point['is_favorite'],
    };

    delete adaptedpoint['base_price'];
    delete adaptedpoint['date_from'];
    delete adaptedpoint['date_to'];
    delete adaptedpoint['is_favorite'];

    return adaptedpoint;
  }
}
