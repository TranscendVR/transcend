/* global AFRAME THREE */

AFRAME.registerComponent('collider', {
  init: function () {
    const remote = document.getElementById('remote');
    remote.addEventListener('buttondown', evt => {
      const ray = document.getElementById('ray');
      const mesh = ray.getObject3D('mesh');
      const ground = document.getElementById('ground');

      // Find the top and bottom vertices of the ray
      const vertices = mesh.geometry.vertices;
      const topVertex = vertices[0].clone();
      const bottomVertex = vertices[vertices.length - 1].clone();

      bottomVertex.applyMatrix4(ray.object3D.matrixWorld);
      topVertex.applyMatrix4(ray.object3D.matrixWorld);

      // Create a direction vector from start to end of ray
      const directionVector = topVertex.clone().sub(bottomVertex).normalize();

      // Create a raycaster based on the ray's position and the direction vector
      const raycaster = new THREE.Raycaster(bottomVertex, directionVector, 0, 100);
      // Add the ground to the array of objects that the ray can intersect with
      const intersection = raycaster.intersectObjects([ground.object3D], true);

      if (intersection.length) {
        const point = intersection[0].point;
        console.log(`moving to ${point.x} 1.3 ${point.z}`);
        this.el.setAttribute('position', `${point.x} 1.3 ${point.z}`);
      }
    });
  }
});
