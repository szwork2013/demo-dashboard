import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Styles.
import styles from './styles.scss';

@autobind
export default class ActivityIndicator extends Component {

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
    const indicatorIconClasses = classnames(styles.indicatorIcon, styles.activity);
    return (
      <Col xs={12} md={3}>
        <div data-tip data-for="activityTooltip" className={styles.indicator}>
          <div className={styles.indicatorName}>{I18n.t('Активность')}</div>
          <div className={styles.indicatorValue}>{isFetched && `${indicator.value}`}</div>
          <div className={indicatorIconClasses} />
          <div className={indicatorDiffClasses}>{isFetched && `${indicator.diff}%`}</div>
          <div className={styles.indicatorDescription}>{I18n.t('Количество шагов')}</div>
        </div>
        <ReactTooltip id="activityTooltip" place="bottom" class={styles.indicatorTooltip}>
          <div className={styles.indicatorHelp}><b style={{fontFamily: 'RalewayBold'}}>{I18n.t('Активность')}</b> {I18n.t('показывает - ленитесь ли вы двигаться')}</div>
        </ReactTooltip>
      </Col>
    );
  }

}
