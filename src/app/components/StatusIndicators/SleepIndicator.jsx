import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import moment from 'moment';
import 'moment-duration-format';
import { autobind } from 'core-decorators';

// Styles.
import styles from './styles.scss';

@autobind
export default class SleepIndicator extends Component {

  static propTypes = {
    isFetched: PropTypes.bool.isRequired,
    indicator: PropTypes.object.isRequired,
  };

  render() {
    const { isFetched, indicator } = this.props;
    const indicatorDiffClasses = classnames(styles.indicatorDiff, {
      [styles.down]: isFetched && indicator.diff < 0,
      [styles.up]: isFetched && indicator.diff >= 0,
    });
    const indicatorIconClasses = classnames(styles.indicatorIcon, styles.sleep);
    let sleepHours;
    if (indicator.value === 0) {
      sleepHours = '0:00';
    }
    else if (indicator.value < 1) {
      sleepHours = `0:${moment.duration(indicator.value, 'hours').format('H:mm')}`;
    }
    else {
      sleepHours = moment.duration(indicator.value, 'hours').format('H:mm');
    }
    return (
      <Col xs={12} md={3}>
        <div data-tip data-for="sleepTooltip" className={styles.indicator}>
          <div className={styles.indicatorName}>{I18n.t('Сон')}</div>
          <div className={styles.indicatorValue}>{isFetched && `${sleepHours}`}</div>
          <div className={indicatorIconClasses} />
          <div className={indicatorDiffClasses}>{isFetched && `${indicator.diff}%`}</div>
          <div className={styles.indicatorDescription}>{I18n.t('Количество часов')}</div>
        </div>
        <ReactTooltip id="sleepTooltip" place="bottom" class={styles.indicatorTooltip}>
          <div className={styles.indicatorHelp}><b style={{fontFamily: 'RalewayBold'}}>{I18n.t('Сон')}</b> {I18n.t('покажет вам, как меняется ваш сон каждую неделю')}</div>
        </ReactTooltip>
      </Col>
    );
  }

}
