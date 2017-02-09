export default function addControllerAndListeners () {
  // Take cursor off DOM
  const cursor = document.getElementById('cursor');
  if (cursor) {
    console.log('woo');
  }

  // put remote on DOM
  // const you = document.getElementById('you');
  // const remote = document.getElementById('remote');
  // const ground = document.getElementById('ground');
  // let intersection;
  // let focused = false;

  // ground.addEventListener('raycaster-intersected', function (e) {
  //   focused = true;
  //   intersection = e.detail.intersection.point;
  // });

  // ground.addEventListener('raycaster-intersected-cleared', function () {
  //   focused = false;
  // });

  // remote.addEventListener('buttondown', function (e) {
  //   if (focused) {
  //     console.log(`moving to ${intersection.x} 1.6 ${intersection.z}`);
  //     you.setAttribute('position', `${intersection.x} 1.6 ${intersection.z}`);
  //   }
  // });
}
