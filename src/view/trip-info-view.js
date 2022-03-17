import { getMonthDay, getDay } from '../utils.js';
import { createElement } from '../render.js';

const getTripInfo = (points) => {
  const date_from = points[0].date_from;
  const date_to = points[points.length - 1].date_to;

  let price = 0;
  let route = [];
  let lastCity = '';

  for (const point of points) {
    price += point.base_price;
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
    date_from,
    date_to,
    route
  };
};

const createTripInfoTemplate = (points) => {
  const { price, date_from, date_to, route } = getTripInfo(points);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${getMonthDay(date_from)}&nbsp;&mdash;&nbsp;${getDay(date_to)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`;
};

export default class TripInfoView {
  #element = null;

  constructor(points) {
    this.points = points;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTripInfoTemplate(this.points);
  }

  removeElement() {
    this.#element = null;
  }
}
