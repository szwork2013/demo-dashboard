import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import 'moment-duration-format';
import { autobind } from 'core-decorators';

// Components.
import ChartElement from '_components/ChartElement';

const SLEEP_CHART_STEP_SIZE = 2;

@autobind
export default class SleepChart extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    sleepData: PropTypes.array.isRequired,
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
          // Recommendation sleep chart.
          {
            type: 'line',
            label: 'Рек аналитика',
            data: [],
            yAxisID: 'sleep-y-axis',
            fill: false,
            borderColor: '#7FFF00',
            backgroundColor: '#7FFF00',
            lineTension: 0,
            spanGaps: true,
            pointRadius: 0,
          },
          // Sleep chart.
          {
            type: 'bar',
            label: 'Сон',
            data: [],
            yAxisID: 'sleep-y-axis',
            backgroundColor: 'rgb(213, 149, 177)',
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
              id: 'sleep-y-axis',
              ticks: {
                beginAtZero: true,
                max: 24,
                min: 0,
                stepSize: SLEEP_CHART_STEP_SIZE,
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
            if (window.innerWidth <= 768) {
              tooltip.bodyFontSize = 10;
            }
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
    let suffix;
    let value;
    // Wellness chart.
    if (tooltipItem.datasetIndex === 0) {
      suffix = '%';
      value = tooltipItem.yLabel;
    }
    else {
      suffix = I18n.t('ч');
      if (tooltipItem.yLabel === 0) {
        value = '0:00';
      }
      else if (tooltipItem.yLabel < 1) {
        value = `0:${moment.duration(tooltipItem.yLabel, 'hours').format('H:mm')}`;
      }
      else {
        value = moment.duration(tooltipItem.yLabel, 'hours').format('H:mm');
      }
    }
    const label = I18n.t(data.datasets[tooltipItem.datasetIndex].label);
    return `${label} - ${value} ${suffix}`;
  }

  getChartProps(chartProps) {
    const { sleepData, wellnessData } = this.props;
    const { indexType } = this.state;
    chartProps.chart.data.labels = [];
    chartProps.chart.data.datasets[0].data = [];
    chartProps.chart.data.datasets[1].data = [];
    chartProps.chart.data.datasets[2].data = [];
    chartProps.chart.data.datasets[2].backgroundColor = [];
    wellnessData.map((item, index) => {
      let wellnessValue = NaN;
      if (item[indexType]) {
        if (sleepData[index].value > 0) {
          const { value } = item[indexType];
          wellnessValue = value || NaN;
        }
      }
      chartProps.chart.data.datasets[0].data.push(wellnessValue);
    });
    if (indexType === 'battery') {
      chartProps.chart.data.datasets[0].label = I18n.t('Батарейка');
      chartProps.chart.data.datasets[0].borderColor = 'rgb(51, 204, 51)';
      chartProps.chart.data.datasets[0].backgroundColor = 'rgb(51, 204, 51)';
      chartProps.chart.data.datasets[0].pointHoverBackgroundColor = 'rgb(51, 204, 51)';
    }
    else {
      chartProps.chart.data.datasets[0].label = I18n.t('Стресс');
      chartProps.chart.data.datasets[0].borderColor = 'rgb(184, 25, 48)';
      chartProps.chart.data.datasets[0].backgroundColor = 'rgb(184, 25, 48)';
      chartProps.chart.data.datasets[0].pointHoverBackgroundColor = 'rgb(184, 25, 48)';
    }
    let maxValue = 0;
    sleepData.map((item) => {
      const { date, value, level } = item;
      // Label.
      chartProps.chart.data.labels.push(date);
      // Value.
      chartProps.chart.data.datasets[1].data.push(level || NaN);
      chartProps.chart.data.datasets[2].data.push(value);
      // Background color.
      const backgroundColor = '#D595B1';
      chartProps.chart.data.datasets[2].backgroundColor.push(backgroundColor);
      // Check max value.
      if (maxValue < level) {
        maxValue = level;
      }
      if (maxValue < value) {
        maxValue = value;
      }
      return chartProps;
    });
    let maxTick = Math.round(maxValue / SLEEP_CHART_STEP_SIZE) * SLEEP_CHART_STEP_SIZE + SLEEP_CHART_STEP_SIZE;
    if (maxTick > 24) {
      maxTick = 24;
    }
    chartProps.chart.options.scales.yAxes[0].ticks.max = maxTick;
    chartProps.chart.options.tooltips.callbacks = {
      label: this.getTooltipLabel,
    };
    return chartProps;
  }

  switchIndexType(indexType) {
    this.setState({ indexType });
  }

  render() {
    const { sleepData, ...chartProps } = this.props;
    if (sleepData.length > 0) {
      this.getChartProps(chartProps);
    }
    else {
      chartProps.chart = null;
    }
    return <ChartElement {...chartProps} indexType={this.state.indexType} switchIndexType={this.switchIndexType} />;
  }

}
