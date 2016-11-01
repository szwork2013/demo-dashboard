import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import { autobind } from 'core-decorators';

// Components.
import ChartElement from '_components/ChartElement';

// Utils.
import { getLanguage } from '_utils';

const CO2_CHART_STEP_SIZE = 100;

@autobind
export default class CO2Chart extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    co2Data: PropTypes.array.isRequired,
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
          // CO2 chart.
          {
            type: 'bar',
            label: 'CO2',
            data: [],
            yAxisID: 'co2-y-axis',
            backgroundColor: 'rgb(205, 253, 252)',
            hoverBackgroundColor: 'rgb(168, 243, 241)',
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
              id: 'co2-y-axis',
              ticks: {
                beginAtZero: true,
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
    let suffix = I18n.t('ppm');
    // Wellness chart.
    if (tooltipItem.datasetIndex === 0) {
      suffix = '%';
    }
    const label = I18n.t(data.datasets[tooltipItem.datasetIndex].label);
    const value = tooltipItem.yLabel;
    return `${label} - ${value} ${suffix}`;
  }

  getChartProps(chartProps) {
    const { co2Data, wellnessData } = this.props;
    const { indexType } = this.state;
    chartProps.chart.data.labels = [];
    chartProps.chart.data.datasets[0].data = [];
    chartProps.chart.data.datasets[1].data = [];
    wellnessData.map((item, index) => {
      let wellnessValue = NaN;
      if (item[indexType]) {
        if (co2Data[index].value > 0) {
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
    co2Data.map((item) => {
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
      // Check max value.
      if (maxValue < value) {
        maxValue = value;
      }
      return chartProps;
    });
    chartProps.chart.options.scales.yAxes[0].ticks.max = Math.round(maxValue / CO2_CHART_STEP_SIZE) * CO2_CHART_STEP_SIZE + CO2_CHART_STEP_SIZE;
    chartProps.chart.options.tooltips.callbacks = {
      label: this.getTooltipLabel,
    };
    return chartProps;
  }

  switchIndexType(indexType) {
    this.setState({ indexType }, () => {
      this.props.segmentActions.clickChartSwitcher('CO2', this.state.indexType);
    });
  }

  render() {
    const { co2Data, ...chartProps } = this.props;
    if (co2Data.length > 0) {
      this.getChartProps(chartProps);
    }
    else {
      chartProps.chart = null;
    }
    return <ChartElement {...chartProps} indexType={this.state.indexType} switchIndexType={this.switchIndexType} />;
  }

}
