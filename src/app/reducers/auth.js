import cookie from 'react-cookie';

// Constants.
import * as AuthConstants from '_constants/AuthConstants';

// Utils.
import { isIOSApp } from '_utils';

let isAuthenticated = true;

const initialState = {
  isLoading: false,
  isLoaded: false,
  isAuthenticated: isAuthenticated,
  message: '',
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case AuthConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        message: '',
      };
    case AuthConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isAuthenticated: true,
      };
    case AuthConstants.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        isAuthenticated: false,
        message: action.message,
      };
    case AuthConstants.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoadede: true,
        isAuthenticated: true,
      };
    case AuthConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        isAuthenticated: false,
      };
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
}
