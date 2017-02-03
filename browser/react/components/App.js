import React from 'react';
import '../../aframeComponents/scene-load';
import '../../aframeComponents/aframe-hyperlink';
import '../../aframeComponents/aframe-minecraft';

export default function App (props) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <a-scene id="scene" scene-load>
        <a-assets>
          <img id="yoonah-background" src="/yoonah/background.jpg" />
          <img id="beth-background" src="/beth/background.jpg" />
          <img id="joey-background" src="/joey/background.jpg" />
          <img id="sean-background" src="/sean/background.jpg" />
          <a-asset-item id="IBM-360" src="/sean/console.dae"></a-asset-item>
          <a-asset-item id="terminal-typewriter" src="/sean/teletype.dae"></a-asset-item>
          <a-asset-item id="tape-drive" src="/sean/tape-reader.dae"></a-asset-item>
          <a-asset-item id="disk-pack" src="/sean/diskpack.dae"></a-asset-item>
          <a-asset-item id="punch-reader" src="/sean/card-reader.dae"></a-asset-item>
        </a-assets>
        {props.children}
      </a-scene>
    </div>
  );
}
