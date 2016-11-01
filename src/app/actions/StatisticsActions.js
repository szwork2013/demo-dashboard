import axios from 'axios';
import { push } from 'react-router-redux';
import moment from 'moment';

// Constants.
import * as StatisticsConstants from '_constants/StatisticsConstants';

// Data.
import statisticsData from '_data/statistics';

function requestLoadStatistics() {
  return {
    type: StatisticsConstants.LOAD_STATISTICS_REQUEST,
  };
}

function receiveLoadStatistics(statistics) {
  return {
    type: StatisticsConstants.LOAD_STATISTICS_SUCCESS,
    statistics,
  };
}

function receiveLoadStatisticsError(message) {
  return {
    type: StatisticsConstants.LOAD_STATISTICS_FAILURE,
    message,
  };
}

function loadStatisticWellness(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/wellness/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticSleep(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/sleep/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticActivity(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/activity/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticProductivity(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/productivity/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticBloodPressure(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/blood_pressure/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticFavoritePlaces(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/favorite_places/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticCalories(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/calories/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

// All Questions: How....?
function loadStatisticPoll(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/poll/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticWeatherTemperature(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/weather/temp/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticWeatherAtmosphericPressure(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/weather/pressure/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticWeatherHumidity(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/weather/humidity/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticWeatherClouds(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/weather/clouds/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticWeatherPrecip(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/weather/precip/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

function loadStatisticCO2(startDate, endDate) {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/dataset/co2/',
    params: {
      start_date: startDate,
      end_date: endDate,
      show: 'none',
    },
  });
}

export function loadStatistics(startDate, endDate) {
  const start = moment(startDate).format('YYYY-MM-DD');
  const end = moment(endDate).format('YYYY-MM-DD');
  return dispatch => {
    dispatch(requestLoadStatistics());
    const statistics = {
      wellness: statisticsData.wellness.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      sleep: statisticsData.sleep.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      bloodPressure: statisticsData.bloodPressure.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      productivity: statisticsData.productivity.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      activity: statisticsData.activity.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      favoritePlaces: statisticsData.favoritePlaces.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      calories: statisticsData.calories.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      how_day: statisticsData.how_day.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      how_mood: statisticsData.how_mood.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      how_sleep: statisticsData.how_sleep.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      how_feel: statisticsData.how_feel.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      temperature: statisticsData.temperature.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      atmosphericPressure: statisticsData.atmosphericPressure.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      humidity: statisticsData.humidity.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      clouds: statisticsData.clouds.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      precip: statisticsData.precip.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
      co2: statisticsData.co2.filter((item) => { const date = moment(item.date).format('YYYY-MM-DD'); if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) { return item }; return null; }),
    };
    dispatch(receiveLoadStatistics(statistics));
  };
}
