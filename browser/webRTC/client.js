// WebRTC Logic for Client


/** You should probably use a different stun server doing commercial stuff **/
/** Also see: https://gist.github.com/zziuni/3741933 **/
const ICE_SERVERS = [
  { url: 'stun:stun.l.google.com:19302' }
];

// This will be our socket connection
let signalingSocket = null;
let localMediaStream = null; // Our microphone
let peers = {}; // keep track of our peer connections, indexed by peer_id (aka socket.io id)
let peerMediaElements = {};  // keep track of our <audio> tags, indexed by peer_id

// setupLocalMedia retrieves the socket.io object to use for WebRTC signaling.
//   If the microphone audio stream is already active, the client immediately
//   invokes 'joinChatRoom' to join the room DEFAULT_ROOM and exits the function.
//   If the microphone audio stream is not yet active, the client checks for the correct
//   vendor prefix for getUserMedia and then invokes getUserMedia to obtain an audio stream.
//   Once the stream is active, it's saved to the external variable localMediaStream and
//   set as the srcObject of the AUDIO tag of ID localAudio. The AUDIO tag is muted to keep
//   the user from getting headaches hearing themselves. Finally, the client invokes
//   'joinChatRoom' to join the room DEFAULT_ROOM.
// If the user decides not to share their microphone, they are presented with an error
//   informing them that voice is unavailable.
//
// TODO: Use an actual meaningful room name.

// joinChatRoom emits the 'join' event with the socket.io room that the
//   user ID associated with the socket should join and then user for
//   WebRTC signalling.

export function joinChatRoom (room, errorback) {
  if (!room) {
    console.log('No room was provided');
    return;
  }
  if (signalingSocket === null) {
    signalingSocket = window.socket;
  }
  if (localMediaStream != null) {  /* ie, if we've already been initialized */
    signalingSocket.emit('joinChatRoom', room);
    return;
  }
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  console.log('Requesting access to local audio / video inputs');
  navigator.getUserMedia({ 'audio': true, 'video': false }, function (stream) {
    console.log('Access granted to audio');
    localMediaStream = stream;
    const audioEl = document.getElementById('localAudio');
    audioEl.muted = true;
    audioEl.srcObject = stream;
    signalingSocket.emit('joinChatRoom', room);
  },
    function () { /* user denied access to a/v */
      console.log('Access denied for audio/video');
      window.alert('You chose not to provide access to your microphone, so real-time voice chat is unavailable.');
      if (errorback) errorback();
    });
}



// Don't need this yet, but might in the future
export function leaveChatRoom (room) {
  signalingSocket.emit('leaveChatRoom', room);
}

// accepts conifg
export function addPeerConn (config) {
  console.log('Signaling server said to add peer:', config);
  const peerId = config.peer_id;
  // If for some reason, this client aready is connected to the peer, return
  if (peerId in peers) {
    console.log('Already connected to peer ', peerId);
    return;
  }

  // Create a webRTC peer connection to the ICE servers
  const peerConnection = new webkitRTCPeerConnection(
    { 'iceServers': ICE_SERVERS },
    { 'optional': [{ 'DtlsSrtpKeyAgreement': true }] }
    /* this will no longer be needed by chrome
    * eventually (supposedly), but is necessary
    * for now to get firefox to talk to chrome */
  );
  peers[peerId] = peerConnection;

  // I'm not 100% sure what this does, but it sets up ice candidates ¯\_(ツ)_/¯
  peerConnection.onicecandidate = function (event) {
    if (event.candidate) {
      signalingSocket.emit('relayICECandidate', {
        'peer_id': peerId,
        'ice_candidate': {
          'sdpMLineIndex': event.candidate.sdpMLineIndex,
          'candidate': event.candidate.candidate
        }
      });
    }
  };

  // When we recieve a remote audio stream from the peer, create an audio tag and append it to the
  //   body tag of the DOM. Set the audio tag with an ID equal to the peerID, set it to autoplay,
  //   and save the audio stream to the peerMediaElements object
  peerConnection.onaddstream = function (event) {
    console.log('onAddStream', event);
    const remoteAudio = document.createElement('audio');
    const bodyTag = document.getElementsByTagName('body')[0];
    bodyTag.appendChild(remoteAudio);
    remoteAudio.setAttribute('id', peerId);
    remoteAudio.setAttribute('autoplay', 'autoplay');
    peerMediaElements[peerId] = remoteAudio;
    remoteAudio.srcObject = event.stream;
  };
  /* Add our local stream */
  peerConnection.addStream(localMediaStream);
  /* Only one side of the peer connection should create the
  * offer, the signaling server picks one to be the offerer.
  * The other user will get a 'sessionDescription' event and will
  * create an offer, then send back an answer 'sessionDescription' to us
  */
  if (config.should_create_offer) {
    console.log('Creating RTC offer to ', peerId);
    peerConnection.createOffer(
      function (localDescription) {
        console.log('Local offer description is: ', localDescription);
        peerConnection.setLocalDescription(localDescription,
          function () {
            signalingSocket.emit('relaySessionDescription',
              { 'peer_id': peerId, 'session_description': localDescription });
            console.log('Offer setLocalDescription succeeded');
          },
          function () { window.alert('Offer setLocalDescription failed!'); }
        );
      },
      function (error) {
        console.log('Error sending offer: ', error);
      }
    );
  }
}

export function removePeerConn (config) {
  console.log('Signaling server said to remove peer:', config);
  const peerId = config.peer_id;
  if (peerId in peerMediaElements) {
    peerMediaElements[peerId].remove();
  }
  if (peerId in peers) {
    peers[peerId].close();
  }
  delete peers[peerId];
  delete peerMediaElements[config.peerId];
}

export function setRemoteAnswer (config) {
  console.log('Remote description received: ', config);
  const peerId = config.peer_id;
  const peer = peers[peerId];
  const remoteDescription = config.session_description;
  console.log(config.session_description);
  const desc = new RTCSessionDescription(remoteDescription);
  const stuff = peer.setRemoteDescription(desc,
    function () {
      console.log('setRemoteDescription succeeded');
      if (remoteDescription.type === 'offer') {
        console.log('Creating answer');
        peer.createAnswer(
          function (localDescription) {
            console.log('Answer description is: ', localDescription);
            peer.setLocalDescription(localDescription,
              function () {
                signalingSocket.emit('relaySessionDescription',
                  { 'peer_id': peerId, 'session_description': localDescription });
                console.log('Answer setLocalDescription succeeded');
              },
              function () { window.alert('Answer setLocalDescription failed!'); }
            );
          },
          function (error) {
            console.log('Error creating answer: ', error);
            console.log(peer);
          }
        );
      }
    },
    function (error) {
      console.log('setRemoteDescription error: ', error);
    }
  );
  console.log('Description Object: ', desc);
}

export function setIceCandidate (config) {
  const peer = peers[config.peer_id];
  const iceCandidate = config.ice_candidate;
  peer.addIceCandidate(new RTCIceCandidate(iceCandidate));
}

export function disconnectUser () {
  for (const peerId in peerMediaElements) {
    peerMediaElements[peerId].remove();
  }
  for (const peerId in peers) {
    peers[peerId].close();
  }
  peers = {};
  peerMediaElements = {};
}
