import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';
import { autobind } from 'core-decorators';

// Components.
import PayProduct from '_components/PayProduct';
import PayConnectedPackages from '_components/PayConnectedPackages';
import PayHistory from '_components/PayHistory';
import AlertMessage from '_components/AlertMessage';

// Actions.
import * as CouponsActions from '_actions/CouponsActions';
import * as ProductsActions from '_actions/ProductsActions';
import * as ProfileActions from '_actions/ProfileActions';

// Styles.
import styles from './styles.scss';

@connect(
  state => ({
    profile: state.profile,
    coupons: state.coupons,
    products: state.products,
    config: state.config,
  }),
  dispatch => ({
    couponsActions: bindActionCreators(CouponsActions, dispatch),
    productsActions: bindActionCreators(ProductsActions, dispatch),
    profileActions: bindActionCreators(ProfileActions, dispatch),
  })
)
@autobind
export default class PaymentPage extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    coupons: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    couponsActions: PropTypes.object.isRequired,
    productsActions: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.productsActions.loadProducts();
  }

  onLoadCoupons(promoCode) {
    this.props.couponsActions.loadCoupons(promoCode);
  }

  onPayProduct(token, coupon, productId) {
    this.props.productsActions.payProduct(token, coupon, productId);
  }

  onClickProductBegin(pathname) {
    this.props.history.push({ pathname });
  }

  onGetPromoCodeValidationState(promoCode) {
    const { isFetched, coupons } = this.props.coupons;
    let promoCodeValidationState;
    if (promoCode) {
      if (isFetched) {
        if (coupons.success) {
          promoCodeValidationState = 'success';
        }
        else {
          promoCodeValidationState = 'error';
        }
      }
    }

    return promoCodeValidationState;
  }

  render() {
    const { coupons, profile, products, history, config } = this.props;
    let productsContent;
    if (products.isFetched) {
      productsContent = products.products.map((product) => {
        const props = {
          onLoadCoupons: this.onLoadCoupons,
          payProduct: this.onPayProduct,
          onClickProductBegin: this.onClickProductBegin,
          onGetPromoCodeValidationState: this.onGetPromoCodeValidationState,
          products,
          product,
          coupons,
          profile,
          history,
          config,
        };
        return <PayProduct key={`product-${product.id}`} {...props} />;
      });
    }
    return (
      <div>
        <div className={styles.paymentWrapper}>
          <Row className={styles.paymentRow}>
            {productsContent}
          </Row>
        </div>
        <Row className={styles.paymentHistoryHeader}>
          <Col xsHidden md={12} sm={12}>
            <h2 className="page-h2-header">{I18n.t('Подключённые пакеты')}</h2>
          </Col>
        </Row>
        <Row className={styles.paymentHistoryWrapper}>
          <Col xsHidden md={6} sm={12} className={styles.connectedPackages}>
            {products.isPaid && <AlertMessage message={`${I18n.t('Покупка успешно совершена')}!`} status="success" isHiddeble />}
            <PayConnectedPackages profile={profile} />
          </Col>
          <Col xsHidden md={6} sm={12} className={styles.connectedPackages}>
            <PayHistory profile={profile} />
          </Col>
        </Row>
      </div>
    );
  }

}
