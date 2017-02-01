import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import Sean from './components/Sean';
import Beth from './components/Beth';
import Yoonah from './components/Yoonah';
import Joey from './components/Joey';

import SOCKET from '../socket';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='/sean' component={Sean} />
      <Route path='/beth' component={Beth} />
      <Route path='/yoonah' component={Yoonah} />
      <Route path='/joey' component={Joey} />
    </Router>
  </Provider>,
  document.getElementById('react-app')
);
