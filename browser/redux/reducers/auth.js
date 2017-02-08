import { Map } from 'immutable';
import axios from 'axios';
import { browserHistory } from 'react-router';
import store from '../store';

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const AUTHENTICATED = 'AUTHENTICATED';

/* --------------- ACTION CREATORS --------------- */

export const authenticated = user => ({
  type: AUTHENTICATED, user
});

export const login = (username, password) => {
  return dispatch =>
    axios.post('/api/auth/local/login', { username, password })
    .then((req) => console.log('USER IS: ', req.user))
    .then(() => browserHistory.push('/vr'))
    .catch(err => console.log(err.message));
};

export const signup = (name, displayName, email, password) => {
  return dispatch =>
    axios.post('/api/auth/local/signup', { name, displayName, email, password })
    .then(() => browserHistory.push('/vr'))
    .catch(err => console.log(err.message));
};

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
    .then(() => dispatch(whoami()))
    .catch(() => dispatch(whoami()));

export const whoami = () => {
  return dispatch =>
    axios.get('/api/auth/whoami')
    .then(response => {
      const user = response.data;
      dispatch(authenticated(user));
    })
    .catch(failed => dispatch(authenticated(null)));
};

/* --------------- REDUCER --------------- */

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user;
  }
  return state;
}
