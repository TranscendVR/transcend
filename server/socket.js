// Socket.io Logic for Node.js Server
// Best paired with Socket.io Logic for Client

// Imports and Globals
const chalk = require('chalk');
const { Map } = require('immutable');
const store = require('./redux/store');
const { createAndEmitUser, updateUserData, removeUserAndEmit } = require('./redux/reducers/user-reducer');
const { getOtherUsers } = require('./utils');
const rooms = {};
const sockets = {};

module.exports = io => {
  // When a user establishes a socket conenction
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // Create a user, add it to Redux, and then return the user to the Client
    //   after they emit the sceneLoad event
    store.dispatch(createAndEmitUser(socket));
    // Save the socket connection
    sockets[socket.id] = socket;

    // After the client has generated a user, created an avatar, placed it on
    //   the DOM, and given in first-person A-Frame components, the client emits
    //   the getOthers event to perform the initial render of the other avatars
    //   in the same room. Currently this generates an immutable map of all users
    //   other than the client's own avatar and forces the client to perform local
    //   client-side filtering.
    // TODO: Only return the list of people in the current scene
    socket.on('getOthers', () => {
      const allUsers = store.getState().users;
      socket.emit('getOthersCallback', getOtherUsers(allUsers, socket.id));
    });

    // After the client perform the initial render of the avatars of all other
    //   users in the same room, it emits 'haveGottenOthers' to provide a
    //   'currently unused' lifecycle hook that allows the server the ability
    //   to potentially throttle the client's rate of updates to the server.
    // Note that the startTick event listener is located in the publish-location
    //   A-Frame component located at /browser/aframeComponents/publish-location.js
    socket.on('haveGottenOthers', () => {
      socket.emit('startTick');
    });

    // readyToReceiveUpdates is an event that tells the server to begin sending a
    //   feed of updates of the User immutable to this client to update the DOM nodes
    //   representing the other users' avatars in real-time. This only occurs after
    //   the initial render of the users is complete, which should avoid potential jenk
    //   when joining a room with many avatars.
    // TODO: modify getOtherUsers to only return
    // TODO: Consider implementing separate immutable maps per room in the redux store
    //   so that the subscribe only fires for users in the same room.
    socket.on('readyToReceiveUpdates', () => {
      store.subscribe(() => {
        const allUsers = store.getState().users;
        socket.emit('usersUpdated', getOtherUsers(allUsers, socket.id));
      });
    });

    // When a user updates their position, cast the update as an immutable map, and update
    //   the server-side Redux store. This will trigger the subscriptions created for each
    //   client in the event handler for 'readyToReceiveUpdates'
    socket.on('tick', userData => {
      userData = Map(userData);
      store.dispatch(updateUserData(userData));
    });

    // When a socket disconnects, invoke the 'removeUserAndEmit' thunk, which removes the user
    //   associated with the socket from the redux store and broadcast the 'removeUser' to all
    //   clients. Check to see if the user is connected to a chatroom (socket room + WebRTC P2P),
    //   and if they are, trigger a disconnect. Then delete the disconnected socket
    //   from the sockets object.
    // TODO: Perhaps the broadcast only needs to be emitted to a specific room
    socket.on('disconnect', () => {
      store.dispatch(removeUserAndEmit(socket));
      console.log(chalk.magenta(`${socket.id} has disconnected`));
      if (socket.currentChatRoom) {
        leaveChatRoom(socket.currentChatRoom);
      }
      console.log(`[${socket.id}] disconnected`);
      delete sockets[socket.id];
    });

    // A client emits the joinChatRoom event to the server after the componentDidMount hook of a react
    //   component of a VR environment fires and establishing a local audio feed. The event passes the
    //   name provided by the VR environment to relate chat rooms to A-Scenes. After making sure that a
    //   user isn't somehow already in the chat room, the chat room is added as an object literal to the
    //   rooms object with a key equal to the room parameter. The rooms object represents the complete
    //   state of all chat rooms in the app and all users within each chat room. If there are other
    //   users located in the chat room, the new user and all users already in the room are sent the
    //   'addPeer' event. The new user is told to create an offer, which establishes the peer-to-peer
    //   connection. Finally, the room is set as the user's room in socket.currentChatRoom and the user
    //   is added to the roster of users in the chat room in the rooms object.
    socket.on('joinChatRoom', function (room) {
      console.log(`[${socket.id}] join ${room}`);
      if (!(room in rooms)) {
        rooms[room] = {};
      }
      for (const id in rooms[room]) {
        rooms[room][id].emit('addPeer', { 'peer_id': socket.id, 'should_create_offer': false });
        socket.emit('addPeer', { 'peer_id': id, 'should_create_offer': true });
      }
      rooms[room][socket.id] = socket;
      socket.join(room);
      socket.currentChatRoom = room;
    });

    // A client emits the leaveChatRoom event to the server after the comonentWillUnmount hook of a react
    //   component of a VR environment. It leaves the socket.io room of a Chat Room, removes the user
    //   from the rooms object representing all state across all chat rooms, wipes the user's
    //   socket.currentChatRoom, and tells all clients to tear town their WebRTC connections to the
    //   person leaving the room.
    function leaveChatRoom () {
      const room = socket.currentChatRoom;
      console.log(`[${socket.id}] leaveChatRoom ${room}`);
      socket.leave(room);
      delete rooms[room][socket.id];
      for (const id in rooms[room]) {
        rooms[room][id].emit('removePeer', { 'peer_id': socket.id });
        socket.emit('removePeer', { 'peer_id': id });
      }
    }
    socket.on('leaveChatRoom', (room) => leaveChatRoom(room));

    // If any user is an Ice Candidate, tells other users to set up a ICE connection with them
    socket.on('relayICECandidate', function (config) {
      const peerId = config.peer_id;
      const iceCandidate = config.ice_candidate;
      console.log(`[${socket.id}] relaying ICE candidate to [${peerId}] ${iceCandidate}`);

      if (peerId in sockets) {
        sockets[peerId].emit('iceCandidate', { 'peer_id': socket.id, 'ice_candidate': iceCandidate });
      }
    });

    // Send the answer back to the new user in order to complete the handshake
    socket.on('relaySessionDescription', function (config) {
      const peerId = config.peer_id;
      const sessionDescription = config.session_description;
      console.log(`[${socket.id}] relaying session description to [${peerId}] ${sessionDescription}`);

      if (peerId in sockets) {
        sockets[peerId].emit('sessionDescription', { 'peer_id': socket.id, 'session_description': sessionDescription });
      }
    });
  });
};
