import React from 'react';
import Chair from './Chair';
import Room from './Room';
import '../../aframeComponents/scene-load';
import { createArray } from '../../utils';
import { joinChatRoom, leaveChatRoom } from '../../webRTC/client.js';
import Teleporter from './Teleporter';

export default class Lobby extends React.Component {
  componentDidMount () {
    joinChatRoom('lobby');
  }

  componentWillUnmount () {
    leaveChatRoom();
  }

  render () {
    return (
      <a-entity id="room" position="0 0 0">
        {/* Lighting */}
        <a-entity light="type: directional; intensity: 0.4" position="0 25 -25"></a-entity>

        {/* Room: contains walls, floor, ceiling */}
        <Room floorWidth="50"
              floorHeight="50"
              wallHeight="25"
              wallColor="#f9f7d9"
              floorColor=""
              floorTexture="#floorText"
              ceilingColor="#998403"/>

        {/* Orbs */}
        <Teleporter x="-10" y="1" z="-1" color="red" href="/vr/sean" />
        <Teleporter x="-10" y="1" z="1" color="yellow" href="/vr/beth" />
        <Teleporter x="-10" y="1" z="3" color="blue" href="/vr/joey" />
        <Teleporter x="-10" y="1" z="5" color="purple" href="/vr/yoonah" />

        {/* Chairs */}
        {
          createArray(10).map((el) => (
            <Chair x={`${el[0]}`} y='0' z={`${-12.5 + el[1]}`} key={`${el[0] + ',' + el[1]}`} />
          ))
        }
        {
          createArray(-10).map((el) => (
            <Chair x={`${el[0]}`} y='0' z={`${-12.5 + (el[1])}`} key={`${el[0] + ',' + el[1]}`} />
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


