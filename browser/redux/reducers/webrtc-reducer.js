import { Map } from 'immutable';

// This is the state of our current webRtc connections and the media elements associated with them
const initialState = Map({
  localMediaStream: null,
  peers: Map({}),
  peerMediaElements: Map({})
});
/* --------------- ACTIONS --------------- */

const SET_USER_MEDIA = 'SET_USER_MEDIA';
const ADD_PEER = 'ADD_PEER';
const DELETE_PEER = 'DELETE_PEER';
const CLEAR_PEERS = 'CLEAR_PEERS';

/* --------------- ACTION CREATORS --------------- */

export const setUserMedia = (stream) => {
  return {
    type: SET_USER_MEDIA,
    stream
  };
};

export const addPeer = (peerId, peerConnection) => {
  return {
    type: ADD_PEER,
    peerId,
    peerConnection
  };
};

export const deletePeer = (peerId) => {
  return {
    type: DELETE_PEER,
    peerId
  };
};

export const clearPeers = () => {
  return {
    type: CLEAR_PEERS
  };
};

/* --------------- REDUCER --------------- */

export default function webrtcReducer (state = initialState, action) {
  switch (action.type) {

    case SET_USER_MEDIA:
      return state.set('localMediaStream', action.stream);

    case ADD_PEER:
      return state.setIn(['peers', action.peerId], action.peerConnection);

    case DELETE_PEER:
      return state.deleteIn(['peers', action.peerId]);

    case CLEAR_PEERS:
      // I didn't use .clear here because I want to keep the localMediaStream
      return state.set('peers', Map({})).set('peerMediaElements', Map({}));

    default:
      return state;
  }
}
