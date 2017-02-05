import React from 'react';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';

export default class Sean extends React.Component {

  componentDidMount () {
    joinChatRoom('sean');
  }

  componentWillUnmount () {
    leaveChatRoom('sean');
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
        <Teleporter x="-10" y="1" z ="-1" color="green" href="/vr"/>
        <a-entity geometry="primitive: plane; width:80; height:80;" position="2 0 -4" rotation="-90 0 0" material="color:#444444;"></a-entity>
        <a-sky src="#sean-background"></a-sky>
      </a-entity>
    );
  }
}
