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

export const getDay = (date) => formatDate(date, 'D');
export const getMonthDay = (date) => formatDate(date, 'MMM D');
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
  points.sort((p1, p2) => p1.dateFrom - p2.dateFrom);

export const createFormOffersTemplate = (offerArray) => {
  const getOffersTemplate = (type, offers) => {
    if (offers.length === 0) { return ''; }

    const getListItemTemplate = (offer) => {
      const { id, title, price, isActive } = offer;

      return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${isActive ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${type}-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`;
    };

    return offers.map((offer) => getListItemTemplate(offer)).join('\n');
  };

  const offersToRender = offerArray
    .map((offerStruct) => getOffersTemplate(offerStruct.type, offerStruct.offers))
    .join('\n');

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersToRender}
    </div>
  </section>`;
};

export const createFormDescription = (description, pictures) => {
  if (!description?.length && !pictures?.length) { return ''; }

  if (!description) { description = ''; }

  const picturesTemplate = pictures
    ?.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`)
    ?.join('\n');

  const picturesContainer = !picturesTemplate
    ? ''
    : `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${picturesTemplate}
      </div>
    </div>` ;

  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${picturesContainer}
  </section>`;
};
