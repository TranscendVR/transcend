/* global socket */

import AFRAME from 'aframe';

// This component ensures the scene loads before anything else can happen.
// Without it, race conditions start occurring where entities are being accessed
// before being placed on the DOM.

export default AFRAME.registerComponent('scene-load', {
  init: function () {
    socket.emit('sceneLoad');
  }
});
