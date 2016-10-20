import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import axios from 'axios';

// Store.
import configureStore from '_store/configureStore';

// Routes.
import createRoutes from '_routes/Routes';

// Languages.
import languages from '_languages';

axios.defaults.baseURL = 'https://stage-api.welltory.com';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
}

const initialState = window.__initialState__ || undefined;
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(languages));
let language;
if (navigator.languages) {
  language = navigator.languages[0];
}
else {
  language = navigator.language || 'ru';
}
language = language.split('-')[0];
store.dispatch(setLocale(language));

const routes = createRoutes(store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
