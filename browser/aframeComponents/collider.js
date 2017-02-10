/* global AFRAME THREE */

AFRAME.registerComponent('collider', {
  init: function () {
    const remote = document.getElementById('remote');
    remote.addEventListener('buttondown', evt => {
      console.log('button down');
      const babyRay = document.getElementById('babyRay');
      const mesh = babyRay.getObject3D('mesh');
      const ground = document.getElementById('ground');
      // console.log(ground);

      const vertices = mesh.geometry.vertices;
      // console.log('vertices', vertices);
      const bottomVertex = vertices[0].clone();
      console.log(bottomVertex);
      const topVertex = vertices[vertices.length - 1].clone();
      console.log(topVertex);

      bottomVertex.applyMatrix4(babyRay.object3D.matrixWorld);
      topVertex.applyMatrix4(babyRay.object3D.matrixWorld);

      // Direction vector from start to end of entity.
      const directionVector = topVertex.clone().sub(bottomVertex).normalize();
      console.log('direction', directionVector);

      const raycaster = new THREE.Raycaster(bottomVertex, directionVector, 1);
      const intersection = raycaster.intersectObjects([ground.object3D]);
      console.log(intersection);

      if (intersection.length) {
        console.log(intersection[0].point);
      }
    });
  }
});

// not useful here but possibly useful for collision detection with walls
// const rayBB = new THREE.Box3().setFromObject(ray);
// const groundBB = new THREE.Box3().setFromObject(ground);
// const collision = rayBB.intersect(groundBB);
// console.log('collision', collision);
// this.el.setAttribute('position', `${collision.max.x} 1.3 ${collision.max.z}`);
