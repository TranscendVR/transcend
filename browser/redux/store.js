import { createStore, applyMiddleware, combineReducers } from 'redux';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const { userReducer } = require('./reducers/user-reducer');

const rootReducer = combineReducers({
  users: userReducer
});

export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
);
