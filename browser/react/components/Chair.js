import React from 'react';

export default (props) => (
  <a-entity id="chair" position={`${props.x} ${props.y} ${props.z}`} rotation="0 180 0">
    <a-entity mixin="chair-part"
              geometry="height: 1; depth: 0.05; width: 0.05"
              position="-0.25 0.5 0"></a-entity>
    <a-entity mixin="chair-part"
              geometry="height: 1; depth: 0.05; width: 0.05"
              position="0.25 0.5 0"></a-entity>
    <a-entity mixin="chair-part"
              geometry="height: 0.5; depth: 0.05; width: 0.05"
              position="-0.25 0.25 0.5"></a-entity>
    <a-entity mixin="chair-part"
              geometry="height: 0.5; depth: 0.05; width: 0.05"
              position="0.25 0.25 0.5"></a-entity>
    <a-entity mixin="chair-part"
              geometry="height: 0.05; depth: 0.05; width: 0.55"
              position="0 1 0"></a-entity>
    <a-entity material="color: black"
              geometry="primitive: box; depth: 0.55; height: 0.05; width: 0.55"
              position="0 0.5 0.25"></a-entity>
  </a-entity>
);
