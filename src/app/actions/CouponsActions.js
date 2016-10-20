import axios from 'axios';
import { push } from 'react-router-redux';

// Constants.
import * as CouponsConstants from '_constants/CouponsConstants';

function requestLoadCoupons() {
  return {
    type: CouponsConstants.LOAD_COUPONS_REQUEST,
  };
}

function receiveLoadCoupons(coupons) {
  return {
    type: CouponsConstants.LOAD_COUPONS_SUCCESS,
    coupons,
  };
}

function receiveLoadCouponsError(message) {
  return {
    type: CouponsConstants.LOAD_COUPONS_FAILURE,
    message,
  };
}

export function loadCoupons(promoCode) {
  return dispatch => {
    dispatch(requestLoadCoupons());
    axios({
      method: 'GET',
      url: '/api2/dashboard_api/coupons/check/',
      params: {
        coupon_code: promoCode,
      },
    })
      .then((response) => {
        const coupons = response.data;
        dispatch(receiveLoadCoupons(coupons));
      })
      .catch((error) => {
      });
  };
}
