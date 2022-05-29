import dayjs from 'dayjs';
import { getRandomInteger } from './common.js';

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
export const getDayMonth = (date) => formatDate(date, 'D MMM');
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

export const getTimeInterval = (beginDate, endDate) =>
  formatMinutesInterval(dayjs(endDate).diff(beginDate, 'm'));
