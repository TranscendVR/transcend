import React from 'react';

export default (props) => (
  <a-entity id="table" position={`${props.x} ${props.y} ${props.z}`}>
    <a-entity geometry={`primitive: box; depth: ${props.depth}; height: 0.20; width: 3`}
      material={`color: ${props.color}`}
      position={`0 ${props.legHeight} 0`}></a-entity>
    <a-entity geometry={`primitive: box; depth: ${props.depth}; height: ${props.legHeight}; width: 0.10`}
      material={`color: ${props.color}`}
      position={`1.45 ${props.legHeight / 2} 0`}></a-entity>
    <a-entity geometry={`primitive: box; depth: ${props.depth}; height: ${props.legHeight}; width: 0.10`}
      material={`color: ${props.color}`}
      position={`-1.45 ${props.legHeight / 2} 0`}></a-entity>
  </a-entity>
);
