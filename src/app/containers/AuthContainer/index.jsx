import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-bootstrap';
import LoadingBar from 'react-redux-loading-bar';
import cookie from 'react-cookie';

// Components.
import Header from '_components/Header';
import Footer from '_components/Footer';
import IntercomChat from '_components/IntercomChat';
import SmoochChat from '_components/SmoochChat';

// Actions.
import * as ProfileActions from '_actions/ProfileActions';
import * as ConfigActions from '_actions/ConfigActions';
import * as SegmentActions from '_actions/SegmentActions';

// Styles.
import styles from './styles.scss';

@connect(
  state => ({
    profile: state.profile,
    config: state.config,
  }),
  dispatch => ({
    profileActions: bindActionCreators(ProfileActions, dispatch),
    configActions: bindActionCreators(ConfigActions, dispatch),
    segmentActions: bindActionCreators(SegmentActions, dispatch),
  })
)
export default class AuthContainer extends Component {

  static propTypes = {
    profileActions: PropTypes.object.isRequired,
    configActions: PropTypes.object.isRequired,
    segmentActions: PropTypes.object.isRequired,
    additionTitle: PropTypes.element,
    content: PropTypes.element,
    children: PropTypes.element,
  };

  componentDidMount() {
    this.props.profileActions.loadUserProfile();
    // this.props.configActions.loadConfig();
  }

  render() {
    const { profile, config, segmentActions } = this.props;
    const pageTitle = this.props.content ? this.props.content.props.route.title : this.props.children.props.route.title;
    const pageAdditionTitle = this.props.additionTitle || null;
    return (
      <div>
        <LoadingBar className={styles.loadingBar} />
        <Header profile={profile} segmentActions={segmentActions} />
        <Grid className="main-wrapper">
          <Row className={styles.titleWrapper}>
            {pageTitle && <Col xsHidden md={6} className={styles.title}>
              <h1>{pageTitle}</h1>
            </Col>}
            {pageAdditionTitle && <Col xs={12} md={6} className={styles.additionTitle}>
              {pageAdditionTitle}
            </Col>}
          </Row>
          <Row className={styles.contentWrapper}>
            <Col xs={12} md={12}>
              {this.props.content || this.props.children}
            </Col>
          </Row>
        </Grid>
        <Footer segmentActions={segmentActions} />
        <SmoochChat profile={profile} config={config} />
      </div>
    );
  }

}
