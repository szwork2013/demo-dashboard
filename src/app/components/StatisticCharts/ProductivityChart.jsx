import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import { autobind } from 'core-decorators';

// Components.
import ChartElement from '_components/ChartElement';

@autobind
export default class ProductivityChart extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    productivityData: PropTypes.array.isRequired,
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
          // Productivity chart.
          {
            type: 'bar',
            label: 'Продуктивно',
            data: [],
            yAxisID: 'productivity-y-axis',
            xAxisID: 'productivity-x-axis',
            backgroundColor: 'rgb(192, 228, 148)',
            hoverBackgroundColor: 'rgb(99, 223, 89)',
          },
          // Productivity chart.
          {
            type: 'bar',
            label: 'Нейтрально',
            data: [],
            yAxisID: 'productivity-y-axis',
            xAxisID: 'productivity-x-axis',
            backgroundColor: 'rgb(198, 232, 114)',
            hoverBackgroundColor: 'rgb(191, 241, 66)',
          },
          // Productivity chart.
          {
            type: 'bar',
            label: 'Прокрастинация',
            data: [],
            yAxisID: 'productivity-y-axis',
            xAxisID: 'productivity-x-axis',
            backgroundColor: 'rgb(251, 255, 163)',
            hoverBackgroundColor: 'rgb(255, 253, 118)',
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
          xAxes: [
            {
              id: 'productivity-x-axis',
              stacked: true,
            },
          ],
          yAxes: [
            {
              id: 'productivity-y-axis',
              stacked: true,
              ticks: {
                beginAtZero: true,
                max: 100,
              },
              position: 'left',
            },
            {
              id: 'wellness-y-axis',
              stacked: false,
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
    let suffix = '%';
    // Wellness chart.
    if (tooltipItem.datasetIndex === 0) {
      suffix = '%';
    }
    const label = I18n.t(data.datasets[tooltipItem.datasetIndex].label);
    const value = tooltipItem.yLabel;
    return `${label} - ${value} ${suffix}`;
  }

  getChartProps(chartProps) {
    const { productivityData, wellnessData } = this.props;
    const { indexType } = this.state;
    chartProps.chart.data.labels = [];
    chartProps.chart.data.datasets[0].data = [];
    chartProps.chart.data.datasets[1].data = [];
    chartProps.chart.data.datasets[2].data = [];
    chartProps.chart.data.datasets[3].data = [];
    wellnessData.map((item, index) => {
      let wellnessValue = NaN;
      if (item[indexType]) {
        if (productivityData[index].productive > 0 || productivityData[index].neutral > 0 || productivityData[index].distracting > 0) {
          const { value } = item[indexType];
          wellnessValue = value || NaN;
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
    productivityData.map((item) => {
      const { date, distracting, neutral, productive } = item;
      // Label.
      chartProps.chart.data.labels.push(date);
      // Value.
      chartProps.chart.data.datasets[1].data.push(productive);
      chartProps.chart.data.datasets[2].data.push(neutral);
      chartProps.chart.data.datasets[3].data.push(distracting);
      return chartProps;
    });
    chartProps.chart.options.tooltips.callbacks = {
      label: this.getTooltipLabel,
    };
    return chartProps;
  }

  switchIndexType(indexType) {
    this.setState({ indexType });
  }

  render() {
    const { productivityData, ...chartProps } = this.props;
    if (productivityData.length > 0) {
      this.getChartProps(chartProps);
    }
    else {
      chartProps.chart = null;
    }
    return <ChartElement {...chartProps} indexType={this.state.indexType} switchIndexType={this.switchIndexType} />;
  }

}
