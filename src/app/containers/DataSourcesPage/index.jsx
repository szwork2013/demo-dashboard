import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Tab, Col, Panel, Thumbnail, Button, Modal, ResponsiveEmbed } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import { autobind } from 'core-decorators';
// import './connect';

// Actions.
import * as DataSourcesActions from '_actions/DataSourcesActions';

// Styles.
import styles from './styles.scss';

@connect(
  state => ({
    profile: state.profile,
    datasources: state.datasources,
    i18n: state.i18n,
  }),
  dispatch => ({
    actions: bindActionCreators(DataSourcesActions, dispatch),
  })
)
@autobind
export default class DataSourcesPage extends Component {

  static propTypes = {
    datasources: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      activeCategory: 'all',
      activeCategoryContent: null,
      activeSource: null,
      showConnectModal: false,
      startURL: null,
    };
  }

  componentDidMount() {
    this.props.actions.loadDatasources();
  }

  getCategoriesTabs(locale: 'ru') {
    const { datasources } = this.props;
    const categories = datasources.categories.map((category) => {
      let title = '';
      if (category.name[locale]) {
        title = category.name[locale];
      }
      else if (category.name.ru) {
        title = category.name.ru;
      }
      return <Tab title={title} eventKey={category.id} onExit={() => this.onClickSource(null)} key={`datasources-category-${category.id}`}>{this.getCatergoryContent(category.slug, locale)}</Tab>;
    });
    categories.unshift(<Tab title={I18n.t('Все')} eventKey="all" onExit={() => this.onClickSource(null)} key="datasources-category-all">{this.getCatergoryContent('all', locale)}</Tab>);
    return categories;
  }

  getCategorySources(slug) {
    if (slug === 'all') {
      return this.props.datasources.sources;
    }
    return this.props.datasources.sources.filter((source) => {
      if (source.categories.indexOf(slug) !== -1) {
        return source;
      }
      return null;
    });
  }

  getCatergoryContent(slug, locale) {
    const sources = this.getCategorySources(slug);
    let sourcesContent;
    if (sources.length === 0) {
      sourcesContent = (
        <Col xs={12} md={12}>
          <div>К сожалению, в данный момент у нас нету источников в этой категории.</div>
        </Col>
      );
    }
    else {
      sourcesContent = sources.map((source, index) => {
        return (
          <Col xs={6} md={3} sm={6} key={`source-col-${index}`} className={styles.sourceCol}>
            <div className={classnames(styles.sourceThumbnailWraper, { [styles.activeSource]: this.state.activeSource === source.provider })}>
              <Thumbnail href="#" src={source.icon_url} onClick={() => this.onClickSource(source.provider)} className={classnames(styles.source, { [styles.connectedSource]: source.connected }, { [styles.activeSource]: this.state.activeSource === source.provider })} />
              <div className={styles.sourceName}>{source.name.ru}</div>
            </div>
          </Col>
        );
      });
    }
    let activeSourceContent;
    let activeSource;
    let activeSourceHeader;
    if (this.state.activeSource) {
      activeSource = this.props.datasources.sources.find((source) => {
        if (source.provider === this.state.activeSource) {
          return source;
        }
        return null;
      });

      let activeSourceName = '';
      let activeSourceDescription = '';
      if (activeSource.name[locale]) {
        activeSourceName = activeSource.name[locale];
        activeSourceDescription = activeSource.description[locale];
      }
      else if (activeSource.name.ru) {
        activeSourceName = activeSource.name.ru;
        activeSourceDescription = activeSource.description.ru;
      }

      activeSourceHeader = (
        <div>
          <h3 className="pull-left">{activeSourceName}</h3>
          <h3 className={classnames(styles.sourceHeader, { [styles.connectedSource]: activeSource.connected }, 'pull-right')}>{activeSource.connected ? I18n.t('Подключён') : I18n.t('Не подключён')}</h3>
        </div>
      );
      activeSourceContent = (
        <div>
          <Col xs={12} md={3} className={styles.activeSourceIcon}>
            <div className={styles.sourceThumbnailWraper}>
              <Thumbnail src={activeSource.icon_url} className={classnames(styles.source, { [styles.connectedSource]: activeSource.connected })} />
              {activeSource.connected ? <Button onClick={() => this.onClickSwitchSource('off', activeSource)} className={[styles.button, styles.offButton]}>{I18n.t('Отключить')} </Button> : <Button onClick={() => this.onClickSwitchSource('on', activeSource)} className={[styles.button, styles.onButton]}>{I18n.t('Подключить')}</Button>}
            </div>
          </Col>
          <Col xs={12} md={9} className={styles.activeSourceDescription}>
            <div>{activeSourceDescription}</div>
          </Col>
        </div>
      );
    }
    return (
      <div>
        <Col xs={12} md={6} sm={6} className={classnames(styles.sourcesWrapper)}>
          <Panel header={I18n.t('Список источников')} className={styles.categorySources}>
            {sourcesContent}
          </Panel>
        </Col>
        <Col xs={12} md={6} sm={6} className={styles.sourceWrapper}>
          {this.state.activeSource && <Panel header={activeSourceHeader} className={classnames(styles.categorySources, 'header-all')}>
            {activeSourceContent}
          </Panel>}
        </Col>
      </div>
    );
  }

  onSelectCategory(activeCategory) {
    this.setState({ activeCategory });
  }

  onClickSource(sourceProvider) {
    this.setState({ activeSource: sourceProvider });
  }

  onClickSwitchSource(switchAction, source) {
    const { actions, profile } = this.props;
    if (source.is_human_api) {
      var options = {
        clientUserId: encodeURIComponent(profile.profile.email),
        clientId: '2d679befae97fece9a8bd20e77eac3542bed9a8a', // grab it from app settings page
        publicToken: profile.profile.humanapi_token ? profile.profile.humanapi_token : '',  // Leave blank for new users
        modal: 1,

        finish: function(err, sessionTokenObject) {
          actions.connectDatasource(sessionTokenObject);

          /* Called after user finishes connecting their health data
           You need to post `sessionTokenObject` to your server to then:
           1. Append your `clientSecret` to it
           2. Send send it to our server for user credentials

           Sending a POST request with jQuery might look like this
           (it's not necessary to use jQuery):
           */
          // $.post('/your-servers-endpoint', sessionTokenObject, function(res){
          //
          // });

          // Include code here to refresh the page.

        },
        close: function() {
          actions.trackDatasource();
          /* Optional callback called when a user closes the popup
           without connecting any data sources */
        },
        error: function(err) {
          /* Optional callback called if an error occurs when loading
           the popup. */

          // `err` has fields: `code`, `message`, `detailedMessage`
        }
      }

      HumanConnect.open(options);
    }
    else {
      if (switchAction === 'on') {
        if (source.start_url) {
          window.open(source.start_url, '_parent');
        }
      }
      else {
        if (source.end_url) {
          window.open(source.end_url, '_blank');
        }
      }
    }

    return null;
  }

  onLoadIframe() {
  }

  render() {
    const { datasources, i18n } = this.props;
    if (!datasources.isFetched) {
      return null;
    }
    return (
      <div className={styles.wrapper}>
        {this.state.activeSource && <Button onClick={() => this.onClickSource(null)} className={styles.backButtonToSources}>{`< ${I18n.t('назад к списку источников')}`}</Button>}
        <Tabs id="data-source-tabs" activeKey={this.state.activeCategory} onSelect={this.onSelectCategory} className={classnames(styles.dataSourceTabs, { [styles.active]: this.state.activeSource })}>
          {this.getCategoriesTabs(i18n.locale)}
        </Tabs>

        <Modal show={this.state.showConnectModal}>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <iframe ref="iframeConnect" src={this.state.startURL} onLoad={this.onLoadIframe} width="100%" height={600} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }

}

@connect(
  state => ({
    i18n: state.i18n,
  })
)
export class DataSourcesPageAdditionalTitle extends Component {

  render() {
    let message;
    if (this.props.i18n.locale === 'ru') {
      message = 'Это демо, подключение данных не будет работать:)';
    }
    else {
      message = 'Demo mode, data sources connection not available';
    }
    return <h2 style={{ color: '#e64a1b' }}>{message}</h2>;
  }

}
