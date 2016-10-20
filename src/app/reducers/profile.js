// Constants.
import * as ProfileConstants from '_constants/ProfileConstants';

const initialState = {
  isFetching: false,
  isFetched: false,
  profile: null,
  errorMessage: '',
};

export default function profile(state = initialState, action = {}) {
  switch (action.type) {
    case ProfileConstants.LOAD_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ProfileConstants.LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        profile: action.profile,
      };
    case ProfileConstants.LOAD_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        profile: null,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}
