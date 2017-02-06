import React from 'react';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';
import Room from './Room';

export default class Sean extends React.Component {

  componentDidMount () {
    joinChatRoom('sean');
  }

  componentWillUnmount () {
    leaveChatRoom();
  }

  render () {
    return (
      <a-entity id="room" position="0 0 0">
        <a-collada-model src="#IBM-360" position="-2 0 -8" rotation="0 270"></a-collada-model>
        <a-collada-model src="#terminal-typewriter" position="-2.6 0 -0.7"></a-collada-model>
        <a-collada-model src="#tape-drive" position="-1.3 0 -7" rotation="0 270"></a-collada-model>
        <a-collada-model src="#tape-drive" position="-0.4 0 -7" rotation="0 270"></a-collada-model>
        <a-collada-model src="#disk-pack" position="-0.65 0 -7.65" rotation="0 270"></a-collada-model>
        <a-collada-model src="#disk-pack" position="0.2 0 -7.65" rotation="0 270"></a-collada-model>
        <a-collada-model src="#punch-reader" position="7 0 -5" rotation="0 180"></a-collada-model>

        <Room floorWidth="50"
              floorHeight="50"
              wallHeight="25"
              wallColor="red"
              floorColor=""
              floorTexture="#floorText"
              ceilingColor="#998403"/>
        <Teleporter x="-10" y="1" z="-1" color="green" href="/vr" />
      </a-entity>
    );
  }
}
