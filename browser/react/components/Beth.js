import React from 'react';

import '../../aframeComponents/scene-load';
import '../../aframeComponents/aframe-hyperlink';

export default function Beth (props) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <a-scene id="scene" class="beth" scene-load>
        <a-assets>
          <img id="background" src="/beth/background.jpg" />
        </a-assets>
        <a-entity position="-10 1 -1">
          <a-entity geometry="primitive: sphere; radius: 0.3;" rotation="0 200 0" material="color: #000; opacity: 1; roughness: 0.8;" href="/"></a-entity>
          <a-entity class="highlight" geometry="primitive: sphere; radius: 0.35" visible="false" rotation="0 0 0" material="color: #0000ff; opacity: 0.6; roughness: 1 metalness: 0.5"></a-entity>
          <a-entity id="shadow" geometry="primitive: box;" material="color: #000; opacity: 1;" position="0 -1 0" rotation="0 0 0" scale="0.4 1 0.4"></a-entity>
        </a-entity>
        <a-entity geometry="primitive: plane; width:80; height:80;" position="2 0 -4" rotation="-90 0 0" material="color:#444444;"></a-entity>
        <a-sky src="#background"></a-sky>
      </a-scene>
    </div>
  );
}
