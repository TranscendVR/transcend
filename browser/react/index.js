import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import Login from './components/Login';

import SOCKET from '../socket';

import { whoami } from '../redux/reducers/auth';

// Dispatch whoami to set the user whenever you hit the home page
// Primary purpose right now is to set user right after OAuth
const onHomeEnter = () => {
  store.dispatch(whoami());
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} onEnter={onHomeEnter} />
      <Route path='/login' component={Login} />
    </Router>
  </Provider>,
  document.getElementById('react-app')
);
