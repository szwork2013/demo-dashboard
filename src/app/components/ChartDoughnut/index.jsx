import React, { Component, PropTypes } from 'react';

// Components.
import ChartElement from '_components/ChartElement';

export default class ChartDoughnut extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    elementId: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {
    type: 'doughnut',
    labels: [],
    data: [],
    options: {},
  };

  render() {
    return <ChartElement {...this.props} />;
  }

}
