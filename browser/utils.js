// putUserOnDom checks to see if another user's avatar is in the same world as the
//   player. If they are, it creates an A-Entity for their avatar, adds it to the
//   room's A-Scene as a DOM node, and sets the attribues of the A-Entity to the
//   location, rotation, and look of the attributes in the user object.
// Returns the DOM node of the avatar if one was added.
export function putUserOnDOM (user) {
  console.log(`Putting user ${user} on the DOM`);
  if (user.scene === window.location.pathname.replace(/\//g, '') || 'root') {
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
  const cursor = document.createElement('a-entity');
  avatar.appendChild(cursor);
  cursor.setAttribute('cursor', 'fuse:true;');
  cursor.setAttribute('position', '0 0 -0.1');
  cursor.setAttribute('material', 'color: cyan; shader: flat');
  cursor.setAttribute('geometry', 'primitive: ring; radiusOuter: 0.007; radiusInner: 0.005;');
}
