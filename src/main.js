import EmptyListView from './view/empty-list-view.js';
import EventListView from './view/event-list-view.js';
import FilterView from './view/filter-view.js';
import FormCreateView from './view/form-create-view.js';
import FormEditView from './view/form-edit-view.js';
import PointView from './view/point-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SortView from './view/sort-view.js';
import TripInfoView from './view/trip-info-view.js';
import { RenderPosition, render } from './utils/render.js';
import { generatePoint } from './mock/destinationPoint.js';
import { sortPointsByDate } from './utils/point-tools.js';
import { convertPoint } from './utils/converter.js';

const POINT_COUNT = 20;
const points = sortPointsByDate(Array.from({ length: POINT_COUNT }, () => convertPoint(generatePoint())));

const tripMainElement = document.querySelector('.trip-main');
const siteMenuElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(tripMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);
render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filterElement, new FilterView(), RenderPosition.BEFOREEND);

if (points?.length > 0) {
  render(tripEventsElement, new SortView(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new EventListView(), RenderPosition.BEFOREEND);
}
else {
  const message = 'Click New Event to create your first point';
  render(tripEventsElement, new EmptyListView(message), RenderPosition.BEFOREEND);
}

const eventListElement = tripEventsElement.querySelector('.trip-events__list');

if (points?.length > 0) { render(eventListElement, new FormCreateView(points[0]), RenderPosition.BEFOREEND); }

const renderPoint = (listElement, point) => {
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

  render(listElement, pointComponent.element, RenderPosition.BEFOREEND);
};

for (let i = 0; i < POINT_COUNT; i++) {
  renderPoint(eventListElement, points[i]);
}
