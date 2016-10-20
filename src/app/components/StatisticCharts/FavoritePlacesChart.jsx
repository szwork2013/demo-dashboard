import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import 'moment-duration-format';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Components.
import ChartElement from '_components/ChartElement';

// Styles.
import styles from './chartLegend.scss';

@autobind
export default class FavoritePlacesChart extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    favoritePlacesData: PropTypes.array.isRequired,
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
          // Favorite places chart.
          {
            type: 'bar',
            label: 'Дом',
            data: [],
            yAxisID: 'favorite-places-y-axis',
            xAxisID: 'favorite-places-x-axis',
            backgroundColor: 'rgb(217, 185, 230)',
            hoverBackgroundColor: 'rgb(175, 139, 189)',
          },
          // Favorite places chart.
          {
            type: 'bar',
            label: 'Работа',
            data: [],
            yAxisID: 'favorite-places-y-axis',
            xAxisID: 'favorite-places-x-axis',
            backgroundColor: 'rgb(187, 232, 203)',
            hoverBackgroundColor: 'rgb(164, 233, 189)',
          },
          // Favorite places chart.
          {
            type: 'bar',
            label: 'Спорт',
            data: [],
            yAxisID: 'favorite-places-y-axis',
            xAxisID: 'favorite-places-x-axis',
            backgroundColor: 'rgb(146, 149, 221)',
            hoverBackgroundColor: 'rgb(128, 130, 203)',
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
              id: 'favorite-places-x-axis',
              stacked: true,
            },
          ],
          yAxes: [
            {
              id: 'favorite-places-y-axis',
              stacked: true,
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 24,
                stepSize: 2,
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
    const { favoritePlacesData, wellnessData } = this.props;
    const { indexType } = this.state;
    chartProps.chart.data.labels = [];
    chartProps.chart.data.datasets[0].data = [];
    chartProps.chart.data.datasets[1].data = [];
    chartProps.chart.data.datasets[2].data = [];
    chartProps.chart.data.datasets[3].data = [];
    wellnessData.map((item, index) => {
      let wellnessValue = NaN;
      if (item[indexType]) {
        if (favoritePlacesData[index].home > 0 || favoritePlacesData[index].sport > 0 || favoritePlacesData[index].work > 0) {
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
    favoritePlacesData.map((item) => {
      const { date, home, sport, work } = item;
      // Label.
      chartProps.chart.data.labels.push(date);
      // Value.
      chartProps.chart.data.datasets[1].data.push(home);
      chartProps.chart.data.datasets[2].data.push(work);
      chartProps.chart.data.datasets[3].data.push(sport);
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
    const { favoritePlacesData, ...chartProps } = this.props;
    if (favoritePlacesData.length > 0) {
      this.getChartProps(chartProps);
    }
    else {
      chartProps.chart = null;
    }
    const chartLegend = (
      <div className={styles.normalLegendWrapper}>
        <div className={styles.normalLegendItem}><div className={classnames(styles.legendItem, styles.home)} />{I18n.t('Дом')}</div>
        <div className={styles.normalLegendItem}><div className={classnames(styles.legendItem, styles.work)} />{I18n.t('Работа')}</div>
        <div className={styles.normalLegendItem}><div className={classnames(styles.legendItem, styles.sport)} />{I18n.t('Спорт')}</div>
      </div>
    );
    return <ChartElement {...chartProps} indexType={this.state.indexType} switchIndexType={this.switchIndexType} chartLegend={chartLegend} />;
  }

}
