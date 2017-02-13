import './aframeComponents/fps-look-controls';

// putUserOnDom performs local filtering to make sure the user is in the same
//   A-Frame room and perfoms an initial render of their avatar if they are
export function putUserOnDOM (user) {
  console.log(`Putting user ${user} on the DOM`);
  if (user.scene === window.location.pathname.replace(/\//g, '') || 'root') {
    const scene = document.getElementById('scene');
    const head = document.createElement('a-minecraft');
    // Just in case a user doesn't have a skin associated with their user, use 3djesus
    const skin = user.skin || '3djesus';
    head.setAttribute('skin', skin);
    scene.appendChild(head);
    head.setAttribute('id', user.id);
    head.setAttribute('minecraft-nickname', user.displayName);
    head.setAttribute('minecraft', `skinUrl: ../../images/${skin}.png;`);
    head.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
    head.setAttribute('rotation', `${user.xrot} ${user.yrot} ${user.zrot}`);
    return head;
  }
}

export function putUserBodyOnDOM (user) {
  const scene = document.getElementById('scene');
  const body = document.createElement('a-minecraft');
  const skin = user.skin || '3djesus';
  scene.appendChild(body);
  body.setAttribute('skin', skin);
  body.setAttribute('id', `${user.id}-body`);
  body.setAttribute('minecraft', `skinUrl: ../../images/${skin}.png;  component: body; heightMeter: 0.4`);
  body.setAttribute('position', `${user.x} ${user.y} ${user.z}`);
  body.setAttribute('rotation', `0 ${user.yrot} 0`);
}

export function changeUserSkin (skin) {
  const avatarHead = document.getElementById(window.socket.id);
  // Just stuff the shortform skin name on the DOM to emit in publish-location
  // I consider this a 'hack' until we change how we update user locations
  avatarHead.setAttribute('skin', skin);
  avatarHead.setAttribute('minecraft', `skinUrl: ../../images/${skin}.png;`);
  // Commented out because we're just floating heads
  // const avatarBody = document.getElementById(`${window.socket.id}-body`);
  // avatarBody.setAttribute('minecraft', `skinUrl: ../../images/${skin}.png;  component: body; heightMeter: 0.4`);
}

export function addFirstPersonProperties (avatar, user) {
  console.log('avatar: ', avatar);
  const scene = document.getElementById('scene');
  const mutebutton = document.createElement('a-entity');
  scene.appendChild(mutebutton);
  mutebutton.setAttribute('geometry', 'primitive: box;  width: .4; height: 0.01; depth: .4');
  mutebutton.setAttribute('id', `mutebutton`);
  mutebutton.setAttribute('material', 'src: #microphone-unmute');
  mutebutton.setAttribute('position', `0 0.1 ${user.z - 1}`);
  mutebutton.setAttribute('rotation', '0 0 0');
  mutebutton.setAttribute('mute-self', false);

  avatar.setAttribute('publish-location', true);
  avatar.setAttribute('camera', true);
  avatar.setAttribute('fps-look-controls', true);
  avatar.setAttribute('wasd-controls', 'sensitivity: 1');

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

// creates an array of x and z coordinates that can be mapped over to create rows of chairs
export function createArray (num) {
  const arr = [];
  for (let i = 1; i <= Math.abs(num); i++) {
    for (let j = 1; j <= Math.abs(num); j++) {
      if (num > 0) arr.push([i, j]);
      else arr.push([i * -1, j]);
    }
  }
  return arr;
}
