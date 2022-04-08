import { getMonthDay, getDate, getTime, getDatetime, getMinutesInterval } from '../utils/date-time.js';
import AbstractView from './abstract-view.js';

const createOffersTemplate = (offerArray) => {
  const getOffersTemplate = (offers) => {
    const offersToRender = offers.filter((offer) => offer.isActive);
    if (offersToRender.length === 0) { return ''; }

    const getListItemTemplate = (offer) => {
      const { title, price } = offer;
      return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
    };

    return offersToRender.map((offer) => getListItemTemplate(offer)).join('\n');
  };

  const offersTemplate = offerArray
    .map((offerStruct) => getOffersTemplate(offerStruct.offers))
    .join('\n');

  return `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offersTemplate}
    </ul>`;
};

const createDestinationPointTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, offers, type } = point;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${getDate(dateFrom)}">${getMonthDay(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getDatetime(dateFrom)}">${getTime(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDatetime(dateTo)}">${getTime(dateTo)}</time>
        </p>
        <p class="event__duration">${getMinutesInterval(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      ${createOffersTemplate(offers)}
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class PointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createDestinationPointTemplate(this.#point);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  setEditClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  }
}
