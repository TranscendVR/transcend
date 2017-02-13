import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './components/App';
import Sean from './components/Sean';
import Beth from './components/Beth';
import Yoonah from './components/Yoonah';
import Joey from './components/Joey';
import Lobby from './components/Lobby';
import ChangingRoom from './components/ChangingRoom';
import Home from './components/Login/Home';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import SOCKET from '../socket';
import { whoami, logout } from '../redux/reducers/auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Dispatch whoami to set the user whenever you hit the home page
// Primary purpose right now is to set user right after local/OAuth login
const onHomeEnter = () => {
  // Clear the DIV in the physical DOM that provides initial feedback to user while bundle.js loads
  document.getElementById('prebundleContent').setAttribute('style', 'display: none;');
  if (window.location.pathname === '/login') {
    if (store.getState().auth.has('id')) browserHistory.push('/vr');
    store.dispatch(whoami())
      .then(() => {
        const user = store.getState().auth;
        if (user.has('id')) {
          window.socket.emit('connectUser', user);
          browserHistory.push('/vr');
        }
      });
  }
};

const confirmLogin = () => {
  // Clear the DIV in the physical DOM that provides initial feedback to user while bundle.js loads
  document.getElementById('prebundleContent').setAttribute('style', 'display: none;');
  const user = store.getState().auth;
  if (!user.has('id')) {
    store.dispatch(whoami())
      .then(() => {
        const user = store.getState().auth;
        if (user.has('id')) {
          window.socket.emit('connectUser', user);
          return;
        }
        browserHistory.push('/');
      });
  }
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
          <IndexRedirect to="/login" />
          <Route component={Home}>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Route>
          <Route path="/logout" onEnter={bye} />
          <Route path="/vr" component={App} onEnter={confirmLogin}>
            <IndexRedirect to="lobby" />
            <Route path="lobby" component={Lobby} />
            <Route path="thebasement" component={Sean} />
            <Route path="spaceroom" component={Beth} />
            <Route path="catroom" component={Yoonah} />
            <Route path="gameroom" component={Joey} />
            <Route path="thegap" component={ChangingRoom} />
          </Route>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-app')
);
