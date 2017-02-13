// Component for using teleporters to navigate between VR scenes

import AFRAME from 'aframe';
import { browserHistory } from 'react-router';
import hyperlinkFactory from './hyperlinkFactory';

// Define a custom handler and use it to create a hyperlink component
const handler = function () {
  const url = this.data;
  browserHistory.push(url);
};
const teleporterHyperlink = hyperlinkFactory(handler);

// Register the new component with A-FRAME
export default AFRAME.registerComponent('href', teleporterHyperlink);
