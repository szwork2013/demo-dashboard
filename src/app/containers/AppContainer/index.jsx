import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-redux-i18n';
import DocumentTitle from 'react-document-title';

// Styles.
import '_styles';

export default class AppContainer extends Component {

  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <DocumentTitle title={I18n.t('Welltory - Персональный аналитики здоровья Welltory')}>
        {this.props.children}
      </DocumentTitle>
    );
  }

}
