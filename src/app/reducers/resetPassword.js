// Constants.
import * as AuthConstants from '_constants/AuthConstants';

const initialState = {
  isReseting: false,
  isReseted: false,
  status: '',
  message: '',
};

export default function resetPassword(state = initialState, action = {}) {
  console.log(action, 'ACTION');
  switch (action.type) {
    case AuthConstants.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isReseting: true,
        isReseted: false,
        status: '',
        message: '',
      };
    case AuthConstants.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isReseting: false,
        isReseted: true,
        status: 'success',
        message: action.message,
      };
    case AuthConstants.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isReseting: false,
        isReseted: false,
        status: 'error',
        message: action.message,
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
