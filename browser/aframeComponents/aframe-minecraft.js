import AFRAME from 'aframe';

const THREEx = THREEx || {};
const THREE = window.THREE;

THREEx.createAnimation = function (opts) {
  return new THREEx.Animation(opts);
};

//    Constructor       //

/**
* handle an animation
*
* @name THREEx.Animation
* @class
*/
THREEx.Animation = function () {
  // update function
  this._updateFcts = [];
  this.update = function (delta, now) {
    this._updateFcts.forEach(function (updateFct) {
      updateFct(delta, now);
    });
  }.bind(this);
  // init stuff
  this._keyframes = [];
  this._totalTime = null;
  this._onUpdate = null;
  this._onCapture = function (position) {};
  this._initialPos = {};
  this._propertyTweens = {};
};


/**
* Destructor
*/
THREEx.Animation.prototype.destroy = function () {
  this.stop();
};


//    setup         //

/**
* @param {Number} duration the duration of this keyframe validity in seconds
* @param {Object} position list of properties involved in the animations
*/
THREEx.Animation.prototype.pushKeyframe = function (duration, position) {
  this._keyframes.push({
    duration: duration,
    position: position
  });
  return this;  // for chained API
};

/**
* Set the Update callback
*
* @param {function} fn the update callback
*/
THREEx.Animation.prototype.onUpdate = function (fn) {
  this._onUpdate = fn;
  return this;  // for chained API
};

/**
* Set the Capture callback
*
* @param {function} fn the update callback
*/
THREEx.Animation.prototype.onCapture = function (fn) {
  this._onCapture = fn;
  return this;  // for chained API
};

/**
* Set propertyTweens
*
* @param {function} fn the update callback
*/
THREEx.Animation.prototype.propertyTweens = function (propertyTweens) {
  this._propertyTweens = propertyTweens;
  return this; // for chained API
};

/**
* get the total animation duration
*
* @returns {Number} the duration of the whole animation
*/
THREEx.Animation.prototype.duration = function () {
  if (this._keyframes.length === 0) return 0;
  const lastKeyframe = this._keyframes[this._keyframes.length - 1];
  return lastKeyframe._endTime;
};

//    interpolation         //

/**
* build a interpolated position
*
* @param {Number} age amount of seconds since the animation started
*/
THREEx.Animation.prototype._buildPosition = function (age) {
  // compute the deltatime
  const delta = age % this.duration();
  let baseFrame;
  let frameIdx;
  // find baseFrame based on delta
  for (frameIdx = 0; frameIdx < this._keyframes.length; frameIdx++) {
    baseFrame = this._keyframes[frameIdx];
    if (delta < baseFrame._startTime) continue;
    if (delta >= baseFrame._endTime) continue;
    break;
  }
  // sanity check - the baseFrame has to be known
  console.assert(frameIdx !== this._keyframes.length);
  // compute some variables
  const timeOffset = delta - baseFrame._startTime;
  const timePercent = timeOffset / baseFrame.duration;
  const nextFrame = this._keyframes[ (frameIdx + 1) % this._keyframes.length ];

  // console.log("delta", delta)
  // console.log("frameIdx", frameIdx)
  // console.log("timeOffset", timeOffset)
  // console.log("timePercent", timePercent)

  let basePosition = baseFrame.position;
  const nextPosition = nextFrame.position;

  // zero this._initialPos if age > baseFrame.duration - it wont be usefull anymore
  if (age > baseFrame.duration && this._initialPos) this._initialPos = null;
  // if frameIdx === 0 and there is a this._initialPos, use it as basePosition
  if (frameIdx === 0 && this._initialPos) basePosition = this._initialPos;

  // compute the result based on the linear interpolation between the two frames based on time offset within the frame
  const result = {};
  for (const property in baseFrame.position) {
    // check the property exists
    console.assert(nextPosition[property] !== undefined);
    console.assert(basePosition[property] !== undefined);
    // linear interpolation between the values
    const baseValue = basePosition[property];
    const nextValue = nextPosition[property];
    // define propertyTween for this property - default to linear interpolation
    const propertyTween = this._propertyTweens[property] || function (baseValue, nextValue, timePercent) {
      return (1 - timePercent) * baseValue + timePercent * nextValue;
    };
    // compute the actual result
    result[property] = propertyTween(baseValue, nextValue, timePercent);
  }
  // return the result
  return result;
};

