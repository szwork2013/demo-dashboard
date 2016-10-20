import axios from 'axios';
import { push } from 'react-router-redux';

// Constants.
import * as DataSourcesConstants from '_constants/DataSourcesConstants';

// Actions.
import * as ProfileActions from '_actions/ProfileActions';

// Data.
import { dataSourcesCategories, dataSourcesSources } from '_data/datasources';

function requestLoadDatasources() {
  return {
    type: DataSourcesConstants.LOAD_DATASOURCES_REQUEST,
  };
}

function receiveLoadDatasources(categories, sources) {
  return {
    type: DataSourcesConstants.LOAD_DATASOURCES_SUCCESS,
    categories,
    sources,
  };
}

function receiveLoadDatasourcesError(message) {
  return {
    type: DataSourcesConstants.LOAD_DATASOURCES_FAILURE,
    message,
  };
}

function loadDatasourcesSources() {
  return axios({
    method: 'GET',
    url: '/api2/providers/sources/',
  });
}

function loadDatasourcesCategories() {
  return axios({
    method: 'GET',
    url: '/api2/providers/categories/',
  });
}

export function loadDatasources() {
  return dispatch => {
    dispatch(requestLoadDatasources());
    dispatch(receiveLoadDatasources(dataSourcesCategories, dataSourcesSources));
  };
}

function requestConnectDatasource() {
  return {
    type: DataSourcesConstants.CONNECT_DATASOURCE_REQUEST,
  };
}

function receiveConnectDatasource() {
  return {
    type: DataSourcesConstants.CONNECT_DATASOURCE_SUCCESS,
  };
}

function receiveLoadDatasourcesError() {
  return {
    type: DataSourcesConstants.CONNECT_DATASOURCE_FAILURE,
  };
}

export function connectDatasource(sessionObject) {
  return dispatch => {
    dispatch(requestConnectDatasource());
    axios({
      method: 'POST',
      url: '/api2/providers/humanapi/connect/finish/',
      data: {
        clientId: sessionObject.clientId,
        clientSecret: 'c24e2a021abf751c75b06e7448fe258b755957a4',
        humanId: sessionObject.humanId,
        sessionToken: sessionObject.sessionToken,
      },
    })
      .then((response) => {
        const connectResponse = response.data;
        if (connectResponse.success === true) {
          dispatch(receiveConnectDatasource());
          dispatch(ProfileActions.loadUserProfile());
          dispatch(loadDatasources());
        }

      })
      .catch((error) => {
      });
  };
}

export function trackDatasource() {
  return dispatch => {
    dispatch(requestConnectDatasource());
    axios({
      method: 'POST',
      url: '/api2/providers/humanapi/connect/track/',
    })
      .then((response) => {
        const connectResponse = response.data;
        if (connectResponse.success === true) {
          dispatch(receiveConnectDatasource());
          dispatch(ProfileActions.loadUserProfile());
          dispatch(loadDatasources());
        }

      })
      .catch((error) => {
      });
  };
}
