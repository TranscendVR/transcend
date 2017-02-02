import { createStore, applyMiddleware, combineReducers } from 'redux';

// import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import userReducer from './reducers/user-reducer';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer
});

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
    // createLogger({ collapsed: true })
  )
);
