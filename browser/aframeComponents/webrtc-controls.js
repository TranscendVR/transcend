/* global socket */

import AFRAME from 'aframe';
import store from '../redux/store';

// Places buttons at the user's feet to mute self, mute people in the room, and see who is currently in the room

AFRAME.registerComponent('mute-self', {
  schema: {
    type: 'boolean',
    default: false
  },
  // I stole most of this code form aframe-hyperlink, it didn't work exactly how I wanted it to.
  init: function () {
    this.handler = this.handler.bind(this);
    this.el.addEventListener('click', this.handler);
    this.el.addEventListener('gripdown', this.handler);
  },
  handler: function () {
    console.log('Muting');
    const stream = store.getState().webrtc.get('localMediaStream');
    console.log('stream', stream);
    const isEnabled = stream.getAudioTracks()[0].enabled;
    console.log('enabled', isEnabled);
    if (isEnabled) {
      this.el.setAttribute('material', 'src: #microphone-mute');
    } else {
      this.el.setAttribute('material', 'src: #microphone-unmute');
    }
    stream.getAudioTracks()[0].enabled = !isEnabled;
  }
});
