import axios from 'axios';

// Constants.
import * as ConfigConstants from '_constants/ConfigConstants';

function requestLoadConfig() {
  return {
    type: ConfigConstants.LOAD_CONFIG_REQUEST,
  };
}

function receiveLoadConfig(config) {
  return {
    type: ConfigConstants.LOAD_CONFIG_SUCCESS,
    config,
  };
}

function receiveLoadConfigError(message) {
  return {
    type: ConfigConstants.LOAD_CONFIG_FAILURE,
    message,
  };
}

export function loadConfig() {
  return dispatch => {
    dispatch(requestLoadConfig());
    axios({
      method: 'GET',
      url: '/api2/dashboard_api/config/',
    })
      .then((response) => {
        const config = response.data;
        dispatch(receiveLoadConfig(config));
      })
      .catch((error) => {
      });
  };
}
