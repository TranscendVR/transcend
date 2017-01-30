/* global socket */

import io from 'socket.io-client';
// All A-Frame components need access to the socket instance
window.socket = io.connect();

import { fromJS } from 'immutable';
import store from './redux/store';
import { receiveUsers } from './redux/reducers/user-reducer';

import { putUserOnDOM, addFirstPersonProperties } from './utils';
import './aframeComponents/publish-location';

// `publish-location`, `camera`, `look-controls`, `wasd-controls` are set only
// on the user that the scene belongs to, so that only that scene can be manipulated
// by them.
// The other users will get the updated position via sockets.

// This is the person who connected
socket.on('connect', () => {
  console.log('You\'ve made a persistent two-way connection to the server!');
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
    const otherAvatar = document.getElementById(user.get('id'));
    // If a user's avatar is NOT on the DOM already, add it
    // Convert it back to a normal JS object so we can use putUserOnDOM function as is
    if (otherAvatar === null) {
      putUserOnDOM(user.toJS());
    } else {
      // If a user's avatar is already on the DOM, update it
      otherAvatar.setAttribute('position', `${user.get('x')} ${user.get('y')} ${user.get('z')}`);
      otherAvatar.setAttribute('rotation', `${user.get('xrot')} ${user.get('yrot')} ${user.get('zrot')}`);
    }
  });
});

// Remove a user's avatar when they disconnect from the server
socket.on('removeUser', userId => {
  console.log('Removing user.');
  const scene = document.getElementById('scene');
  const avatarToBeRemoved = document.getElementById(userId);
  scene.remove(avatarToBeRemoved); // Remove from scene
  avatarToBeRemoved.parentNode.removeChild(avatarToBeRemoved); // Remove from DOM
});
