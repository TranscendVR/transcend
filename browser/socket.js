/* global socket */

import io from 'socket.io-client';
// All A-Frame components need access to the socket instance
window.socket = io.connect();

import { fromJS } from 'immutable';
import store from './redux/store';
import { receiveUsers } from './redux/reducers/user-reducer';

import { putUserOnDOM, putUserBodyOnDOM, addFirstPersonProperties } from './utils';
import './aframeComponents/publish-location';
import { setupLocalMedia, disconnectUser, addPeerConn, removePeerConn, setRemoteAnswer, setIceCandidate } from './webRTC/client';

// `publish-location`, `camera`, `look-controls`, `wasd-controls` are set only
// on the user that the scene belongs to, so that only that scene can be manipulated
// by them.
// The other users will get the updated position via sockets.

// This is the person who connected
socket.on('connect', () => {
  console.log('You\'ve made a persistent two-way connection to the server!');
  setupLocalMedia();
});

socket.on('createUser', user => {
  const avatar = putUserOnDOM(user);
  addFirstPersonProperties(avatar);
  socket.emit('getOthers');
});

// When someone connects initially, this will get any other users already there
socket.on('getOthersCallback', users => {
  console.log('Checking to see if anyone is here');
  // For each existing user that the backend sends us, put on the DOM
  Object.keys(users).forEach(user => {
    putUserOnDOM(users[user]);
    putUserBodyOnDOM(users[user]);
  });
  // This goes to the server, and then goes to `publish-location` to tell the `tick` to start
  socket.emit('haveGottenOthers');
  // This goes to the server, and then back to the function with the setInterval
  // Needed an intermediary for between when the other components are put on the DOM
  // and the start of the interval loop
  socket.emit('readyToReceiveUpdates');
});

// Using a filtered users array, this updates the position & rotation of every other user
socket.on('usersUpdated', users => {
  // Convert users to Immutable structure before sending to store
  store.dispatch(receiveUsers(fromJS(users)));
  
  const receivedUsers = store.getState().users;
  receivedUsers.valueSeq().forEach(user => {
    const avatarHead = document.getElementById(user.get('id'));
    const avatarBody = document.getElementById(`${user.get('id')}-body`);
    // If a user's avatar is NOT on the DOM already, add it
    // Convert it back to a normal JS object so we can use putUserOnDOM function as is
    if (avatarHead === null) {
      const userObj = user.toJS();
      putUserOnDOM(userObj);
      putUserBodyOnDOM(userObj);
    } else {
      // If a user's avatar is already on the DOM, update it
      avatarHead.setAttribute('position', `${user.get('x')} ${user.get('y')} ${user.get('z')}`);
      avatarHead.setAttribute('rotation', `${user.get('xrot')} ${user.get('yrot')} ${user.get('zrot')}`);
      avatarBody.setAttribute('position', `${user.get('x')} ${user.get('y')} ${user.get('z')}`);
      avatarBody.setAttribute('rotation', `0 ${user.get('yrot')} 0`);
    }
  });
});

// Remove a user's avatar when they disconnect from the server
socket.on('removeUser', userId => {
  console.log('Removing user.');
  const headToBeRemoved = document.getElementById(userId);
  headToBeRemoved.parentNode.removeChild(headToBeRemoved);
  const bodyToBeRemoved = document.getElementById(`${userId}-body`);
  bodyToBeRemoved.parentNode.removeChild(bodyToBeRemoved); // Remove from DOM
});

// Adds a Peer to our DoM as their own Audio Element
socket.on('addPeer', addPeerConn);

// Removes Peer from DoM after they have disconnected or switched room
socket.on('removePeer', removePeerConn);

// Replies to an offer made by a new Peer
socket.on('sessionDescription', setRemoteAnswer);

// Handles setting the ice server for an ice Candidate
socket.on('iceCandidate', setIceCandidate);

// Removes all peer connections and audio Elements from the DoM
socket.on('disconnect', disconnectUser);
