import React, { Component, PropTypes } from 'react';
import { Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { I18n } from 'react-redux-i18n';
import { autobind } from 'core-decorators';

@autobind
export default class LoginForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeEmail(e) {
    const email = e.target.value;
    this.setState({ email });
  }

  onChangePassword(e) {
    const password = e.target.value;
    this.setState({ password });
  }

  onSubmitLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const creds = { email, password };
    this.props.onSubmit(creds);
  }

  validationEmail() {
    const { email } = this.state;
    let status = 'success';
    if (email.indexOf('@') === -1) {
      status = 'error';
    }
    return status;
  }

  validationPassword() {
    const { password } = this.state;
    let status = 'success';
    if (password.length === 0) {
      status = 'error';
    }
    return status;
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.onSubmitLogin} className="formBasic">
        <FormGroup controlId="formBasicText">
          <FormControl type="text" value={email} onChange={this.onChangeEmail} placeholder={I18n.t('Ваш email')} />
        </FormGroup>
        <FormGroup controlId="formBasicText">
          <FormControl type="password" value={password} onChange={this.onChangePassword} placeholder={I18n.t('Ваш пароль')} />
        </FormGroup>
        <FormGroup>
          <Button type="submit" bsStyle="primary" className="btn btn-block"><span className="hawcons hawcons-key" />{I18n.t('Войти')}</Button>
        </FormGroup>
        <div className="formLinks">
          <Row>
            <Col xs={6} md={6}>
              <Link to="https://welltory.typeform.com/to/yHWByk" target="_blank" rel="nofollow noopener">{I18n.t('Регистрация')}</Link>
            </Col>
            <Col xs={6} md={6}>
              <Link to="/user/reset-password">{I18n.t('Забыли пароль')}?</Link>
            </Col>
          </Row>
        </div>
      </form>
    );
  }

}
