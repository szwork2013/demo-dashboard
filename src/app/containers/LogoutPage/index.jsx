import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions.
import * as AuthActions from '_actions/AuthActions';

@connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    actions: bindActionCreators(AuthActions, dispatch),
  })
)
export default class LogoutPage extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.logout();
  }

  render() {
    return null;
  }

}