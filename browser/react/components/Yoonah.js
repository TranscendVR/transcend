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
          floorDepth="50"
          wallHeight="25"
          wallColor="4B5D6A; shader:gif; src: #pusheen_gangnam; color: white"
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
        {/* Cat GIFs */}
        <a-entity rotation="0 0 0" position="1.2 2 -1">
          <a-entity geometry="primitive: cylinder; height: 1.5; radius: 1"
            material="shader: gif; src: #pusheen">
            <a-animation attribute="rotation"
              dur="5000"
              fill="forwards"
              to="0 360 0"
              repeat="indefinite"
              easing="linear" />
          </a-entity>
        </a-entity>

        <a-entity rotation="0 0 0" position="5 3 -4">
          <a-entity geometry="primitive: circle; height: 1.5; radius: 1"
            material="shader: gif; src: #lasercat"></a-entity>
        </a-entity>

        <a-entity rotation="0 0 0" position="0 2 -10">
          <a-entity geometry="primitive: box; width: 1.5; height: 1.5; depth: 1.5"
            position="3 2 0"
            material="shader: gif; src: #nyancat; color: white" />
          <a-animation
            attribute="rotation"
            dur="5000"
            fill="forwards"
            to="0 360 0"
            repeat="indefinite"
            easing="linear" />
        </a-entity>

        <a-entity rotation="0 0 0" position="0 2 -10">
          <a-entity geometry="primitive: box; width: 1.5; height: 1.5; depth: 1.5"
            position="3 2 0"
            material="shader: gif; src: #nyancat; color: white" />
          <a-animation attribute="rotation"
            dur="5000"
            fill="forwards"
            to="0 360 0"
            repeat="indefinite"
            easing="linear" />
        </a-entity>

        <a-entity rotation="0 0 0" position="5 5 -15">
          <a-entity geometry="primitive: box; width: 1.5; height: 1.5; depth: 1.5"
            position="3 2 0"
            material="shader: gif; src: #bwcat; color: white" />
          <a-animation attribute="rotation"
            dur="5000"
            fill="forwards"
            to="0 360 0"
            repeat="indefinite"
            easing="linear" />
        </a-entity>

      </a-entity>
    );
  }
}
