import * as moment from 'moment';

import {
  DEFAULT_DOUBLE_ZERO,
  MINUTES_IN_ONE_HOUR,
  ONE_HOUR,
  TWO_DIGITS,
} from './../constants/common';

export function checkTime(input: string) {
  // check regex for 12h time format
  const time12Regex = /^(0?[1-9]|1[0-2]):[0-5]\d(:[0-5]\d)? ?([AaPp][Mm])?$/;

  // check regex for 24h time format
  const time24Regex = /^(\d|0\d|1\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

  return time12Regex.test(input) || time24Regex.test(input);
}

/*
  timeUser: 05:15
  gmtOffset: +9
  return: (UTC+0) -03:45
*/
export function convertToTimeUtc(time: string, gmtOffset: number): string {
  const timeArr = time.split(':');
  let hour = parseInt(timeArr[0]) ?? 0;
  let minute = parseInt(timeArr[1]) ?? 0;

  if (gmtOffset > 0) {
    if (!minute) {
      // if minute is 00:00 (ex timeUser is: 05:00)
      hour = hour - gmtOffset;
    } else {
      if (hour < gmtOffset) {
        hour = hour - gmtOffset + ONE_HOUR;
        minute = MINUTES_IN_ONE_HOUR - minute;
      } else {
        hour = hour - gmtOffset;
      }
    }
  } else {
    hour = hour - gmtOffset;
  }

  return [hour.toString(), minute.toString(), DEFAULT_DOUBLE_ZERO].join(':');
}

/*
  timeUser: 01:38:29
  gmtOffset: +7
  return: (UTC+0) 18:38:29
*/
export function convertTimeToUTC(time: string, gmtOffset: number): string {
  const day = new Date()
    .toISOString()
    .replace(/T/, ' ') // replace T with a space
    .replace(/\..+/, '')
    .slice(0, 10); // 2022-04-03 01:01:01

  const dateTime = day.concat(' ', time.toString());
  const dateTimeUtc = moment(dateTime).subtract(gmtOffset, 'hours').toDate();

  const hours =
    dateTimeUtc.getHours() < TWO_DIGITS
      ? '0' + dateTimeUtc.getHours()
      : dateTimeUtc.getHours();

  const mintues =
    dateTimeUtc.getMinutes() < TWO_DIGITS
      ? '0' + dateTimeUtc.getMinutes()
      : dateTimeUtc.getMinutes();

  const seconds =
    dateTimeUtc.getSeconds() < TWO_DIGITS
      ? '0' + dateTimeUtc.getSeconds()
      : dateTimeUtc.getSeconds();

  return (hours + ':' + mintues + ':' + seconds).toString();
}

export function convertUnixToDate(time: number, tzOffset: number): string {
  return moment
    .unix(time / 1000)
    .subtract(tzOffset, 'milliseconds')
    .format('YYYY-MM-DD HH:mm:ss');
}
