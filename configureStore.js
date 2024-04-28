// @flow
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
const middleware = createReactNavigationReduxMiddleware(
  state => state.navReducer,
);
function configureStore(initialState = undefined) {
  const logger = createLogger();
  const enhancer = compose(applyMiddleware(middleware, thunk, promise, logger));
  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore;
