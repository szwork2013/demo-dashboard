// Constants.
import * as ReportsConstants from '_constants/ReportsConstants';

const initialState = {
  isFetching: false,
  isFetched: false,
  reports: null,
  errorMessage: '',
  sort: ReportsConstants.REPORTS_SORT_ASC,
};

export default function reports(state = initialState, action = {}) {
  switch (action.type) {
    case ReportsConstants.LOAD_REPORTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ReportsConstants.LOAD_REPORTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        reports: action.reports,
      };
    case ReportsConstants.LOAD_REPORTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        reports: null,
        errorMessage: action.message,
      };
    case ReportsConstants.CHANGE_REPORTS_SORT:
      return {
        ...state,
        sort: state.sort === ReportsConstants.REPORTS_SORT_ASC ? ReportsConstants.REPORTS_SORT_DESC : ReportsConstants.REPORTS_SORT_ASC,
      };

    default:
      return state;
  }
}
