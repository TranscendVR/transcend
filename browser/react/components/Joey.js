import React from 'react';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';
import Room from './Room';

export default class Joey extends React.Component {

  componentDidMount () {
    joinChatRoom('joey');
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
          wallColor="blue"
          floorColor=""
          floorTexture="#floorText"
          ceilingColor="#998403" />
        <Teleporter
          color="green"
          label="Lobby"
          href="/vr"
          rotation="90"
          x="-24.5" y="1" z="-5"
          labelx="-1" labely="1"
        />
      </a-entity>
    );
  }
}
