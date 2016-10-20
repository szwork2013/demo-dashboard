import axios from 'axios';
import { push } from 'react-router-redux';
import { I18n } from 'react-redux-i18n';
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookie';

// Constants.
import * as AuthConstants from '_constants/AuthConstants';

function requestLogin() {
  return {
    type: AuthConstants.LOGIN_REQUEST,
  };
}

function receiveLogin() {
  return {
    type: AuthConstants.LOGIN_SUCCESS,
  };
}

function receiveLoginError(message) {
  return {
    type: AuthConstants.LOGIN_FAILURE,
    message,
  };
}

export function login(creds) {
  return (dispatch) => {
    dispatch(requestLogin());
    // User creds.
    const email = creds.email;
    const password = creds.password;
    axios({
      method: 'POST',
      url: '/api2/api-token-auth/',
      data: {
        email,
        password,
      },
    })
    .then((response) => {
      const token = response.data.token;
      try {
        jwtDecode(token);
        // Set token to axios headers.
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
        // Set token to localStorage.
        localStorage.setItem('token', token);
        document.cookie = 'web_user=true; domain=.welltory.com';
        dispatch(receiveLogin());
        dispatch(push('/dashboard'));
      }
      catch(e) {
        dispatch(receiveLoginError({
          response: {
            status: 403,
            statusText: 'Invalid token',
          },
        }));
      }
    })
    .catch((error) => {
      console.log(error.response, 'RESPONSE ');
      // @todo Why we don't have response???
      if (error.response) {
      }
      localStorage.removeItem('token');
      const message = `${I18n.t('Вы ввели неверный логин или пароль')}!`;
      dispatch(receiveLoginError(message));
    });
  };
}

function requestLogout() {
  return {
    type: AuthConstants.LOGOUT_REQUEST,
  };
}

function receiveLogout() {
  return {
    type: AuthConstants.LOGOUT_SUCCESS,
  };
}

export function logout() {
  return dispatch => {
    dispatch(requestLogout());
    // Remove token fron localStorage.
    localStorage.removeItem('token');
    // Clean axios default headers.
    delete axios.defaults.headers.post['Authorization'];
    dispatch(receiveLogout());
    dispatch(push('/user/login'));
    // Logout current user.
  };
}

function requestResetPassword() {
  return {
    type: AuthConstants.RESET_PASSWORD_REQUEST,
  };
}

function receiveResetPassword() {
  return {
    type: AuthConstants.RESET_PASSWORD_SUCCESS,
  };
}

function receiveResetPasswordError() {
  return {
    type: AuthConstants.RESET_PASSWORD_FAILURE,
  };
}

export function resetPassword(email) {
  return dispatch => {
    dispatch(requestResetPassword());
    axios({
      method: 'POST',
      url: '/api2/password_recovery/init/',
      data: {
        email,
      },
    })
    .then((response) => {
      dispatch(receiveResetPassword());
    })
    .catch((error) => {
      if (error.response) {
        dispatch(receiveResetPasswordError(error.response.data.error));
      }
    });
  };
}
