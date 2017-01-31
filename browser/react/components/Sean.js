import React from 'react';

import '../../aframeComponents/scene-load';
import '../../aframeComponents/aframe-hyperlink';

export default function Sean (props) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <a-scene id="scene" scene-load>
        <a-assets>
          <img id="background" src="/sean/background.jpg" />
          <a-asset-item id="IBM-360" src="/sean/console.dae"></a-asset-item>
          <a-asset-item id="terminal-typewriter" src="/sean/teletype.dae"></a-asset-item>
          <a-asset-item id="tape-drive" src="/sean/tape-reader.dae"></a-asset-item>
          <a-asset-item id="disk-pack" src="/sean/diskpack.dae"></a-asset-item>
          <a-asset-item id="punch-reader" src="/sean/card-reader.dae"></a-asset-item>
        </a-assets>
        <a-collada-model src="#IBM-360" position="-2 0 -8" rotation="0 270"></a-collada-model>
        <a-collada-model src="#terminal-typewriter" position="-2.6 0 -0.7"></a-collada-model>
        <a-collada-model src="#tape-drive" position="-1.3 0 -7" rotation="0 270"></a-collada-model>
        <a-collada-model src="#tape-drive" position="-0.4 0 -7" rotation="0 270"></a-collada-model>
        <a-collada-model src="#disk-pack" position="-0.65 0 -7.65" rotation="0 270"></a-collada-model>
        <a-collada-model src="#disk-pack" position="0.2 0 -7.65" rotation="0 270"></a-collada-model>
        <a-collada-model src="#punch-reader" position="7 0 -5" rotation="0 180"></a-collada-model>
        <a-entity position="-10 1 -1">
          <a-entity geometry="primitive: sphere" rotation="0 200 0" radius="0.3" color="#ffffff" opacity="1" roughness="0.8" href="/"></a-entity>
          <a-entity geometry="primitive: sphere" class="highlight" visible="false" radius="0.35" rotation="0 0 0" color="#0000ff" opacity="0.6" roughness="1" metalness="0.5"></a-entity>
          <a-entity geometry="primitive: box;" id="shadow" position="0 -1 0" color="#000" opacity="1" rotation="0 0 0" scale="0.4 1 0.4"></a-entity>
        </a-entity>
        <a-plane position="2 0 -4" rotation="-90 0 0" width="80" height="80" color="#444444"></a-plane>
        <a-sky src="#background"></a-sky>
      </a-scene>
    </div>
  );
}
