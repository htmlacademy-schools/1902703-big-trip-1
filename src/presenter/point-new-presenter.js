import FormCreateView from '../view/form-create-view';
import { remove, render, RenderPosition } from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class PointNewPresenter {
  #isFirstPoint = false;
  #pointListContainer = null;
  #changeData = null;
  #formCreateComponent = null;
  #pointsModel = null;

  constructor(pointListContainer, changeData, isFirstPoint, pointsModel) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#isFirstPoint = isFirstPoint;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    if (this.#formCreateComponent !== null) {
      return;
    }

    this.#formCreateComponent = new FormCreateView(this.#pointsModel._destinations, this.#pointsModel._offers);
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

  setSaving = () => {
    this.#formCreateComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#formCreateComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
      document.addEventListener('keydown', this.#escKeyDownHandler);
    };

    this.#formCreateComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      this.#isFirstPoint
        ? UpdateType.MAJOR
        : UpdateType.MINOR,
      point,
    );
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
