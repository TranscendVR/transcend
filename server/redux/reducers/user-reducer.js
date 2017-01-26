const { List, Map } = require('immutable');

const { createUser } = require('../../utils');

/* --------------- INITIAL STATE --------------- */

const initialState = List([]);

/* --------------- ACTIONS --------------- */

const ADD_USER = 'ADD_USER';
const UPDATE_USER_POSITION = 'UPDATE_USER_POSITION';

// // For user who just joined, create a user
// const CREATE_USER = 'CREATE_USER';
// // For user who just joined, get all users already there
// const GET_USERS = 'GET_USERS';
// // For users already there, get user who just joined
// const ADD_USER = 'ADD_USER';
// // For users in room, remove user if they disconnect
// const REMOVE_USER = 'REMOVE_USER';

/* --------------- ACTION CREATORS --------------- */

const addUser = user => {
  return {
    type: ADD_USER,
    user
  };
};

const updateUser = userPosition => {
  return {
    type: UPDATE_USER_POSITION,
    userPosition
  }
}
// const createUser = id => {
//   return {
//     type: CREATE_USER,
//     id
//   };
// };

// const getUsers = () => {
//   return {
//     type: GET_USERS
//   };
// };

// const removeUser = id => {
//   return {
//     type: REMOVE_USER,
//     id
//   };
// };

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

/* --------------- REDUCER --------------- */

function userReducer (state = initialState, action) {
  switch (action.type) {

    case ADD_USER:
      return state.push(action.user);

    case UPDATE_USER_POSITION:
      const index = state.findIndex(item => (
      item.get('id') === action.userPosition.id));
      state = state.setIn([index, 'position'], action.userPosition.position);
      state = state.setIn([index, 'rotation'], action.userPosition.rotation);
      return state;

    default:
      return state;
  }
}

module.exports = {
  createAndEmitUser,
  updateUser,
  userReducer
};
