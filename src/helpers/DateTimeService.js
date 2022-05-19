import React from 'react';

export const getDateTimePattern = (mode, locale) => {
  let options;
  if (mode === 'date') {
    // expected style = year: 2010, month: 12, day: 31, hour: 12, minute, second
    options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    // formatToParts() returns array of object breaking down the locales dateformat
    // [
    //  {type: "month", value: "03"},
    //  {type: "literal", value: "/"},
    //  {type: "day", value: "30"},
    //  {type: "literal", value: "/"},
    //  {type: "year", value: "2021"},
    // ]
  } else if (mode === 'time') {
    // expected style = hour: 12, minute: 30, second: 25
    options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    // formatToParts() returns array of object breaking down the locales dateformat
    // [
    //  {type: "month", value: "03"},
    //  {type: "literal", value: "/"},
    //  {type: "day", value: "30"},
    //  {type: "literal", value: "/"},
    //  {type: "year", value: "2021"},
    // ]
  } else {
    // expected style = year: 2010, month: 12, day: 31, hour: 12, minute: 30, second: 25
    options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    // formatToParts() returns array of object breaking down the locales dateformat
    // [
    //  {type: "month", value: "03"},
    //  {type: "literal", value: "/"},
    //  {type: "day", value: "30"},
    //  {type: "literal", value: "/"},
    //  {type: "year", value: "2021"},
    // ]
  }

  const formatter = new Intl.DateTimeFormat(locale, options).formatToParts();
  if (mode === 'date') {
    return formatter
      .map(function (e) {
        switch (e.type) {
          case 'month':
            return 'MM';
            break;
          case 'day':
            return 'DD';
            break;
          case 'year':
            return 'YYYY';
            break;
          default:
            return e.value;
        }
      })
      .join('');
  } else if (mode === 'time') {
    return formatter
      .map(function (e) {
        switch (e.type) {
          case 'hour':
            return 'HH';
            break;
          case 'minute':
            return 'mm';
            break;
          case 'second':
            return 'ss';
            break;
          default:
            return e.value;
        }
      })
      .join('');
  } else {
    return formatter
      .map(function (e) {
        switch (e.type) {
          case 'month':
            return 'MM';
            break;
          case 'day':
            return 'DD';
            break;
          case 'year':
            return 'YYYY';
            break;
          case 'hour':
            return 'HH';
            break;
          case 'minute':
            return 'mm';
            break;
          case 'second':
            return 'ss';
            break;
          default:
            return e.value;
        }
      })
      .join('');
  }
};
