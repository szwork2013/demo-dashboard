import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

// Reducers.
import rootReducer from '_reducers/rootReducer';

// Middlewares.
import devTools from '_middleware/devTools';
import checkAuth from '_middleware/checkAuth';

export default function configureStore(initialState, history) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history),
        loadingBarMiddleware({
          promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
        }),
        logger,
      ),
      devTools.instrument()
    ),
    checkAuth(),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('_reducers/rootReducer', () => {
      const nextRootReducer = require('_reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
