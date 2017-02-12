/**
 * Component for selecting your character's skin in game.
 */

import AFRAME from 'aframe';
const THREE = window.THREE;
import { changeUserSkin } from '../utils';

export default AFRAME.registerComponent('wearable-skin', {
  schema: {
    default: ''
  },

  // init binds this, creates event listeners for click and grip that both trigger the href handler, and setups the highlight effect.
  init: function () {
    this.handler = this.handler.bind(this);
    this.setupHighlight = this.setupHighlight.bind(this);
    this.el.addEventListener('click', this.handler);
    this.el.addEventListener('gripdown', this.handler);
    this.setupHighlight();
  },

  /**
   * Called when component is removed.
   */
  remove: function () {
    this.el.removeEventListener('click', this.handler);
    this.el.removeEventListener('gripdown', this.handler);
  },

  // This will be the handler to start wearing a skin.
  handler: function () {
    console.log('Hey');
    console.log(`Selected ${this.el.id}`);
    changeUserSkin(this.el.id);
    let msg = new SpeechSynthesisUtterance(`Changed skin to ${this.el.id}`);
    window.speechSynthesis.speak(msg);
  },

  // setupHighlight creates a transluscent blue glow that is 20% larger than the shape with the href in all directions
  //   It is generated when the wearable-skin component inits and is only visible when a mouse hovers over the entity
  //   with the wearable-skin.
  setupHighlight: function () {
    // Clone mesh and set up highlighter material.
    var mesh = this.el.object3DMap.mesh;
    if (!mesh) {
      return false;
    }
    var clone = mesh.clone();
    clone.material = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      transparent: true,
      opacity: 0.3
    });
    clone.scale.set(1.2, 1.2, 1.2);
    clone.visible = false;
    mesh.parent.add(clone);

    // Toggle highlighter on mouse events.
    this.el.addEventListener('mouseenter', function () {
      clone.visible = true;
    });

    this.el.addEventListener('mouseleave', function () {
      clone.visible = false;
    });
  }
});
