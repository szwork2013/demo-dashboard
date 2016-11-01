import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';
import moment from 'moment';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import { autobind } from 'core-decorators';

// Components.
import ChartBar from '_components/ChartBar';
import ChartDoughnut from '_components/ChartDoughnut';
import WellnessChart from '_components/StatisticCharts/WellnessChart';
import SleepChart from '_components/StatisticCharts/SleepChart';
import BloodPressureChart from '_components/StatisticCharts/BloodPressureChart';
import ProductivityChart from '_components/StatisticCharts/ProductivityChart';
import ActivityChart from '_components/StatisticCharts/ActivityChart';
import FavoritePlacesChart from '_components/StatisticCharts/FavoritePlacesChart';
import CaloriesChart from '_components/StatisticCharts/CaloriesChart';
import HowDayChart from '_components/StatisticCharts/HowDayChart';
import HowMoodChart from '_components/StatisticCharts/HowMoodChart';
import HowSleepChart from '_components/StatisticCharts/HowSleepChart';
import HowFeelChart from '_components/StatisticCharts/HowFeelChart';
import TemperatureChart from '_components/StatisticCharts/TemperatureChart';
import AtmosphericPressureChart from '_components/StatisticCharts/AtmosphericPressureChart';
import HumidityChart from '_components/StatisticCharts/HumidityChart';
import CloudsChart from '_components/StatisticCharts/CloudsChart';
import PrecipChart from '_components/StatisticCharts/PrecipChart';
import CO2Chart from '_components/StatisticCharts/CO2Chart';

// Actions.
import * as StatisticsActions from '_actions/StatisticsActions';
import * as SegmentActions from '_actions/SegmentActions';

// Utils.
import { getLanguage } from '_utils';

// Images.
import airIcon from './images/air.png';
import arrowIcon from './images/arrow.png';
import bloodPressureIcon from './images/blood_pressure.png';
import caloryIcon from './images/calory.png';
import cloudIcon from './images/cloud.png';
import cloudMoonIcon from './images/cloud_moon.png';
import cloudWetIcon from './images/cloud_wet.png';
import dayIcon from './images/day.png';
import geoIcon from './images/geo.png';
import healsIcon from './images/heals.png';
import manIcon from './images/man.png';
import sleepIcon from './images/sleep.png';
import smileIcon from './images/smile.png';
import sunIcon from './images/sun.png';
import wellnessIcon from './images/wellness.png';
import wetIcon from './images/wet.png';
import workIcon from './images/work.png';

// Styles.
import styles from './styles.scss';

@connect(
  state => ({
    statistics: state.statistics,
    i18n: state.i18n,
  }),
  dispatch => ({
    statisticsActions: bindActionCreators(StatisticsActions, dispatch),
    segmentActions: bindActionCreators(SegmentActions, dispatch),
  })
)
@autobind
export default class StatisticCharts extends Component {

