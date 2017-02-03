import React from 'react';

import Chair from './Chair';
import Room from './Room';
import '../../aframeComponents/scene-load';
import { createArray } from '../../utils';

export default function App (props) {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <a-scene id="scene" scene-load>
        <a-assets>
          <img id="slide" src="/img/class.png"/>
          <img id="podium" src="/img/fullstack.png"/>
          <img id="floorText" src="/img/hardwood.jpg"/>
          <a-mixin id="chair-part" geometry="primitive: box" material="color: brown"></a-mixin>
        </a-assets>

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

        {/* Lighting */}
        <a-entity light="type: ambient; color: #ffffe0" position="0 0 0"></a-entity>
        <a-entity light="type: directional; intensity: 0.4" position="0 25 -25"></a-entity>

        {/* Projection Screen */}
         <a-entity id="screen" geometry="primitive: plane; height: 15; width: 20"
                material="src: #slide" position="0 8.5 -24"></a-entity>

        {/* Podium */}
        <a-entity id="podium" geometry="primitive: box; depth: 1; height: 3; width: 6"
                material="src: #podium" position="12.5 0.5 -21"></a-entity>

        {/* Room: contains walls, floor, ceiling */}
        <Room floorWidth="50"
              floorHeight="50"
              wallHeight="25"
              wallColor="#f9f7d9"
              floorColor=""
              floorTexture="#floorText"
              ceilingColor="#998403"/>
      </a-scene>
    </div>
  );
}

//#868686

