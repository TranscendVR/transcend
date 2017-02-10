import React from 'react';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';
import Room from './Room';
import gif from 'aframe-gif-shader';

export default class Yoonah extends React.Component {

  componentDidMount () {
    joinChatRoom('yoonah');
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
          wallColor="purple"
          floorColor=""
          floorTexture="#floorText"
          ceilingColor="#998403" />
        <Teleporter
          color="green"
          label="Lobby"
          href="/vr"
          rotation="90"
          x="-24.5" y="1" z="-3"
          labelx="-1" labely="1"
        />
        <a-entity geometry="primitive:circle; segments:64" position="-1.2 -0.5 -1" material="shader:gif; src:#pusheen; opacity:.2; color:blue" data-label="left bottom"></a-entity>
      </a-entity>
    );
  }
}
