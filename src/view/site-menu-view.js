import AbstractView from './abstract-view.js';
import { MenuItem } from '../const.js';

const createSiteMenuTemplate = (type) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn ${type === MenuItem.POINTS ? 'trip-tabs__btn--active' : ''}" href="#" type="${MenuItem.POINTS}">Table</a>
    <a class="trip-tabs__btn trip-tabs__btn-stats ${type === MenuItem.STATS ? 'trip-tabs__btn--active' : ''}" href="#" type="${MenuItem.STATS}" disabled>Stats</a>
  </nav>`
);

export default class NavigationView extends AbstractView {
  #currentMenuItemType = null;
  #isLoading = true;

  constructor(menuItemType, isLoading) {
    super();
    this.#currentMenuItemType = menuItemType;
    this.#isLoading = isLoading;
  }

  get template() {
    return createSiteMenuTemplate(this.#currentMenuItemType);
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.type === this.#currentMenuItemType || this.#isLoading) {
      return;
    }

    this.#currentMenuItemType = evt.target.type;
    this._callback.menuClick(evt.target.type);
  }
}
