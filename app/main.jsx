import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';

// import store from './store';

import App from './components/App';
import Home from './components/Home';

render(
  // <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home} />
    </Route>
  </Router>,
  // </Provider>,
  document.getElementById('main')
);
