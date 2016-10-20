import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { autobind } from 'core-decorators';

// Components.
import LoginForm from '_components/LoginForm';
import AlertMessage from '_components/AlertMessage';

// Actions.
import * as AuthActions from '_actions/AuthActions';

// Styles.
import styles from './styles.scss';

// Images.
import logo from './images/logo-vertical.png';

@connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    actions: bindActionCreators(AuthActions, dispatch),
  })
)
@autobind
export default class LoginPage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  onSubmitLogin(creds) {
    this.props.actions.login(creds);
  }

  render() {
    const { auth } = this.props;
    return (
      <div className={styles.wrapper}>
        {auth.message && <AlertMessage message={auth.message} status="error" />}
        <div className={styles.wrapperLogin}>
          <div className={styles.title}>{I18n.t('Вход')}</div>
          <div className={styles.logo}><img src={logo} width="116px" height="116px" /></div>
          <LoginForm onSubmit={this.onSubmitLogin} />
        </div>
      </div>
    );
  }

}
