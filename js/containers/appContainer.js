import React, { Component } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux/native';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

import LaunchNavigator from '../components/launchNavigator/launchNavigator';

const logger = createLogger(); // XXX Remove in production

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger // XXX Remove in production
)(createStore);

const store = createStoreWithMiddleware(rootReducer);
export default class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() => <LaunchNavigator {...this.props} />}
      </Provider>
    );
  }
}
