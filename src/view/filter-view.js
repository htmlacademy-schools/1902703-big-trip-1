import AbstractView from './abstract-view.js';
import { FilterType } from '../const.js';

const createFilterTemplate = (currentFilterType, futureIsDisabled, pastIsDisabled) => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${currentFilterType === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${currentFilterType === FilterType.FUTURE ? 'checked' : ''} ${futureIsDisabled ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${currentFilterType === FilterType.PAST ? 'checked' : ''} ${pastIsDisabled ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #currentFilterType = null;
  #futureIsDisabled = null;
  #pastIsDisabled = null;

  constructor(currentFilterType, futureIsDisabled, pastIsDisabled) {
    super();
    this.#currentFilterType = currentFilterType;
    this.#futureIsDisabled = futureIsDisabled;
    this.#pastIsDisabled = pastIsDisabled;
  }

  get template() {
    return createFilterTemplate(this.#currentFilterType, this.#futureIsDisabled, this.#pastIsDisabled);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
