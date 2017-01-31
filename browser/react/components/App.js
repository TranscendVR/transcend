import React from 'react';

import '../../aframeComponents/scene-load';

export default function App (props) {
  return (
    <div style={{width: '100%', height: '100%'}}>
      <a-scene id="scene" scene-load>
        <a-assets>
          <img id="slide" src="/img/aframe.png"/>
          <img id="podium" src="/img/fullstack.png"/>
        </a-assets>

        {/* Projection Screen */}
         <a-entity geometry="primitive: plane; height: 4.5; width: 6"
                material="src: #slide" position="0 3.5 -5"></a-entity>

        {/* Podium */}
        <a-entity id="podium" geometry="primitive: box; depth: 0.9; height: 1.4; width: 4.0"
                material="src: #podium" position="5.0 0.5 -1"></a-entity>

        {/* Floor */}
        <a-entity geometry="primitive: plane; width:20; height:20" rotation="-90 0 0" material="color: #868686"></a-entity>

        {/* Walls */}
        <a-entity geometry="primitive: plane; width:20; height:10" rotation="0 0 0" position="0 5 -10" material="color: #DCD4B8"></a-entity>
        <a-entity geometry="primitive: plane; width:20; height:10" rotation="0 90 0" position="-10 5 0" material="color: #DCD4B8"></a-entity>
        <a-entity geometry="primitive: plane; width:20; height:10" rotation="0 90 0" position="10 5 0" material="color: #DCD4B8"></a-entity>
        <a-entity geometry="primitive: plane; width:20; height:10" rotation="0 90 0" position="0 5 10" material="color: #DCD4B8"></a-entity>
      </a-scene>
    </div>
  );
}


/*
<a-entity geometry="primitive: sphere; radius: 1.25" position="0 1.25 -1" material="color: #EF2D5E"></a-entity>
        <a-entity geometry="primitive: box; width: 1; height: 1; depth: 1" position="-1 0.5 1" material="color: #4CC3D9"></a-entity>
        <a-entity geometry="primitive: cylinder; radius: 0.5; height: 1.5" position="1 0.75 1" material="color: #FFC65D"></a-entity>
*/
