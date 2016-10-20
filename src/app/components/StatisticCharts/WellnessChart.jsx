import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Components.
import ChartElement from '_components/ChartElement';

// Styles.
import styles from './chartLegend.scss';

@autobind
export default class WellnessChart extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    isFetched: PropTypes.bool.isRequired,
    wellnessData: PropTypes.array.isRequired,
    chart: PropTypes.object,
    indexTypes: PropTypes.object,
  };

  static defaultProps = {
    chart: {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 100,
              },
              position: 'left',
            },
            {
              ticks: {
                display: false,
                beginAtZero: true,
                max: 100,
              },
              gridLines: {
                display: false,
              },
              position: 'right',
            },
          ],
        },
      },
    },
  };

  constructor() {
    super();

    this.state = {
      indexType: 'stress',
    };
  }

  chartTooltipBeforeTitle(tooltipItem, data) {
    const indexTypes = {
      stress: I18n.t('Стресс'),
      battery: I18n.t('Батарейка'),
    };
    return `${indexTypes[this.state.indexType]} - ${tooltipItem.yLabel}%`;
  }

  switchIndexType(indexType) {
    this.setState({ indexType });
  }

  render() {
    const { wellnessData, ...chartProps } = this.props;
    const { indexType } = this.state;
    if (wellnessData.length > 0) {
      chartProps.chart.data.labels = [];
      chartProps.chart.data.datasets[0].data = [];
      chartProps.chart.data.datasets[0].backgroundColor = [];
      wellnessData.map((item) => {
        if (item[indexType]) {
          const { date, value } = item[indexType];
          chartProps.chart.data.labels.push(date);
          chartProps.chart.data.datasets[0].data.push(value);
          let backgroundColor;
          if (indexType === 'stress') {
            if (value <= 20) {
              backgroundColor = '#53d052';
            }
            else if (value >= 60) {
              backgroundColor = '#e8623f';
            }
            else {
              backgroundColor = '#ffca2e';
            }
          }
          else {
            if (value <= 20) {
              backgroundColor = '#e8623f';
            }
            else if (value >= 60) {
              backgroundColor = '#53d052';
            }
            else {
              backgroundColor = '#ffca2e';
            }
          }
          chartProps.chart.data.datasets[0].backgroundColor.push(backgroundColor);
        }
        return chartProps;
      });
      chartProps.chart.options.tooltips = {
        callbacks: {
          label: this.chartTooltipBeforeTitle,
        },
      };
    }
    else {
      chartProps.chart = null;
    }
    const chartLegend = (
      <div className={styles.normalLegendWrapper}>
        <div className={styles.normalLegendItem}><div className={classnames(styles.legendItem, styles.good)} />{I18n.t('Хорошо')}</div>
        <div className={styles.normalLegendItem}><div className={classnames(styles.legendItem, styles.normal)} />{I18n.t('Средне')}</div>
        <div className={styles.normalLegendItem}><div className={classnames(styles.legendItem, styles.bad)} />{I18n.t('Плохо')}</div>
      </div>
    );
    return <ChartElement {...chartProps} indexType={indexType} switchIndexType={this.switchIndexType} chartLegend={chartLegend} />;
  }

}
