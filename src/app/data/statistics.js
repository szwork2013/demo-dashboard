import moment from 'moment';

// Utils.
import { getLanguage } from '_utils';

const language = getLanguage();
let dateFormat;
if (language === 'ru') {
  dateFormat = 'DD.MM';
}
else {
  dateFormat = 'MM.DD';
}

const statistics = {
  activity: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      level: 10000,
      value: 8782,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      level: 10000,
      value: 14561,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      level: 10000,
      value: 16890,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      level: 10000,
      value: 9368,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      level: 10000,
      value: 10073,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      level: 10000,
      value: 11749,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      level: 10000,
      value: 5874,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      level: 10000,
      value: 8782,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      level: 10000,
      value: 14078,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      level: 10000,
      value: 19423,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      level: 10000,
      value: 17028,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      level: 10000,
      value: 14713,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      level: 10000,
      value: 12592,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      level: 10000,
      value: 10001,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      level: 10000,
      value: 13005,
    },
  ],
  atmosphericPressure: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: 771,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: 767,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: 775,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: 740,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 751,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 768,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 736,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 741,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 779,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: 761,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 768,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 749,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 772,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 765,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 747,
    },
  ],
  bloodPressure: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      diastolic: 86,
      systolic: 132,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      diastolic: 76,
      systolic: 121,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      diastolic: 69,
      systolic: 108,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      diastolic: 79,
      systolic: 124,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      diastolic: 68,
      systolic: 106,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      diastolic: 84,
      systolic: 128,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      diastolic: 76,
      systolic: 119,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      diastolic: 66,
      systolic: 105,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      diastolic: 86,
      systolic: 132,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      diastolic: 82,
      systolic: 127,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      diastolic: 68,
      systolic: 113,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      diastolic: 74,
      systolic: 118,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      diastolic: 70,
      systolic: 115,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      diastolic: 79,
      systolic: 124,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      diastolic: 86,
      systolic: 134,
    },
  ],
  calories: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: 2669,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: 3001,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: 2578,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: 2814,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 2790,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 3304,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 3109,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 3008,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 2914,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: 2871,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 2098,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 2671,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 2712,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 2918,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 2661,
    },
  ],
  clouds: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: 89,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: 78,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: 69,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: 81,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 100,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 93,
    },

    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 88,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 84,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 71,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: 96,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 76,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 84,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 82,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 76,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 64,
    },
  ],
  co2: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: 645,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: 636,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: 625,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: 649,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 651,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 635,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 638,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 629,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 646,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: 649,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 634,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 629,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 661,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 658,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 649,
    },
  ],
  favoritePlaces: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      home: 10,
      sport: 2,
      work: 9,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      home: 10,
      sport: 1,
      work: 9,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      home: 8,
      sport: 0,
      work: 8,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      home: 12,
      sport: 1,
      work: 7,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      home: 9,
      sport: 2,
      work: 8,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      home: 11,
      sport: 0,
      work: 9,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      home: 17,
      sport: 2,
      work: 0,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      home: 14,
      sport: 0,
      work: 0,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      home: 11,
      sport: 2,
      work: 9,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      home: 9,
      sport: 1,
      work: 9,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      home: 8,
      sport: 2,
      work: 9,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      home: 10,
      sport: 0,
      work: 9,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      home: 12,
      sport: 2,
      work: 9,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      home: 17,
      sport: 2,
      work: 0,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      home: 8,
      sport: 0,
      work: 0,
    },
  ],
  how_day: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: -1.5,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: -1.1,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: -0.78,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: -0.5,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 0.4,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 0,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 0.58,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 1.8,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 1.2,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: -0.4,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 0.5,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 0,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 0.45,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 1.08,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 1.85,
    },
  ],
  how_feel: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: -1.3,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: -1.5,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: -0.23,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: -0.69,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 0.31,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 0.5,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 0.12,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 1.9,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 1.54,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: -0.13,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 0.8,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 0.3,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 0.9,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 1.4,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 1.81,
    },
  ],
  how_mood: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: -1.1,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: -1.8,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: -0.9,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: -0.3,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 0.9,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 1,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 0.9,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 1.8,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 1.41,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: -0.67,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 0.32,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 0.5,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 0.9,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 1.18,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 1.43,
    },
  ],
  how_sleep: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: -1,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: -1.5,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: -0.76,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: -0.3,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 0.9,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 1,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 0.9,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 2,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 1.5,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: -0.8,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 0.31,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 0.25,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 0.8,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 1.48,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 2,
    },
  ],
  humidity: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: 56,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: 60,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: 51,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: 45,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 56,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 57,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 51,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 63,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 61,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: 53,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 49,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 67,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 38,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 61,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 57,
    },
  ],
  precip: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: 0.09,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: 0.2,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: 0.03,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: 0.4,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 0.08,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 0.3,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 0.11,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 0.21,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 0.05,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: 0.081,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 0.12,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 0.43,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 0.13,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 0.4,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 0.51,
    },
  ],
  productivity: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      distracting: 0,
      neutral: 45,
      productive: 55,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      distracting: 21,
      neutral: 34,
      productive: 45,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      distracting: 40,
      neutral: 29,
      productive: 31,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      distracting: 8,
      neutral: 22,
      productive: 70,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      distracting: 5,
      neutral: 34,
      productive: 61,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      distracting: 0,
      neutral: 21,
      productive: 79,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      distracting: 0,
      neutral: 19,
      productive: 71,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      distracting: 20,
      neutral: 14,
      productive: 66,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      distracting: 10,
      neutral: 27,
      productive: 63,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      distracting: 0,
      neutral: 26,
      productive: 74,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      distracting: 0,
      neutral: 29,
      productive: 71,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      distracting: 10,
      neutral: 39,
      productive: 51,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      distracting: 11,
      neutral: 19,
      productive: 70,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      distracting: 0,
      neutral: 49,
      productive: 51,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      distracting: 0,
      neutral: 25,
      productive: 75,
    },
  ],
  sleep: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      level: 8,
      value: 9.77,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      level: 8,
      value: 8.47,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      level: 8,
      value: 7.13,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      level: 8,
      value: 6.68,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      level: 8,
      value: 8.14,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      level: 8,
      value: 7.79,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      level: 8,
      value: 9.79,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      level: 8,
      value: 6.34,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      level: 8,
      value: 7.07,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      level: 8,
      value: 8.85,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      level: 8,
      value: 8.34,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      level: 8,
      value: 7.41,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      level: 8,
      value: 8.2,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      level: 8,
      value: 6.98,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      level: 8,
      value: 9.5,
    },
  ],
  temperature: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      value: 24,
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      value: 22,
    },
    {
      date: moment().subtract(12, 'days').format(dateFormat),
      value: 28,
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      value: 18,
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      value: 15,
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      value: 29,
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      value: 34,
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      value: 26,
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      value: 17,
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      value: 24,
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      value: 29,
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      value: 31,
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      value: 26,
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      value: 24,
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      value: 20,
    },
  ],
  wellness: [
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(14, 'days').format(dateFormat),
        value: 45,
      },
      stress: {
        date: moment().subtract(14, 'days').format(dateFormat),
        value: 69,
      },
    },
    {
      date: moment().subtract(13, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(13, 'days').format(dateFormat),
        value: 47,
      },
      stress: {
        date: moment().subtract(13, 'days').format(dateFormat),
        value: 60,
      },
    },
    {
      date: moment().subtract(14, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(12, 'days').format(dateFormat),
        value: 50,
      },
      stress: {
        date: moment().subtract(12, 'days').format(dateFormat),
        value: 58,
      },
    },
    {
      date: moment().subtract(11, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(11, 'days').format(dateFormat),
        value: 51,
      },
      stress: {
        date: moment().subtract(11, 'days').format(dateFormat),
        value: 60,
      },
    },
    {
      date: moment().subtract(10, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(10, 'days').format(dateFormat),
        value: 60,
      },
      stress: {
        date: moment().subtract(10, 'days').format(dateFormat),
        value: 45,
      },
    },
    {
      date: moment().subtract(9, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(9, 'days').format(dateFormat),
        value: 55,
      },
      stress: {
        date: moment().subtract(9, 'days').format(dateFormat),
        value: 63,
      },
    },
    {
      date: moment().subtract(8, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(8, 'days').format(dateFormat),
        value: 70,
      },
      stress: {
        date: moment().subtract(8, 'days').format(dateFormat),
        value: 31,
      },
    },
    {
      date: moment().subtract(7, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(7, 'days').format(dateFormat),
        value: 65,
      },
      stress: {
        date: moment().subtract(7, 'days').format(dateFormat),
        value: 40,
      },
    },
    {
      date: moment().subtract(6, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(6, 'days').format(dateFormat),
        value: 71,
      },
      stress: {
        date: moment().subtract(6, 'days').format(dateFormat),
        value: 20,
      },
    },
    {
      date: moment().subtract(5, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(5, 'days').format(dateFormat),
        value: 48,
      },
      stress: {
        date: moment().subtract(5, 'days').format(dateFormat),
        value: 45,
      },
    },
    {
      date: moment().subtract(4, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(4, 'days').format(dateFormat),
        value: 56,
      },
      stress: {
        date: moment().subtract(4, 'days').format(dateFormat),
        value: 40,
      },
    },
    {
      date: moment().subtract(3, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(3, 'days').format(dateFormat),
        value: 65,
      },
      stress: {
        date: moment().subtract(3, 'days').format(dateFormat),
        value: 38,
      },
    },
    {
      date: moment().subtract(2, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(2, 'days').format(dateFormat),
        value: 71,
      },
      stress: {
        date: moment().subtract(2, 'days').format(dateFormat),
        value: 35,
      },
    },
    {
      date: moment().subtract(1, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(1, 'days').format(dateFormat),
        value: 67,
      },
      stress: {
        date: moment().subtract(1, 'days').format(dateFormat),
        value: 43,
      },
    },
    {
      date: moment().subtract(0, 'days').format(dateFormat),
      battery: {
        date: moment().subtract(0, 'days').format(dateFormat),
        value: 81,
      },
      stress: {
        date: moment().subtract(0, 'days').format(dateFormat),
        value: 14,
      },
    },
  ],
};

export default statistics;
