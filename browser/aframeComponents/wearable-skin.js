/* global SpeechSynthesisUtterance */
// Component for selecting your character's skin in game.

import AFRAME from 'aframe';
import { changeUserSkin } from '../utils';
import hyperlinkFactory from './hyperlinkFactory';

// Define a custom handler and use it to create a hyperlink component
const handler = function () {
  changeUserSkin(this.el.id);
  const msg = new SpeechSynthesisUtterance(`Changed skin to ${this.el.id}`);
  window.speechSynthesis.speak(msg);
};
const wearableSkinComponent = hyperlinkFactory(handler);

// Register the new component with A-FRAME
export default AFRAME.registerComponent('wearable-skin', wearableSkinComponent);
