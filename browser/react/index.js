import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import App from './components/App';
import Sean from './components/Sean';
import Beth from './components/Beth';
import Yoonah from './components/Yoonah';
import Joey from './components/Joey';
import Lobby from './components/Lobby';
import Login from './components/Login';
import SOCKET from '../socket';
import { logout } from '../redux/reducers/auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { whoami } from '../redux/reducers/auth';

// Dispatch whoami to set the user whenever you hit the home page
// Primary purpose right now is to set user right after local/OAuth login
const onHomeEnter = () => {
  if (store.getState().auth.id) browserHistory.push('/vr');
  store.dispatch(whoami())
    .then(() => {
      let id = store.getState().auth.id;
      console.log('ID: ', id);
      if (id) browserHistory.push('/vr');
    });

  console.log('Owner ID: ', store.getState().auth.get('ownerID'));
  console.log('Owner ID: ', store.getState().auth.get('ownerID'));
};

const confirmLogin = () => {
  if (store.getState().auth.id) return;
  store.dispatch(whoami())
    .then(() => {
      let id = store.getState().auth.id;
      console.log('ID: ', id);
      if (id) return;
      browserHistory.push('/');
    });
};

const bye = () => {
  store.dispatch(logout())
    .then(() => browserHistory.push('/'));
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" onEnter={onHomeEnter} >
          <IndexRoute component={Login} />
          <Route path="/logout" onEnter={bye} />
          <Route path="/vr" component={App} onEnter={confirmLogin}>
            <IndexRedirect to="lobby" />
            <Route path="lobby" component={Lobby} />
            <Route path="sean" component={Sean} />
            <Route path="beth" component={Beth} />
            <Route path="yoonah" component={Yoonah} />
            <Route path="joey" component={Joey} />
          </Route>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-app')
);
