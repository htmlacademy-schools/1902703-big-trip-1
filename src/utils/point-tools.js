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
