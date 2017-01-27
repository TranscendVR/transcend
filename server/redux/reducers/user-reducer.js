const { Map } = require('immutable');

const { createUser } = require('../../utils');

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

const createAndEmitUser = socket => {
  return dispatch => {
    const id = socket.id;
    const user = Map(createUser(id));
    dispatch(addUser(user));
    socket.on('sceneLoad', () => {
      socket.emit('createUser', user);
    });
    socket.broadcast.emit('newUser', user);
  };
};

const removeUserAndEmit = socket => {
  return dispatch => {
    const id = socket.id;
    dispatch(removeUser(id));
    socket.broadcast.emit('removeUser', id);
  };
};

// const updateUserPosition = (userData, allUsers) => {
//   return dispatch => {
//     const index = allUsers.findIndex(item => (
//     item.get('id') === userData.id));
//     allUsers = allUsers.setIn([index, 'position'], userData.position);
//     allUsers = allUsers.setIn([index, 'rotation'], userData.rotation);
//     dispatch(updateUser(allUsers));
//   };
// };

/* --------------- REDUCER --------------- */
// reducers should be pure functions
function userReducer (state = initialState, action) {
  switch (action.type) {

    case ADD_USER:
      return state.set(action.user.get('id'), action.user);

    case UPDATE_USER_DATA:
      return state.mergeIn([action.userData.get('id')], action.userData);

    case REMOVE_USER:
      return state.filterNot(user => user.get(`${action.id}`) === action.id);

    default:
      return state;
  }
}

module.exports = {
  createAndEmitUser,
  updateUserData,
  removeUserAndEmit,
  userReducer
};
