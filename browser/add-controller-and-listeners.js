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

  // Put remote on DOM
  const remote = document.createElement('a-entity');
  avatar.appendChild(remote);
  remote.setAttribute('id', 'remote');
  remote.setAttribute('daydream-controller', true);

  // Put ray on DOM
  const ray = document.createElement('a-entity');
  remote.appendChild(ray);
  ray.setAttribute('id', 'ray');
  ray.setAttribute('geometry', 'buffer: false; primitive: cone; radius-bottom: 0.005; radius-top: 0.001; height: 8');
  ray.setAttribute('material', 'color: cyan');
  ray.setAttribute('position', '0 0 -4');
  ray.setAttribute('rotation', '-90 0 0');

  // Put position guide on DOM
  // Primary purpose is for the user to more easily see where the end of the ray is located
  const positionGuide = document.createElement('a-entity');
  remote.appendChild(positionGuide);
  positionGuide.setAttribute('geometry', 'primitive: sphere; radius: 0.05');
  positionGuide.setAttribute('material', 'color: white');
  positionGuide.setAttribute('position', '0 0 -8');

  // Attach collider component to the avatar
  // The collider component primarily determines the shooting of rays from the controller to the ground
  // It also sets the avatar's position to the intersection point
  avatar.setAttribute('collider', true);
}
