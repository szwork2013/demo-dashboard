import axios from 'axios';
import { push } from 'react-router-redux';

// Constants.
import * as ProfileConstants from '_constants/ProfileConstants';

// Data
import profileResponse from '_data/profile';

function requestLoadUserProfile() {
  return {
    type: ProfileConstants.LOAD_PROFILE_REQUEST,
  };
}

function receiveLoadUserProfile(profile) {
  return {
    type: ProfileConstants.LOAD_PROFILE_SUCCESS,
    profile,
  };
}

function receiveLoadUserProfileError(message) {
  return {
    type: ProfileConstants.LOAD_PROFILE_FAILURE,
    message,
  };
}

export function loadUserProfile() {
  return dispatch => {
    dispatch(requestLoadUserProfile());
    dispatch(receiveLoadUserProfile(profileResponse));
  };
}
