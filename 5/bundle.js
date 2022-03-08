/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mock/destinationPoint.js":
/*!**************************************!*\
  !*** ./src/mock/destinationPoint.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateDestPoint": () => (/* binding */ generateDestPoint)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const generatePointType = () => {
  const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomElement)(types);
};

const generateCity = () => {
  const cities = ['Geneva', 'Amsterdam', 'Chamonix', 'Moscow', 'Yekaterinburg', 'Saint Petersburg', 'Novosibirsk', 'Kazan', 'Nizhny Novgorod', 'Chelyabinsk', 'Samara', 'Omsk'];
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomElement)(cities);
};

const generatePrice = () => (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(2, 60) * 10;

const generateOffers = () => {
  const offers = [];
  const titles = ['Add luggage', 'Order Uber', 'Switch to comfort', 'Rent a car', 'Add breakfast', 'Book tickets', 'Lunch in city'];

  for (let i = 0; i < (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(0, 5); i++) {
    const nextTitle = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomElement)(titles);
    offers.push({
      title: nextTitle,
      price: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(2, 30) * 10,
      isActive: Boolean((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(0, 1))
    });
    titles.splice(titles.indexOf(nextTitle), 1);
  }

  return offers;
};

const generateDescription = () => {
  const sentences = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
  const sentCount = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(1, 5);
  let result = '';

  for (let i = 0; i < sentCount; i++) {
    const sent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomElement)(sentences);
    sentences.splice(sentences.indexOf(sent), 1);
    result += sent + (i !== sentCount - 1 ? ' ' : '');
  }

  return result;
};

const generatePhotoLinks = () => {
  const phCount = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(1, 10);
  const result = [];

  for (let i = 0; i < phCount; i++) {
    result.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return result;
};

const generateDestPoint = () => ({
  type: generatePointType(),
  city: generateCity(),
  price: generatePrice(),
  offers: generateOffers(),
  description: generateDescription(),
  photoLinks: generatePhotoLinks(),
  time: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.generateTime)(),
  isFavorite: Boolean((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInteger)(0, 1))
});

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "renderTemplate": () => (/* binding */ renderTemplate)
/* harmony export */ });
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomInteger": () => (/* binding */ getRandomInteger),
/* harmony export */   "getRandomElement": () => (/* binding */ getRandomElement),
/* harmony export */   "generateTime": () => (/* binding */ generateTime),
/* harmony export */   "getDay": () => (/* binding */ getDay),
/* harmony export */   "getMonthDay": () => (/* binding */ getMonthDay),
/* harmony export */   "getDate": () => (/* binding */ getDate),
/* harmony export */   "getTime": () => (/* binding */ getTime),
/* harmony export */   "getDatetime": () => (/* binding */ getDatetime),
/* harmony export */   "getFormDate": () => (/* binding */ getFormDate),
/* harmony export */   "getMinutesInterval": () => (/* binding */ getMinutesInterval),
/* harmony export */   "sortPointsByDate": () => (/* binding */ sortPointsByDate),
/* harmony export */   "createFormOffersTemplate": () => (/* binding */ createFormOffersTemplate),
/* harmony export */   "createFormDescription": () => (/* binding */ createFormDescription)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandomElement = collection => {
  const randomIndex = getRandomInteger(0, collection.length - 1);
  return collection[randomIndex];
};
const generateTime = () => {
  let beginDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().minute(0);
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

const formatDate = (date, formatter) => dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format(formatter);

const getDay = date => formatDate(date, 'D');
const getMonthDay = date => formatDate(date, 'MMM D');
const getDate = date => formatDate(date, 'YYYY-MM-DD');
const getTime = date => formatDate(date, 'HH:mm');
const getDatetime = date => formatDate(date, 'YYYY-MM-DDTHH:mm');
const getFormDate = date => formatDate(date, 'YY/MM/DD HH:mm');

const getFormattedTime = (value, mark) => `${`0${value}`.slice(-2)}${mark} `;

const formatMinutesInterval = minutes => {
  let hours = Math.trunc(+minutes / 60);
  const days = Math.trunc(hours / 24);
  minutes = +minutes % 60;
  hours = hours % 24;
  return `${days > 0 ? getFormattedTime(days, 'D') : ''}` + `${days > 0 || hours > 0 ? getFormattedTime(hours, 'H') : ''}` + `${getFormattedTime(minutes, 'M')}`;
};

const getMinutesInterval = (beginDate, endDate) => formatMinutesInterval(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(endDate).diff(beginDate, 'm'));
const sortPointsByDate = points => points.sort((p1, p2) => p1.time.beginDate - p2.time.beginDate);

const getID = name => name.toLowerCase().replaceAll(' ', '-');

const createFormOffersTemplate = offers => {
  if (offers.length === 0) {
    return '';
  }

  const getListItemTemplate = offer => {
    const {
      title,
      price,
      isActive
    } = offer;
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

  const offersToRender = offers.map(offer => getListItemTemplate(offer)).join('\n');
  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersToRender}
    </div>
  </section>`;
};
const createFormDescription = (description, photoLinks) => {
  var _description, _photoLinks$map;

  if (!((_description = description) !== null && _description !== void 0 && _description.length) && !(photoLinks !== null && photoLinks !== void 0 && photoLinks.length)) {
    return '';
  }

  if (!description) {
    description = '';
  }

  const photosTemplate = photoLinks === null || photoLinks === void 0 ? void 0 : (_photoLinks$map = photoLinks.map(ph => `<img class="event__photo" src="${ph}" alt="Event photo">`)) === null || _photoLinks$map === void 0 ? void 0 : _photoLinks$map.join('\n');
  const photosContainer = !photosTemplate ? '' : `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosTemplate}
      </div>
    </div>`;
  return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${photosContainer}
  </section>`;
};

