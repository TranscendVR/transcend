import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import Login from './components/Login';

import SOCKET from '../socket';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='/login' component={Login} />
    </Router>
  </Provider>,
  document.getElementById('react-app')
);
