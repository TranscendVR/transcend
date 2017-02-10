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
  remote.setAttribute('raycaster', 'objects', '.selectable');

  // Put ray on DOM
  const ray = document.createElement('a-entity');
  remote.appendChild(ray);
  ray.setAttribute('id', 'ray');
  ray.setAttribute('geometry', 'primitive: cone; radius-bottom: 0.005; radius-top: 0.001; height: 4');
  ray.setAttribute('material', 'color: cyan');
  ray.setAttribute('position', '0 0 -2');
  ray.setAttribute('rotation', '-90 0 0');

  // const babyRay = document.createElement('a-entity');
  // remote.appendChild(babyRay);
  // babyRay.setAttribute('geometry', 'buffer: false; primitive: cone; radius-bottom: 0.01; radius-top: 0.005; height: 0.5');
  // babyRay.setAttribute('id', 'babyRay');
  // babyRay.setAttribute('material', 'color: white');
  // babyRay.setAttribute('position', '0 0 -0.25');
  // babyRay.setAttribute('rotation', '-90 0 0');

  // avatar.setAttribute('collider', true);

  // Put position guide on DOM
  const positionGuide = document.createElement('a-entity');
  remote.appendChild(positionGuide);
  positionGuide.setAttribute('geometry', 'primitive: sphere; radius: 0.05');
  positionGuide.setAttribute('material', 'color: white');
  positionGuide.setAttribute('position', '0 0 -4');

  // Add event listeners to ground and remote
  const ground = document.getElementById('ground');
  let intersection;
  let focused = false;

  ground.addEventListener('raycaster-intersected', function (evt) {
    focused = true;
    intersection = evt.detail.intersection.point;
  });

  ground.addEventListener('raycaster-intersected-cleared', function () {
    focused = false;
  });

  remote.addEventListener('buttondown', function (evt) {
    if (focused) {
      console.log(`moving to ${intersection.x} 1.3 ${intersection.z}`);
      avatar.setAttribute('position', `${intersection.x} 1.3 ${intersection.z}`);
    }
  });
}
