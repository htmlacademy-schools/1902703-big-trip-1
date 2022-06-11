import AbstractObservable from '../utils/abstract-observable.js';
import { UpdateType } from '../const.js';

export default class PointsModel extends AbstractObservable {
  #apiService = null;
  #points = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.points.then((points) => {
      console.log('points');
      console.log(points.map(this.#adaptToClient));
    });

    // this.#apiService.destinations.then((points) => {
    //   console.log('destinations');
    //   console.log(points);
    // });

    // this.#apiService.offers.then((points) => {
    //   console.log('offers');
    //   console.log(points);
    // });
  }

  init = async () => {
    const points = await this.#apiService.points;
    this.#points = points.map(this.#adaptToClient);

    try {
      const points = await this.#apiService.points;
      this.#points = points.map(this.#adaptToClient);
    }
    catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  set points(points) {
    this.#points = [...points];
    console.log(points);
  }

  get points() {
    return this.#points;
  }

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
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
