// createHyperlinkComponent is a factory function that creates A-Frame components with the following characteristics:
//   -- Hovering the cursor over the entity with the component causes it to highlight in a transluscent blue
//   -- Selectable via both click and gripdown events
//   -- Upon select, fires the handler function passed into the factory
// This file was originally inspired by Eric Layton's aframe-link-demo, but has deviated much since
// https://github.com/321C4/aframe-link-demo

export default function createHyperlinkComponent (handler) {
  // General Purpose Abstract Hyperlink Component
  const abstractComponent = {
    schema: { default: '' },
    // init binds this, creates event listeners for click and grip that both trigger the href handler, and setups the highlight effect.
    init: function () {
      this.handler = this.handler.bind(this);
      this.setupHighlight = this.setupHighlight.bind(this);
      this.el.addEventListener('click', this.handler);
      this.el.addEventListener('gripdown', this.handler);
      this.setupHighlight();
    },

    // Remove cleans up event listeners when removed.
    remove: function () {
      this.el.removeEventListener('click', this.handler);
      this.el.removeEventListener('gripdown', this.handler);
    },

    // Dummy Handler that will be replaced by handler argument
    handler: function () {
      console.log('Abstract component handler fired.');
    },

    // setupHighlight creates a transluscent blue glow that is 20% larger than the shape with the href in all directions
    setupHighlight: function () {
      // Clone mesh and set up highlighter material.
      const mesh = this.el.object3DMap.mesh;
      if (!mesh) {
        return false;
      }
      const clone = mesh.clone();
      clone.material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.3
      });
      clone.scale.set(1.2, 1.2, 1.2);
      clone.visible = false;
      mesh.parent.add(clone);

      // Toggle highlighter on mouse events.
      this.el.addEventListener('mouseenter', function () {
        clone.visible = true;
      });

      this.el.addEventListener('mouseleave', function () {
        clone.visible = false;
      });
    }
  };
  // Overwrite the handler with one passed by the user.
  abstractComponent.handler = handler;
  // Return custom hyperlink component
  return abstractComponent;
}
