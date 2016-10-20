import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';

// Styles.
import styles from './styles.scss';

export default class ChartEmpty extends Component {

  render() {
    return (
      <div className={styles.chartNoData}>
        <h3>{I18n.t('Недостаточно данных')} <span className={styles.icon}>¯\_(ツ)_/¯</span></h3>
        <div>{I18n.t('Убедитесь, что вы производите измерения по данному показателю')}.</div>
      </div>
    );
  }

}
