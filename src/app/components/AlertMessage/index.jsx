import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Styles.
import styles from './styles.scss';

// Images.
import success from './images/success.png';
import success2x from './images/success@2x.png';

@autobind
export default class AlertMessage extends Component {

  constructor() {
    super();

    this.state = {
      isShow: true,
    };
  }

  static propTypes = {
    message: PropTypes.string.isRequired,
    isHiddeble: PropTypes.bool,
    status: PropTypes.string,
  };

  static defaultProps = {
    isHiddeble: false,
    status: 'normal',
  };

  onClickClose() {
    this.setState({ isShow: false });
  }

  render() {
    const { message, status, isHiddeble } = this.props;
    const { isShow } = this.state;

    let image;
    let image2x;
    switch (status) {
      case 'success':
        image = success;
        image2x = success2x;
        break;
      // no default
    }

    if (!isShow) {
      return null;
    }

    return (
      <div className={classnames(styles.alertMessage, styles[status])}>
        {image && <img src={image} srcSet={`${image2x} 2x`} />}
        <span className={styles.message}>{message}</span>
        {isHiddeble && <div className={classnames(styles.close, 'pull-right')} onClick={this.onClickClose}>скрыть</div>}
      </div>
    );
  }
}
