import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import { autobind } from 'core-decorators';

// Components.
import ChartElement from '_components/ChartElement';

const TEMPERATURE_CHART_STEP_SIZE_RU = 5;
const TEMPERATURE_CHART_STEP_SIZE_EN = 10;

@autobind
export default class TemperatureChart extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    temperatureData: PropTypes.array.isRequired,
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
          // Temperature chart.
          {
            type: 'bar',
            label: 'Температура',
            data: [],
            yAxisID: 'temperature-y-axis',
            backgroundColor: 'rgb(255, 217, 143)',
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
              id: 'temperature-y-axis',
              ticks: {
                beginAtZero: true,
                // max: 8,
              },
              position: 'left',
            },
            {
              id: 'wellness-y-axis',
              ticks: {
                beginAtZero: false,
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
    const { locale } = this.props;
    let suffix;
    let value = tooltipItem.yLabel;
    // Wellness chart.
    if (tooltipItem.datasetIndex === 0) {
      suffix = '%';
    }
    else {
      if (locale === 'ru') {
        suffix = '°C';
      }
      else {
        suffix = '°F';
      }
    }
    const label = I18n.t(data.datasets[tooltipItem.datasetIndex].label);

    return `${label} - ${value} ${suffix}`;
  }

  getChartProps(chartProps) {
    const { temperatureData, wellnessData, locale } = this.props;
    const { indexType } = this.state;
    chartProps.chart.data.labels = [];
    chartProps.chart.data.datasets[0].data = [];
    chartProps.chart.data.datasets[1].data = [];
    wellnessData.map((item, index) => {
      let wellnessValue = NaN;
      if (item[indexType]) {
        if (temperatureData[index].value) {
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
    temperatureData.map((item) => {
      const { date, value } = item;
      // Label.
      chartProps.chart.data.labels.push(date);
      // Value.
      let temperatureValue = value;
      if (locale !== 'ru') {
        temperatureValue = Math.floor(1.8 * value + 32);
      }
      chartProps.chart.data.datasets[1].data.push(temperatureValue);
      // Check max value.
      if (maxValue < temperatureValue) {
        maxValue = temperatureValue;
      }
      return chartProps;
    });
    let stepSize;
    if (locale === 'ru') {
      stepSize = TEMPERATURE_CHART_STEP_SIZE_RU;
    }
    else {
      stepSize = TEMPERATURE_CHART_STEP_SIZE_EN;
    }
    const maxTick = Math.round(maxValue / stepSize) * stepSize + stepSize;
    // Set stepSize for Temperature y axes.
    chartProps.chart.options.scales.yAxes[0].ticks.stepSize = stepSize;
    chartProps.chart.options.scales.yAxes[0].ticks.max = maxTick;
    chartProps.chart.options.tooltips.callbacks = {
      label: this.getTooltipLabel,
    };
    return chartProps;
  }

  switchIndexType(indexType) {
    this.setState({ indexType }, () => {
      this.props.segmentActions.clickChartSwitcher('Temperature', this.state.indexType);
    });
  }

  render() {
    const { temperatureData, ...chartProps } = this.props;
    if (temperatureData.length > 0) {
      this.getChartProps(chartProps);
    }
    else {
      chartProps.chart = null;
    }
    return <ChartElement {...chartProps} indexType={this.state.indexType} switchIndexType={this.switchIndexType} />;
  }

}