/**
* Start the animation
*/
THREEx.Animation.prototype.start = function () {
  // update _startTime and _endTime
  this._totalTime = 0;
  this._keyframes.forEach(function (keyframe) {
    keyframe._startTime = this._totalTime;
    this._totalTime += keyframe.duration;
    keyframe._endTime = this._totalTime;
  }.bind(this));

  // get this._initialPos from this._onCapture()
  // - the initial position is the position when the animation started.
  // - it will be used as basePosition during the first keyframe of the animation
  // - it is optional. the user may not define it
  this._initialPos = Object.create(this._keyframes[0].position);
  this._onCapture(this._initialPos);

  // init the loop callback
  const startDate = Date.now() / 1000;
  this._$loopCb = function () {
    const age = Date.now() / 1000 - startDate;
    const position = this._buildPosition(age);
    this._onUpdate(position);
  }.bind(this);
  this._updateFcts.push(this._$loopCb);
};

/**
* test if the animation is running or not
*
* @returns {boolean} return true if the animation is running, false otherwise
*/
THREEx.Animation.prototype.isRunning = function () {
  return !!this._$loopCb;
};

/**
* Stop the animation
*/
THREEx.Animation.prototype.stop = function () {
  this._$loopCb && this._updateFcts.splice(this._updateFcts.indexOf(this._$loopCb), 1);
  this._$loopCb = null;
};

/**
* create a THREEx.Animations
*
* @name THREEx.createAnimations
* @class
*/
THREEx.createAnimations = function () {
  return new THREEx.Animations();
};

/**
* handle multiple THREEx.Animation mutually exclusive
*
* @name THREEx.Animations
* @class
*/
THREEx.Animations = function () {
  this._animations = {};
  this._currentAnim = null;
  this._animationName = null;
};

/**
* Destructor
*/
THREEx.Animations.prototype.destroy = function () {
  this._currentAnim && this._currentAnim.destroy();
};

//            //

/**
* Add an animation
*
* @param {String} name the name of the animation to add
* @param {THREEx.Animation} animation the THREEx.Animation to add
*/
THREEx.Animations.prototype.add = function (name, animation) {
  console.assert(animation instanceof THREEx.Animation);
  this._animations[name] = animation;
  return this;  // for chained api
};

THREEx.Animations.prototype.list = function () {
  return this._animations;
};

/**
* return the name of all animations
*
* @returns {String[]} list of the animations names
*/
THREEx.Animations.prototype.names = function () {
  return Object.keys(this._animations);
};

//                    //

/**
* Start a animation. If an animation is already running, it is stopped
*
* @param {string} animationName the name of the animation
*/
THREEx.Animations.prototype.start = function (animationName) {
  // if this animation is already the current one, do nothing
  if (this._animationName === animationName) return this;
  // stop current animation
  if (this.isRunning()) this.stop();
  console.assert(this._animations[animationName] !== undefined, 'unknown animation name: ' + animationName);
  this._animationName = animationName;
  this._currentAnim = this._animations[animationName];
  this._currentAnim.start();
  return this;  // for chained API
};

/**
* test if an animation is running
*
* @returns {boolean} true if an animation is running, false otherwise
*/
THREEx.Animations.prototype.isRunning = function () {
  return !!this._currentAnim;
};


/**
* rendering update function
*/
THREEx.Animations.prototype.update = function (delta, now) {
  if (this.isRunning() === false) return;
  this._currentAnim.update(delta, now);
};

THREEx.Animations.prototype.animationName = function () {
  return this._animationName;
};

/**
* Stop the running animation if any
*/
THREEx.Animations.prototype.stop = function () {
  this._currentAnim && this._currentAnim.destroy();
  this._currentAnim = null;
  this._animationName = null;
  return this;  // for chained API
};

