export function putUserOnDOM (user) {
  const scene = document.getElementById('scene');
  const head = document.createElement('a-minecraft');
  const body = document.createElement('a-minecraft');
  scene.appendChild(head);
  scene.appendChild(body);
  head.setAttribute('id', user.id);
  body.setAttribute('id', `${user.id}-body`);
  head.setAttribute('minecraft-nickname', user.color);
  head.setAttribute('minecraft', 'skinUrl: ../../images/3djesus.png;');
  body.setAttribute('minecraft', 'skinUrl: ../../images/3djesus.png;  component: body; heightMeter: 0.4');
  head.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  body.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  head.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
  body.setAttribute('rotation', `0 ${user.yrot} 0`);
  return head;
}

export function addFirstPersonProperties (avatar) {
  avatar.setAttribute('publish-location', true);
  avatar.setAttribute('camera', true);
  avatar.setAttribute('look-controls', true);
  avatar.setAttribute('wasd-controls', true);
}
