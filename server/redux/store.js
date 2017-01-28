const { createStore, applyMiddleware, combineReducers } = require('redux');
const thunkMiddleware = require('redux-thunk').default;

const { userReducer } = require('./reducers/user-reducer');

const rootReducer = combineReducers({
  users: userReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

module.exports = store;
