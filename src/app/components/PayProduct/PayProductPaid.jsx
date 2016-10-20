import React, { Component, PropTypes } from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Styles.
import styles from './styles.scss';

// Images.
import lifescreeningPaid from './images/lifescreeningPaid.png';

@autobind
export default class PayProductPaid extends Component {

  static propTypes = {
    onClickProductBegin: PropTypes.func.isRequired,
  };

  onClickProductBegin(e) {
    e.preventDefault();
    this.props.onClickProductBegin('/dashboard');
  }

  getPayProductPaidContent() {
    const footer = this.getFooter();
    const body = (
      <Panel className={styles.payItem} footer={footer}>
        <div className={styles.payItemImg}>
          <img src={lifescreeningPaid} height={375} width="auto" />
          <div className={styles.payItemTitle}>{I18n.t('Аналитика')}</div>
        </div>
        <div className={styles.payItemDescription}>Вы получите большой красивый отчёт со всеми выкладками и симпатичными графиками. По этому отчёту вы сможете получить консультацию и задать вопросы вашему диетологу, фитнес-тренеру, неврологу, терапевту и вашему персональному аналитику, чтобы вам все было понятно.</div>
      </Panel>
    );

    return body;
  }

  getFooter() {
    const footer = (
      <Row className={styles.panelFooter}>
        <Col xs={12} md={6} sm={12} className={styles.panelFooterPayInfo}>
          <div className={styles.payItemMethod}>{I18n.t('Доступные опции')}</div>
          <div className={styles.payItemPrice}>{I18n.t('Исследуйте образ жизни')}</div>
        </Col>
        <Col xs={12} md={6} sm={12} className={styles.panelFooterPayButtons}>
          <Button onClick={this.onClickProductBegin} className={classnames(styles.payButton, styles.payPaidButton)}>{I18n.t('Приступить')}</Button>
        </Col>
      </Row>
    );

    return footer;
  }

  render() {
    const content = this.getPayProductPaidContent();
    return content;
  }

}
