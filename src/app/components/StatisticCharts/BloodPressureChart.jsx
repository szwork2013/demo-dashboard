import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import { autobind } from 'core-decorators';

// Components.
import ChartElement from '_components/ChartElement';

// Utils.
import { getLanguage } from '_utils';

const BLOOD_PRESSURE_CHART_STEP_SIZE = 20;

@autobind
export default class BloodPressureChart extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    bloodPressureData: PropTypes.array.isRequired,
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
          // Systolic chart.
          {
            type: 'bar',
            label: 'Систолическое',
            data: [],
            yAxisID: 'blood-pressure-y-axis',
            backgroundColor: 'rgb(255, 111, 148)',
            hoverBackgroundColor: 'rgb(255, 81, 126)',
          },
          // Diastolic chart.
          {
            type: 'bar',
            label: 'Диастолическое',
            data: [],
            yAxisID: 'blood-pressure-y-axis',
            backgroundColor: 'rgb(255, 171, 189)',
            hoverBackgroundColor: 'rgb(254, 130, 157)',
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
              id: 'blood-pressure-y-axis',
              ticks: {
                beginAtZero: true,
                min: 0,
                stepSize: BLOOD_PRESSURE_CHART_STEP_SIZE,
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
    let suffix = I18n.t('мм ртст');
    // Wellness chart.
    if (tooltipItem.datasetIndex === 0) {
      suffix = '%';
    }
    const label = I18n.t(data.datasets[tooltipItem.datasetIndex].label);
    const value = tooltipItem.yLabel;
    return `${label} - ${value} ${suffix}`;
  }

  getChartProps(chartProps) {
    const { bloodPressureData, wellnessData } = this.props;
    const { indexType } = this.state;
    chartProps.chart.data.labels = [];
    chartProps.chart.data.datasets[0].data = [];
    chartProps.chart.data.datasets[1].data = [];
    chartProps.chart.data.datasets[2].data = [];
    wellnessData.map((item, index) => {
      let wellnessValue = NaN;
      if (item[indexType]) {
        if (bloodPressureData[index].systolic > 0 || bloodPressureData[index].diastolic > 0) {
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
    bloodPressureData.map((item) => {
      const { date, systolic, diastolic } = item;
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
      chartProps.chart.data.datasets[1].data.push(systolic || NaN);
      chartProps.chart.data.datasets[2].data.push(diastolic || NaN);
      // Check max value.
      if (maxValue < systolic) {
        maxValue = systolic;
      }
      return chartProps;
    });
    const maxTick = Math.round(maxValue / BLOOD_PRESSURE_CHART_STEP_SIZE) * BLOOD_PRESSURE_CHART_STEP_SIZE + BLOOD_PRESSURE_CHART_STEP_SIZE;
    chartProps.chart.options.scales.yAxes[0].ticks.max = maxTick;
    chartProps.chart.options.tooltips.callbacks = {
      label: this.getTooltipLabel,
    };
    return chartProps;
  }

  switchIndexType(indexType) {
    this.setState({ indexType }, () => {
      this.props.segmentActions.clickChartSwitcher('BloodPressure', this.state.indexType);
    });
  }

  render() {
    const { bloodPressureData, ...chartProps } = this.props;
    if (bloodPressureData.length > 0) {
      this.getChartProps(chartProps);
    }
    else {
      chartProps.chart = null;
    }
    return <ChartElement {...chartProps} indexType={this.state.indexType} switchIndexType={this.switchIndexType} />;
  }

}
