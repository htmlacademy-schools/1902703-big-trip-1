import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import FilterView from '../view/filter-view.js';
import FormCreateView from '../view/form-create-view.js';
import NavigationView from '../view/site-menu-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter';
import { RenderPosition, render, replace, remove } from '../utils/render.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../utils/point-tools.js';
import { SortType, UpdateType, UserAction } from '../const.js';

export default class TripPresenter {
  #tripMainElement = null;
  #navigationElement = null;
  #filterElement = null;
  #tripEventsElement = null;
  #eventListElement = null;

  #tripInfoComponent = null;
  #navigationComponent = new NavigationView();
  #filterConponent = new FilterView();
  #sortComponent = null;
  #eventListComponent = new EventListView();

  #pointsModel = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);

    this.#tripMainElement = document.querySelector('.trip-main');
    this.#navigationElement = this.#tripMainElement.querySelector('.trip-controls__navigation');
    this.#filterElement = this.#tripMainElement.querySelector('.trip-controls__filters');
    this.#tripEventsElement = document.querySelector('.trip-events');
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortPointsByDay);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointsByTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointsByPrice);
    }

    return this.#pointsModel.points;
  }

  init = () => {
    this.#currentSortType = SortType.DAY;
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#reRenderPoints();
        break;
      case UpdateType.MAJOR:
        this.#reRenderTrip();
        break;
    }

    this.#renderTripInfo();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#reRenderPoints();
  }

  #renderTripInfo = () => {
    const oldTripComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView([...this.points]);

    if (oldTripComponent) {
      replace(this.#tripInfoComponent, oldTripComponent);
    }
    else {
      render(this.#tripMainElement, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
    }

    if (this.points.length === 0) {
      remove(this.#tripInfoComponent);
    }
  }

  #renderNavigation = () => {
    render(this.#navigationElement, this.#navigationComponent, RenderPosition.BEFOREEND);
  }

  #renderFilters = () => {
    render(this.#filterElement, this.#filterConponent, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    const oldSortComponent = this.#sortComponent;
    this.#sortComponent = new SortView(this.#currentSortType);

    if (oldSortComponent) {
      replace(this.#sortComponent, oldSortComponent);
    }
    else {
      render(this.#tripEventsElement, this.#sortComponent, RenderPosition.BEFOREEND);
    }

    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderEventList = () => {
    render(this.#tripEventsElement, this.#eventListComponent, RenderPosition.BEFOREEND);
  }

  #renderFormCreate = () => {
    render(this.#eventListElement, new FormCreateView(this.points[0]), RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListElement, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPointList = () => {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  }

  #clearPointList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderEmpty = () => {
    const message = 'Click New Event to create your first point';
    render(this.#tripEventsElement, new EmptyListView(message), RenderPosition.BEFOREEND);
  }

  #renderTrip = () => {
    this.#renderTripInfo();
    this.#renderNavigation();
    this.#renderFilters();

    if (this.points?.length > 0) {
      this.#renderSort();
      this.#renderEventList();
    }
    else {
      this.#renderEmpty();
      return;
    }

    this.#eventListElement = this.#tripEventsElement.querySelector('.trip-events__list');
    // this.#renderFormCreate();
    this.#renderPointList();
  }

  #clearTrip = (resetSortType = false) => {
    // доработать
    this.#clearPointList();

    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;

    remove(this.#sortComponent);
    this.#sortComponent = null;

    remove(this.#navigationComponent);
    remove(this.#filterConponent);
    remove(this.#eventListComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #reRenderPoints = () => {
    this.#clearPointList();
    this.#renderPointList();
  }

  #reRenderTrip = () => {
    this.#clearTrip();
    this.#renderTrip();
  }
}
