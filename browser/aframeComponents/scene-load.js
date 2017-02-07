/* global socket */

import AFRAME from 'aframe';
import store from '../redux/store';
import { setAsLoaded } from '../redux/reducers/is-loaded-reducer';

// This component ensures the scene loads before anything else can happen.
// Without it, race conditions start occurring where entities are being accessed
// before being placed on the DOM.

export default AFRAME.registerComponent('scene-load', {
  init: function () {
    console.log('scene-load component initialized');
    store.dispatch(setAsLoaded());
    socket.emit('sceneLoad');
  }
});
