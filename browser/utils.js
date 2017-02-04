export function putUserOnDOM (user) {
  const scene = document.getElementById('scene');
  const head = document.createElement('a-minecraft');
  scene.appendChild(head);
  head.setAttribute('id', user.id);
  head.setAttribute('minecraft-nickname', user.color);
  head.setAttribute('minecraft', 'skinUrl: ../../images/3djesus.png;');
  head.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  head.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
  return head;
}

export function putUserBodyOnDOM (user) {
  const scene = document.getElementById('scene');
  const body = document.createElement('a-minecraft');
  scene.appendChild(body);
  body.setAttribute('id', `${user.id}-body`);
  body.setAttribute('minecraft', 'skinUrl: ../../images/3djesus.png;  component: body; heightMeter: 0.4');
  body.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  body.setAttribute('rotation', `0 ${user.yrot} 0`);
}

export function addFirstPersonProperties (avatar) {
  avatar.setAttribute('publish-location', true);
  avatar.setAttribute('camera', true);
  avatar.setAttribute('look-controls', true);
  avatar.setAttribute('wasd-controls', true);
}
