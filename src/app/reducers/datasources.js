// Constants.
import * as DataSourcesConstants from '_constants/DataSourcesConstants';

const initialState = {
  isFetching: false,
  isFetched: false,
  categories: null,
  sources: null,
  errorMessage: '',

  isConnecting: false,
  isConnected: false,
};

export default function datasources(state = initialState, action = {}) {
  switch (action.type) {
    case DataSourcesConstants.LOAD_DATASOURCES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case DataSourcesConstants.LOAD_DATASOURCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        categories: action.categories,
        sources: action.sources,
      };
    case DataSourcesConstants.LOAD_DATASOURCES_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        categories: null,
        sources: null,
        errorMessage: action.message,
      };

    case DataSourcesConstants.CONNECT_DATASOURCE_REQUEST:
      return {
        ...state,
        isConnecting: true,
      };
    case DataSourcesConstants.CONNECT_DATASOURCE_SUCCESS:
      return {
        ...state,
        isConnecting: false,
        isConnected: true,
      };
    case DataSourcesConstants.CONNECT_DATASOURCE_FAILURE:
      return {
        ...state,
        isConnecting: false,
        isConnected: false,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}
