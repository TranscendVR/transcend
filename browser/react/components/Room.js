import React from 'react';

export default (props) => (
  <a-entity>
    <a-entity id="floor"
              geometry={`primitive: plane; width:${props.floorWidth}; height:${props.floorHeight}`}
              rotation="-90 0 0"
              material={`src: ${props.floorTexture}; repeat: ${props.floorWidth}`}/>

    <a-entity id="ceiling"
              geometry={`primitive: plane; width:${props.floorWidth}; height:${props.floorHeight}`}
              rotation="90 0 0"
              position={`0, ${props.wallHeight}, 0`}
              material={`color: ${props.ceilingColor}`}/>

    <a-entity id="back-wall"
              geometry={`primitive: plane; width:${props.floorWidth}; height:${props.wallHeight}`}
              rotation="0 0 0"
              position={`0 ${props.wallHeight / 2} ${props.floorHeight / -2}`}
              material={`color: ${props.wallColor}`}/>

    <a-entity id="front-wall"
              geometry={`primitive: plane; width:${props.floorWidth}; height:${props.wallHeight}`}
              rotation="180 0 0"
              position={`0 ${props.wallHeight / 2} ${props.floorHeight / 2}`}
              material={`color: ${props.wallColor}; shader: flat`}/>

    <a-entity id="left-wall"
              geometry={`primitive: plane; width:${props.floorHeight}; height:${props.wallHeight}`}
              rotation="0 90 0"
              position={`${props.floorHeight / -2} ${props.wallHeight / 2} 0`}
              material={`color: ${props.wallColor}`}/>

    <a-entity id="right-wall"
              geometry={`primitive: plane; width:${props.floorHeight}; height:${props.wallHeight}`}
              rotation="0 -90 0"
              position={`${props.floorHeight / 2} ${props.wallHeight / 2} 0`}
              material={`color: ${props.wallColor}`}/>
  </a-entity>
);
