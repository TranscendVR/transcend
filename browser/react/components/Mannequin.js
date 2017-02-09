import React from 'react';
import '../../aframeComponents/wearable-skin';

export default (props) => (
  <a-entity position={`${props.x} ${props.y} ${props.z}`} rotation={`${props.xrot} ${props.yrot} ${props.zrot}`} wearable-skin="">
    <a-minecraft
      minecraft={`skinUrl: ../../images/${props.skin}.png;  component: head; heightMeter: 0.4`}
      minecraft-nickname={props.nickname}
      wearable-skin=""
    />
    <a-minecraft
      minecraft={`skinUrl: ../../images/${props.skin}.png;  component: body; heightMeter: 0.4`}
      wearable-skin=""
    />
  </a-entity>
);
