import { getRandomInteger, getRandomElement, generateTime } from '../utils.js';

const generatePointType = () => {
  const types = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant'
  ];
  return getRandomElement(types);
};

const generateCity = () => {
  const cities = [
    'Geneva',
    'Amsterdam',
    'Chamonix'
  ];
  return getRandomElement(cities);
};

const generatePrice = () => getRandomInteger(2, 60) * 10;

const generateOffers = () => {
  const offers = [];
  const titles = [
    'Add luggage',
    'Order Uber',
    'Switch to comfort',
    'Rent a car',
    'Add breakfast',
    'Book tickets',
    'Lunch in city'
  ];

  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    const nextTitle = getRandomElement(titles);
    offers.push(
      {
        title: nextTitle,
        price: getRandomInteger(2, 30) * 10,
        isActive: Boolean(getRandomInteger(0, 1))
      });
    titles.splice(titles.indexOf(nextTitle), 1);
  }

  return offers;
};

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

const generatePhotoLinks = () => {
  const phCount = getRandomInteger(1, 10);
  const result = [];
  for (let i = 0; i < phCount; i++) {
    result.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return result;
};

export const generateDestPoint = () => ({
  type: generatePointType(),
  city: generateCity(),
  price: generatePrice(),
  offers: generateOffers(),
  description: generateDescription(),
  photos: generatePhotoLinks(),
  time: generateTime(),
  isFavorite: Boolean(getRandomInteger(0, 1))
});
