import axios from 'axios';
import { push } from 'react-router-redux';

// Constants.
import * as ReportsConstants from '_constants/ReportsConstants';

// Data.
import reportsData from '_data/reports';

function requestLoadReports() {
  return {
    type: ReportsConstants.LOAD_REPORTS_REQUEST,
  };
}

function receiveLoadReports(reports) {
  return {
    type: ReportsConstants.LOAD_REPORTS_SUCCESS,
    reports,
  };
}

function receiveLoadReportsError(message) {
  return {
    type: ReportsConstants.LOAD_REPORTS_FAILURE,
    message,
  };
}

function changeSortHeartbeat() {
  return {
    type: ReportsConstants.CHANGE_REPORTS_SORT,
  };
}

export function loadReports() {
  return (dispatch, getState) => {
    dispatch(requestLoadReports());
    // Current sort state.
    const { reports: { sort } } = getState();
    let reports;
    if (ReportsConstants.REPORTS_SORT_ASC) {
      reports = reportsData.reverse();
    }
    else {
      reports = reportsData;
    }
    dispatch(receiveLoadReports(reports));
  };
}

export function sortReports() {
  return (dispatch) => {
    dispatch(changeSortHeartbeat());
    dispatch(loadReports());
  };
}
