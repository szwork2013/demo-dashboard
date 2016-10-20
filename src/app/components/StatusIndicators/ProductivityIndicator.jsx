import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Styles.
import styles from './styles.scss';

@autobind
export default class ProductivityIndicator extends Component {

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
    const indicatorIconClasses = classnames(styles.indicatorIcon, styles.productivity);
    return (
      <Col xs={12} md={3}>
        <div data-tip data-for="productivityTooltip" className={styles.indicator}>
          <div className={styles.indicatorName}>{I18n.t('Продуктивность')}</div>
          <div className={styles.indicatorValue}>{isFetched && `${indicator.value}%`}</div>
          <div className={indicatorIconClasses} />
          <div className={indicatorDiffClasses}>{isFetched && `${indicator.diff}%`}</div>
          <div className={styles.indicatorDescription}>{I18n.t('Эффективность')}</div>
        </div>
        <ReactTooltip id="productivityTooltip" place="bottom" class={styles.indicatorTooltip}>
          <div className={styles.indicatorHelp}><b style={{fontFamily: 'RalewayBold'}}>{I18n.t('Продуктивность')}</b> {I18n.t('показывает, насколько эффективно вы тратите своё время')}</div>
        </ReactTooltip>
      </Col>
    );
  }

}
