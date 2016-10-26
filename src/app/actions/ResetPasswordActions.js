import axios from 'axios';
import { push } from 'react-router-redux';
import { I18n } from 'react-redux-i18n';
import jwtDecode from 'jwt-decode';

// Constants.
import * as ResetPasswordConstants from '_constants/ResetPasswordConstants';

function requestResetPassword() {
  return {
    type: ResetPasswordConstants.RESET_PASSWORD_REQUEST,
  };
}

function receiveResetPassword(message) {
  return {
    type: ResetPasswordConstants.RESET_PASSWORD_SUCCESS,
    message,
  };
}

function receiveResetPasswordError(message) {
  return {
    type: ResetPasswordConstants.RESET_PASSWORD_FAILURE,
    message,
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
      const message = I18n.t('Ссылка на сброс пароля была отправлена на почту');
      dispatch(receiveResetPassword(message));
    })
    .catch((error) => {
      const message = I18n.t('Пользователя с такие email не существует');
      dispatch(receiveResetPasswordError(message));
    });
  };
}
