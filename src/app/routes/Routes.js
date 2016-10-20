import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { I18n } from 'react-redux-i18n';

// Containers.
import AppContainer from '_containers/AppContainer';
import AuthContainer from '_containers/AuthContainer';
import LoginPage from '_containers/LoginPage';
import LogoutPage from '_containers/LogoutPage';
import ResetPasswordPage from '_containers/ResetPasswordPage';
import DashboardPage, { DashboardPageAdditionalTitle } from '_containers/DashboardPage';
import PaymentPage from '_containers/PaymentPage';
import FaqPage, { FaqPageAdditionalTitle } from '_containers/FaqPage';
import ReportsPage from '_containers/ReportsPage';
import DataSourcesPage from '_containers/DataSourcesPage';

// Components.
import NotFound from '_components/NotFound';

const createRoutes = (store) => {

  const requireLogin = (nextState, replace, cb) => {
    const { auth: { isAuthenticated } } = store.getState();
    if (!isAuthenticated) {
      replace({
        pathname: '/user/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
    cb();
  };

  const redirectAuth = (nextState, replace, cb) => {
    const { auth: { isAuthenticated } } = store.getState();
    if (isAuthenticated) {
      replace({
        pathname: '/dashboard',
        state: { nextPathname: nextState.location.pathname },
      });
    }
    cb();
  };

  return (
    <Route path="/" component={AppContainer}>

      <IndexRedirect to="dashboard" />

      {/*<Route path="user">*/}
        {/*<Route path="login" components={LoginPage} onEnter={redirectAuth} />*/}
        {/*<Route path="logout" components={LogoutPage} onEnter={requireLogin} />*/}
        {/*<Route path="reset-password" components={ResetPasswordPage} onEnter={redirectAuth} />*/}
      {/*</Route>*/}

      { /* Routes requiring login */ }
      <Route component={AuthContainer} onEnter={requireLogin}>
        <Route path="dashboard" title={I18n.t('Индикаторы состояния')} components={{ additionTitle: DashboardPageAdditionalTitle, content: DashboardPage }} />
        <Route path="payment" title={I18n.t('Рекомендуем вам')} components={PaymentPage} />
        <Route path="reports" title={I18n.t('Отчёты')} components={ReportsPage} />
        <Route path="faq" title={I18n.t('FAQ-частые вопросы')} components={{ additionTitle: FaqPageAdditionalTitle, content: FaqPage }} />
        <Route path="data-sources" title={I18n.t('Источники данных')} components={DataSourcesPage} />
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};

export default createRoutes;
