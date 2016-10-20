import React, { Component, PropTypes } from 'react';

// Components.
import ChartElement from '_components/ChartElement';

export default class ChartBar extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    elementId: PropTypes.string.isRequired,
    labels: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {
    type: 'bar',
    labels: [],
    data: [],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 100,
          },
        }],
      },
    },
  };

  render() {
    return <ChartElement {...this.props} />;
  }

}
