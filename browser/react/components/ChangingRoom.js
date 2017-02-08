import React from 'react';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';
import Room from './Room';

export default class Sean extends React.Component {

  componentDidMount () {
    joinChatRoom('changingroom');
  }

  componentWillUnmount () {
    leaveChatRoom();
  }

  render () {
    return (
      <a-entity>

        <Room floorWidth="50"
          floorHeight="50"
          wallHeight="25"
          wallColor="red"
          floorColor=""
          floorTexture="#floorText"
          ceilingColor="#998403" />
        <a-minecraft position= "-2 1.25 -1" minecraft="skinUrl: 'images/batman.png'; component: 'head'; heightMeter: 1.6" />
        <Teleporter x="-10" y="1" z="-1" color="green" href="/vr" />
      </a-entity>
    );
  }
}
