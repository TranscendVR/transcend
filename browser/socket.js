/* global socket */

import io from 'socket.io-client';
// All A-Frame components need access to the socket instance
window.socket = io.connect();

import { fromJS } from 'immutable';
import store from './redux/store';
import { receiveUsers } from './redux/reducers/user-reducer';

import { putUserOnDOM, addFirstPersonProperties } from './utils';
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
    // Pull the path off the URL, stripping forward slashes
    // For example, "localhost:1337/sean" would return "sean"
    // If we are at the root path, we instead received "root"
    // These values are passed up as "scene" in the user tick and correspond to the names of react components and a-scenes
    const currentScene = window.location.pathname.replace(/\//g, '') || 'root';
    // If the user is on the current scene, add or update the user
    if (user.get('scene') === currentScene) {
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
    } else { // If the user is not on the scene, make sure the user is not on the DOM
      const otherAvatar = document.getElementById(user.get('id'));
      if (otherAvatar) {
        otherAvatar.parentNode.removeChild(otherAvatar);
      }
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
