import React from 'react';
import Chair from './Chair';
import Room from './Room';
import '../../aframeComponents/scene-load';
import { createArray } from '../../utils';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';

require('aframe-text-component');

export default class Lobby extends React.Component {
  componentDidMount () {
    joinChatRoom('lobby');
  }

  componentWillUnmount () {
    leaveChatRoom();
  }

  render () {
    return (
      <a-entity>
        {/* Lighting */}
        <a-entity light="type: directional; intensity: 0.4" position="0 25 -25"></a-entity>

        {/* Room: contains walls, floor, ceiling */}
        <Room floorWidth="50"
          floorHeight="50"
          wallHeight="25"
          wallColor="#f9f7d9"
          floorColor="gray"
          floorTexture="#floorText"
          ceilingColor="#998403" />

        {/* Orbs */}
        <Teleporter
          color="red"
          label="Sean"
          href="/vr/sean"
          rotation="90"
          x="-24.5" y="1" z="1"
          labelx="-0.75" labely="1"
        />
        <Teleporter
          color="orange"
          label="Beth"
          href="/vr/beth"
          rotation="90"
          x="-24.5" y="1" z="5"
          labelx="-0.75" labely="1"
        />
        <Teleporter
          color="blue"
          label="Joey"
          href="/vr/joey"
          rotation="90"
          x="-24.5" y="1" z="9"
          labelx="-0.75" labely="1"
        />
        <Teleporter
          color="purple"
          label="Yoo-Nah"
          href="/vr/yoonah"
          rotation="90"
          x="-24.5" y="1" z="13"
          labelx="-1.5" labely="1"
        />
        <Teleporter
          color="aqua"
          label="The Gap"
          href="/vr/changingroom"
          rotation="90"
          x="-24.5" y="1" z="17"
          labelx="-1.5" labely="1"
        />
        <Teleporter
          color="black"
          label="Logout"
          href="/logout"
          rotation="-90"
          x="24.5" y="1" z="5"
          labelx="-1.2" labely="1"
        />

        {/* Chairs */}
        {
          createArray(10).map((el) => (
            <Chair x={`${el[0]}`} y="0" z={`${-12.5 + el[1]}`} key={`${el[0] + ',' + el[1]}`} />
          ))
        }
        {
          createArray(-10).map((el) => (
            <Chair x={`${el[0]}`} y="0" z={`${-12.5 + (el[1])}`} key={`${el[0] + ',' + el[1]}`} />
          ))
        }

        {/* Projection Screen */}
        <a-entity id="screen" geometry="primitive: plane; height: 15; width: 20"
          material="src: #slide" position="0 8.5 -24"></a-entity>

        {/* Podium */}
        <a-entity id="podium" geometry="primitive: box; depth: 1; height: 1.5; width: 5"
          material="src: #podium" position="12.5 0.75 -21"></a-entity>

        {/* Monitors */}
        <a-collada-model src="#monitor" scale="0.5 0.5 0.5" position="12.5 1.5 -20.5" rotation="0 90 0"></a-collada-model>
        <a-collada-model src="#monitor" scale="0.5 0.5 0.5" position="14.75 1.5 -20.5" rotation="0 90 0"></a-collada-model>

      </a-entity>
    );
  }
}


