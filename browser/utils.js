export function putUserOnDOM (user) {
  const scene = document.querySelector('a-scene');
  const avatar = document.createElement('a-box');
  scene.appendChild(avatar);
  avatar.setAttribute('id', user.id);
  avatar.setAttribute('color', user.color);
  avatar.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  avatar.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
}
