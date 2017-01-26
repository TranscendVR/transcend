import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from '../redux/store';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './components/App';

import SOCKET from '../sockets';

ReactDOM.render(
  // <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
    </Router>,
  // </Provider>,
  document.getElementById('react-app')
);
