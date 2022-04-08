import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import FilterView from '../view/filter-view.js';
import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import SiteMenuView from '../view/site-menu-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition, render } from '../utils/render.js';

export default class TripPresenter {
  #tripMainElement = null;
  #navigationElement = null;
  #filterElement = null;
  #tripEventsElement = null;
  #eventListElement = null;

  #points = [];

  constructor() {
    this.#tripMainElement = document.querySelector('.trip-main');
    this.#navigationElement = this.#tripMainElement.querySelector('.trip-controls__navigation');
    this.#filterElement = this.#tripMainElement.querySelector('.trip-controls__filters');
    this.#tripEventsElement = document.querySelector('.trip-events');
  }

  init = (points) => {
    this.#points = [...points];

    render(this.#tripMainElement, new TripInfoView(this.#points), RenderPosition.AFTERBEGIN);
    this.#renderTrip();
  }

  #renderNavigation = () => {
    render(this.#navigationElement, new SiteMenuView(), RenderPosition.BEFOREEND);
  }

  #renderFilters = () => {
    render(this.#filterElement, new FilterView(), RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    render(this.#tripEventsElement, new SortView(), RenderPosition.BEFOREEND);
  }

  #renderEventList = () => {
    render(this.#tripEventsElement, new EventListView(), RenderPosition.BEFOREEND);
  }

  #renderFormCreate = () => {
    render(this.#eventListElement, new FormCreateView(this.#points[0]), RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (listElement, point) => {
    const pointComponent = new PointView(point);
    const formEditComponent = new FormEditView(point);

    const replacePointToForm = () => {
      listElement.replaceChild(formEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      listElement.replaceChild(pointComponent.element, formEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    formEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    formEditComponent.setClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(listElement, pointComponent, RenderPosition.BEFOREEND);
  }

  #renderPoints = () => {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#eventListElement, this.#points[i]);
    }
  }

  #renderEmpty = () => {
    const message = 'Click New Event to create your first point';
    render(this.#tripEventsElement, new EmptyListView(message), RenderPosition.BEFOREEND);
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
    this.#renderFormCreate();
    this.#renderPoints();
  }
}
