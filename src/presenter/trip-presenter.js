import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import FilterView from '../view/filter-view.js';
import FormCreateView from '../view/form-create-view.js';
import SiteMenuView from '../view/site-menu-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/common.js';
import { RenderPosition, render, replace } from '../utils/render.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../utils/point-tools.js';
import { SortType } from '../const.js';

export default class TripPresenter {
  #tripMainElement = null;
  #navigationElement = null;
  #filterElement = null;
  #tripEventsElement = null;
  #eventListElement = null;

  #tripInfoComponent = null;
  #siteMenuComponent = new SiteMenuView();
  #filterConponent = new FilterView();
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  #points = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor() {
    this.#tripMainElement = document.querySelector('.trip-main');
    this.#navigationElement = this.#tripMainElement.querySelector('.trip-controls__navigation');
    this.#filterElement = this.#tripMainElement.querySelector('.trip-controls__filters');
    this.#tripEventsElement = document.querySelector('.trip-events');
  }

  init = (points) => {
    this.#points = [...points];
    this.#currentSortType = SortType.DAY;
    this.#sortPoints(this.#currentSortType);
    this.#tripInfoComponent = new TripInfoView(this.#points);

    render(this.#tripMainElement, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);

    const oldTripComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView(this.#points);
    replace(this.#tripInfoComponent, oldTripComponent);

    this.#sortPoints(this.#currentSortType);
    this.#reRenderTrip();
  }

  #renderNavigation = () => {
    render(this.#navigationElement, this.#siteMenuComponent, RenderPosition.BEFOREEND);
  }

  #renderFilters = () => {
    render(this.#filterElement, this.#filterConponent, RenderPosition.BEFOREEND);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortPointsByDay);
        break;
      case SortType.TIME:
        this.#points.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPointsByPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#reRenderTrip();
  }

  #renderSort = () => {
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderEventList = () => {
    render(this.#tripEventsElement, this.#eventListComponent, RenderPosition.BEFOREEND);
  }

  #renderFormCreate = () => {
    render(this.#eventListElement, new FormCreateView(this.#points[0]), RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListElement, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderEmpty = () => {
    const message = 'Click New Event to create your first point';
    render(this.#tripEventsElement, new EmptyListView(message), RenderPosition.BEFOREEND);
  }

  #clearPointList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderTrip = () => {
    this.#renderNavigation();
    this.#renderFilters();

    if (this.#points?.length > 0) {
      this.#renderSort();
      this.#renderEventList();
    }
    else {
      this.#renderEmpty();
      return;
    }

    this.#eventListElement = this.#tripEventsElement.querySelector('.trip-events__list');
    // this.#renderFormCreate();
    this.#renderPoints();
  }

  #reRenderTrip = () => {
    this.#clearPointList();
    this.#renderPoints();
  }
}
