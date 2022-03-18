import { createElement } from '../render.js';

const createEmptyListTemplate = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

export default class EmptyListView {
  #element = null;

  constructor(message) {
    this.message = message;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyListTemplate(this.message);
  }

  removeElement() {
    this.#element = null;
  }
}
