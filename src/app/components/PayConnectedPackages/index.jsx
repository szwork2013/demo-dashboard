import React, { Component, PropTypes } from 'react';
import { Panel, FormGroup, Button } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';

// Styles.
import styles from './styles.scss';

// Images.
import lifescreening from './images/lifescreening.png';
import card from './images/card.png';
import card2x from './images/card@2x.png';

export default class PayConnectedPackages extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      question: '',
    };
  }

  onClickAskQuestion(e) {
    e.preventDefault();
    if (window.Intercom) {
      window.Intercom('show');
    }
  }

  render() {
    const { isFetched, profile } = this.props.profile;
    const { question } = this.state;
    let isPaid = false;
    let header;
    let footer;
    let content;
    if (isFetched) {
      if (!profile.is_paid) {
        content = (
          <div className={styles.connectedPackagesEmpty}>
            {I18n.t('У вас нет подключённых услуг')}
          </div>
        );
      }
      else {
        isPaid = true;
        header = (
          <div>
            <div className="pull-left">
              <h3 style={{ marginTop: '3px', fontFamily: 'RalewayMedium', lineHeight: '27px' }}>LifeScreening</h3>
            </div>
            <div className="pull-right">
              <div className={styles.connectedPackagesStatus}>{I18n.t('Оплачено')}</div>
            </div>
          </div>
        );
        footer = <Button onClick={this.onClickAskQuestion} placeholder="Задать вопрос" className={classnames(styles.questionInput)} />;
        content = (
          <div className={styles.connectedPackageInfo}>
            <img src={lifescreening} width={127} height={127} style={{ float: 'left' }} />
            <div style={{ marginLeft: '160px' }}>
              <div style={{ width: '200px', float: 'left', fontFamily: 'RalewayMedium' }}>{I18n.t('Стоимость')}:</div><div style={{ fontFamily: 'RalewayLight' }}>9900 руб</div>
              <div style={{ width: '200px', float: 'left', fontFamily: 'RalewayMedium' }}>{I18n.t('Последний платеж')}:</div><div style={{ fontFamily: 'RalewayLight' }}>10.08.2016</div>
              <div style={{ width: '200px', float: 'left', fontFamily: 'RalewayMedium' }}>{I18n.t('Следующий платеж')}:</div><div style={{ fontFamily: 'RalewayLight' }}>10.09.2016</div>
              <div style={{ marginTop: '20px' }}>
                <img src={card} srcSet={`${card2x} 2x`} width={57} height={41} style={{ float: 'left' }} />
                <div style={{ marginLeft: '80px' }}>
                  <div style={{ fontFamily: 'RalewayMedium', textTransform: 'uppercase' }}>{I18n.t('Способ оплаты')}</div>
                  <div style={{ fontFamily: 'RalewayLight' }}><span style={{ textTransform: 'uppercase', color: '#e64a1b' }}>xxxx xxxx xxxx</span> 4488</div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    return (
      <Panel header={header} footer={footer} className={classnames(styles.connectedPackages, {[styles.isConnected]: isPaid})}>
        {content}
      </Panel>
    );
  }

}
