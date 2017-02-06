import React from 'react';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';

export default class Lobby extends React.Component {

  componentDidMount () {
    joinChatRoom('lobby');
  }

  componentWillUnmount () {
    leaveChatRoom('lobby');
  }
  render () {
    return (
      <a-entity id="room" position="0 0 0">
        <a-entity geometry="primitive: sphere; radius: 1.25" position="0 1.25 -1" material="color: #EF2D5E"></a-entity>
        <a-entity geometry="primitive: box; width: 1; height: 1; depth: 1" position="-1 0.5 1" material="color: #4CC3D9"></a-entity>
        <a-entity geometry="primitive: cylinder; radius: 0.5; height: 1.5" position="1 0.75 1" material="color: #FFC65D"></a-entity>
        <a-entity geometry="primitive: plane; width:4; height: 4" rotation="-90 0 0" material="color: #7BC8A4"></a-entity>
        <Teleporter x="-10" y="1" z="-1" color="red" href="/vr/sean" />
        <Teleporter x="-10" y="1" z="1" color="yellow" href="/vr/beth" />
        <Teleporter x="-10" y="1" z="3" color="blue" href="/vr/joey" />
        <Teleporter x="-10" y="1" z="5" color="purple" href="/vr/yoonah" />
      </a-entity>
    );
  }
}