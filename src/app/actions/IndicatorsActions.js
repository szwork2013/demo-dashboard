import axios from 'axios';
import { push } from 'react-router-redux';

// Constants.
import * as IndicatorsConstants from '_constants/IndicatorsConstants';

// Data
import indicatorsResponse from '_data/indicators';

function requestLoadIndicators() {
  return {
    type: IndicatorsConstants.LOAD_INDICATORS_REQUEST,
  };
}

function receiveLoadIndicators(indicators) {
  return {
    type: IndicatorsConstants.LOAD_INDICATORS_SUCCESS,
    indicators,
  };
}

function receiveLoadIndicatorsError(message) {
  return {
    type: IndicatorsConstants.LOAD_INDICATORS_FAILURE,
    message,
  };
}

function loadIndicatorWellness() {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/wellness/indicator/',
  });
}

function loadIndicatorSleep() {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/sleep/indicator/',
  });
}

function loadIndicatorActivity() {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/activity/indicator/',
  });
}

function loadIndicatorProductivity() {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/productivity/indicator/',
  });
}

export function loadIndicators() {
  return dispatch => {
    dispatch(requestLoadIndicators());
    dispatch(receiveLoadIndicators(indicatorsResponse));
  };
}
