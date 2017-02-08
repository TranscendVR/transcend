/* global socket */

import AFRAME from 'aframe';
const THREE = window.THREE;

// Places buttons at the user's feet to mute self, mute people in the room, and see who is currently in the room

AFRAME.registerPrimitive('a-avatar-ui', AFRAME.utils.extendDeep({}, AFRAME.primitives.getMeshMixin(), {
  defaultComponents: {
    'mute-self': false
  }
}));

AFRAME.registerComponent('mute-self', {
  schema: {
    type: 'boolean',
    default: false
  },
  init: function () {
    
  }
});
