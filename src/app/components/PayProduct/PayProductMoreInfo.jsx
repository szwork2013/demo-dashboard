import React, { Component, PropTypes } from 'react';
import { Row, Col, Panel, Button, FormGroup, FormControl } from 'react-bootstrap';
import { I18n } from 'react-redux-i18n';
import StripeCheckout from 'react-stripe-checkout';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Styles.
import styles from './styles.scss';

// Images.
import lifescreeningMoreInfo from './images/lifescreeningMoreInfo.png';
import close from './images/close.png';

@autobind
export default class PayProductMoreInfo extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    coupons: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    payProduct: PropTypes.func.isRequired,
    onLoadCoupons: PropTypes.func.isRequired,
    onClickToggleProductMoreInfo: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      promoCode: '',
    };
  }

  onChangePromoCode(e) {
    const promoCode = e.target.value;
    this.setState({ promoCode });
    this.props.onLoadCoupons(promoCode);
  }

  onToken(token) {
    const { product, onClickToggleProductMoreInfo, payProduct } = this.props;
    const { promoCode } = this.state;
    // Hide ProductMoreInfo.
    onClickToggleProductMoreInfo();
    // Send pay data to backend.
    payProduct(token.id, promoCode, product.id);
  }

  getPayProductMoreInfoContent() {
    const { product, onClickToggleProductMoreInfo } = this.props;
    const footer = this.getFooter();
    const content = (
      <Panel className={classnames(styles.payItem, styles.payItemMore)} footer={footer}>
        <div className={styles.payItemMoreInfoTitle}>{product.title}</div>
        <div className={styles.payItemMoreInfoClose} onClick={onClickToggleProductMoreInfo}>
          <img src={close} height={22} />
        </div>
        <img src={lifescreeningMoreInfo} width={102} height={102} className={styles.payItemMoreInfoImg} />
        <div className={styles.payItemMoreInfoDescription}>
          <div className={styles.payItemMoreInfoDescriptionTitle}>Что вы получите:</div>
          <ol>
            <li>8 направлений, 78 показателей, 50 страниц отчёта</li>
            <li>Полная картина вашей жизни на фактах</li>
            <li>Что хорошо, что плохо и что самое важное?</li>
            <li>Разница между вашим представлением и правдой жизни</li>
            <li>Рекомендации по коррекции питания</li>
            <li>Рекомендации по физической активности</li>
            <li>Рекомендации по повышению уровня энергии</li>
            <li>Рекомендации по снижению стресса и повышению продуктивности</li>
            <li>Полный план по коррекции образа жизни</li>
          </ol>
        </div>
      </Panel>
    );

    return content;
  }

  getFooter() {
    const { coupons, product, profile, config, onGetPromoCodeValidationState } = this.props;
    const { promoCode } = this.state;
    let lifesreeningPrice = parseInt(product.price, 10);
    let lifesreeningPriceButton = lifesreeningPrice;
    if (lifesreeningPrice === 0) {
      lifesreeningPriceButton = I18n.t('Бесплатно');
    }
    let promoCodeInfo;
    if (coupons.isFetched) {
      if (coupons.coupons.success) {
        if (lifesreeningPrice !== 0) {
          lifesreeningPrice -= lifesreeningPrice * (coupons.coupons.discount / 100);
        }
        promoCodeInfo = <span style={{ color: '#33cc33' }}>{I18n.t('скидка')} {coupons.coupons.discount}%</span>;
      }
      else {
        promoCodeInfo = <span style={{ color: '#e64a1b' }}> {I18n.t('содержит ошибку')}</span>;
      }
    }

    let currency = product.currency;
    if (product.currency === 'rub') {
      currency = 'руб';
    }
    else if (product.currency === 'usd') {
      currency = '$';
    }
    lifesreeningPriceButton = `${lifesreeningPrice} ${currency}`;

    const stripeProps = {
      token: this.onToken,
      stripeKey: config.config.stripe_key,
      email: profile.profile.email,
      currency: product.currency.toUpperCase(),
      amount: lifesreeningPrice * 100,
      name: 'WELLTORY INC',
      description: product.title,
    };

    const footer = (
      <div className={styles.panelFooter}>
        <Row className={styles.promoCodeRow}>
          <Col xs={12} md={12}>
            <form>
              <FormGroup controlId="formBasicText" validationState={onGetPromoCodeValidationState(promoCode)}>
                {promoCode && <div className={styles.promoCodeInfo}>{I18n.t('Ваш промокод')} {promoCodeInfo}</div>}
                <FormControl type="text" value={promoCode} onChange={this.onChangePromoCode} placeholder={I18n.t('Введите промокод на скидку')} className={classnames(styles.promoCodeInput, {[styles.noEmpty]: promoCode})} />
                <FormControl.Feedback className={styles.promoCodeFeedback} />
              </FormGroup>
            </form>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} sm={12} className={styles.panelFooterPayInfo}>
            <div className={styles.payItemMethod}>{I18n.t('Единоразовая оплата')}</div>
            <div className={styles.payItemPrice}>{lifesreeningPriceButton}</div>
          </Col>
          <Col xs={12} md={6} sm={12} className={styles.panelFooterPayButtons}>
            {config.isFetched && <StripeCheckout {...stripeProps}><Button className={classnames(styles.payButton, styles.payMoreInfoButton)}>{`${I18n.t('Купить за')} ${lifesreeningPriceButton}`}</Button></StripeCheckout>}
          </Col>
        </Row>
      </div>
    );

    return footer;
  }

  render() {
    const content = this.getPayProductMoreInfoContent();
    return content;
  }

}
