
// putUserOnDom checks to see if another user's avatar is in the same world as the
//   player. If they are, it creates an A-Entity for their avatar, adds it to the
//   room's A-Scene as a DOM node, and sets the attribues of the A-Entity to the
//   location, rotation, and look of the attributes in the user object.
// Returns the DOM node of the avatar if one was added.
export function putUserOnDOM (user) {
  if (user.scene === window.location.pathname.replace(/\//g, '') || 'root') {
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
}

export function addFirstPersonProperties (avatar) {
  avatar.setAttribute('publish-location', true);
  avatar.setAttribute('camera', true);
  avatar.setAttribute('look-controls', true);
  avatar.setAttribute('wasd-controls', true);

  // Add and append the cursor to the player's avatar
  // The cursor is represented by a tiny ring 1/10 of a meter in front of the player
  // The cursor casts a ray along the vector from the player to the cursor
  // The cursor emits click events and fuse events (automatically emitting click after keeping cursor on something)
  // The commented out code intends to provide the end user visual feedback of click and fuse events
  //   similar to https://aframe.io/docs/0.4.0/components/cursor.html#adding-visual-feedback
  //   However, this is not yet functional.
  const cursor = document.createElement('a-entity');
  avatar.appendChild(cursor);
  cursor.setAttribute('cursor', 'fuse:true;');
  // cursor.setAttribute('raycaster', 'objects: .clickable;');
  cursor.setAttribute('position', '0 0 -0.1');
  cursor.setAttribute('material', 'color: cyan; shader: flat');
  cursor.setAttribute('geometry', 'primitive: ring; radiusOuter: 0.007; radiusInner: 0.005;');


  // const clickAnimation = document.createElement('a-animation');
  // cursor.appendChild(clickAnimation);
  // clickAnimation.setAttribute('begin', 'click');
  // clickAnimation.setAttribute('easing', 'ease-in');
  // clickAnimation.setAttribute('attribute', 'scale');
  // clickAnimation.setAttribute('fill', 'backwards');
  // clickAnimation.setAttribute('from', '0.1 0.1 0.1');
  // clickAnimation.setAttribute('to', '1 1 1');
  // clickAnimation.setAttribute('dur', '150');

  // const fuseAnimation = document.createElement('a-animation');
  // cursor.appendChild(fuseAnimation);
  // fuseAnimation.setAttribute('begin', 'fusing');
  // fuseAnimation.setAttribute('easing', 'ease-in');
  // fuseAnimation.setAttribute('attribute', 'scale');
  // fuseAnimation.setAttribute('fill', 'forwards');
  // fuseAnimation.setAttribute('from', '1 1 1');
  // fuseAnimation.setAttribute('to', '0.1 0.1 0.1');
  // fuseAnimation.setAttribute('dur', '1500');
}
