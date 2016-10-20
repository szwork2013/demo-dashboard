import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row } from 'react-bootstrap';
import { autobind } from 'core-decorators';

// Components.
import WellnessIndicator from '_components/StatusIndicators/WellnessIndicator';
import ActivityIndicator from '_components/StatusIndicators/ActivityIndicator';
import ProductivityIndicator from '_components/StatusIndicators/ProductivityIndicator';
import SleepIndicator from '_components/StatusIndicators/SleepIndicator';

// Actions.
import * as IndicatorsActions from '_actions/IndicatorsActions';

// Styles.
import styles from './styles.scss';

@connect(
  state => ({
    indicators: state.indicators,
  }),
  dispatch => ({
    actions: bindActionCreators(IndicatorsActions, dispatch),
  })
)
@autobind
export default class StatusIndicators extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    indicators: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.loadIndicators();
  }

  render() {
    const { isFetched, indicators } = this.props.indicators;
    return (
      <div className={styles.indicatorWrapper}>
        <Row>
          <WellnessIndicator indicator={indicators.wellness} isFetched={isFetched} />
          <ProductivityIndicator indicator={indicators.productivity} isFetched={isFetched} />
          <ActivityIndicator indicator={indicators.activity} isFetched={isFetched} />
          <SleepIndicator indicator={indicators.sleep} isFetched={isFetched} />
        </Row>
      </div>
    );
  }

}
