import { renderTemplate, RenderPosition } from './render.js';
import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createFilterTemplate } from './view/filter-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFormCreateTemplate } from './view/form-create-view.js';
import { createFormEditTemplate } from './view/form-edit-view.js';
import { createDestinationPointTemplate } from './view/destination-point-view.js';
import { createEventListTemplate } from './view/event-list-view.js';

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const filterElement = document.querySelector('.trip-controls__filters');

renderTemplate(siteMenuElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filterElement, createFilterTemplate(), RenderPosition.BEFOREEND);

const tripEventstElement = document.querySelector('.trip-events');

renderTemplate(tripEventstElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventstElement, createEventListTemplate(), RenderPosition.BEFOREEND);

const eventListElement = tripEventstElement.querySelector('.trip-events__list');

renderTemplate(eventListElement, createFormCreateTemplate(), RenderPosition.BEFOREEND);
renderTemplate(eventListElement, createFormEditTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < 3; i++)
    renderTemplate(eventListElement, createDestinationPointTemplate(), RenderPosition.BEFOREEND);
