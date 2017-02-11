import React from 'react';

export default function AssetLoader (props) {
  return (
    <a-assets timeout="60000" >

      {/* Lobby assets */}
      <img id="slide" src="/img/class_copy.png"/>
      <img id="podium" src="/img/fullstack.png"/>
      <img id="floorText" src="/img/carpet2.jpg"/>
      <img id="microphone-mute" src="/img/microphone-mute.png"/>
      <img id="microphone-unmute" src="/img/microphone-unmute.png"/>
      <a-mixin id="chair-part" geometry="primitive: box" material="color: brown"></a-mixin>
      <a-asset-item id="monitor" src="/img/monitor/model.dae"></a-asset-item>
    </a-assets>
  );
}
