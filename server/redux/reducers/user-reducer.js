const { Map } = require('immutable');

const { User } = require('../../utils');

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const ADD_USER = 'ADD_USER';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const REMOVE_USER = 'REMOVE_USER';

/* --------------- ACTION CREATORS --------------- */

const addUser = user => {
  return {
    type: ADD_USER,
    user
  };
};

const updateUserData = userData => {
  return {
    type: UPDATE_USER_DATA,
    userData
  };
};

const removeUser = userId => {
  return {
    type: REMOVE_USER,
    userId
  };
};

/* --------------- THUNK ACTION CREATORS --------------- */

const createAndEmitUser = (socket, user) => {
  return dispatch => {
    const userId = socket.id;
    const displayName = user.displayName;
    const skin = user.skin;
    const newUser = Map(new User(userId, displayName, skin));
    dispatch(addUser(newUser));
    console.log('User created');
    if (socket.sceneLoaded) {
      socket.emit('renderAvatar', newUser);
    }
  };
};

const removeUserAndEmit = socket => {
  return dispatch => {
    const userId = socket.id;
    dispatch(removeUser(userId));
    socket.broadcast.emit('removeUser', userId);
  };
};

/* --------------- REDUCER --------------- */

function userReducer (state = initialState, action) {
  switch (action.type) {

    case ADD_USER:
      return state.set(action.user.get('id'), action.user);

    case UPDATE_USER_DATA:
      return state.mergeIn([action.userData.get('id')], action.userData);

    case REMOVE_USER:
      return state.delete(action.userId);

    default:
      return state;
  }
}

module.exports = {
  ADD_USER,
  UPDATE_USER_DATA,
  REMOVE_USER,
  createAndEmitUser,
  updateUserData,
  removeUserAndEmit,
  userReducer
};
