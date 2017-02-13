import React from 'react';
import Chair from './Chair';
import Couch from './Couch';
import Table from './Table';
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
          ceilingColor="#8DA0AF" />

        {/* Orbs */}
        <Teleporter
          color="red"
          label="The Basement"
          href="/vr/thebasement"
          rotation="90"
          x="-24.5" y="1" z="-3"
          labelx="-2.5" labely="1"
        />
        <Teleporter
          color="orange"
          label="Space Room"
          href="/vr/spaceroom"
          rotation="90"
          x="-24.5" y="1" z="2"
          labelx="-2" labely="1"
        />
        <Teleporter
          color="blue"
          label="Game Room"
          href="/vr/gameroom"
          rotation="90"
          x="-24.5" y="1" z="7"
          labelx="-2" labely="1"
        />
        <Teleporter
          color="purple"
          label="Cat Room"
          href="/vr/catroom"
          rotation="90"
          x="-24.5" y="1" z="12"
          labelx="-1.5" labely="1"
        />
        <Teleporter
          color="#BB96FF"
          label="The Gap"
          href="/vr/thegap"
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

        {/* Couches and coffee tables */}
        <Couch x="-5" y="0" z="23"
          rotx="0" roty="0" rotz="0" />
        <Couch x="-10" y="0" z="23"
          rotx="0" roty="0" rotz="0" />
        <Couch x="-13" y="0" z="20"
          rotx="0" roty="-90" rotz="0" />
        <Couch x="-2" y="0" z="20"
          rotx="0" roty="90" rotz="0" />
        <Couch x="5" y="0" z="23"
          rotx="0" roty="0" rotz="0" />
        <Couch x="10" y="0" z="23"
          rotx="0" roty="0" rotz="0" />
        <Couch x="2" y="0" z="20"
          rotx="0" roty="-90" rotz="0" />
        <Couch x="13" y="0" z="20"
          rotx="0" roty="90" rotz="0" />
        <Table x="-7.5" y="0" z="20"
          color="#521515"
          legHeight="0.4"
          depth="1.5" />
        <Table x="7.5" y="0" z="20"
          color="#521515"
          legHeight="0.4"
          depth="1.5" />

        {/* Tables and chairs */}
        <Table x="5" y="0" z="0"
          color="white"
          legHeight="0.8"
          depth="0.5" />
        <Table x="-5" y="0" z="0"
          color="white"
          legHeight="0.8"
          depth="0.5" />
        <Chair x="-5.75" y="0" z="0.3" />
        <Chair x="-4.25" y="0" z="0.3" />
        <Chair x="5.75" y="0" z="0.3" />
        <Chair x="4.25" y="0" z="0.3" />


        {/* Whiteboards */}
        <a-entity geometry="primitive: plane; height: 3; width: 4.5"
          material="color: white" position="-10 2.5 24.70" rotation="0 180 0"></a-entity>
        <a-entity geometry="primitive: plane; height: 3.25; width: 4.75"
          material="color: gray" position="-10 2.5 24.75" rotation="0 180 0"></a-entity>
        <a-entity geometry="primitive: plane; height: 3; width: 4.5"
          material="color: white" position="10 2.5 24.70" rotation="0 180 0"></a-entity>
        <a-entity geometry="primitive: plane; height: 3.25; width: 4.75"
          material="color: gray" position="10 2.5 24.75" rotation="0 180 0"></a-entity>
        <a-entity geometry="primitive: plane; height: 3; width: 4.5"
          material="color: white" position="0 2.5 24.70" rotation="0 180 0"></a-entity>
        <a-entity geometry="primitive: plane; height: 3.25; width: 4.75"
          material="color: gray" position="0 2.5 24.75" rotation="0 180 0"></a-entity>

      </a-entity>
    );
  }
}


