// This function is triggered from Redux when the user enters VR mode

export default function addControllerAndListeners (userId) {
  const scene = document.getElementById('scene');

  // Take cursor off DOM
  const cursor = document.getElementById('cursor');
  if (cursor) {
    scene.remove(cursor);
    cursor.parentNode.removeChild(cursor);
  }

  const avatar = document.getElementById(userId);

  const intermediary = document.createElement('a-entity');
  avatar.appendChild(intermediary);
  intermediary.setAttribute('tracked-controls', 'id:Daydream Controller');

  // Put remote on DOM
  const remote = document.createElement('a-entity');
  intermediary.appendChild(remote);
  remote.setAttribute('id', 'remote');
  // remote.setAttribute('daydream-controller', true);
  remote.setAttribute('position', '0 -0.5 -0.5');
  remote.setAttribute('obj-model', 'obj:https://raw.githubusercontent.com/TechnoBuddhist/VR-Controller-Daydream/master/vr_controller_daydream.obj; mtl:https://raw.githubusercontent.com/TechnoBuddhist/VR-Controller-Daydream/master/vr_controller_daydream.mtl');

  // Put ray on DOM
  const ray = document.createElement('a-entity');
  remote.appendChild(ray);
  ray.setAttribute('id', 'ray');
  ray.setAttribute('geometry', 'buffer: false; primitive: cylinder; radius: 0.003; height: 6');
  ray.setAttribute('material', 'color: cyan');
  ray.setAttribute('position', '0 0 -3');
  ray.setAttribute('rotation', '-90 0 0');

  // Put position guide on DOM
  // Primary purpose is for the user to more easily see where the end of the ray is located
  const positionGuide = document.createElement('a-entity');
  remote.appendChild(positionGuide);
  positionGuide.setAttribute('geometry', 'primitive: sphere; radius: 0.05');
  positionGuide.setAttribute('material', 'color: white');
  positionGuide.setAttribute('position', '0 0 -6');

  // Attach collider component to the avatar
  // The collider component primarily determines the shooting of rays from the controller to the ground
  // It also sets the avatar's position to the intersection point
  avatar.setAttribute('collider', true);
}
