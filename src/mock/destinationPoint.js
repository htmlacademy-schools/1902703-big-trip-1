import { nanoid } from 'nanoid';
import { getRandomInteger, getRandomElement } from '../utils/common.js';
import { generateTime } from '../utils/date-time.js';

const generatePrice = () => getRandomInteger(2, 60) * 10;

export const generateDescription = () => {
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

  const sentCount = getRandomInteger(0, 5);
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

export const generatePictures = () => {
  const phCount = getRandomInteger(1, 10);
  const result = [];
  for (let i = 0; i < phCount; i++) {
    result.push({
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: `Picture ${i}.`
    });
  }

  return result;
};

const generateDestination = () => ({
  description: generateDescription(),
  name: generateCity(),
  pictures: generatePictures()
});

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

const generateType = () => getRandomElement(types);

export const generateOffers = (type) => {
  const offers = [];
  const servOffers = JSON.parse('[\n    {\n      \"type\": \"taxi\",\n      \"offers\": [\n        {\n          \"id\": 1,\n          \"title\": \"Upgrade to a business class\",\n          \"price\": 190\n        },\n        {\n          \"id\": 2,\n          \"title\": \"Choose the radio station\",\n          \"price\": 30\n        },\n        {\n          \"id\": 3,\n          \"title\": \"Choose temperature\",\n          \"price\": 170\n        },\n        {\n          \"id\": 4,\n          \"title\": \"Drive quickly, I\'m in a hurry\",\n          \"price\": 100\n        },\n        {\n          \"id\": 5,\n          \"title\": \"Drive slowly\",\n          \"price\": 110\n        }\n      ]\n    },\n    {\n      \"type\": \"bus\",\n      \"offers\": [\n        {\n          \"id\": 1,\n          \"title\": \"Infotainment system\",\n          \"price\": 50\n        },\n        {\n          \"id\": 2,\n          \"title\": \"Order meal\",\n          \"price\": 100\n        },\n        {\n          \"id\": 3,\n          \"title\": \"Choose seats\",\n          \"price\": 190\n        }\n      ]\n    },\n    {\n      \"type\": \"train\",\n      \"offers\": [\n        {\n          \"id\": 2,\n          \"title\": \"Order a breakfast\",\n          \"price\": 80\n        },\n        {\n          \"id\": 3,\n          \"title\": \"Wake up at a certain time\",\n          \"price\": 140\n        }\n      ]\n    },\n    {\n      \"type\": \"flight\",\n      \"offers\": [\n        {\n          \"id\": 1,\n          \"title\": \"Choose meal\",\n          \"price\": 120\n        },\n        {\n          \"id\": 2,\n          \"title\": \"Choose seats\",\n          \"price\": 90\n        },\n        {\n          \"id\": 3,\n          \"title\": \"Upgrade to comfort class\",\n          \"price\": 120\n        },\n        {\n          \"id\": 4,\n          \"title\": \"Upgrade to business class\",\n          \"price\": 120\n        },\n        {\n          \"id\": 5,\n          \"title\": \"Add luggage\",\n          \"price\": 170\n        },\n        {\n          \"id\": 6,\n          \"title\": \"Business lounge\",\n          \"price\": 160\n        }\n      ]\n    },\n    {\n      \"type\": \"check-in\",\n      \"offers\": [\n        {\n          \"id\": 1,\n          \"title\": \"Choose the time of check-in\",\n          \"price\": 70\n        },\n        {\n          \"id\": 2,\n          \"title\": \"Choose the time of check-out\",\n          \"price\": 190\n        },\n        {\n          \"id\": 3,\n          \"title\": \"Add breakfast\",\n          \"price\": 110\n        },\n        {\n          \"id\": 4,\n          \"title\": \"Laundry\",\n          \"price\": 140\n        },\n        {\n          \"id\": 5,\n          \"title\": \"Order a meal from the restaurant\",\n          \"price\": 30\n        }\n      ]\n    },\n    {\n      \"type\": \"sightseeing\",\n      \"offers\": []\n    },\n    {\n      \"type\": \"ship\",\n      \"offers\": [\n        {\n          \"id\": 1,\n          \"title\": \"Choose meal\",\n          \"price\": 130\n        },\n        {\n          \"id\": 2,\n          \"title\": \"Choose seats\",\n          \"price\": 160\n        },\n        {\n          \"id\": 3,\n          \"title\": \"Upgrade to comfort class\",\n          \"price\": 170\n        },\n        {\n          \"id\": 4,\n          \"title\": \"Upgrade to business class\",\n          \"price\": 150\n        },\n        {\n          \"id\": 5,\n          \"title\": \"Add luggage\",\n          \"price\": 100\n        },\n        {\n          \"id\": 6,\n          \"title\": \"Business lounge\",\n          \"price\": 40\n        }\n      ]\n    },\n    {\n      \"type\": \"drive\",\n      \"offers\": [\n        {\n          \"id\": 1,\n          \"title\": \"With automatic transmission\",\n          \"price\": 110\n        },\n        {\n          \"id\": 2,\n          \"title\": \"With air conditioning\",\n          \"price\": 180\n        }\n      ]\n    },\n    {\n      \"type\": \"restaurant\",\n      \"offers\": [\n        {\n          \"id\": 1,\n          \"title\": \"Choose live music\",\n          \"price\": 150\n        },\n        {\n          \"id\": 2,\n          \"title\": \"Choose VIP area\",\n          \"price\": 70\n        }\n      ]\n    }\n  ]');
  const typeOffers = servOffers.filter((offerStruct) => offerStruct.type === type)[0];
  const len = getRandomInteger(0, typeOffers.offers.length);

  for (let _ = 0; _ < len; _++) {
    const next = getRandomElement(typeOffers.offers);
    if (next) {
      offers.push(next);
    }
  }

  return {
    type: typeOffers.type,
    offers
  };
};

/* eslint-disable camelcase */

export const generatePoint = () => {
  const time = generateTime();
  const type = generateType();
  return {
    base_price: generatePrice(),
    date_from: time.beginDate,
    date_to: time.endDate,
    destination: generateDestination(),
    id: nanoid(),
    is_favorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffers(type),
    type,
  };
};