  static propTypes = {
    statisticsActions: PropTypes.object.isRequired,
    segmentActions: PropTypes.object.isRequired,
    statistics: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      startDate: moment().subtract(9, 'days'),
      endDate: moment(),
    };
  }

  componentDidMount() {
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    this.getStatistics(startDate, endDate);
  }

  componentWillMount() {
    const { i18n } = this.props;
    moment.locale(i18n.locale);
  }

  onApplyDateRange(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
    this.getStatistics(picker.startDate, picker.endDate);
  }

  getStatistics(startDate, endDate) {
    const { statisticsActions } = this.props;
    statisticsActions.loadStatistics(moment(startDate).startOf('day'), moment(endDate).endOf('day'));
  }

  onClickDateRangePicker() {
    this.props.segmentActions.clickDateRangePicker();
  }

  render() {
    const { i18n, segmentActions } = this.props;
    const { isFetched, statistics } = this.props.statistics;
    // Daterangepicker local prop.
    const locale = {
      format: 'MM.DD.YYYY',
      // Get full month names.
      monthNames: moment.months(),
    };
    if (i18n.locale === 'ru') {
      // Date format for RU locale.
      locale.format = 'DD.MM.YYYY';
      // Start week with Monday.
      locale.weekStart = 0;
    }
    const start = this.state.startDate.format(locale.format);
    const end = this.state.endDate.format(locale.format);
    const label = `${start} - ${end}`;
    return (
      <div>
        <Row className={styles.choosePeriodWrapper}>
          <Col xs={12} md={6} sm={12}>
            <h2 className="page-h2-header">{I18n.t('Статистика')}</h2>
          </Col>
          <Col xs={12} md={6} sm={12} className={styles.choosePeriod}>
            <Col xs={12} md={6} sm={6}>
              <h3 className="page-h3-header">{I18n.t('Выбрать период')}:</h3>
            </Col>
            <Col xs={12} md={6} sm={6} className={styles.dateTimeRangePicker}>
              <DatetimeRangePicker startDate={this.state.startDate} endDate={this.state.endDate} minDate={moment().subtract(14, 'days')} maxDate={moment()} onApply={this.onApplyDateRange} locale={locale} autoApply opens="left">
                <Button className="selected-date-range-btn" style={{width: '100%'}} onClick={this.onClickDateRangePicker}>
                  <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                  <div className="pull-right">
                    <span>
                      {label}
                    </span>
                    <span className="caret" />
                  </div>
                </Button>
              </DatetimeRangePicker>
            </Col>
          </Col>
        </Row>
        <Row className={styles.statisticChartsWrapper}>
          <WellnessChart id="wellness-chart" title={I18n.t('Самочувствие')} wellnessData={statistics.wellness} isFetched={isFetched} icon={wellnessIcon} segmentActions={segmentActions} />
          <SleepChart id="sleep-chart" title={I18n.t('Сон')} sleepData={statistics.sleep} wellnessData={statistics.wellness} isFetched={isFetched} icon={cloudMoonIcon} segmentActions={segmentActions} />
          <BloodPressureChart id="blood-pressure-chart" title={I18n.t('Арт давление')} bloodPressureData={statistics.bloodPressure} wellnessData={statistics.wellness} isFetched={isFetched} icon={bloodPressureIcon} segmentActions={segmentActions} />
          <ProductivityChart id="productivity-chart" title={I18n.t('Продуктивность')} productivityData={statistics.productivity} wellnessData={statistics.wellness} isFetched={isFetched} icon={workIcon} segmentActions={segmentActions} />
          <ActivityChart id="activity-chart" title={I18n.t('Активность')} activityData={statistics.activity} wellnessData={statistics.wellness} isFetched={isFetched} icon={manIcon} segmentActions={segmentActions} />
          <FavoritePlacesChart id="favorite-chart" title={I18n.t('Важные места')} favoritePlacesData={statistics.favoritePlaces} wellnessData={statistics.wellness} isFetched={isFetched} icon={geoIcon} segmentActions={segmentActions} />
          <CaloriesChart id="calories-chart" title={I18n.t('Калории')} caloriesData={statistics.calories} wellnessData={statistics.wellness} isFetched={isFetched} icon={caloryIcon} segmentActions={segmentActions} />
          <HowDayChart id="how-day-chart" key="how-day-chart" title={`${I18n.t('Как прошел день')}?`} howData={statistics.how_day} wellnessData={statistics.wellness} isFetched={isFetched} icon={dayIcon} segmentActions={segmentActions} />
          <HowMoodChart id="how-day-mood-chart" key="how-day-mood-chart" title={`${I18n.t('Как настроение')}?`} howData={statistics.how_mood} wellnessData={statistics.wellness} isFetched={isFetched} icon={smileIcon} segmentActions={segmentActions} />
          <HowSleepChart id="how-day-sleep-chart" key="how-day-sleep-chart" title={`${I18n.t('Как спалось')}?`} howData={statistics.how_sleep} wellnessData={statistics.wellness} isFetched={isFetched} icon={sleepIcon} segmentActions={segmentActions} />
          <HowFeelChart id="how-day-feel-chart" key="how-day-feel-chart" title={`${I18n.t('Как самочувствие')}?`} howData={statistics.how_feel} wellnessData={statistics.wellness} isFetched={isFetched} icon={healsIcon} segmentActions={segmentActions} />
          <TemperatureChart id="temperature-chart" title={I18n.t('Температура')} temperatureData={statistics.temperature} wellnessData={statistics.wellness} isFetched={isFetched} icon={sunIcon} locale={i18n.locale} segmentActions={segmentActions} />
          <AtmosphericPressureChart id="atmospheric-chart" title={I18n.t('Атм давление')} atmosphericPressureData={statistics.atmosphericPressure} wellnessData={statistics.wellness} isFetched={isFetched} icon={arrowIcon} segmentActions={segmentActions} />
          <HumidityChart id="humidity-chart" title={I18n.t('Влажность')} humidityData={statistics.humidity} wellnessData={statistics.wellness} isFetched={isFetched} icon={wetIcon} segmentActions={segmentActions} />
          <CloudsChart id="clouds-chart" title={I18n.t('Облачность')} cloudsData={statistics.clouds} wellnessData={statistics.wellness} isFetched={isFetched} icon={cloudIcon} segmentActions={segmentActions} />
          <PrecipChart id="precip-chart" title={I18n.t('Осадки')} precipData={statistics.precip} wellnessData={statistics.wellness} isFetched={isFetched} icon={cloudWetIcon} segmentActions={segmentActions} />
          <CO2Chart id="co2-chart" title={I18n.t('СО2')} co2Data={statistics.co2} wellnessData={statistics.wellness} isFetched={isFetched} icon={airIcon} segmentActions={segmentActions} />
        </Row>
      </div>
    );
  }

}
