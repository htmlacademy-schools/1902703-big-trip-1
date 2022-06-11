import FormCreateView from '../view/form-create-view';
import { remove, render, RenderPosition } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class PointNewPresenter {
  #isFirstPoint = false;
  #pointListContainer = null;
  #changeData = null;
  #formCreateComponent = null;

  constructor(pointListContainer, changeData, isFirstPoint) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#isFirstPoint = isFirstPoint;
  }

  init = () => {
    if (this.#formCreateComponent !== null) {
      return;
    }

    this.#formCreateComponent = new FormCreateView();
    this.#formCreateComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formCreateComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointListContainer, this.#formCreateComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = true;
  }

  destroy = () => {
    if (this.#formCreateComponent === null) {
      return;
    }

    remove(this.#formCreateComponent);
    this.#formCreateComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      this.#isFirstPoint
        ? UpdateType.MAJOR
        : UpdateType.MINOR,
      point,
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.#changeData(
      UserAction.UPDATE_VIEW,
      this.#isFirstPoint
        ? UpdateType.MAJOR
        : null,
      null,
    );
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
