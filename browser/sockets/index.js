/* global socket */

import io from 'socket.io-client';
// All A-Frame components need access to the socket instance
window.socket = io.connect();

import { putUserOnDOM } from '../utils';
import '../aframeComponents/publish-location';

let scene;

// `publish-location`, `camera`, `look-controls`, `wasd-controls` are set only
// on the user that the scene belongs to, so that only that scene can be manipulated
// by them.
// The other users will get the updated position via sockets.

// This is the person who connected
socket.on('connect', () => {
  console.log('You\'ve made a persistent two-way connection to the server!');
});

socket.on('createUser', user => {
  scene = document.querySelector('a-scene');
  const avatar = document.createElement('a-entity');
  scene.appendChild(avatar);
  avatar.setAttribute('id', user.id);
  avatar.setAttribute('geometry', 'primitive', 'box');
  avatar.setAttribute('material', 'color', user.color);
  avatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  avatar.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
  avatar.setAttribute('publish-location', true);
  avatar.setAttribute('camera', true);
  avatar.setAttribute('look-controls', true);
  avatar.setAttribute('wasd-controls', true);
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

// For those who are already there, this will update if someone new connects
socket.on('newUser', user => {
  console.log('Someone else has joined');
  putUserOnDOM(user);
});

// Using a filtered users array, this updates the position & rotation of every other user
socket.on('usersUpdated', users => {
  console.log('Updating position for all users');
  Object.keys(users).forEach(user => {
    const otherAvatar = document.querySelector(`#${users[user].id}`);
    otherAvatar.setAttribute('position', `${users[user].x} ${users[user].y} ${users[user].z}`);
    otherAvatar.setAttribute('rotation', `${users[user].xrot} ${users[user].yrot} ${users[user].zrot}`);
  });
});

// Remove a user's avatar when they disconnect from the server
socket.on('removeUser', userId => {
  console.log('Removing user.');
  const avatarToBeRemoved = document.querySelector(`#${userId}`);
  scene.remove(avatarToBeRemoved); // Remove from scene
  avatarToBeRemoved.parentNode.removeChild(avatarToBeRemoved); // Remove from DOM
});
