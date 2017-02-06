import React from 'react';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';
import Room from './Room';

export default class Yoonah extends React.Component {

  componentDidMount () {
    joinChatRoom('yoonah');
  }

  componentWillUnmount () {
    leaveChatRoom('yoonah');
  }

  render () {
    return (
      <a-entity id="room" position="0 0 0">
        <Room floorWidth="50"
              floorHeight="50"
              wallHeight="25"
              wallColor="purple"
              floorColor=""
              floorTexture="#floorText"
              ceilingColor="#998403"/>
        <Teleporter x="-10" y="1" z="-1" color="green" href="/vr" />
      </a-entity>
    );
  }
}
