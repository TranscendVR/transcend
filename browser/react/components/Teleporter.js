import React from 'react';
import '../../aframeComponents/aframe-hyperlink';

export default function Teleporter (props) {
  return (
    <a-entity position={`${props.x} ${props.y} ${props.z}`}>
      <a-entity geometry="primitive: sphere; radius:0.3;" rotation="0 200 0" material={`color: ${props.color}; opacity: 1; roughness: 0.8`} href={props.href}></a-entity>
      <a-entity geometry="primitive: sphere" class="highlight" visible="false" radius="0.35" rotation="0 0 0" material="color: #0000ff; opacity: 0.6; roughness: 1; metalness: 0.5;"></a-entity>
      <a-entity geometry="primitive: box;" id="shadow" position="0 -1 0" material="color: #999; opacity: 1;" rotation="0 0 0" scale="0.4 1 0.4"></a-entity>
    </a-entity>
  );
}
