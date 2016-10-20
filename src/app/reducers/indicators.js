// Constants.
import * as IndicatorsConstants from '_constants/IndicatorsConstants';

const initialState = {
  isFetching: false,
  isFetched: false,
  indicators: {
    wellness: [],
    sleep: [],
    productivity: [],
    activity: [],
  },
  errorMessage: '',
};

export default function reports(state = initialState, action = {}) {
  switch (action.type) {
    case IndicatorsConstants.LOAD_INDICATORS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case IndicatorsConstants.LOAD_INDICATORS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        indicators: action.indicators,
      };
    case IndicatorsConstants.LOAD_INDICATORS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        indicators: null,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}
