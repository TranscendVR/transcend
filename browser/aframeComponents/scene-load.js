/* global socket */

import AFRAME from 'aframe';

export default AFRAME.registerComponent('scene-load', {
  init: function () {
    socket.emit('sceneLoad');
  }
});
