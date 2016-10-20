import React, { Component, PropTypes } from 'react';
import Intercom from 'react-intercom';
import { I18n } from 'react-redux-i18n';

// Utils.
import { isIOSApp } from '_utils';

// Styles.
import styles from './styles.scss';

export default class IntercomChat extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  };

  render() {
    const { profile, config } = this.props;
    const isFetched = profile.isFetched && config.isFetched;
    if (isIOSApp()) {
      return null;
    }
    if (!isFetched) {
      return null;
    }
    const user = {
      user_id: profile.profile.wid,
      email: profile.profile.email,
      name: profile.profile.username,
    };
    return (
      <div className={styles.intercomWrapper}>
        <div className={styles.intercomTitle}>{I18n.t('Чат')}</div>
        <Intercom appID={config.config.intercom_key} {...user} />
      </div>
    );
  }

}
