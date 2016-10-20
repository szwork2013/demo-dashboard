import React, { Component } from 'react';
import { Nav, Navbar, MenuItem, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { I18n } from 'react-redux-i18n';

// Styles.
import styles from './styles.scss';

export default class Footer extends Component {

  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.footerMenu}>
          <Navbar className={styles.footerMenuNavbar}>
            <Nav className={styles.footerMenuNav}>
              <LinkContainer to="https://welltory.com" target="_blank" rel="nofollow noopener">
                <MenuItem className={styles.userMenuLink}>Welltory Inc.</MenuItem>
              </LinkContainer>
              <LinkContainer to="/faq">
                <MenuItem className={styles.userMenuLink}>{I18n.t('FAQ')}</MenuItem>
              </LinkContainer>
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  }

}
