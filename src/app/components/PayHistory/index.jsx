import React, { Component, PropTypes } from 'react';
import { Panel, Table, Button } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';

// Styles.
import styles from './styles.scss';

export default class PayHistory extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
  };

  getLoadMoreButton() {
    return <Button className={styles.loadMoreButton}>{I18n.t('Загрузить ещё')}</Button>;
  }

  render() {
    const { profile } = this.props;
    const isShow = profile.isFetched && profile.profile.is_paid;
    return (
      <Panel header={I18n.t('История операций')} footer={this.getLoadMoreButton()}>
        <Table>
          <thead>
          <tr>
            <th>{I18n.t('Дата')}</th>
            <th>{I18n.t('Описание')}</th>
            <th>{I18n.t('Стоимость')}</th>
          </tr>
          </thead>
          <tbody>
            {isShow && <tr>
              <td>10.08.2016</td>
              <td>Lifescreening</td>
              <td>9900 руб</td>
            </tr>}
          </tbody>
        </Table>
      </Panel>
    );
  }

}
