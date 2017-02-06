const { Map } = require('immutable');

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const ADD_ROOM = 'ADD_ROOM';
const ADD_SOCKET = 'ADD_SOCKET';
const REMOVE_SOCKET = 'REMOVE_SOCKET';

/* --------------- ACTION CREATORS --------------- */

const addRoom = room => {
  return {
    type: ADD_ROOM,
    room
  };
};

const addSocket = (room, socket) => {
  return {
    type: ADD_SOCKET,
    room,
    socket
  };
};

const removeSocket = (room, socket) => {
  return {
    type: REMOVE_SOCKET,
    room,
    socket
  };
};

/* --------------- THUNK ACTION CREATORS --------------- */

/* --------------- REDUCER --------------- */

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM:
      return state.set(action.room, Map({}));
    case ADD_SOCKET:
      return state.setIn([action.room, action.socket.id], action.socket);
    case REMOVE_SOCKET:
      return state.deleteIn([action.room, action.socket.id]);
    default:
      return state;
  }
};


module.exports = {
  addRoom,
  addSocket,
  removeSocket,
  roomReducer
};
