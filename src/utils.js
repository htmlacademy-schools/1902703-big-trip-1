import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (collection) => {
  const randomIndex = getRandomInteger(0, collection.length - 1);
  return collection[randomIndex];
};

export const generateTime = () => {
  let beginDate = dayjs().minute(0);
  const gap = 1000;
  const getBeginDateMinutes = getRandomInteger(-gap, gap) * 10;
  const getMinutesGap = getRandomInteger(3, 200) * 10;

  beginDate = beginDate.add(getBeginDateMinutes, 'm');
  const endDate = beginDate.add(getMinutesGap, 'm').toDate();
  beginDate = beginDate.toDate();

  return {
    beginDate,
    endDate
  };
};

const formatDate = (date, formatter) =>
  dayjs(date).format(formatter);

export const getDay = (date) => formatDate(date, 'MMM D');
export const getDate = (date) => formatDate(date, 'YYYY-MM-DD');
export const getTime = (date) => formatDate(date, 'HH:mm');
export const getDatetime = (date) => formatDate(date, 'YYYY-MM-DDTHH:mm');
export const getFormDate = (date) => formatDate(date, 'YY/MM/DD HH:mm');

const getFormattedTime = (value, mark) =>
  `${(`0${value}`).slice(-2)}${mark} `;

const formatMinutesInterval = (minutes) => {
  let hours = Math.trunc(+minutes / 60);
  const days = Math.trunc(hours / 24);
  minutes = +minutes % 60;
  hours = hours % 24;

  return `${days > 0 ? getFormattedTime(days, 'D') : ''}`
    + `${days > 0 || hours > 0 ? getFormattedTime(hours, 'H') : ''}`
    + `${getFormattedTime(minutes, 'M')}`;
};

export const getMinutesInterval = (beginDate, endDate) =>
  formatMinutesInterval(dayjs(endDate).diff(beginDate, 'm'));

export const sortPointsByDate = (points) =>
  points.sort((p1, p2) => p1.time.beginDate - p2.time.beginDate);

const getID = (name) =>
  name.toLowerCase().replaceAll(' ', '-');

export const createFormOffersTemplate = (offers) => {
  if (offers.length === 0) { return ''; }

  const getListItemTemplate = (offer) => {
    const { title, price, isActive } = offer;
    const id = getID(title);

    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${isActive ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${id}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
  };

  const offersToRender = offers.map((offer) => getListItemTemplate(offer)).join('\n');

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersToRender}
    </div>
  </section>`;
};

export const createFormDescription = (description, photos = undefined) => {
  if (description.length === 0) { return; }

  const photosTemplate = photos
    ?.map((ph) => `<img class="event__photo" src="${ph}" alt="Event photo">`)
    ?.join('\n');

  const photosContainer = photosTemplate === undefined
    ? ''
    : `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosTemplate}
      </div>
    </div>` ;

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${photosContainer}
  </section>`;
};
