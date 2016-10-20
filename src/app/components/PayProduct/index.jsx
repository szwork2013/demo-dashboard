import React, { Component, PropTypes } from 'react';
import { Row, Col, Panel, Button, FormGroup, FormControl } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Components.
import PayProductMoreInfo from './PayProductMoreInfo';
import PayProductPaid from './PayProductPaid';

import { PAY_PRODUCT_PRODUCT, PAY_PRODUCT_SUBSCRIPTION } from '_constants/ProductsConstants';
import { PROFILE_STATUS_SCREENING, PROFILE_STATUS_SUBSCRIPTION } from '_constants/ProfileConstants';

// Styles.
import styles from './styles.scss';

@autobind
export default class PayProduct extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    coupons: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onLoadCoupons: PropTypes.func.isRequired,
    payProduct: PropTypes.func.isRequired,
    onClickProductBegin: PropTypes.func.isRequired,
    onGetPromoCodeValidationState: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isShowProductMoreInfo: false,
    };
  }

  onClickToggleProductMoreInfo() {
    const { isShowProductMoreInfo } = this.state;
    // Show ProductMoreInfo.
    this.setState({ isShowProductMoreInfo: !isShowProductMoreInfo });
  }

  getPayProductContent() {
    const { products, product } = this.props;
    const { isShowProductMoreInfo } = this.state;
    const footer = this.getFooter();
    const isPaing = products.isPaying && products.isPayingProductId === product.id;
    const body = (
      <div>
        {isPaing && <div className={styles.payItemProcessTitle}>{I18n.t('Процесс оплаты')}...</div>}
        <Panel styles={styles} className={classnames(styles.payItem, styles.payItemLifescreening, { [styles.payItemProcess]: isPaing })} footer={footer}>
          <div className={styles.payItemImg}>
            <img src={product.img} height={375} width="auto" />
            <div className={styles.payItemTitle}>{product.title}</div>
          </div>
          <div className={styles.payItemDescription}>{product.description}</div>
        </Panel>
      </div>
    );

    return body;
  }

  getFooter() {
    const { coupons, product } = this.props;
    let lifesreeningPrice = parseInt(product.price, 10);
    if (lifesreeningPrice === 0) {
      lifesreeningPrice = I18n.t('Бесплатно');
    }
    else {
      if (coupons.isFetched) {
        if (coupons.coupons.success) {
          lifesreeningPrice -= lifesreeningPrice * (coupons.coupons.discount / 100);
        }
      }
      let currency = product.currency;
      if (product.currency === 'rub') {
        currency = 'руб';
      }
      else if (product.currency === 'usd') {
        currency = '$';
      }
      lifesreeningPrice += ` ${currency}`;
    }
    const footer = (
      <Row className={styles.panelFooter}>
        <Col xs={12} md={6} sm={12} className={styles.panelFooterPayInfo}>
          {product.type === PAY_PRODUCT_PRODUCT ? <div className={styles.payItemMethod}>{I18n.t('Единоразовая оплата')}</div> : <div className={styles.payItemMethod}>{I18n.t('Ежемесячная подписка')}</div> }
          <div className={styles.payItemPrice}>{lifesreeningPrice}</div>
        </Col>
        <Col xs={12} md={6} sm={12} className={styles.panelFooterPayButtons}>
          <Button onClick={this.onClickToggleProductMoreInfo} className={classnames(styles.payButton, styles.payMoreInfoButton)}>{I18n.t('Подробнее')}</Button>
        </Col>
      </Row>
    );

    return footer;
  }



  render() {
    const { product, profile, coupons, config, onClickProductBegin, payProduct, onLoadCoupons, onGetPromoCodeValidationState } = this.props;
    const { isShowProductMoreInfo } = this.state;
    let content = null;
    if (isShowProductMoreInfo) {
      const props = {
        product,
        profile,
        coupons,
        config,
        onLoadCoupons,
        payProduct,
        onGetPromoCodeValidationState,
        onClickToggleProductMoreInfo: this.onClickToggleProductMoreInfo,
      };
      content = <PayProductMoreInfo {...props} />;
    }
    else if (profile.isFetched) {
      if (profile.profile.is_paid) {
        if (product.type === PAY_PRODUCT_PRODUCT) {
          content = <PayProductPaid onClickProductBegin={onClickProductBegin} />;
        }
        else if (product.type === PAY_PRODUCT_SUBSCRIPTION) {
          content = <PayProductPaid onClickProductBegin={onClickProductBegin} />;
        }
        else {
          content = this.getPayProductContent();
        }
      }
      else {
        content = this.getPayProductContent();
      }
    }
    return (
      <Col xs={12} md={6} sm={6} className={styles.paymentPackage}>
        {content}
      </Col>
    );
  }

}
