/* global socket */
import io from 'socket.io-client';
// All A-Frame components need access to the socket instance
window.socket = io.connect(window.location.origin);
import { fromJS } from 'immutable';
import store from './redux/store';
import { receiveUsers } from './redux/reducers/user-reducer';
import { putUserOnDOM, putUserBodyOnDOM, addFirstPersonProperties } from './utils';
import './aframeComponents/publish-location';
import './aframeComponents/webrtc-controls';
import { disconnectUser, addPeerConn, removePeerConn, setRemoteAnswer, setIceCandidate } from './webRTC/client';

socket.on('connect', () => {
  console.log('You\'ve made a persistent two-way connection to the server!');
});

// Render the user returned by the server, add first person attributes (camera, controls,
//   and ticks pushed to server), then get other users in the scene
socket.on('renderAvatar', user => {
  const avatar = putUserOnDOM(user);
  addFirstPersonProperties(avatar, user);
  socket.emit('getOthers');
});

// Perform an initial render the other users' avatars (after local filtering) and emit the following:
//     --haveGottenOthers: an event that causes the server to emit the startTick event, which causes
//       this client's publish-location components to begin broadcating real-time updates to the server.
//       While this likely seems unneccesary, the intention of this ping-pong is to provide
//       a hook for the server to throttle the frequency of client updates to the server.
//     --readyToReceiveUpdates: an event that tells the server to begin sending the ticks of other
//       users' avatars to this client. This only occurs after the initial render of the users is
//       complete, which should avoid potential jenk when joining a room with many avatars.
socket.on('getOthersCallback', users => {
  console.log('Checking to see if anyone is here');
  Object.keys(users).forEach(user => {
    putUserOnDOM(users[user]);
    putUserBodyOnDOM(users[user]);
  });
  socket.emit('haveGottenOthers');
  socket.emit('readyToReceiveUpdates');
});

// Once subscribed via 'readyToReceiveUpdates,' the server emits 'usersUpdated' with an array
//   of all users other than the client's user to allow the client to render/update the avatars.
//   Currently, clients must perform local filtering to determine if an avatar is in the same
//   room. The users' avatar components (body and head) are added, updated, or deleted depending
//   on the state of the client's DOM.
socket.on('usersUpdated', users => {
  store.dispatch(receiveUsers(fromJS(users)));
  const receivedUsers = store.getState().users;
  receivedUsers.valueSeq().forEach(user => {
    // Pull the path off the URL, stripping forward slashes
    // For example, "localhost:1337/sean" would return "sean"
    // If we are at the root path, we instead received "root"
    // These values are passed up as "scene" in the user tick and correspond to the names of react components and a-scenes
    const currentScene = window.location.pathname.replace(/\//g, '') || 'root';
    const avatarHead = document.getElementById(user.get('id'));
    const avatarBody = document.getElementById(`${user.get('id')}-body`);
    // If the user is on the current scene, add or update the user's avatar
    if (user.get('scene') === currentScene) {
      // If a user's avatar is NOT on the DOM already, add it
      if (avatarHead === null) {
        const userObj = user.toJS();
        putUserOnDOM(userObj);
        putUserBodyOnDOM(userObj);
        // If the user's avatar is on the DOM, but not the right skin, remove and redraw it
      } else if (avatarHead.getAttribute('skin') !== user.get('skin')) {
        removeUser(user.get('id'));
        const userObj = user.toJS();
        putUserOnDOM(userObj);
        putUserBodyOnDOM(userObj);
        // Otherwise, just update the avatar's position attributes
      } else {
        avatarHead.setAttribute('position', `${user.get('x')} ${user.get('y')} ${user.get('z')}`);
        avatarHead.setAttribute('rotation', `${user.get('xrot')} ${user.get('yrot')} ${user.get('zrot')}`);
        avatarBody.setAttribute('position', `${user.get('x')} ${user.get('y')} ${user.get('z')}`);
        avatarBody.setAttribute('rotation', `0 ${user.get('yrot')} 0`);
      }
      // If the user is not on the scene, make sure the user is not on the DOM
    } else {
      if (avatarHead || avatarBody) removeUser(user.get('id'));
    }
  });
});

// Remove the avatar of userID from the A-Frame scene and DOM.
function removeUser (userId) {
  console.log('Removing user ', userId);
  const scene = document.getElementById('scene');
  const headToBeRemoved = document.getElementById(userId);
  console.log(`Attempting to remove ${userId}-body`);
  const bodyToBeRemoved = document.getElementById(`${userId}-body`);
  if (headToBeRemoved) {
    scene.remove(headToBeRemoved);
    headToBeRemoved.parentNode.removeChild(headToBeRemoved);
  }
  if (bodyToBeRemoved) {
    scene.remove(bodyToBeRemoved);
    bodyToBeRemoved.parentNode.removeChild(bodyToBeRemoved);
  }
}
socket.on('removeUser', userId => removeUser(userId));

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
