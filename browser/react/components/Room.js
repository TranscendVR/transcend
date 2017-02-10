import React from 'react';

export default (props) => (
  <a-entity>
    <a-entity light="type: ambient; color: #ffffe0" position="0 0 0"></a-entity>

    <a-entity id="ground"
              geometry={`primitive: box; width:${props.floorWidth}; height:${props.floorHeight}; depth: ${props.floorDepth}`}
              position={`0 -${props.floorDepth / 2} 0`}
              rotation="-90 0 0"
              material={`color:${props.floorColor}; src: ${props.floorTexture}; repeat:${props.floorWidth}, ${props.floorWidth} `}/>

    <a-entity geometry={`primitive: plane; width:${props.floorWidth}; height:${props.floorHeight}`}
              rotation="90 0 0"
              position={`0, ${props.wallHeight}, 0`}
              material={`color: ${props.ceilingColor}`}/>

    <a-entity geometry={`primitive: plane; width:${props.floorWidth}; height:${props.wallHeight}`}
              rotation="0 0 0"
              position={`0 ${props.wallHeight / 2} ${props.floorHeight / -2}`}
              material={`color: ${props.wallColor}`}/>

    <a-entity geometry={`primitive: plane; width:${props.floorWidth}; height:${props.wallHeight}`}
              rotation="180 0 0"
              position={`0 ${props.wallHeight / 2} ${props.floorHeight / 2}`}
              material={`color: ${props.wallColor}; shader: flat`}/>

    <a-entity geometry={`primitive: plane; width:${props.floorHeight}; height:${props.wallHeight}`}
              rotation="0 90 0"
              position={`${props.floorHeight / -2} ${props.wallHeight / 2} 0`}
              material={`color: ${props.wallColor}`}/>

    <a-entity geometry={`primitive: plane; width:${props.floorHeight}; height:${props.wallHeight}`}
              rotation="0 -90 0"
              position={`${props.floorHeight / 2} ${props.wallHeight / 2} 0`}
              material={`color: ${props.wallColor}`}/>
  </a-entity>
);
