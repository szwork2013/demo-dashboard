// Constants.
import * as CouponsConstants from '_constants/CouponsConstants';

const initialState = {
  isFetching: false,
  isFetched: false,
  coupons: null,
  errorMessage: '',
};

export default function coupons(state = initialState, action = {}) {
  switch (action.type) {
    case CouponsConstants.LOAD_COUPONS_REQUEST:
      return {
        ...state,
        isFetched: false,
        isFetching: true,
      };
    case CouponsConstants.LOAD_COUPONS_SUCCESS:
      return {
        ...state,
        isFetched: true,
        isFetching: false,
        coupons: action.coupons,
      };
    case CouponsConstants.LOAD_COUPONS_FAILURE:
      return {
        ...state,
        isFetched: false,
        isFetching: false,
        coupons: 0,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}
