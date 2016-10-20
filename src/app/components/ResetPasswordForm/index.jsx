import React, { Component, PropTypes } from 'react';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { I18n } from 'react-redux-i18n';
import { autobind } from 'core-decorators';

@autobind
export default class ResetPasswordForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      email: '',
    };
  }

  onChangeEmail(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  onSubmitResetPassword(e) {
    e.preventDefault();
    const { email } = this.state;
    this.props.onSubmit(email);
  }

  render() {
    const { email } = this.state;
    return (
      <form onSubmit={this.onSubmitResetPassword} className="formBasic">
        <FormGroup controlId="formBasicText">
          <FormControl type="text" value={email} onChange={this.onChangeEmail} placeholder={I18n.t('Ваш email')} />
        </FormGroup>
        <FormGroup>
          <Button type="submit" bsStyle="primary" className="btn btn-block"><span className="hawcons hawcons-lock-rounded-open" />{I18n.t('Отправить')}</Button>
        </FormGroup>
        <div className="formLinks">
          <Row>
            <Col xs={6} md={6}>
              <Link to="https://welltory.typeform.com/to/yHWByk" target="_blank" rel="nofollow noopener">{I18n.t('Регистрация')}</Link>
            </Col>
            <Col xs={6} md={6}>
              <Link to="/user/login">{I18n.t('Войти')}</Link>
            </Col>
          </Row>
        </div>
      </form>
    );
  }

}