/**
* [ description]
* @param  {[type]} skinUrl [description]
* @return {[type]}         [description]
*/
THREEx.MinecraftChar = function (skinUrl) {
  this.baseUrl = './';
  // set default arguments values
  skinUrl = skinUrl || (THREEx.MinecraftChar.baseUrl + 'images/3djesus.png');

  const texture = new THREE.Texture();
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  this.texture = texture;
  this.loadSkin(skinUrl);

  const defaultMaterial = THREEx.MinecraftChar.defaultMaterial || THREE.MeshBasicMaterial;
  const material = new defaultMaterial({
    map: texture
  });
  const materialTran = new defaultMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide
  });

  //    define size constant    //
  const sizes = {};
  sizes.cameraMod = 0.8;
  sizes.charH = 1;
  sizes.pixRatio = 1 / 32;

  sizes.headH = 8 * sizes.pixRatio;
  sizes.headW = 8 * sizes.pixRatio;
  sizes.headD = 8 * sizes.pixRatio;

  sizes.helmetH = 9 * sizes.pixRatio;
  sizes.helmetW = 9 * sizes.pixRatio;
  sizes.helmetD = 9 * sizes.pixRatio;

  sizes.bodyH = 12 * sizes.pixRatio;
  sizes.bodyW = 8 * sizes.pixRatio;
  sizes.bodyD = 4 * sizes.pixRatio;

  sizes.legH = 12 * sizes.pixRatio;
  sizes.legW = 4 * sizes.pixRatio;
  sizes.legD = 4 * sizes.pixRatio;

  sizes.armH = 12 * sizes.pixRatio;
  sizes.armW = 4 * sizes.pixRatio;
  sizes.armD = 4 * sizes.pixRatio;


  // build model core hierachy
  // - origin between 2 feet
  // - height of full character is 1
  const model = this;
  model.root = new THREE.Object3D();
  model.rootBody = new THREE.Object3D();

  const group = new THREE.Object3D();
  group.position.y = sizes.charH - sizes.headH - sizes.cameraMod;
  model.headGroup = group;
  model.root.add(model.headGroup);

  // build model.head
  let geometry = new THREE.CubeGeometry(sizes.headW, sizes.headH, sizes.headD);
  mapUv(geometry, 0, 16, 24, 24, 16); // left
  mapUv(geometry, 1, 0, 24, 8, 16); // right
  mapUv(geometry, 2, 8, 32, 16, 24); // top
  mapUv(geometry, 3, 16, 32, 24, 24); // bottom
  mapUv(geometry, 4, 8, 24, 16, 16); // front
  mapUv(geometry, 5, 24, 24, 32, 16); // back
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = sizes.headH / 2;
  mesh.rotation.y = 135;
  model.head = mesh;
  model.headGroup.add(model.head);


  // build model.helmet
  geometry = new THREE.CubeGeometry(sizes.helmetH, sizes.helmetH, sizes.helmetH);
  model.helmet = new THREE.Mesh(geometry, materialTran);
  model.headGroup.add(model.helmet);
  model.helmet.position.y = sizes.headH / 2;
  model.helmet.rotation.y = 135;
  mapUv(geometry, 0, 48, 24, 56, 16); // left
  mapUv(geometry, 1, 32, 24, 40, 16); // right
  mapUv(geometry, 2, 40, 32, 48, 24); // top
  mapUv(geometry, 3, 48, 32, 56, 24); // bottom
  mapUv(geometry, 4, 40, 24, 48, 16); // front
  mapUv(geometry, 5, 56, 24, 64, 16); // back


  // build model.body
  geometry = new THREE.CubeGeometry(sizes.bodyW, sizes.bodyH, sizes.bodyD);
  model.body = new THREE.Mesh(geometry, material);
  model.rootBody.add(model.body);
  model.body.position.y = sizes.legH + sizes.bodyH / 2 - sizes.cameraMod;
  model.body.rotation.y = 135;
  mapUv(geometry, 0, 28, 12, 32, 0); // left
  mapUv(geometry, 1, 16, 12, 20, 0); // right
  mapUv(geometry, 2, 20, 16, 28, 12); // top
  mapUv(geometry, 3, 28, 16, 32, 12); // bottom
  mapUv(geometry, 4, 20, 12, 28, 0); // front
  mapUv(geometry, 5, 32, 12, 40, 0); // back

  // build model.armR
  geometry = new THREE.CubeGeometry(sizes.armW, sizes.armH, sizes.armD);
  model.armR = new THREE.Mesh(geometry, material);
  model.rootBody.add(model.armR);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -sizes.armH / 2 + sizes.armW / 2, 0));
  model.armR.position.x = -sizes.bodyW / 2 - sizes.armW / 2;
  model.armR.position.y = sizes.legH + sizes.bodyH - sizes.armW / 2 - sizes.cameraMod;
  model.armR.rotation.y = 135;
  mapUv(geometry, 0, 48, 12, 52, 0); // right
  mapUv(geometry, 1, 40, 12, 44, 0); // left
  mapUv(geometry, 2, 44, 16, 48, 12); // top
  mapUv(geometry, 3, 48, 16, 52, 12); // bottom
  mapUv(geometry, 4, 44, 12, 48, 0); // front
  mapUv(geometry, 5, 52, 12, 56, 0); // back

  // build model.armL
  geometry = new THREE.CubeGeometry(sizes.armW, sizes.armH, sizes.armD);
  model.armL = new THREE.Mesh(geometry, material);
  model.rootBody.add(model.armL);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -sizes.armH / 2 + sizes.armW / 2, 0));
  model.armL.position.x = sizes.bodyW / 2 + sizes.armW / 2;
  model.armL.position.y = sizes.legH + sizes.bodyH - sizes.armW / 2 - sizes.cameraMod;
  model.armL.rotation.y = 135;
  mapUv(geometry, 0, 44, 12, 40, 0); // right
  mapUv(geometry, 1, 52, 12, 48, 0); // left
  mapUv(geometry, 2, 44, 16, 48, 12); // top
  mapUv(geometry, 3, 48, 16, 52, 12); // bottom
  mapUv(geometry, 4, 48, 12, 44, 0); // front
  mapUv(geometry, 5, 56, 12, 52, 0); // back

  // build model.legR
  geometry = new THREE.CubeGeometry(sizes.legW, sizes.legH, sizes.legD);
  model.legR = new THREE.Mesh(geometry, material);
  model.rootBody.add(model.legR);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -sizes.legH / 2, 0));
  model.legR.position.x = -sizes.legW / 2;
  model.legR.position.y = sizes.legH - sizes.cameraMod;
  model.legR.rotation.y = 135;
  mapUv(geometry, 0, 8, 12, 12, 0); // right
  mapUv(geometry, 1, 0, 12, 4, 0); // left
  mapUv(geometry, 2, 4, 16, 8, 12); // top
  mapUv(geometry, 3, 8, 16, 12, 12); // bottom
  mapUv(geometry, 4, 4, 12, 8, 0); // front
  mapUv(geometry, 5, 12, 12, 16, 0); // back

  // build model.legL
  geometry = new THREE.CubeGeometry(sizes.legW, sizes.legH, sizes.legD);
  model.legL = new THREE.Mesh(geometry, material);
  model.rootBody.add(model.legL);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -sizes.legH / 2, 0));
  model.legL.position.x = sizes.legW / 2;
  model.legL.position.y = sizes.legH - sizes.cameraMod;
  model.legL.rotation.y = 135;
  mapUv(geometry, 0, 4, 12, 0, 0); // left
  mapUv(geometry, 1, 12, 12, 8, 0); // right
  mapUv(geometry, 2, 8, 16, 4, 12); // top
  mapUv(geometry, 3, 12, 16, 8, 12); // bottom
  mapUv(geometry, 4, 8, 12, 4, 0); // front
  mapUv(geometry, 5, 16, 12, 12, 0); // back

  return;

  function mapUv (geometry, faceIdx, x1, y1, x2, y2) {
    const tileUvW = 1 / 64;
    const tileUvH = 1 / 32;
    if (geometry.faces[faceIdx] instanceof THREE.Face3) {
      let UVs = geometry.faceVertexUvs[0][faceIdx * 2];
      UVs[0].x = x1 * tileUvW; UVs[0].y = y1 * tileUvH;
      UVs[1].x = x1 * tileUvW; UVs[1].y = y2 * tileUvH;
      UVs[2].x = x2 * tileUvW; UVs[2].y = y1 * tileUvH;

      UVs = geometry.faceVertexUvs[0][faceIdx * 2 + 1];
      UVs[0].x = x1 * tileUvW; UVs[0].y = y2 * tileUvH;
      UVs[1].x = x2 * tileUvW; UVs[1].y = y2 * tileUvH;
      UVs[2].x = x2 * tileUvW; UVs[2].y = y1 * tileUvH;
    } else if (geometry.faces[faceIdx] instanceof THREE.Face4) {
      const UVs = geometry.faceVertexUvs[0][faceIdx];
      UVs[0].x = x1 * tileUvW; UVs[0].y = y1 * tileUvH;
      UVs[1].x = x1 * tileUvW; UVs[1].y = y2 * tileUvH;
      UVs[2].x = x2 * tileUvW; UVs[2].y = y2 * tileUvH;
      UVs[3].x = x2 * tileUvW; UVs[3].y = y1 * tileUvH;
    } else console.assert(false);
  }
};


