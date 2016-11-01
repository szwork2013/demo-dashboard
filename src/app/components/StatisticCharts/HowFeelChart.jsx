import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Components.
import ChartElement from '_components/ChartElement';

// Utils.
import { getLanguage } from '_utils';

// Styles.
import styles from './chartLegend.scss';

@autobind
export default class HowFeelChart extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    howData: PropTypes.array.isRequired,
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
            // Wellness chart(stress / battery).
            type: 'line',
            label: 'Самочувствие',
            data: [],
            yAxisID: 'wellness-y-axis',
            fill: false,
            borderColor: 'rgb(184, 25, 48)',
            backgroundColor: 'rgb(184, 25, 48)',
            pointBackgroundColor: '#ffffff',
            pointHoverBackgroundColor: 'rgb(184, 25, 48)',
            lineTension: 0,
            spanGaps: true,
          },
          // How chart.
          {
            type: 'bar',
            label: 'Как самочувствие',
            data: [],
            borderWidth: 1,
            borderColor: 'rgb(38, 9, 128)',
            yAxisID: 'how-y-axis',
            backgroundColor: 'rgb(38, 9, 128)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        animation: false,
        scales: {
          yAxes: [
            {
              id: 'how-y-axis',
              ticks: {
                beginAtZero: false,
                max: 2,
                min: -2,
              },
              position: 'left',
            },
            {
              id: 'wellness-y-axis',
              ticks: {
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
        tooltips: {
          mode: 'label',
          custom: (tooltip) => {
            tooltip.bodyFontSize = 10;
            if (tooltip.x && tooltip.x < 0) {
              tooltip.x = 0;
            }
            if (tooltip.y && tooltip.y < 0) {
              tooltip.y = 0;
            }

          },
        },
        hover: {
          mode: 'label',
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

  getTooltipLabel(tooltipItem, data) {
    let suffix = '';
    // Wellness chart.
    let label;
    // Wellness chart.
    if (tooltipItem.datasetIndex === 0) {
      suffix = '%';
      label = I18n.t(data.datasets[tooltipItem.datasetIndex].label);
    }
    else {
      label = `${I18n.t(data.datasets[tooltipItem.datasetIndex].label)}?`;
    }
    const value = tooltipItem.yLabel;
    return `${label} - ${value} ${suffix}`;
  }

  getChartProps(chartProps) {
    const { howData, wellnessData } = this.props;
    const { indexType } = this.state;
    chartProps.chart.data.labels = [];
    chartProps.chart.data.datasets[0].data = [];
    chartProps.chart.data.datasets[1].data = [];
    wellnessData.map((item, index) => {
      let wellnessValue = NaN;
      if (item[indexType]) {
        if (howData[index].value !== null) {
          const { value } = item[indexType];
          if (value > 0) {
            wellnessValue = value || NaN;
          }
        }
      }
      chartProps.chart.data.datasets[0].data.push(wellnessValue);
    });
    if (indexType === 'battery') {
      chartProps.chart.data.datasets[0].label = 'Батарейка';
      chartProps.chart.data.datasets[0].borderColor = 'rgb(51, 204, 51)';
      chartProps.chart.data.datasets[0].backgroundColor = 'rgb(51, 204, 51)';
      chartProps.chart.data.datasets[0].pointHoverBackgroundColor = 'rgb(51, 204, 51)';
    }
    else {
      chartProps.chart.data.datasets[0].label = 'Стресс';
      chartProps.chart.data.datasets[0].borderColor = 'rgb(184, 25, 48)';
      chartProps.chart.data.datasets[0].backgroundColor = 'rgb(184, 25, 48)';
      chartProps.chart.data.datasets[0].pointHoverBackgroundColor = 'rgb(184, 25, 48)';
    }
    howData.map((item) => {
      const { date, value } = item;
      // Label.
      const language = getLanguage();
      let dateFormat;
      if (language === 'ru') {
        dateFormat = 'DD.MM';
      }
      else {
        dateFormat = 'MM.DD';
      }
      const formatedDate = moment(date).format(dateFormat);
      chartProps.chart.data.labels.push(formatedDate);
      // Value.
      chartProps.chart.data.datasets[1].data.push(value);
      return chartProps;
    });
    chartProps.chart.options.tooltips.callbacks = {
      label: this.getTooltipLabel,
    };
    return chartProps;
  }

  switchIndexType(indexType) {
    this.setState({ indexType }, () => {
      this.props.segmentActions.clickChartSwitcher('HowFeel', this.state.indexType);
    });
  }

  render() {
    const { howData, ...chartProps } = this.props;
    if (howData.length > 0) {
      this.getChartProps(chartProps);
    }
    else {
      chartProps.chart = null;
    }
    const chartLegend = (
      <div className={styles.pollLegendWrapper}>
        <div className={styles.pollLegendItem}>
          <div className={classnames(styles.legendItemLabel)}>{I18n.t('Супер')}</div>
          <div className={classnames(styles.legendItemValue, styles.good)} />
        </div>
        <div className={styles.pollLegendItem}>
          <div className={classnames(styles.legendItemLabel)}>{I18n.t('В норме')}</div>
          <div className={classnames(styles.legendItemValue, styles.normal)} />
        </div>
        <div className={styles.pollLegendItem}>
          <div className={classnames(styles.legendItemLabel)}>{I18n.t('Не хорошо')}</div>
          <div className={classnames(styles.legendItemValue, styles.bad)} />
        </div>
      </div>
    );
    return <ChartElement {...chartProps} indexType={this.state.indexType} switchIndexType={this.switchIndexType} chartLegend={chartLegend} width="90%" />;
  }

}
