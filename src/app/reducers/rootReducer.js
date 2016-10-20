import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { i18nReducer } from 'react-redux-i18n';

// Custom Reducers.
import config from '_reducers/config';
import auth from '_reducers/auth';
import resetPassword from '_reducers/resetPassword';
import profile from '_reducers/profile';
import datasources from '_reducers/datasources';
import reports from '_reducers/reports';
import statistics from '_reducers/statistics';
import faq from '_reducers/faq';
import indicators from '_reducers/indicators';
import coupons from '_reducers/coupons';
import products from '_reducers/products';

const appReducer = combineReducers({
  routing,
  loadingBar: loadingBarReducer,
  i18n: i18nReducer,
  config,
  auth,
  resetPassword,
  profile,
  datasources,
  reports,
  statistics,
  faq,
  indicators,
  coupons,
  products,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    // state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
