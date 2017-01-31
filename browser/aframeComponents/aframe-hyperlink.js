/* globals AFRAME, sessionStorage, THREE, URLSearchParams */
(function () {
  // Do not log in production.
  var debug = window.location.protocol !== 'https:';
  var log = debug ? console.log.bind(console) : function () {};

  var registerComponent = function () {
    if (typeof AFRAME === 'undefined') {
      throw new Error('Component attempted to register before AFRAME ' +
        'was available.');
    }

    /**
     * Hyperlink component for A-Frame.
     */
    AFRAME.registerComponent('href', {
      schema: {
        default: ''
      },

      /**
       * Called once when component is attached.
       */
      init: function () {
        this.handler = this.handler.bind(this);
        this.el.addEventListener('click', this.handler);
        this.el.addEventListener('gripdown', this.handler);
        this.setupHighlight();
      },

      /**
       * Called when component is removed.
       */
      remove: function () {
        this.el.removeEventListener('click', this.handler);
        this.el.removeEventListener('gripdown', this.handler);
      },

      handler: function () {
        var url = this.data;
        this.el.emit('navigate', url);
        window.location.href = url;
      },

      setupHighlight: function () {
        // Clone mesh and set up highlighter material.
        var mesh = this.el.object3DMap.mesh;
        if (!mesh) {
          return false;
        }
        var clone = mesh.clone();
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
    });
  };

  var initScenesCalled = false;
  var supportsVR = navigator.getVRDisplays && navigator.vrEnabled !== false;

  var whenScene = function (scene, event, callback) {
    // TODO: Return Promises.
    if (event === 'loaded' && scene.hasLoaded) {
      callback();
      return;
    }
    scene.addEventListener(event, callback);
  };

  var persistActiveVRDisplaysIDs = function (displays) {
    displays = displays || [];
    var activeVRDisplaysIDs = JSON.stringify(displays.map(function (display) {
      return display.displayId;
    }));
    sessionStorage.activeVRDisplaysIDs = activeVRDisplaysIDs;
    return activeVRDisplaysIDs;
  };

  var sceneLoaded = function (scene, displays) {
    var shouldPresent = false;

    if (sessionStorage.vrNavigation === 'true') {
      shouldPresent = true;
      delete sessionStorage.vrNavigation;
    }

    // Valid options for auto-presenting in stereo VR mode:
    // - `?vr`, `?vr=true`, `?vr=1`, `?vr=2`, etc.
    // - `?vr-display-name-filter=oculus`, `?vr-display-name-filter=vive`, etc.
    // - `?vr-display-id=1`, `?vr-display-id=2`, etc.
    // - `?vr-mode`, `?vr-mode=stereo`
    if (displays && 'URLSearchParams' in window) {
      var qs = new URLSearchParams(window.location.search);
      var qsGetClean = function (key) {
        return (qs.get(key) || '').trim();
      };
      var qsVr = qsGetClean('vr');
      var qsVrDisplayId = qsGetClean('vr-display-id');
      var qsVrDisplayNameFilter = qsGetClean('vr-display-name-filter');
      var qsVrMode = qsGetClean('vr-mode');

      if ((qs.has('vr') && qsVr !== 'false' && qsVr !== '0') ||
          (qs.has('vr-display-name-filter') && qsVrDisplayNameFilter !== '') ||
          (qs.has('vr-display-id') && qsVrDisplayId !== '') ||
          (qs.has('vr-mode') && qsVrMode !== 'mono')) {
        shouldPresent = true;

        var displayId;
        if (qs.has('vr')) {
          displayId = parseInt(qsVr, 10);
        }
        if (qs.has('vr-display-id')) {
          displayId = parseInt(qsVrDisplayId, 10);
          // `VRDisplay#displayId`s are one-based indexed.
          if (displayId === 0) {
            displayId = 1;
          }
        }
        if (displayId) {
          displays = displays.filter(function (display) {
            return display.displayId === displayId;
          });
          persistActiveVRDisplaysIDs(displays);
        } else if (qs.has('vr')) {
          // Handle `?vr=true`, for example.
          persistActiveVRDisplaysIDs(displays);
        }

        var displayName = qsVrDisplayNameFilter.toLowerCase();
        if (displayName) {
          displays = displays.filter(function (display) {
            return (display.displayName || '').toLowerCase().indexOf(displayName) !== -1;
          });
          persistActiveVRDisplaysIDs(displays);
        }
      } else if (qs.has('vr') ||
                 qs.has('vr-display-name-filter') ||
                 qs.has('vr-display-id') ||
                 qs.has('vr-mode')) {
        shouldPresent = false;
      }
    }

    // TODO: Add `postMessage` event listener.

    if (!scene) {
      return;
    }

    scene.dataset.isLoaded = 'true';

    if (!displays || !supportsVR || !shouldPresent) {
      return;
    }

    var toPresent = [];
    if (navigator.activeVRDisplays && navigator.activeVRDisplays.length) {
      toPresent = navigator.activeVRDisplays;
    }

    // For navigation.
    if (sessionStorage && sessionStorage.activeVRDisplaysIDs) {
      var displayIDs = [];
      try {
        displayIDs = JSON.parse(sessionStorage.activeVRDisplaysIDs);
      } catch (e) {
      }
      toPresent = displayIDs.filter(function (displayID) {
        return displayID;
      });
    }

    if (toPresent.length) {
      // TODO: Handle entering multiple scenes.
      // TODO: Update A-Frame for `<a-scene>`.`enterVR()` to accept an
      // explicit `VRDisplay` to present to.
      if (scene.enterVR) {
        return scene.enterVR(toPresent[0]);
      }
    }
  };

  var handleDisplays = function (displays) {
    if (!displays.length) { return; }
    log('gotDisplays', displays);
    return displays;
  };

  var initScenes = function () {
    log('initScenes: called', initScenesCalled);

    if (initScenesCalled) {
      return;
    }

    initScenesCalled = true;

    var scenes = document.querySelectorAll('a-scene');
    if (!scenes.length) {
      return;
    }

    log('initScenes: checking', initScenesCalled);

    Array.prototype.forEach.call(scenes, function (scene) {
      scene.addEventListener('click', function (e) {
        if (e.detail && e.detail.intersectedEl && e.detail.intersectedEl.hasAttribute('href')) {
          // Fade out to black (isn't super noticeable because navigation
          // happens so quickly).
          scene.dataset.isLoaded = 'false';
        }
      });

      whenScene(scene, 'loaded', function () {
        log('initScenes: loaded', initScenesCalled);
        if (supportsVR) {
          // NOTE: This `navigator.getVRDisplays` call is needed by both
          // Firefox Nightly and experimental Chromium builds currently.
          // And we use it to pass `displays` to `sceneLoaded`, but even
          // if we weren't, we still need this call to "initialise" the
          // WebVR code path in the aforementioned browsers.
          return navigator.getVRDisplays().then(handleDisplays).then(function (displays) {
            return sceneLoaded(scene, displays);
          });
        } else {
          return sceneLoaded(scene);
        }
      });
    });
  };

  var activeVRDisplaysUpdate = function (displays) {
    // Polyfilling `navigator.activeVRDisplays` if unavailable.
    if (!('activeVRDisplays' in navigator)) {
      navigator.activeVRDisplays = displays.filter(function (display) {
        return display.isPresenting;
      });
    }
    if (sessionStorage.vrNavigation === 'true') {
      return;
    }
    persistActiveVRDisplaysIDs(navigator.activeVRDisplays);
  };

  registerComponent();

  if (navigator.getVRDisplays && navigator.vrEnabled !== false) {
    navigator.getVRDisplays().then(activeVRDisplaysUpdate);
  }

  window.addEventListener('vrdisplaypresentchange', function (e) {
    // Implementation status notes:
    //   - Firefox: `display` and `reason` are passed in the event instance.
    //   - Chromium WebVR builds: `display` is supported; `reason` is
    //     supported, but not yet for `navigation`.
    log('"' + e.type + '" event fired');
    activeVRDisplaysUpdate();
  });

  window.addEventListener('load', function (e) {
    log(e.type, e);
    initScenes();
  });

  window.addEventListener('beforeunload', function (e) {
    log(e.type, e);
    sessionStorage.vrNavigation = !!(navigator.activeVRDisplays && navigator.activeVRDisplays.length);
  });

  window.addEventListener('vrdisplayactivate', function (e) {
    log(e.type, e);
  });

  window.addEventListener('vrdisplaydeactivate', function (e) {
    log(e.type, e);
  });
})();
