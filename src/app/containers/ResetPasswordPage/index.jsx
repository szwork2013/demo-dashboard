import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { autobind } from 'core-decorators';

// Components.
import ResetPasswordForm from '_components/ResetPasswordForm';
import AlertMessage from '_components/AlertMessage';

// Actions.
import * as ResetPasswordActions from '_actions/ResetPasswordActions';

// Styles.
import styles from './styles.scss';

// Images.
import logo from './images/logo-vertical.png';

@connect(
  state => ({
    resetPassword: state.resetPassword,
  }),
  dispatch => ({
    actions: bindActionCreators(ResetPasswordActions, dispatch),
  })
)
@autobind
export default class ResetPasswordPage extends Component {

  static propTypes = {
    resetPassword: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  onSubmitLogin(email) {
    this.props.actions.resetPassword(email);
  }

  render() {
    const { resetPassword } = this.props;
    return (
      <div className={styles.wrapper}>
        {resetPassword.message && <AlertMessage message={resetPassword.message} status={resetPassword.status} />}
        <div className={styles.wrapperResetPassword}>
          <div className={styles.title}>{I18n.t('Восстановить доступ')}</div>
          <div className={styles.logo}>
            <img src={logo} width="116px" />
          </div>
          <ResetPasswordForm onSubmit={this.onSubmitLogin} />
        </div>
      </div>
    );
  }

}
