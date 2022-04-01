import { getMonthDay, getDay } from '../utils.js';
import AbstractView from './abstract-view.js';

const getTripInfo = (points) => {
  const dateFrom = points[0].dateFrom;
  const dateTo = points[points.length - 1].dateTo;

  let price = 0;
  let route = [];
  let lastCity = '';

  for (const point of points) {
    price += point.basePrice;
    point.offers
      .forEach((offerStruct) => offerStruct.offers
        .forEach((offer) => {
          if (offer.isActive) { price += offer.price; }
        }));

    const newCity = point.destination.name;
    if (newCity !== lastCity) {
      route.push(newCity);
      lastCity = newCity;
    }
  }

  route = route.join(' &mdash; ');

  return {
    price,
    dateFrom,
    dateTo,
    route
  };
};

const createTripInfoTemplate = (points) => {
  const { price, dateFrom, dateTo, route } = getTripInfo(points);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${getMonthDay(dateFrom)}&nbsp;&mdash;&nbsp;${getDay(dateTo)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`;
};

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    if (this.#points?.length > 0) {
      return createTripInfoTemplate(this.#points);
    }

    return ' ';
  }
}
