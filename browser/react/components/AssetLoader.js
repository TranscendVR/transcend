import React from 'react';

export default function AssetLoader (props) {
  return (
    <a-assets timeout="60000" >
      {/* Sean's Room assets */}
      <a-asset-item id="IBM-360" src="/sean/console.dae"></a-asset-item>
      <a-asset-item id="terminal-typewriter" src="/sean/teletype.dae"></a-asset-item>
      <a-asset-item id="tape-drive" src="/sean/tape-reader.dae"></a-asset-item>
      <a-asset-item id="disk-pack" src="/sean/diskpack.dae"></a-asset-item>
      <a-asset-item id="punch-reader" src="/sean/card-reader.dae"></a-asset-item>

      {/* Lobby assets */}
      <img id="slide" src="/img/class_copy.png"/>
      <img id="podium" src="/img/fullstack.png"/>
      <img id="floorText" src="/img/carpet2.jpg"/>
      <img id="microphone-mute" src="/img/microphone-mute.png"/>
      <img id="microphone-unmute" src="/img/microphone-unmute.png"/>
      <a-mixin id="chair-part" geometry="primitive: box" material="color: brown"></a-mixin>
      <a-asset-item id="monitor" src="/img/monitor/model.dae"></a-asset-item>

      {/* YoonahRoom assets */}
      <img id="pusheen" src="/img/pusheen.gif"/>
    </a-assets>
  );
}