THREEx.MinecraftChar.baseUrl = '../';
THREEx.MinecraftChar.defaultMaterial = null;
/**
* Load a skin
*
* @param {string} url the url of the skin image
*/
THREEx.MinecraftChar.prototype.loadSkin = function (url, onLoad) {
  const image = new window.Image();
  image.onload = function () {
    this.texture.image = image;
    this.texture.needsUpdate = true;
    onLoad && onLoad(this);
  }.bind(this);
  image.src = url;
  return this; // for chained API
};


//    support for skin Well Known Url   //

THREEx.MinecraftChar.prototype.loadWellKnownSkin = function (name, onLoad) {
  console.assert(THREEx.MinecraftChar.skinWellKnownUrls[name]);
  const url = THREEx.MinecraftChar.baseUrl + THREEx.MinecraftChar.skinWellKnownUrls[name];
  return this.loadSkin(url, onLoad);
};

THREEx.MinecraftChar.skinWellKnownUrls = {
  '3djesus': 'images/3djesus.png',
  'iron-man': 'images/Iron-Man-Minecraft-Skin.png',
  'joker': 'images/Joker.png',
  'mario': 'images/Mario.png',
  'sonicthehedgehog': 'images/Sonicthehedgehog.png',
  'spiderman': 'images/Spiderman.png',
  'superman': 'images/Superman.png',
  'agentsmith': 'images/agentsmith.png',
  'batman': 'images/batman.png',
  'char': 'images/char.png',
  'god': 'images/god.png',
  'jetienne': 'images/jetienne.png',
  'martialartist': 'images/martialartist.png',
  'robocop': 'images/robocop.png',
  'theflash': 'images/theflash.png',
  'woody': 'images/woody.png'
};


