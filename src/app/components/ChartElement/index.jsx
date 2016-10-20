import React, { Component, PropTypes } from 'react';
import { Col, Button } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Components.
import ChartEmpty from '_components/ChartEmpty';

// Styles.
import styles from './styles.scss';

@autobind
export default class ChartElement extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    chart: PropTypes.object.isRequired,
    indexType: PropTypes.string.isRequired,
    switchIndexType: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isFetched: PropTypes.bool.isRequired,
    width: PropTypes.string,
  };

  static defaultProps = {
    width: '100%',
  };

  constructor() {
    super();

    this.chart = null;
  }

  getChart() {
    const { chart, indexType, id, width } = this.props;
    let chartElement;
    switch (chart.type) {
      case 'bar':
        chartElement = <Bar key={`${id}-element-${indexType}`} data={chart.data} width={550} height={340} options={chart.options} />;
        break;
      case 'doughnut':
        chartElement = <Doughnut data={chart.data} width={550} height={320} />;
        break;
      // no default
    }
    return chartElement;
  }

  render() {
    const { chart, icon, isFetched, title, indexType, switchIndexType, chartLegend, width } = this.props;
    let content;
    if (isFetched) {
      if (!chart) {
        content = <ChartEmpty />;
      }
      else {
        content = (
          <div className={styles.chartContentWrapper}>
            {chartLegend}
            <div style={{ width }} className={styles.chartCanvas}>
              {this.getChart()}
            </div>
          </div>
        );
      }
    }
    return (
      <Col xs={12} md={6} sm={6} className={styles.chartWrapper}>
        <div className={styles.chart}>
          <div className={styles.chartHead}>
            <h3 className={classnames([styles.chartTitle])}>{icon && <img src={icon} height="32px" />}{title}</h3>
            <div className={styles.chartIndexSwitcher}>
              <Button onClick={() => switchIndexType('stress')} className={classnames({ [styles.active]: indexType === 'stress' }, styles.chartBtnSwitcher, styles.chartBtnStress)}>{I18n.t('Стресс')}</Button>
              <Button onClick={() => switchIndexType('battery')} className={classnames({ [styles.active]: indexType === 'battery' }, styles.chartBtnSwitcher, styles.chartBtnBattery)}>{I18n.t('Батарейка')}</Button>
            </div>
          </div>
          <div className={styles.ChartContent}>
            {content}
          </div>
        </div>
      </Col>
    );
  }

}
