// Constants.
import * as StatisticsConstants from '_constants/StatisticsConstants';

const initialState = {
  isFetching: false,
  isFetched: false,
  statistics: {
    wellness: [],
    sleep: [],
    bloodPressure: [],
    productivity: [],
    activity: [],
    favoritePlaces: [],
    calories: [],
    how_day: [],
    how_mood: [],
    how_sleep: [],
    how_feel: [],
    temperature: [],
    atmosphericPressure: [],
    humidity: [],
    clouds: [],
    precip: [],
    co2: [],
  },
  errorMessage: '',
};

export default function datasources(state = initialState, action = {}) {
  switch (action.type) {
    case StatisticsConstants.LOAD_STATISTICS_REQUEST:
      return {
        ...state,
        isFetched: false,
        isFetching: true,
      };
    case StatisticsConstants.LOAD_STATISTICS_SUCCESS:
      return {
        ...state,
        isFetched: true,
        isFetching: false,
        statistics: action.statistics,
      };
    case StatisticsConstants.LOAD_STATISTICS_FAILURE:
      return {
        ...state,
        isFetched: false,
        isFetching: false,
        statistics: {},
        errorMessage: action.message,
      };
    default:
      return state;
  }
}
