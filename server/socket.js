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

    // This is a check to ensure that all of the existing users exist on the DOM
    // before pushing updates to the backend
    socket.on('haveGottenOthers', () => {
      socket.emit('startTick');
    });

    // readyToReceiveUpdates is a check to make sure existing users have loaded
    // for the new user
    // Once they have, then the backend starts pushing updates to the frontend
    socket.on('readyToReceiveUpdates', () => {
      store.subscribe(() => {
        const allUsers = store.getState().users;
        socket.emit('usersUpdated', getOtherUsers(allUsers, socket.id));
      });
    });

    // This will update a user's position when they move, and send it to everyone
    // except the specific scene's user
    socket.on('tick', userData => {
      userData = Map(userData);
      store.dispatch(updateUserData(userData));
    });

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
    function part(channel) {
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
