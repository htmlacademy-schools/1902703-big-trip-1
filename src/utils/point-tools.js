import { nanoid } from 'nanoid';
import { getTimeIntervalMinutes } from './date-time';
import { ChartType } from '../const';

export const sortPointsByDay = (p1, p2) => p1.dateFrom - p2.dateFrom;

export const sortPointsByTime = (p1, p2) =>
  (p2.dateTo - p2.dateFrom) - (p1.dateTo - p1.dateFrom);

export const sortPointsByPrice = (p1, p2) => p2.basePrice - p1.basePrice;

export const createOffersTemplate = (offers) => {
  const getOffersTemplate = (offers) => {
    if (offers.length === 0) {
      return '';
    }

    const getListItemTemplate = (offer) => {
      const { title, price } = offer;
      return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
    };

    return offers.map((offer) => getListItemTemplate(offer)).join('\n');
  };

  if (offers) {
    const offersTemplate = getOffersTemplate(offers);

    if (offersTemplate !== '') {
      return `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${offersTemplate}
        </ul>`;
    }
  }

  return '';
};

export const createFormOffersTemplate = (type, pointOffers, offersList) => {
  const getOffersTemplate = (offers) => {
    if (offers.length === 0) {
      return '';
    }

    const getListItemTemplate = (offer) => {
      const { id, title, price } = offer;
      const isActive = pointOffers.filter(off => off.id === offer.id).length > 0;

      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${isActive ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${type}-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`;
    };

    return offers.map((offer) => getListItemTemplate(offer)).join('\n');
  };

  if (offersList) {
    const offersTemplate = getOffersTemplate(offersList);

    if (offersTemplate !== '') {
      return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offersTemplate}
        </div>
      </section>`;
    }
  }

  return '';
};

export const createFormDescription = (description, pictures) => {
  if (!description?.length && !pictures?.length) { return ''; }

  if (!description) { description = ''; }

  const picturesTemplate = pictures
    ?.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)
    ?.join('\n');

  const picturesContainer = !picturesTemplate
    ? ''
    : `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${picturesTemplate}
      </div>
    </div>` ;

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${picturesContainer}
  </section>`;
};

export const createCityDataList = (id, destinations) => {
  const result = [];
  const cities = destinations.map(dest => dest.name);

  for (const item of cities) {
    result.push(`<option value="${item}"></option>`);
  }

  return `<datalist id="destination-list-${id}">
    ${result.join('\n')}
  </datalist>`;
};

export const isDatesEqual = (p1, p2) =>
  p1.dateFrom === p2.dateFrom && p1.dateTo === p2.dateTo;

export const getOffers = (type, offersList) => {
  const result = offersList.filter((offer) => offer.type === type)[0];
  if (result) {
    return result;
  }
  return null;
}

export const getDestination = (name, destinations) => {
  const result = destinations.filter((dest) => dest.name === name)[0]
  if (result) {
    return result;
  }
  return null;
}

export const getNewPoint = (offersList) => ({
  basePrice: 0,
  dateFrom: new Date(Date.now()),
  dateTo: new Date(Date.now()),
  destination: null,
  id: nanoid(),
  isFavorite: false,
  offers: getOffers('taxi', offersList),
  type: 'taxi',
});

export const GetChartData = (points, chartType) => {
  const data = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'drive': 0,
    'flight': 0,
    'check-in': 0,
    'sightseeing': 0,
    'restaurant': 0
  };
  const labels = [];
  const values = [];

  for (const point of points) {
    if (!(point.type in data)) {
      continue;
    }

    switch (chartType) {
      case ChartType.MONEY:
        data[point.type] += point.basePrice;
        break;
      case ChartType.TYPE:
        data[point.type] += 1;
        break;
      case ChartType.TIME:
        data[point.type] += getTimeIntervalMinutes(point.dateFrom, point.dateTo);
        break;
    }
  }

  const items = Object.keys(data).map((key) => [key, data[key]]);
  items.sort((e1, e2) => e2[1] - e1[1]);
  const sortedData = {};
  items.forEach((e) => { sortedData[e[0]] = e[0]; });

  for (const key in sortedData) {
    labels.push(key.toUpperCase());
    values.push(data[key]);
  }

  return {
    labels,
    values
  };
};
