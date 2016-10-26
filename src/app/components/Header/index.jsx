import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { I18n } from 'react-redux-i18n';
import { autobind } from  'core-decorators';

// Components.
import Logo from '_components/Logo';

// Utils.
import { isIOSApp, getLanguage } from '_utils';

// Styles.
import styles from './styles.scss';

@autobind
export default class Header extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    segmentActions: PropTypes.object.isRequired,
  };

  onClickLogo() {
    this.props.segmentActions.clickLogo();
  }

  onClickUserMenu() {
    this.props.segmentActions.clickUserMenu();
  }

  onClickUserMenuAnalytics() {
    this.props.segmentActions.clickUserMenuAnalytics();
  }

  onClickUserMenuDataSources() {
    this.props.segmentActions.clickUserMenuDataSources();
  }

  onClickUserMenuReports() {
    this.props.segmentActions.clickUserMenuReports();
  }

  onClickUserMenuPayment() {
    this.props.segmentActions.clickUserMenuPayment();
  }

  render() {
    const { profile, isFetched } = this.props.profile;
    const language = getLanguage();
    let username;
    let userpic;
    if (isFetched) {
      username = profile.username || profile.email || '';
      if (profile.userpic) {
        userpic = <img src={profile.userpic} className={styles.userPicture} width="40px" height="40px" />;
      }
      else {
        userpic = <div className={styles.userPicture}>{username.charAt(0)}</div>;
      }
    }
    // @todo: How can I get user picture?
    const userPicture = <div className={styles.userPictureWrapper}>{userpic}</div>;
    return (
      <div className={styles.header}>
        <Navbar className={styles.navbar}>
          <Navbar.Header className={styles.navbarHeader}>
            <Navbar.Brand>
              <Link to="/dashboard" onClick={this.onClickLogo} className={styles.link}><Logo /></Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className={styles.nav} pullRight>
              <Navbar.Text className={styles.userName}>{username}</Navbar.Text>
              <NavDropdown title={userPicture} className={styles.userMenu} onClick={this.onClickUserMenu} id="nav-dropdown" noCaret>
                <LinkContainer to="/dashboard">
                  <MenuItem className={styles.userMenuLink} onClick={this.onClickUserMenuAnalytics}>{I18n.t('Аналитика')}</MenuItem>
                </LinkContainer>
                {/*<LinkContainer to="/faq">*/}
                  {/*<MenuItem className={styles.userMenuLink}>{I18n.t('FAQ')}</MenuItem>*/}
                {/*</LinkContainer>*/}
                {!isIOSApp() && <LinkContainer to="/data-sources">
                  <MenuItem className={styles.userMenuLink} onClick={this.onClickUserMenuDataSources()}>{I18n.t('Источники данных')}</MenuItem>
                </LinkContainer>}
                {language === 'ru' && <LinkContainer to="/reports">
                  <MenuItem className={styles.userMenuLink} onClick={this.onClickUserMenuReports()}>{I18n.t('Отчёты')}</MenuItem>
                </LinkContainer>}
                {language === 'ru' && <LinkContainer to="/payment">
                  <MenuItem className={styles.userMenuLink} onClick={this.onClickUserMenuPayment()}>{I18n.t('Оплата')}</MenuItem>
                </LinkContainer>}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

}
