import React from 'react';
import '../../aframeComponents/wearable-skin';
export default (props) => {

  return (
    <a-entity
      geometry="primitive: cylinder; radius:0.5; height:1.5"
      material="opacity: 0;"
      id={props.skin}
      position={`${props.x} ${props.y} ${props.z}`}
      rotation={`${props.xrot} ${props.yrot} ${props.zrot}`}
      wearable-skin>
      <a-minecraft
        position="0 0.5 0"
        minecraft={`skinUrl: ../../images/${props.skin}.png;  component: head; heightMeter: 0.4`}
        minecraft-nickname={props.nickname}
      />
      <a-minecraft
        position="0 0.5 0"
        minecraft={`skinUrl: ../../images/${props.skin}.png;  component: body; heightMeter: 0.4`}
      />
    </a-entity>
  );
};
