// Constants.
import * as ConfigConstants from '_constants/ConfigConstants';

const initialState = {
  isFetching: false,
  isFetched: false,
  config: null,
  errorMessage: '',
};

export default function config(state = initialState, action = {}) {
  switch (action.type) {
    case ConfigConstants.LOAD_CONFIG_REQUEST:
      return {
        ...state,
        isFetched: false,
        isFetching: true,
      };
    case ConfigConstants.LOAD_CONFIG_SUCCESS:
      return {
        ...state,
        isFetched: true,
        isFetching: false,
        config: action.config,
      };
    case ConfigConstants.LOAD_CONFIG_FAILURE:
      return {
        ...state,
        isFetched: false,
        isFetching: false,
        config: null,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}
