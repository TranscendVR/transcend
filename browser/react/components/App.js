import React from 'react';

import '../../aframeComponents/scene-load';
import '../../aframeComponents/aframe-hyperlink';

export default function App (props) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <a-scene id="scene" scene-load>
        <a-entity geometry="primitive: sphere; radius: 1.25" position="0 1.25 -1" material="color: #EF2D5E"></a-entity>
        <a-entity geometry="primitive: box; width: 1; height: 1; depth: 1" position="-1 0.5 1" material="color: #4CC3D9"></a-entity>
        <a-entity geometry="primitive: cylinder; radius: 0.5; height: 1.5" position="1 0.75 1" material="color: #FFC65D"></a-entity>
        <a-entity geometry="primitive: plane; width:4; height: 4" rotation="-90 0 0" material="color: #7BC8A4"></a-entity>
        <a-entity position="-10 1 -1">
          <a-entity geometry="primitive: sphere" rotation="0 200 0" radius="0.3" color="#ffffff" opacity="1" roughness="0.8" href="pages/link-vending-machine.html"></a-entity>
          <a-entity geometry="primitive: sphere" class="highlight" visible="false" radius="0.35" rotation="0 0 0" color="#0000ff" opacity="0.6" roughness="1" metalness="0.5"></a-entity>
          <a-entity geometry="primitive: box;" id="shadow" position="0 -1 0" color="#000" opacity="1" rotation="0 0 0" scale="0.4 1 0.4"></a-entity>
        </a-entity>
      </a-scene>
    </div>
  );
}