/***/ }),

/***/ "./src/view/destination-point-view.js":
/*!********************************************!*\
  !*** ./src/view/destination-point-view.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDestinationPointTemplate": () => (/* binding */ createDestinationPointTemplate)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createOffersTemplate = offers => {
  let offersToRender = offers.filter(offer => offer.isActive);

  if (offersToRender.length === 0) {
    return '';
  }

  const getListItemTemplate = offer => {
    const {
      title,
      price
    } = offer;
    return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
  };

  offersToRender = offersToRender.map(offer => getListItemTemplate(offer)).join('\n');
  return `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offersToRender}
    </ul>`;
};

const createDestinationPointTemplate = point => {
  const {
    type,
    city,
    price,
    offers,
    time,
    isFavorite
  } = point;
  const beginDate = time.beginDate;
  const endDate = time.endDate;
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getDate)(beginDate)}">${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getMonthDay)(beginDate)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getDatetime)(beginDate)}">${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getTime)(beginDate)}</time>
          &mdash;
          <time class="event__end-time" datetime="${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getDatetime)(endDate)}">${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getTime)(endDate)}</time>
        </p>
        <p class="event__duration">${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getMinutesInterval)(beginDate, endDate)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      ${createOffersTemplate(offers)}
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

/***/ }),

/***/ "./src/view/event-list-view.js":
/*!*************************************!*\
  !*** ./src/view/event-list-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEventListTemplate": () => (/* binding */ createEventListTemplate)
/* harmony export */ });
const createEventListTemplate = () => `<ul class="trip-events__list">
  </ul>`;

/***/ }),

/***/ "./src/view/filter-view.js":
/*!*********************************!*\
  !*** ./src/view/filter-view.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFilterTemplate": () => (/* binding */ createFilterTemplate)
/* harmony export */ });
const createFilterTemplate = () => `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

/***/ }),

/***/ "./src/view/form-create-view.js":
/*!**************************************!*\
  !*** ./src/view/form-create-view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFormCreateTemplate": () => (/* binding */ createFormCreateTemplate)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");

const createFormCreateTemplate = point => {
  const {
    type,
    city,
    price,
    offers,
    time,
    description,
    photoLinks
  } = point;
  const beginDate = time.beginDate;
  const endDate = time.endDate;
  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getFormDate)(beginDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getFormDate)(endDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">

        ${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createFormOffersTemplate)(offers)}

        ${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createFormDescription)(description, photoLinks)}
        
      </section>
    </form>
  </li>`;
};

/***/ }),

/***/ "./src/view/form-edit-view.js":
/*!************************************!*\
  !*** ./src/view/form-edit-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFormEditTemplate": () => (/* binding */ createFormEditTemplate)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");

const createFormEditTemplate = point => {
  const {
    type,
    city,
    price,
    offers,
    time,
    description
  } = point;
  const beginDate = time.beginDate;
  const endDate = time.endDate;
  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getFormDate)(beginDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getFormDate)(endDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

      ${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createFormOffersTemplate)(offers)}

      ${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createFormDescription)(description)}
        
      </section>
    </form>
  </li>`;
};

/***/ }),

/***/ "./src/view/site-menu-view.js":
/*!************************************!*\
  !*** ./src/view/site-menu-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSiteMenuTemplate": () => (/* binding */ createSiteMenuTemplate)
/* harmony export */ });
const createSiteMenuTemplate = () => ` <nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;

