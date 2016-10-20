import React from 'react';

// Images.
import logo from './images/logo.png';
import logo2x from './images/logo@2x.png';

// Styles.
import styles from './styles.scss';

const Logo = () => <img src={logo} srcSet={`${logo2x} 2x`} className={styles.logo} />;

export default Logo;
