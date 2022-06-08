import FormCreateView from '../view/form-create-view';
import { remove, render, RenderPosition } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class PointNewPresenter {
  isActive = false;
  #pointListContainer = null;
  #changeData = null;
  #formCreateComponent = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#formCreateComponent !== null) {
      return;
    }

    this.#formCreateComponent = new FormCreateView();
    this.#formCreateComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formCreateComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointListContainer, this.#formCreateComponent, RenderPosition.AFTERBEGIN);
    this.isActive = true;

    document.addEventListener('keydown', this.#escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').setAttribute('disabled', 'disabled');
  }

  destroy = () => {
    if (this.#formCreateComponent === null) {
      return;
    }

    remove(this.#formCreateComponent);
    this.#formCreateComponent = null;
    this.isActive = false;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').removeAttribute('disabled');
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
