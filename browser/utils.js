export function putUserOnDOM (user) {
  const scene = document.getElementById('scene');
  const avatar = document.createElement('a-entity');
  scene.appendChild(avatar);
  avatar.setAttribute('id', user.id);
  avatar.setAttribute('geometry', 'primitive', 'box');
  avatar.setAttribute('material', 'color', user.color);
  avatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  avatar.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
  return avatar;
}

export function addFirstPersonProperties (avatar) {
  avatar.setAttribute('publish-location', true);
  avatar.setAttribute('camera', true);
  avatar.setAttribute('look-controls', true);
  avatar.setAttribute('wasd-controls', true);
  const cursor = document.createElement('a-entity');
  avatar.appendChild(cursor);
  cursor.setAttribute('cursor', 'fuse: true; maxDistance: 30; timeout: 500');
  cursor.setAttribute('position', '0 0 -5');
  cursor.setAttribute('geometry', 'primitive: ring');
  cursor.setAttribute('color: white; shader: flat');
}
