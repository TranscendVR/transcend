import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import App from './containers/App';
import Sean from './components/Sean';
import Beth from './components/Beth';
import Yoonah from './components/Yoonah';
import Joey from './components/Joey';
import Lobby from './components/Lobby';
import Login from './components/Login';
import SOCKET from '../socket';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { whoami } from '../redux/reducers/auth';

// Dispatch whoami to set the user whenever you hit the home page
// Primary purpose right now is to set user right after local/OAuth login
const onHomeEnter = () => {
  store.dispatch(whoami());
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" onEnter={onHomeEnter} >
          <IndexRoute component={Login} />
          <Route path="/vr" component={App} >
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
