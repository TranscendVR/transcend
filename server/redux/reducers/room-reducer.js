const { Map } = require('immutable');

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const ADD_ROOM = 'ADD_ROOM';
const ADD_SOCKET_TO_ROOM = 'ADD_SOCKET_TO_ROOM';
const REMOVE_SOCKET_FROM_ROOM = 'REMOVE_SOCKET_FROM_ROOM';

/* --------------- ACTION CREATORS --------------- */

const addRoom = room => {
  return {
    type: ADD_ROOM,
    room
  };
};

const addSocketToRoom = (room, socket) => {
  return {
    type: ADD_SOCKET_TO_ROOM,
    room,
    socket
  };
};

const removeSocketFromRoom = (room, socket) => {
  return {
    type: REMOVE_SOCKET_FROM_ROOM,
    room,
    socket
  };
};

/* --------------- REDUCER --------------- */

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM:
      return state.set(action.room, Map({}));
    case ADD_SOCKET_TO_ROOM:
      return state.setIn([action.room, action.socket.id], action.socket);
    case REMOVE_SOCKET_FROM_ROOM:
      return state.deleteIn([action.room, action.socket.id]);
    default:
      return state;
  }
};


module.exports = {
  addRoom,
  addSocketToRoom,
  removeSocketFromRoom,
  roomReducer
};
