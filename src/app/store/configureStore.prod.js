import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { createTracker } from 'redux-segment';

// Reducers.
import rootReducer from '_reducers/rootReducer';

// Middlewares.
import checkAuth from '_middleware/checkAuth';

export default function configureStore(initialState, history) {
  const tracker = createTracker();
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
        tracker,
      ),
    ),
    checkAuth(),
  );

  return store;
}
