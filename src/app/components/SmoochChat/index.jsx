import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
// import Smooch from 'smooch';

// Styles.
import styles from './styles.scss';

export default class SmoochChat extends Component {

  componentDidMount() {
    const { profile } = this.props;
    const options = {
      appToken: 'b5b0np6zcoj85ie21wzafz5oa',
      userId: profile.wid,
      email: profile.email,
      givenName: profile.username,
      customText: {
        headerText: I18n.t('Чат'),
      },
    };
    Smooch.init(options) ;
  }

  render() {
    return null;
  }

}