/***/ }),

/***/ "./src/view/sort-view.js":
/*!*******************************!*\
  !*** ./src/view/sort-view.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSortTemplate": () => (/* binding */ createSortTemplate)
/* harmony export */ });
const createSortTemplate = () => ` <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`;

/***/ }),

/***/ "./src/view/trip-info-view.js":
/*!************************************!*\
  !*** ./src/view/trip-info-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTripInfoTemplate": () => (/* binding */ createTripInfoTemplate)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const getTripInfo = points => {
  const beginDate = points[0].time.beginDate;
  const endDate = points[points.length - 1].time.endDate;
  let price = 0;
  let route = [];
  let lastCity = '';

  for (const point of points) {
    price += point.price;
    point.offers.forEach(offer => {
      if (offer.isActive) {
        price += offer.price;
      }
    });
    const newCity = point.city;

    if (newCity !== lastCity) {
      route.push(newCity);
      lastCity = newCity;
    }
  }

  route = route.join(' &mdash; ');
  return {
    price,
    beginDate,
    endDate,
    route
  };
};

const createTripInfoTemplate = points => {
  const {
    price,
    beginDate,
    endDate,
    route
  } = getTripInfo(points);
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getMonthDay)(beginDate)}&nbsp;&mdash;&nbsp;${(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getDay)(endDate)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`;
};

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _view_site_menu_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/site-menu-view.js */ "./src/view/site-menu-view.js");
/* harmony import */ var _view_filter_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/filter-view.js */ "./src/view/filter-view.js");
/* harmony import */ var _view_sort_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/sort-view.js */ "./src/view/sort-view.js");
/* harmony import */ var _view_form_create_view_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/form-create-view.js */ "./src/view/form-create-view.js");
/* harmony import */ var _view_form_edit_view_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/form-edit-view.js */ "./src/view/form-edit-view.js");
/* harmony import */ var _view_destination_point_view_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/destination-point-view.js */ "./src/view/destination-point-view.js");
/* harmony import */ var _view_event_list_view_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/event-list-view.js */ "./src/view/event-list-view.js");
/* harmony import */ var _view_trip_info_view_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view/trip-info-view.js */ "./src/view/trip-info-view.js");
/* harmony import */ var _mock_destinationPoint_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mock/destinationPoint.js */ "./src/mock/destinationPoint.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");











const POINT_COUNT = 20;
const points = (0,_utils_js__WEBPACK_IMPORTED_MODULE_10__.sortPointsByDate)(Array.from({
  length: POINT_COUNT
}, _mock_destinationPoint_js__WEBPACK_IMPORTED_MODULE_9__.generateDestPoint));
const tripMainElement = document.querySelector('.trip-main');
const siteMenuElement = tripMainElement.querySelector('.trip-controls__navigation');
const filterElement = tripMainElement.querySelector('.trip-controls__filters');
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)(tripMainElement, (0,_view_trip_info_view_js__WEBPACK_IMPORTED_MODULE_8__.createTripInfoTemplate)(points), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.AFTERBEGIN);
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)(siteMenuElement, (0,_view_site_menu_view_js__WEBPACK_IMPORTED_MODULE_1__.createSiteMenuTemplate)(), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)(filterElement, (0,_view_filter_view_js__WEBPACK_IMPORTED_MODULE_2__.createFilterTemplate)(), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
const tripEventsElement = document.querySelector('.trip-events');
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)(tripEventsElement, (0,_view_sort_view_js__WEBPACK_IMPORTED_MODULE_3__.createSortTemplate)(), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)(tripEventsElement, (0,_view_event_list_view_js__WEBPACK_IMPORTED_MODULE_7__.createEventListTemplate)(), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
const eventListElement = tripEventsElement.querySelector('.trip-events__list');
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)(eventListElement, (0,_view_form_create_view_js__WEBPACK_IMPORTED_MODULE_4__.createFormCreateTemplate)(points[0]), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)(eventListElement, (0,_view_form_edit_view_js__WEBPACK_IMPORTED_MODULE_5__.createFormEditTemplate)(points[0]), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);

for (let i = 1; i < POINT_COUNT; i++) {
  (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.renderTemplate)(eventListElement, (0,_view_destination_point_view_js__WEBPACK_IMPORTED_MODULE_6__.createDestinationPointTemplate)(points[i]), _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map