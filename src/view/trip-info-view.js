import { getMonthDay, getDay } from '../utils.js';

const getTripInfo = (points) => {
  const beginDate = points[0].time.beginDate;
  const endDate = points[points.length - 1].time.endDate;
  let price = 0;
  let route = [];
  let lastCity = '';

  for (const point of points) {
    price += point.price;
    point.offers
      .forEach((offer) => {
        if (offer.isActive) { price += offer.price; }
      });

    const newCity = point.city;
    if (newCity !== lastCity) {
      route.push(newCity);
      lastCity = newCity;
    }
  }

  route = route.join(' &mdash; ');

  return {
    price,
    beginDate,
    endDate,
    route
  };
};

export const createTripInfoTemplate = (points) => {
  const { price, beginDate, endDate, route } = getTripInfo(points);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${getMonthDay(beginDate)}&nbsp;&mdash;&nbsp;${getDay(endDate)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`;
};