THREEx.createMinecraftCharBodyAnimations = function (character) {
  return new THREEx.MinecraftCharBodyAnimations(character);
};

THREEx.MinecraftCharBodyAnimations = function (character) {
  const animations = this;
  // call parent ctor
  THREEx.Animations.call(this);
  const tweenAngle = function (baseValue, nextValue, timePercent) {
    // compute the nextValue to get the shortest path - assume it is an angle
    if (nextValue - baseValue > +Math.PI) nextValue -= Math.PI * 2;
    if (nextValue - baseValue < -Math.PI) nextValue += Math.PI * 2;
    return (1 - timePercent) * baseValue + timePercent * nextValue;
  };


  const onUpdate = function (position) {
    character.armR.rotation.z = position.armRRotationZ ? position.armRRotationZ : 0;
    character.armL.rotation.z = position.armLRotationZ ? position.armLRotationZ : 0;

    character.armR.rotation.x = position.armRotationX ? position.armRotationX : 0;
    character.armL.rotation.x = position.armRotationX ? -position.armRotationX : 0;

    character.legR.rotation.z = position.legRRotationZ ? position.legRRotationZ : 0;
    character.legL.rotation.z = position.legLRotationZ ? position.legLRotationZ : 0;

    character.legR.rotation.x = position.legRotationX ? position.legRotationX : 0;
    character.legL.rotation.x = position.legRotationX ? -position.legRotationX : 0;
  };
  const onCapture = function (position) {
    position.armLRotationZ = character.armL.rotation.z;
    position.armRRotationZ = character.armR.rotation.z;
    position.armRotationX = character.armR.rotation.x;
    position.legLRotationZ = character.legL.rotation.z;
    position.legRRotationZ = character.legR.rotation.z;
    position.legRotationX = character.legR.rotation.x;
  };
  const propTweens = {
    armLRotationZ: tweenAngle,
    armRRotationZ: tweenAngle,
    armRotationX: tweenAngle,
    legLRotationZ: tweenAngle,
    legRRotationZ: tweenAngle,
    legRotationX: tweenAngle
  };


  // Setup 'run' animation
  let angleRange = (Math.PI / 2) - (Math.PI / 10);
  animations.add('run', THREEx.createAnimation().pushKeyframe(0.5, {
    armLRotationZ: +Math.PI / 10,
    armRRotationZ: -Math.PI / 10,
    armRotationX: +angleRange,
    legRotationX: -angleRange
  }).pushKeyframe(0.5, {
    armLRotationZ: +Math.PI / 10,
    armRRotationZ: -Math.PI / 10,
    armRotationX: -angleRange,
    legRotationX: +angleRange
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

  animations.add('strafe', THREEx.createAnimation().pushKeyframe(0.5, {
    armLRotationZ: +angleRange / 2,
    armRRotationZ: -angleRange / 2,
    armRotationX: +Math.PI / 10,
    legLRotationZ: -angleRange,
    legRRotationZ: +angleRange,
    legRotationX: -Math.PI / 5
  }).pushKeyframe(0.5, {
    armLRotationZ: -angleRange / 2,
    armRRotationZ: +angleRange / 2,
    armRotationX: +Math.PI / 10,
    legLRotationZ: +angleRange,
    legRRotationZ: -angleRange,
    legRotationX: -Math.PI / 5
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

  // Setup 'walk' animation
  angleRange = Math.PI / 3 - Math.PI / 10;
  animations.add('walk', THREEx.createAnimation().pushKeyframe(0.5, {
    armLRotationZ: +Math.PI / 30,
    armRRotationZ: -Math.PI / 30,
    armRotationX: +angleRange,
    legRotationX: -angleRange
  }).pushKeyframe(0.5, {
    armLRotationZ: +Math.PI / 30,
    armRRotationZ: -Math.PI / 30,
    armRotationX: -angleRange,
    legRotationX: +angleRange
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

  // Setup 'stand' animation
  animations.add('stand', THREEx.createAnimation().pushKeyframe(0.3, {
    armLRotationZ: 0,
    armRRotationZ: 0,
    armRotationX: 0,
    legLRotationZ: 0,
    legRRotationZ: 0,
    legRotationX: 0
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

  // Setup 'jump' animation
  animations.add('jump', THREEx.createAnimation().pushKeyframe(0.15, {
    armLRotationZ: +3 * Math.PI / 4,
    armRRotationZ: -3 * Math.PI / 4,
    armRotationX: +angleRange,
    legRotationX: +angleRange
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

  // Setup 'fall' animation
  animations.add('fall', THREEx.createAnimation().pushKeyframe(0.5, {
    armLRotationZ: Math.PI - 3 * Math.PI / 5,
    armRRotationZ: Math.PI + 3 * Math.PI / 5,
    armRotationX: +angleRange,
    legLRotationZ: +Math.PI / 5,
    legRRotationZ: -Math.PI / 5,
    legRotationX: +angleRange
  }).pushKeyframe(0.5, {
    armLRotationZ: Math.PI - Math.PI / 10,
    armRRotationZ: Math.PI + Math.PI / 10,
    armRotationX: -angleRange,
    legLRotationZ: 0,
    legRRotationZ: 0,
    legRotationX: -angleRange
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

  // Setup 'wave' animation
  angleRange = Math.PI / 2 - Math.PI / 10;
  animations.add('wave', THREEx.createAnimation().pushKeyframe(0.5, {
    armLRotationZ: 0,
    armRRotationZ: Math.PI + 2 * Math.PI / 5,
    armRotationX: 0,
    legRotationX: 0
  }).pushKeyframe(0.5, {
    armLRotationZ: 0,
    armRRotationZ: Math.PI + Math.PI / 10,
    armRotationX: 0,
    legRotationX: 0
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

  // Setup 'hiwave' animation
  angleRange = Math.PI / 2 - Math.PI / 10;
  animations.add('hiwave', THREEx.createAnimation().pushKeyframe(0.5, {
    armLRotationZ: Math.PI - 3 * Math.PI / 5,
    armRRotationZ: Math.PI + 3 * Math.PI / 5,
    armRotationX: 0,
    legRotationX: 0
  }).pushKeyframe(0.5, {
    armLRotationZ: Math.PI - Math.PI / 10,
    armRRotationZ: Math.PI + Math.PI / 10,
    armRotationX: 0,
    legRotationX: 0
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

  // Setup 'circularPunch' animation
  const delay = 1 / 5;
  animations.add('circularPunch', THREEx.createAnimation().pushKeyframe(delay, {
    armLRotationZ: 0,
    armRRotationZ: 0,
    armRotationX: 0,
    legRotationX: 0
  }).pushKeyframe(delay, {
    armLRotationZ: 0,
    armRRotationZ: 0,
    armRotationX: -Math.PI / 2,
    legRotationX: 0
  }).pushKeyframe(delay, {
    armLRotationZ: 0,
    armRRotationZ: 0,
    armRotationX: -Math.PI,
    legRotationX: 0
  }).pushKeyframe(delay, {
    armLRotationZ: 0,
    armRRotationZ: 0,
    armRotationX: +Math.PI / 2,
    legRotationX: 0
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

  // Setup 'rightPunch' animation
  angleRange = Math.PI / 2 - Math.PI / 10;
  animations.add('rightPunch', THREEx.createAnimation().pushKeyframe(0.1, {
    armLRotationZ: +Math.PI / 10,
    armRRotationZ: -Math.PI / 10,
    armRotationX: 0,
    legRotationX: 0
  }).pushKeyframe(0.3, {
    armLRotationZ: -Math.PI / 10,
    armRRotationZ: -Math.PI / 10,
    armRotationX: +Math.PI / 2 + Math.PI / 5,
    legRotationX: 0
  }).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));
};

THREEx.MinecraftCharBodyAnimations.prototype = Object.create(THREEx.Animations.prototype);

// Not using any of this atm, I will have to go back and change it to work with WASD controls eventually - JMD

// THREEx.MinecraftControls = function (character, input) {
//   var _this = this
//   // arguments default values
//   input		= input	|| {}
//
//   // handle arguments default values
//   this.speed		= 2;
//   this.angularSpeed	= 0.2 * Math.PI * 2;
//   this.input	= input;
//   this.object3d	= character.root;
//
//   // user control
//   this.update	= function(delta, now){
//     var prevPosition	= _this.object3d.position.clone();
//     // rotation
//     if( input.left )	_this.object3d.rotation.y += this.angularSpeed*delta
//     if( input.right )	_this.object3d.rotation.y -= this.angularSpeed*delta
//
//     // strafe
//     var distance	= 0;
//     if( input.strafeLeft )	distance	= +this.speed * delta;
//     if( input.strafeRight )	distance	= -this.speed * delta;
//     if( distance ){
//       var velocity	= new THREE.Vector3(distance, 0, 0);
//       var matrix	= new THREE.Matrix4().makeRotationY(object3d.rotation.y);
//       velocity.applyMatrix4( matrix );
//       _this.object3d.position.add(velocity);
//     }
//
//     // up/down
//     var distance	= 0;
//     if( input.up )		distance	= +this.speed * delta;
//     if( input.down )	distance	= -this.speed * delta;
//     if( distance ){
//       var velocity	= new THREE.Vector3(0, 0, distance);
//       var matrix	= new THREE.Matrix4().makeRotationY(_this.object3d.rotation.y);
//       velocity.applyMatrix4( matrix );
//       _this.object3d.position.add(velocity);
//     }
//   }
// }
//
// THREEx.MinecraftControls.setKeyboardInput = function(controls, mappings){
//   mappings = mappings || ['wasd', 'ijkl', 'arrows']
//
//   document.body.addEventListener('keydown', function(event){
//     var input	= controls.input
//     if( mappings.indexOf('wasd') !== -1 ){
//       if( event.keyCode === 'W'.charCodeAt(0) )	input.up	= true
//       if( event.keyCode === 'S'.charCodeAt(0) )	input.down	= true
//       if( event.keyCode === 'A'.charCodeAt(0) )	input.left	= true
//       if( event.keyCode === 'D'.charCodeAt(0) )	input.right	= true
//       if( event.keyCode === 'Q'.charCodeAt(0) )	input.strafeLeft= true
//       if( event.keyCode === 'E'.charCodeAt(0) )	input.strafeRight= true
//     }
//
//     if( mappings.indexOf('ijkl') !== -1 ){
//       if( event.keyCode === 'I'.charCodeAt(0) )	input.up	= true
//       if( event.keyCode === 'K'.charCodeAt(0) )	input.down	= true
//       if( event.keyCode === 'J'.charCodeAt(0) )	input.left	= true
//       if( event.keyCode === 'L'.charCodeAt(0) )	input.right	= true
//       if( event.keyCode === 'U'.charCodeAt(0) )	input.strafeLeft= true
//       if( event.keyCode === 'O'.charCodeAt(0) )	input.strafeRight= true
//     }
//
//     // to support arrows because tsate asked me :)
//     if( mappings.indexOf('arrows') !== -1 ){
//       if( event.keyCode === 38 )			input.up	= true
//       if( event.keyCode === 40 )			input.down	= true
//       if( event.keyCode === 37 && !event.shiftKey )	input.left	= true
//       if( event.keyCode === 39 && !event.shiftKey )	input.right	= true
//       if( event.keyCode === 37 &&  event.shiftKey )	input.strafeLeft= true
//       if( event.keyCode === 39 &&  event.shiftKey )	input.strafeRight= true
//     }
//   })
//
//   document.body.addEventListener('keyup', function(event){
//     var input	= controls.input
//
//     if( mappings.indexOf('wasd') !== -1 ){
//       if( event.keyCode === 'W'.charCodeAt(0) )	input.up	= false
//       if( event.keyCode === 'S'.charCodeAt(0) )	input.down	= false
//       if( event.keyCode === 'A'.charCodeAt(0) )	input.left	= false
//       if( event.keyCode === 'D'.charCodeAt(0) )	input.right	= false
//       if( event.keyCode === 'Q'.charCodeAt(0) )	input.strafeLeft= false
//       if( event.keyCode === 'E'.charCodeAt(0) )	input.strafeRight= false
//     }
//
//     if( mappings.indexOf('ijkl') !== -1 ){
//       if( event.keyCode === 'I'.charCodeAt(0) )	input.up	= false
//       if( event.keyCode === 'K'.charCodeAt(0) )	input.down	= false
//       if( event.keyCode === 'J'.charCodeAt(0) )	input.left	= false
//       if( event.keyCode === 'L'.charCodeAt(0) )	input.right	= false
//       if( event.keyCode === 'U'.charCodeAt(0) )	input.strafeLeft= false
//       if( event.keyCode === 'O'.charCodeAt(0) )	input.strafeRight= false
//     }
//
//
//     // to support arrows because tsate asked me :)
//     if( mappings.indexOf('arrows') !== -1 ){
//       if( event.keyCode === 38 )			input.up	= false
//       if( event.keyCode === 40 )			input.down	= false
//       if( event.keyCode === 37 ||  event.shiftKey )	input.left	= false
//       if( event.keyCode === 39 ||  event.shiftKey )	input.right	= false
//       if( event.keyCode === 37 || !event.shiftKey )	input.strafeLeft= false
//       if( event.keyCode === 39 || !event.shiftKey )	input.strafeRight= false
//     }
//   })
//   return controls
// }

THREEx.MinecraftNickname = function (character) {
  // This function created the floating nametag above a user's head
  this.object3d = null;
  this.clear = function () {
    if (this.object3d === null) return;
    character.root.remove(this.object3d);
    this.object3d = null;
  };
  this.set = function (nickName) {
    if (this.object3d) this.clear();
    // build the texture
    const canvas = buildNickCartouche(nickName);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    // build the sprite itself
    const material = new THREE.SpriteMaterial({
      map: texture
    });
    const sprite = new THREE.Sprite(material);
    this.object3d = sprite;
    sprite.position.y = 0.3;
    // add sprite to the character
    character.root.add(this.object3d);
  };
  return;
  /**
  * Build a canvas for the nickname cartouche
  */
  function buildNickCartouche (text) {
    // create the canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    // center the origin
    context.translate(canvas.width / 2, canvas.height / 2);
    // measure text
    const fontSize = 36;
    context.font = `bolder ${fontSize}px Verdana`;
    const fontH = fontSize;
    const fontW = context.measureText(text).width;
    // build the background
    context.fillStyle = 'rgba(0,0,255,0.3)';
    const scale = 1.2;
    context.fillRect(-fontW * scale / 2, -fontH * scale / 1.3, fontW * scale, fontH * scale);
    // display the text
    context.fillStyle = 'rgba(0,0,0,0.7)';
    context.fillText(text, -fontW / 2, 0);
    // return the canvas element
    return canvas;
  }
};

// End Three.js definitions
// Begin building AFrame primitives and components

AFRAME.registerPrimitive('a-minecraft', AFRAME.utils.extendDeep({}, AFRAME.primitives.getMeshMixin(), {
  defaultComponents: {
    minecraft: {},
    // TODO check those default values
    'minecraft-head-anim': 'still',
    'minecraft-body-anim': 'stand',
    'minecraft-nickname': 'John'
    // 'minecraft-controls': {}
  }
}));

// This builds the character and applies the skin to the model

AFRAME.registerComponent('minecraft', {
  schema: {
    skinUrl: {
      type: 'string',
      default: ''
    },
    wellKnownSkin: {
      type: 'string',
      default: ''
    },
    heightMeter: {
      default: 1.6
    },
    component: {
      default: 'head'
    }
  },
  init: function () {
    const character = new THREEx.MinecraftChar();
    this.character = character;

    this.data.component === 'head' ? this.el.object3D.add(character.root) : this.el.object3D.add(character.rootBody);
    // this.el.setObject3D('superRoot', character.root);
  },
  update: function () {
    if (Object.keys(this.data).length === 0) return;
    const character = this.character;
    character.root.scale.set(1, 1, 1).multiplyScalar(this.data.heightMeter);
    character.rootBody.scale.set(1, 1, 1).multiplyScalar(1.6);

    if (this.data.skinUrl) {
      character.loadSkin(this.data.skinUrl);
    } else if (this.data.wellKnownSkin) {
      character.loadWellKnownSkin(this.data.wellKnownSkin);
    }
  }
});

// This controls various body animations.  Currently not using this - JMD

AFRAME.registerComponent('minecraft-body-anim', {
  schema: {
    type: 'string',
    default: 'wave'
  },
  init: function () {
    const character = this.el.components.minecraft.character;
    this.bodyAnims = new THREEx.MinecraftCharBodyAnimations(character);
  },
  tick: function (now, delta) {
    // force the animation according to controls
    const minecraftControls = this.el.components['minecraft-controls'];
    if (minecraftControls) {
      const input = minecraftControls.controls.input;
      if (input.up || input.down) {
        this.bodyAnims.start('run');
      } else if (input.strafeLeft || input.strafeRight) {
        this.bodyAnims.start('strafe');
      } else {
        this.bodyAnims.start('stand');
      }
    }
    // update the animation
    this.bodyAnims.update(delta / 1000, now / 1000);
  },
  update: function () {
    if (Object.keys(this.data).length === 0) return;
    console.assert(this.bodyAnims.names().indexOf(this.data) !== -1);
    this.bodyAnims.start(this.data);
  }
});

// This renders the user's Disply Name above their heads

AFRAME.registerComponent('minecraft-nickname', {
  schema: {
    type: 'string',
    default: 'Joe'
  },
  init: function () {
    const character = this.el.components.minecraft.character;
    this.nickName = new THREEx.MinecraftNickname(character);
  },
  update: function () {
    if (Object.keys(this.data).length === 0) return;
    this.nickName.set(this.data);
  }
});

// This was controls that were build into the repo what we grabbed.... it over rides the wasd controls in aframe which is silly.  Disabled for the time being - JMD

// AFRAME.registerComponent('minecraft-controls', {
//   schema: {
//   },
//   init: function () {
//     var character = this.el.components.minecraft.character
//     this.controls = new THREEx.MinecraftControls(character)
//     THREEx.MinecraftControls.setKeyboardInput(this.controls, ['wasd', 'arrows', 'ijkl'])
//   },
//   tick : function(now, delta){
//     this.controls.update(delta/1000,now/1000)
//   },
// });
