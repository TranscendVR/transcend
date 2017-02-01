export function putUserOnDOM (user) {
  const scene = document.getElementById('scene');
  const avatar = document.createElement('a-minecraft');
  scene.appendChild(avatar);
  avatar.setAttribute('id', user.id);
  avatar.setAttribute('minecraft-nickname', 'Test');
  avatar.setAttribute('minecraft', 'skinUrl: ../../images/3djesus.png');
  avatar.setAttribute('material', 'color', user.color);
  avatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  avatar.setAttribute('rotation', `${user.xrot} ${user.yrot + 180} ${user.zrot}`);
  return avatar;
}

export function addFirstPersonProperties (avatar) {
  avatar.setAttribute('publish-location', true);
  avatar.setAttribute('camera', true);
  avatar.setAttribute('look-controls', true);
  avatar.setAttribute('wasd-controls', true);
}
