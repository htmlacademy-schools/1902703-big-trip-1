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

export const generateTime = (lastPointTime) => {
  let beginDate = lastPointTime?.endDate || dayjs().minute(0);
  const getBeginDateMinutes = () => getRandomInteger(6, 1000) * 10;
  const getMinutesGap = () => getRandomInteger(3, 18) * 10;

  beginDate = beginDate.add(getBeginDateMinutes(), 'm');
  const endDate = beginDate.add(getMinutesGap(), 'm').toDate();
  beginDate = beginDate.toDate();

  return {
    beginDate,
    endDate
  };
};

export const getDateMD = (date) => dayjs(date).format('MMM D');
export const getDateYMD = (date) => dayjs(date).format('YYYY-MM-DD');
export const getDateHm = (date) => dayjs(date).format('HH:mm');
export const getDateYMDHm = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
export const getFormEditDate = (date) => dayjs(date).format('YY/MM/DD HH:mm');

const formatMinutesInterval = (minutes) => {
  const hours = Math.trunc(+minutes / 60);
  const trueMinutes = +minutes % 60;
  return `${hours > 0 ? `${(`0${hours}`).slice(-2)}H ` : ''}${trueMinutes !== 0 ? `${(`0${trueMinutes}`).slice(-2)}M ` : ''}`;
};

export const getTimeIntervalMinutes = (beginDate, endDate) =>
  formatMinutesInterval(dayjs(endDate).diff(dayjs(beginDate), 'm'));

export const sortPoints = (points) =>
  points.sort((p1, p2) => p1.time.beginDate - p2.time.beginDate);

export const getCheckBoxID = (name) =>
  name.toLowerCase().replaceAll(' ', '-');
