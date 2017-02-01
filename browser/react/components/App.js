import React from 'react';

import Chair from './Chair';
import '../../aframeComponents/scene-load';

export default function App (props) {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <a-scene id="scene" scene-load>
        <a-assets>
          <img id="slide" src="/img/aframe.png"/>
          <img id="podium" src="/img/fullstack.png"/>
          <a-mixin id="chair-part" geometry="primitive: box" material="color: brown"></a-mixin>
        </a-assets>

        <Chair x='0' y='0' z='-20'/>

        {/* Lighting */}
        <a-entity light="type: ambient; color: #ffffe0"></a-entity>
        <a-entity light="type: directional; intensity: 0.4" position="-10 30 -25"></a-entity>
        <a-entity light="type: directional; intensity: 0.4" position="10 30 -25"></a-entity>

        {/* Projection Screen */}
         <a-entity id="screen" geometry="primitive: plane; height: 15; width: 20"
                material="src: #slide" position="0 8.5 -24"></a-entity>

        {/* Podium */}
        <a-entity id="podium" geometry="primitive: box; depth: 1; height: 3; width: 6"
                material="src: #podium" position="12.5 0.5 -10"></a-entity>

        {/* Floor */}
        <a-entity id="floor" geometry="primitive: plane; width:50; height:50" rotation="-90 0 0" material="color: #868686"></a-entity>

        {/* Walls */}
        <a-entity id="back-wall" geometry="primitive: plane; width:50; height:25" rotation="0 0 0" position="0 12.5 -25" material="color: #DCD4B8"></a-entity>
        <a-entity id="front-wall" geometry="primitive: plane; width:50; height:25" rotation="180 0 0" position="0 12.5 25" material="color: red"></a-entity>
        <a-entity id="left-wall" geometry="primitive: plane; width:50; height:25" rotation="0 90 0" position="-25 12.5 0" material="color: #DCD4B8"></a-entity>
        <a-entity id="right-wall" geometry="primitive: plane; width:50; height:25" rotation="0 -90 0" position="25 12.5 0" material="color: #DCD4B8"></a-entity>
      </a-scene>
    </div>
  );
}


/*
<a-entity geometry="primitive: sphere; radius: 1.25" position="0 1.25 -1" material="color: #EF2D5E"></a-entity>
        <a-entity geometry="primitive: box; width: 1; height: 1; depth: 1" position="-1 0.5 1" material="color: #4CC3D9"></a-entity>
        <a-entity geometry="primitive: cylinder; radius: 0.5; height: 1.5" position="1 0.75 1" material="color: #FFC65D"></a-entity>
eggshell color for walls: #DCD4B8
*/
