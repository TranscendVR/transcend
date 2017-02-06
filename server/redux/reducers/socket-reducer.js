const { Map } = require('immutable');

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const ADD_SOCKET = 'ADD_SOCKET';
const REMOVE_SOCKET = 'REMOVE_SOCKET';

/* --------------- ACTION CREATORS --------------- */

const addSocket = socket => {
  return {
    type: ADD_SOCKET,
    socket
  };
};

const removeSocket = socket => {
  return {
    type: REMOVE_SOCKET,
    socket
  };
};

/* --------------- REDUCER --------------- */

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SOCKET:
      return state.set(action.socket.id, action.socket);
    case REMOVE_SOCKET:
      return state.delete(action.socket.id);
    default:
      return state;
  }
};


module.exports = {
  addSocket,
  removeSocket,
  socketReducer
};
