const { createStore, applyMiddleware, combineReducers } = require('redux');
const createLogger = require('redux-logger');
const thunkMiddleware = require('redux-thunk').default;

const { userReducer } = require('./reducers/user-reducer');

const rootReducer = combineReducers({
  users: userReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
);

module.exports = store;
