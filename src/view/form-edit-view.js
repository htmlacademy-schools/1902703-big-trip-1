import { createFormOffersTemplate, createFormDescription } from '../utils/point-tools.js';
import { getFormDate } from '../utils/date-time.js';
import { generatePictures, generateDescription } from '../mock/destinationPoint';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createFormEditTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, id, offers, type } = point;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${getFormDate(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${getFormDate(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

      ${createFormOffersTemplate(offers, type)}

      ${createFormDescription(destination.description)}
        
      </section>
    </form>
  </li>`;
};

export default class FormEditView extends SmartView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point) {
    super();
    this._point = point;

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createFormEditTemplate(this._point);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setFormCloseHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  reset = (point) => {
    this.updateData(point);
  }

  restoreHandlers = () => {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('input', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeCityHandler);

    const offers = this.element.querySelector('.event__available-offers');
    if (offers) {
      offers.addEventListener('input', this.#changeOptionsHandler);
    }
  }

  /* eslint-disable camelcase */

  #setDatepicker = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector(`#event-start-time-${this._point.id}`),
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'j/m/y H:i',
        defaultDate: this._point.dateFrom,
        onChange: this.#dateFromChangeHandler
      },
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector(`#event-end-time-${this._point.id}`),
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'j/m/y H:i',
        minDate: this._point.dateFrom,
        defaultDate: this._point.dateTo,
        onChange: this.#dateToChangeHandler
      },
    );
  }

  /* eslint-enable camelcase */

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });

    if (userDate > this._point.dateTo) {
      this.updateData({
        dateTo: userDate,
      });
    }
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this._point);
  }

  #changeTypeHandler = (evt) => {
    evt.preventDefault();

    const type = evt.target.value;
    const offers = [...this._point.offers];

    for (const offerStruct of offers) {
      if (offerStruct.type !== type) {
        continue;
      }

      offerStruct.offers.forEach((offer) => {
        offer.isActive = false;
      });

      break;
    }

    this.updateData({ type, offers });
  }

  #changeCityHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      destination:
      {
        name: evt.target.value,
        description: generateDescription(),
        pictures: generatePictures()
      }
    });
  }

  #changeOptionsHandler = (evt) => {
    evt.preventDefault();
    const splited = evt.target.id.split('-');
    const index = +splited[splited.length - 1] - 1;
    const offers = JSON.parse(JSON.stringify(this._point.offers));

    for (const offerStruct of offers) {
      if (offerStruct.type !== this._point.type) { continue; }

      const e = offerStruct.offers[index];
      e.isActive = !e.isActive;
      break;
    }

    this.updateData({ offers });
  }
}
