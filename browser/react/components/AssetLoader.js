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
      <a-mixin id="chair-part" geometry="primitive: box" material="color: #BFBFBF"></a-mixin>
      <a-asset-item id="monitor" src="/img/monitor/model.dae"></a-asset-item>

      {/* Cat GIF Room assets */}
      <img id="pusheen" src="/img/cats/pusheen.gif"/>
      <img id="pusheen_gangnam" src="/img/cats/pusheen_gangnam.gif"/>
      <img id="nyancat" src="/img/cats/nyancat.gif"/>
      <img id="bwcat" src="/img/cats/bwcat.gif"/>
      <img id="lasercat" src="/img/cats/lasercat.gif"/>
    </a-assets>
  );
}
