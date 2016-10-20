import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import { autobind } from 'core-decorators';

// Components.
import ChartElement from '_components/ChartElement';

const ACTIVITY_CHART_STEP_SIZE = 2000;

@autobind
export default class ActivityChart extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    activityData: PropTypes.array.isRequired,
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
          // Recommendation activity chart.
          {
            type: 'line',
            label: 'Рек аналитика',
            data: [],
            yAxisID: 'activity-y-axis',
            fill: false,
            borderColor: '#7FFF00',
            backgroundColor: '#7FFF00',
            lineTension: 0,
            spanGaps: true,
            pointRadius: 0,
          },
          // Activity chart.
          {
            type: 'bar',
            label: 'Активность',
            data: [],
            yAxisID: 'activity-y-axis',
            backgroundColor: 'rgb(252, 166, 81)',
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
              id: 'activity-y-axis',
              ticks: {
                beginAtZero: true,
                min: 0,
                stepSize: ACTIVITY_CHART_STEP_SIZE,
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
    let suffix = I18n.t('шагов');
    // Wellness chart.
    if (tooltipItem.datasetIndex === 0) {
      suffix = '%';
    }
    const label = I18n.t(data.datasets[tooltipItem.datasetIndex].label);
    const value = tooltipItem.yLabel;
    return `${label} - ${value} ${suffix}`;
  }

  getChartProps(chartProps) {
    const { activityData, wellnessData } = this.props;
    const { indexType } = this.state;
    chartProps.chart.data.labels = [];
    chartProps.chart.data.datasets[0].data = [];
    chartProps.chart.data.datasets[1].data = [];
    chartProps.chart.data.datasets[2].data = [];
    chartProps.chart.data.datasets[2].backgroundColor = [];
    wellnessData.map((item, index) => {
      let wellnessValue = NaN;
      if (item[indexType]) {
        if (activityData[index].value > 0) {
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
    activityData.map((item) => {
      const { date, value, level } = item;
      // Label.
      chartProps.chart.data.labels.push(date);
      // Value.
      chartProps.chart.data.datasets[1].data.push(level || NaN);
      chartProps.chart.data.datasets[2].data.push(value);
      // Background color.
      const backgroundColor = 'rgb(252, 166, 81)';
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
    chartProps.chart.options.scales.yAxes[0].ticks.max = Math.round(maxValue / ACTIVITY_CHART_STEP_SIZE) * ACTIVITY_CHART_STEP_SIZE + ACTIVITY_CHART_STEP_SIZE;
    chartProps.chart.options.tooltips.callbacks = {
      label: this.getTooltipLabel,
    };
    return chartProps;
  }

  switchIndexType(indexType) {
    this.setState({ indexType });
  }

  render() {
    const { activityData, ...chartProps } = this.props;
    if (activityData.length > 0) {
      this.getChartProps(chartProps);
    }
    else {
      chartProps.chart = null;
    }
    return <ChartElement {...chartProps} indexType={this.state.indexType} switchIndexType={this.switchIndexType} />;
  }

}
