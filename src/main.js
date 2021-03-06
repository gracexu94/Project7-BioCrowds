
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'
import BioCrowdsSystem from './biocrowds.js'

var sys;
var initializingVariables = {
    numMarkers: 4000,
    numAgents: 24,
    startConfig: 'opposingLines',
    pause: true
};

// called after the scene loads
function onLoad(framework) {
  var scene = framework.scene;
  var camera = framework.camera;
  var renderer = framework.renderer;
  var gui = framework.gui;
  var stats = framework.stats;

  // initialize a simple box and material
  var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.color.setHSL(0.1, 1, 0.95);
  directionalLight.position.set(1, 3, 2);
  directionalLight.position.multiplyScalar(10);
  scene.add(directionalLight);
  scene.background = new THREE.Color('skyblue');

  // set camera position
  camera.position.set(250, 250, 10);
  camera.lookAt(new THREE.Vector3(0,0,0));

  gui.add(camera, 'fov', 0, 180).onChange(function(newVal) {
    camera.updateProjectionMatrix();
  });
  gui.add(initializingVariables, 'startConfig', [ 'random', 'opposingLines' ]).onChange(function(newVal) {
    sys.reset();
    sys.initialize(initializingVariables.numAgents, initializingVariables.numMarkers, initializingVariables.startConfig);
  });
  gui.add(initializingVariables, 'pause'); 
}

// called on frame updates
function onUpdate(framework) {
  if (sys == undefined) {
    sys = new BioCrowdsSystem(framework.scene);
    sys.initialize(initializingVariables.numAgents, initializingVariables.numMarkers, initializingVariables.startConfig);
  } else {
    if(!initializingVariables.pause) {
      sys.step();
    }
  }
}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);
