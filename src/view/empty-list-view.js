import AbstractView from './abstract-view.js';

const createEmptyListTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class EmptyListView extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmptyListTemplate(this.#message);
  }
}
