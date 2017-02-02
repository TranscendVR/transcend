// Socket.io Logic for Node.js Server
// Best paired with Socket.io Logic for Client

// Imports and Globals
const chalk = require('chalk');
const { Map } = require('immutable');
const store = require('./redux/store');
const { createAndEmitUser, updateUserData, removeUserAndEmit } = require('./redux/reducers/user-reducer');
const { getOtherUsers } = require('./utils');
const channels = {};
const sockets = {};

module.exports = io => {
  // When a user establishes a socket conenction
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // Create a user, add it to Redux, and then return the user to the Client
    //   after they emit the sceneLoad event
    store.dispatch(createAndEmitUser(socket));
    // ????
    socket.channels = {};
    // Save the socket connection
    sockets[socket.id] = socket;
    // After the user connects, they emit joinRoom with a string related to
    //   the url that have joined. When the event is emitted, join them
    //   to the appropriate room and tell the client to adversive for
    //   WebRTC peering within that room.
    socket.on('joinRoom', (winLoc) => {
      const myRoom = winLoc.pathname;
      console.log(`Appending to socket? ${myRoom}`);
      socket.join(myRoom);
      console.log(`${socket.id} has joined the room ${myRoom}`);
      socket.emit('initWebRTC');
    });

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
    //   clients. Then do some black-magic to remove the user from socket.channels, which has
    //   something to do with WebRTC (perhaps signalling???) Then delete the disconnected socket
    //   from the sockets array.
    // TODO: Perhaps the broadcast i
    socket.on('disconnect', () => {
      store.dispatch(removeUserAndEmit(socket));
      console.log(chalk.magenta(`${socket.id} has disconnected`));
      for (const channel in socket.channels) {
        part(channel);
      }
      console.log(`[${socket.id}] disconnected`);
      delete sockets[socket.id];
    });

    // Connects a new user to a channel and emits to all other users to initiate a new RTCPeerConnection with them
    socket.on('join', function (config) {
      console.log(`[${socket.id}] join ${config}`);
      const channel = config.channel;
      // const userdata = config.userdata;

      if (channel in socket.channels) {
        console.log(`[${socket.id}] ERROR: already joined ${channel}`);
        return;
      }

      if (!(channel in channels)) {
        channels[channel] = {};
      }

      for (const id in channels[channel]) {
        channels[channel][id].emit('addPeer', { 'peer_id': socket.id, 'should_create_offer': false });
        socket.emit('addPeer', { 'peer_id': id, 'should_create_offer': true });
      }

      channels[channel][socket.id] = socket;
      socket.channels[channel] = channel;
    });

    // Removes a user from a channel and tells all other users to discontinue their connection with them
    function part (channel) {
      console.log(`[${socket.id}] part`);

      if (!(channel in socket.channels)) {
        console.log(`[${socket.id}] ERROR: not in ${channel}`);
        return;
      }

      delete socket.channels[channel];
      delete channels[channel][socket.id];

      for (const id in channels[channel]) {
        channels[channel][id].emit('removePeer', { 'peer_id': socket.id });
        socket.emit('removePeer', { 'peer_id': id });
      }
    }

    socket.on('part', part);

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
