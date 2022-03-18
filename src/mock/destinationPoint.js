import { getRandomInteger, getRandomElement, generateTime } from '../utils.js';

const generatePrice = () => getRandomInteger(2, 60) * 10;

const generateDescription = () => {
  const sentences = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];

  const sentCount = getRandomInteger(1, 5);
  let result = '';
  for (let i = 0; i < sentCount; i++) {
    const sent = getRandomElement(sentences);
    sentences.splice(sentences.indexOf(sent), 1);
    result += sent + ((i !== sentCount - 1) ? ' ' : '');
  }

  return result;
};

const generateCity = () => {
  const cities = [
    'Geneva',
    'Amsterdam',
    'Chamonix',
    'Moscow',
    'Yekaterinburg',
    'Saint Petersburg',
    'Novosibirsk',
    'Kazan',
    'Nizhny Novgorod',
    'Chelyabinsk',
    'Samara',
    'Omsk'
  ];
  return getRandomElement(cities);
};

const generatePictures = () => {
  const phCount = getRandomInteger(1, 10);
  const result = [];
  for (let i = 0; i < phCount; i++) {
    result.push({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: `Picture ${i}`
    });
  }

  return result;
};

const generateDestination = () => ({
  description: generateDescription(),
  name: generateCity(),
  pictures: generatePictures()
});

const generateType = () => {
  const types = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant'
  ];
  return getRandomElement(types);
};

const generateOffers = () => {
  const result = [];
  const titles = [
    'Add luggage',
    'Order Uber',
    'Switch to comfort',
    'Rent a car',
    'Add breakfast',
    'Book tickets',
    'Lunch in city'
  ];

  for (let i = 0; i < getRandomInteger(1, 2); i++) {
    const offers = [];

    for (let j = 0; j < getRandomInteger(0, 3); j++) {
      const nextTitle = getRandomElement(titles);
      offers.push(
        {
          id: j + 1,
          title: nextTitle,
          price: getRandomInteger(2, 30) * 10,
          isActive: Boolean(getRandomInteger(0, 1))
        });
      titles.splice(titles.indexOf(nextTitle), 1);
    }

    result.push({
      type: generateType(),
      offers
    });
  }

  return result;
};

/* eslint-disable camelcase */

export const generatePoint = () => {
  const time = generateTime();
  return {
    base_price: generatePrice(),
    date_from: time.beginDate,
    date_to: time.endDate,
    destination: generateDestination(),
    id: getRandomInteger(1, 1000),
    is_favorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffers(),
    type: generateType(),
  };
};
