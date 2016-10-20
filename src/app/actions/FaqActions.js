import axios from 'axios';
import { push } from 'react-router-redux';

// Constants.
import * as FaqConstants from '_constants/FaqConstants';

// Data.
import { faqCategories, faqQuestions } from '_data/faq';

function requestLoadFaq() {
  return {
    type: FaqConstants.LOAD_FAQ_REQUEST,
  };
}

function receiveLoadFaq(categories, questions) {
  return {
    type: FaqConstants.LOAD_FAQ_SUCCESS,
    categories,
    questions,
  };
}

function receiveLoadFaqError(message) {
  return {
    type: FaqConstants.LOAD_FAQ_FAILURE,
    message,
  };
}

function loadFaqQuestions() {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/faq/items/',
  });
}

function loadFaqCategories() {
  return axios({
    method: 'GET',
    url: '/api2/dashboard_api/faq/categories/',
  });
}

export function loadFaq() {
  return dispatch => {
    dispatch(requestLoadFaq());
    dispatch(receiveLoadFaq(faqCategories, faqQuestions));
  };
}
