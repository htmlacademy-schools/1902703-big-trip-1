import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import { RenderPosition, render, replace } from '../utils/render.js';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #formEditComponent = null;

  #point = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  init = (point) => {
    this.#point = point;

    this.#pointComponent = new PointView(point);
    this.#formEditComponent = new FormEditView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#formEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formEditComponent.setFormCloseHandler(this.#handleFormClose);

    render(this.#pointListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
  }

  #replacePointToForm = () => {
    replace(this.#formEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  }

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  }

  #handleFormClose = () => {
    this.#replaceFormToPoint();
  }
}
