import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { I18n } from 'react-redux-i18n';

// Components.
import Logo from '_components/Logo';

// Utils.
import { isIOSApp } from '_utils';

// Styles.
import styles from './styles.scss';

export default class Header extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
  };

  render() {
    const { profile, isFetched } = this.props.profile;
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
              <Link to="/dashboard" className={styles.link}><Logo /></Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className={styles.nav} pullRight>
              <Navbar.Text className={styles.userName}>{username}</Navbar.Text>
              <NavDropdown title={userPicture} className={styles.userMenu} id="nav-dropdown" noCaret>
                <LinkContainer to="/dashboard">
                  <MenuItem className={styles.userMenuLink}>{I18n.t('Аналитика')}</MenuItem>
                </LinkContainer>
                <LinkContainer to="/faq">
                  <MenuItem className={styles.userMenuLink}>{I18n.t('FAQ')}</MenuItem>
                </LinkContainer>
                {!isIOSApp() && <LinkContainer to="/data-sources">
                  <MenuItem className={styles.userMenuLink}>{I18n.t('Источники данных')}</MenuItem>
                </LinkContainer>}
                <LinkContainer to="/reports">
                  <MenuItem className={styles.userMenuLink}>{I18n.t('Отчёты')}</MenuItem>
                </LinkContainer>
                <LinkContainer to="/payment">
                  <MenuItem className={styles.userMenuLink}>{I18n.t('Оплата')}</MenuItem>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }

}
