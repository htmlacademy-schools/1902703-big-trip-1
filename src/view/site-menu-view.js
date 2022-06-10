import AbstractView from './abstract-view.js';
import { MenuItem } from '../const.js';

const createSiteMenuTemplate = (type) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn ${type === MenuItem.POINTS ? 'trip-tabs__btn--active' : ''}" href="#" type="${MenuItem.POINTS}">Table</a>
    <a class="trip-tabs__btn ${type === MenuItem.STATS ? 'trip-tabs__btn--active' : ''}" href="#" type="${MenuItem.STATS}">Stats</a>
  </nav>`
);

export default class NavigationView extends AbstractView {
  #currentMenuItemType = null;

  constructor(menuItemType) {
    super();
    this.#currentMenuItemType = menuItemType;
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
    if (evt.target.type === this.#currentMenuItemType) {
      return;
    }

    this.#currentMenuItemType = evt.target.type;
    this._callback.menuClick(evt.target.type);
  }
}
