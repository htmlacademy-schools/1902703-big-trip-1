import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import NavigationView from '../view/site-menu-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter';
import FilterPresenter from './filter-presenter';
import PointNewPresenter from './point-new-presenter';
import { RenderPosition, render, replace, remove } from '../utils/render.js';
import { filter } from '../utils/filter.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../utils/point-tools.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';

export default class TripPresenter {
  #tripMainContainer = null;
  #navigationContainer = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointListContainer = null;

  #tripInfoComponent = null;
  #navigationComponent = new NavigationView();
  #sortComponent = null;
  #eventListComponent = new EventListView();
  #emptyListComponent = null;

  #pointsModel = null;
  #filterModel = null;
  #pointPresenters = new Map();
  #pointNewPresenter = null;
  #filterPresenter = null;
  #currentSortType = SortType.DAY;

  constructor(pointsModel, filterModel) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#tripMainContainer = document.querySelector('.trip-main');
    this.#navigationContainer = this.#tripMainContainer.querySelector('.trip-controls__navigation');
    this.#filterContainer = this.#tripMainContainer.querySelector('.trip-controls__filters');
    this.#tripEventsContainer = document.querySelector('.trip-events');
  }

  get points() {
    const result = filter[this.#filterModel.filter]([...this.#pointsModel.points]);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return result.sort(sortPointsByDay);
      case SortType.TIME:
        return result.sort(sortPointsByTime);
      case SortType.PRICE:
        return result.sort(sortPointsByPrice);
    }

    return result;
  }

  init = () => {
    this.#currentSortType = SortType.DAY;
    this.#renderTrip();
  }

  createPoint = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter = new PointNewPresenter(this.#pointListContainer, this.#handleViewAction);
    this.#pointNewPresenter.init();
  }

  #handleModeChange = () => {
    this.#pointNewPresenter?.destroy();
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
        this.#currentSortType = SortType.DAY;
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
    this.#tripInfoComponent = new TripInfoView([...this.#pointsModel.points]);

    if (oldTripComponent) {
      replace(this.#tripInfoComponent, oldTripComponent);
    }
    else {
      render(this.#tripMainContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
    }

    if (this.#pointsModel.points.length === 0) {
      remove(this.#tripInfoComponent);
    }
  }

  #renderNavigation = () => {
    render(this.#navigationContainer, this.#navigationComponent, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    const oldSortComponent = this.#sortComponent;
    this.#sortComponent = new SortView(this.#currentSortType);

    if (oldSortComponent) {
      replace(this.#sortComponent, oldSortComponent);
    }
    else {
      render(this.#tripEventsContainer, this.#sortComponent, RenderPosition.BEFOREEND);
    }

    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderPointList = () => {
    render(this.#tripEventsContainer, this.#eventListComponent, RenderPosition.BEFOREEND);
  }

  #renderEmpty = (filterType) => {
    let message = 'Click New Event to create your first point';

    if (this.#pointsModel.points?.length !== 0) {
      switch (filterType) {
        case FilterType.FUTURE:
          message = 'There are no future events now';
          break;
        case FilterType.PAST:
          message = 'There are no past events now';
          break;
      }
    }

    const oldEmptyListComponent = this.#emptyListComponent;
    this.#emptyListComponent = new EmptyListView(message);

    if (oldEmptyListComponent) {
      replace(this.#emptyListComponent, oldEmptyListComponent);
    }
    else {
      render(this.#tripEventsContainer, this.#emptyListComponent, RenderPosition.BEFOREEND);
    }
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListContainer, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    if (this.points?.length === 0) {
      if (this.#pointsModel.points?.length === 0) {
        remove(this.#sortComponent);
        remove(this.#eventListComponent);
      }

      this.#renderEmpty(this.#filterModel.filter);
      return;
    }

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  }

  #clearPointList = () => {
    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
      this.#emptyListComponent = null;
    }

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderTrip = () => {
    this.#renderTripInfo();
    this.#renderNavigation();

    this.#filterPresenter = new FilterPresenter(this.#filterContainer, this.#filterModel, this.#pointsModel);
    this.#filterPresenter.init();

    this.#renderSort();
    this.#renderPointList();
    this.#pointListContainer = this.#tripEventsContainer.querySelector('.trip-events__list');

    this.#renderPoints();
  }

  #clearTrip = () => {
    this.#pointNewPresenter?.destroy();
    this.#clearPointList();
    this.#filterPresenter.destroy();

    remove(this.#tripInfoComponent);
    this.#tripInfoComponent = null;

    remove(this.#sortComponent);
    this.#sortComponent = null;

    remove(this.#navigationComponent);
    remove(this.#eventListComponent);
  }

  #reRenderPoints = () => {
    this.#clearPointList();
    this.#renderPoints();
  }

  #reRenderTrip = () => {
    this.#clearTrip();
    this.#renderTrip();
  }
}
