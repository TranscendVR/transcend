// WebRTC Logic for Client

// Config Variables
const USE_AUDIO = true;
const USE_VIDEO = false;
const DEFAULT_CHANNEL = 'some-global-channel-name';
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

export function setupLocalMedia (callback, errorback) {
  if (signalingSocket === null) {
    signalingSocket = window.socket;
  }
  if (localMediaStream != null) {  /* ie, if we've already been initialized */
    joinChatChannel(DEFAULT_CHANNEL, { 'whatever-you-want-here': 'stuff' });
    return;
  }
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  /* Ask user for permission to use the computers microphone and/or camera,
  * attach it to an <audio> or <video> tag if they give us access. */
  console.log('Requesting access to local audio / video inputs');
  navigator.getUserMedia({ 'audio': USE_AUDIO, 'video': USE_VIDEO }, function (stream) {
    console.log('Access granted to audio/video');
    localMediaStream = stream;
    const audioEl = document.getElementById('localAudio');
    audioEl.muted = true;
    audioEl.srcObject = stream;
    joinChatChannel(DEFAULT_CHANNEL, { 'whatever-you-want-here': 'stuff' });
  },
  function () { /* user denied access to a/v */
    console.log('Access denied for audio/video');
    window.alert('You chose not to provide access to the camera/microphone, demo will not work.');
    if (errorback) errorback();
  });
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

function joinChatChannel (channel, userdata) {
  signalingSocket.emit('join', { 'channel': channel, 'userdata': userdata });
}
// Don't need this yet, but might in the future
// function partChatChannel (channel) {
//   signalingSocket.emit('part', channel);
// }

export function addPeerConn (config) {
  console.log('Signaling server said to add peer:', config);
  const peerId = config.peer_id;
  if (peerId in peers) {
    /* This could happen if the user joins multiple channels where the other peer is also in. */
    console.log('Already connected to peer ', peerId);
    return;
  }
  const peerConnection = new webkitRTCPeerConnection(
    { 'iceServers': ICE_SERVERS },
    { 'optional': [{ 'DtlsSrtpKeyAgreement': true }] } /* this will no longer be needed by chrome
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
