import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Row, Col, Panel, Checkbox, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import moment from 'moment';
import { autobind } from 'core-decorators';

// Actions.
import * as ReportsActions from '_actions/ReportsActions';

// Constants.
import * as ReportsConstants from '_constants/ReportsConstants';

// Styles.
import styles from './styles.scss';

@connect(
  state => ({
    profile: state.profile,
    reports: state.reports,
    i18n: state.i18n,
  }),
  dispatch => ({
    actions: bindActionCreators(ReportsActions, dispatch),
  })
)
@autobind
export default class ReportsPage extends Component {

  static propTypes = {
    reports: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      period: 'week',
    };
  }

  componentDidMount() {
    this.props.actions.loadReports();
  }

  getReportsContent() {
    const { reports, i18n } = this.props;
    let content;
    if (reports.reports.length === 0) {
      content = (
        <tr>
          <td colSpan="3">{I18n.t('Скоро будет создан Ваш первый отчёт')}.</td>
        </tr>
      );
    }
    else {
      let format;
      if (i18n.locale === 'ru') {
        format = 'DD.MM.YYYY';
      }
      else {
        format = 'MM.DD.YYYY';
      }
      content = reports.reports.map((report) => {
        return (
          <tr>
            <td className={styles.reportDate}>{moment(report.date).format(format)}</td>
            <td className={styles.reportTitle}>{report.title}</td>
            <td className={styles.reportLink}><Link to={report.link} target="_blank" rel="nofollow noopener">{I18n.t('Смотреть отчёт')}</Link></td>
          </tr>
        );
      });
    }
    return content;
  }

  getLoadMoreButton() {
    return <Button className={styles.loadMoreButton}>{I18n.t('Загрузить ещё')}</Button>;
  }

  onClickSortByDate(e) {
    e.preventDefault();
    this.props.actions.sortReports();
  }

  render() {
    const { reports, profile } = this.props;
    const sortColumnClass = classnames('fa', {
      'fa-caret-down': reports.sort === ReportsConstants.REPORTS_SORT_DESC,
      'fa-caret-up': reports.sort === ReportsConstants.REPORTS_SORT_ASC,
    });
    return (
      <Row>
        <Col xs={12} md={6} sm={12}>
          {<Panel header={I18n.t('Все отчёты')} footer={this.getLoadMoreButton()}>
            <Table className={styles.reportsTable}>
              <thead>
                <tr>
                  <th><a onClick={this.onClickSortByDate}>{I18n.t('Дата')} <i className={sortColumnClass} /></a></th>
                  <th className="hidden-xs">{I18n.t('Описание')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reports.isFetched && this.getReportsContent()}
              </tbody>
            </Table>
          </Panel>}
        </Col>
        <Col xs={12} md={6} sm={12}>
          {profile.isFetched && <Panel header={I18n.t('Настройки оповещений')}>
            <Checkbox>{I18n.t('Отправлять мне уведомления на email email, когда будет готов новый отчёт', { email: profile.profile.email })}</Checkbox>
          </Panel>}
        </Col>
      </Row>
    );
  }

}
