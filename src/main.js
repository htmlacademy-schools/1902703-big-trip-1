import { renderTemplate, RenderPosition } from './render.js';
import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFormCreateTemplate } from './view/form-create-view.js';
import { createFormEditTemplate } from './view/form-edit-view.js';
import { createDestinationPointTemplate } from './view/destination-point-view.js';
import { createEventListTemplate } from './view/event-list-view.js';
import { createTripInfoTemplate } from './view/trip-info-view.js';
import { generateDestPoint } from './mock/destinationPoint.js';
import { sortPointsByDate } from './utils.js';

const POINT_COUNT = 20;
const points = sortPointsByDate(Array.from({ length: POINT_COUNT }, generateDestPoint));

const tripMainElement = document.querySelector('.trip-main');
const siteMenuElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');

renderTemplate(tripMainElement, createTripInfoTemplate(points), RenderPosition.AFTERBEGIN);
renderTemplate(siteMenuElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterElement, createFilterTemplate(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');

renderTemplate(tripEventsElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createEventListTemplate(), RenderPosition.BEFOREEND);

const eventListElement = tripEventsElement.querySelector('.trip-events__list');

renderTemplate(eventListElement, createFormCreateTemplate(points[0]), RenderPosition.BEFOREEND);
renderTemplate(eventListElement, createFormEditTemplate(points[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < POINT_COUNT; i++) {
  renderTemplate(eventListElement, createDestinationPointTemplate(points[i]), RenderPosition.BEFOREEND);
}
