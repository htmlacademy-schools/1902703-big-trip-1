import { getDayMonth, getMonthDay, getDay } from '../utils/date-time.js';
import { sortPointsByDay } from '../utils/point-tools.js';
import AbstractView from './abstract-view.js';

const getTripInfo = (points) => {
  points.sort(sortPointsByDay);

  const dateFrom = points[0].dateFrom;
  const dateTo = points[points.length - 1].dateTo;
  const dates = dateFrom.getMonth() === dateTo.getMonth()
    ? `${getMonthDay(dateFrom)}&nbsp;&mdash;&nbsp;${getDay(dateTo)}`
    : `${getDayMonth(dateFrom)}&nbsp;&mdash;&nbsp;${getDayMonth(dateTo)}`;

  let price = 0;
  let route = [];
  let lastCity = '';

  for (const point of points) {
    price += point.basePrice;

    const typeOffers = point.offers.filter((offerStruct) => offerStruct.type === point.type);
    if (typeOffers.length > 0) {
      typeOffers[0].offers
        .forEach((offer) => {
          if (offer.isActive) {
            price += offer.price;
          }
        });
    }

    const newCity = point.destination.name;
    if (newCity !== lastCity) {
      route.push(newCity);
      lastCity = newCity;
    }
  }

  route = route.length > 3
    ? `${route[0]} &mdash; ... &mdash; ${route[route.length - 1]}`
    : route.join(' &mdash; ');

  return {
    price,
    dates,
    route
  };
};

const createTripInfoTemplate = (points) => {
  const { price, dates, route } = getTripInfo(points);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${dates}</p>
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

    return '';
  }
}
