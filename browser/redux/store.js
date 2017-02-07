import { createStore, applyMiddleware, combineReducers } from 'redux';

// import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import userReducer from './reducers/user-reducer';
import authReducer from './reducers/auth';
import configReducer from './reducers/config-reducer';

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  config: configReducer
});

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
    // createLogger({ collapsed: true })
  )
);
