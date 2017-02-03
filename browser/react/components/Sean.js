import React from 'react';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import '../../aframeComponents/scene-load';
import '../../aframeComponents/aframe-hyperlink';

export default class Sean extends React.Component {

  componentDidMount () {
    console.log('joining the beth chat room');
    joinChatRoom('sean');
  }

  componentWillUnmount () {
    console.log('leaving the sean chat room');
    leaveChatRoom('sean');
  }

  render () {
    return (
      <a-entity id="room" class="sean" position="0 0 0">
        <a-collada-model src="#IBM-360" position="-2 0 -8" rotation="0 270"></a-collada-model>
        <a-collada-model src="#terminal-typewriter" position="-2.6 0 -0.7"></a-collada-model>
        <a-collada-model src="#tape-drive" position="-1.3 0 -7" rotation="0 270"></a-collada-model>
        <a-collada-model src="#tape-drive" position="-0.4 0 -7" rotation="0 270"></a-collada-model>
        <a-collada-model src="#disk-pack" position="-0.65 0 -7.65" rotation="0 270"></a-collada-model>
        <a-collada-model src="#disk-pack" position="0.2 0 -7.65" rotation="0 270"></a-collada-model>
        <a-collada-model src="#punch-reader" position="7 0 -5" rotation="0 180"></a-collada-model>
        <a-entity position="-10 1 -1">
          <a-entity class='clickable' geometry="primitive: sphere; radius:0.3;" rotation="0 200 0" material="color: green; opacity: 1; roughness: 0.8" href="/vr"></a-entity>
          <a-entity geometry="primitive: sphere" class="highlight" visible="false" radius="0.35" rotation="0 0 0" material="color: #0000ff; opacity: 0.6; roughness: 1; metalness: 0.5;"></a-entity>
          <a-entity geometry="primitive: box;" id="shadow" position="0 -1 0" material="color: #000; opacity: 1;" rotation="0 0 0" scale="0.4 1 0.4"></a-entity>
        </a-entity>
        <a-entity geometry="primitive: plane; width:80; height:80;" position="2 0 -4" rotation="-90 0 0" material="color:#444444;"></a-entity>
        <a-sky src="#sean-background"></a-sky>
      </a-entity>
    );
  }
}
