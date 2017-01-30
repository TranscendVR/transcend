/* global socket */

import AFRAME from 'aframe';

// This component is attached to the user who the scene belongs to
// It fires an event on each render loop for that particular user
// The backend then uses this information to update its state

let hasGottenOthers = false;

export default AFRAME.registerComponent('publish-location', {
  tick: function () {
    socket.on('startTick', () => hasGottenOthers = true);
    if (hasGottenOthers) {
      const el = this.el;
      socket.emit('tick', {
        id: el.getAttribute('id'),
        x: el.getAttribute('position').x,
        y: el.getAttribute('position').y,
        z: el.getAttribute('position').z,
        xrot: el.getAttribute('rotation').x,
        yrot: el.getAttribute('rotation').y,
        zrot: el.getAttribute('rotation').z
      });
    }
  }
});
