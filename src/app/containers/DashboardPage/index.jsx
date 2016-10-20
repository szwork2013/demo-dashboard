import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';

// Containers.
import StatusIndicators from '_containers/StatusIndicators';
import StatisticCharts from '_containers/StatisticCharts';

// Actions.
import * as ProfileActions from '_actions/ProfileActions';

// Styles.
import styles from './styles.scss';

export default class DashboardPage extends Component {

  render() {
    return (
      <div>
        <StatusIndicators />
        <StatisticCharts />
      </div>
    );
  }

}

@connect(
  state => ({
    profile: state.profile,
  }),
  dispatch => ({
    actions: bindActionCreators(ProfileActions, dispatch),
  })
)
export class DashboardPageAdditionalTitle extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
  };

  render() {
    const { isFetched, profile } = this.props.profile;
    let username;
    if (isFetched) {
      username = profile.username || profile.email || '';
    }
    return (
      <div>
        {username && <div className={styles.indicatorsUserHelp}>{I18n.t('username, ваши показатели в сравнении с предыдущей неделей выглядят выглядят так:', { username })}</div>}
      </div>
    );
  }

}