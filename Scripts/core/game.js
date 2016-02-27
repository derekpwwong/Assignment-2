// MAIN GAME FILE
// game.ts 
// Derek Wong
// Last Modified By: Derek Wong
// Date Last Modified: 2/7/2016
// Displays the game objects
/*Revision History
  2/10/2016- Added Planet #1 And Moon#1
           - Added Rotation to Moon
           - Added Gulp Automation
  2/8/2016 - Added cube mesh(sun)
           - Added parentCube mesh to control the orbit of planet #1
  2/7/2016 - Initialized Project
*/
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
var gameObjectContainer = objects.gameObjectContainer;
var scene;
var renderer;
var camera;
var axes;
var cube;
var sun;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var cubeGeometry;
var cubeMaterial;
var planet;
var moon;
var horizontalRotationContainer;
var moonOneContainer;
var moonTwoContainer;
var moonFiveContainer;
var planetThreeRotationContainer;
var sunRotationSpeed = 0.01;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    var urls = [
        './images/stars_background.png',
        './images/stars_background.png',
        './images/stars_background.png',
        './images/stars_background.png',
        './images/stars_background.png',
        './images/stars_background.png'
    ];
    var cubemap = THREE.ImageUtils.loadTextureCube(urls); // load textures
    cubemap.format = THREE.RGBFormat;
    var shader = THREE.ShaderLib['cube']; // init cube shader from built-in lib
    shader.uniforms['tCube'].value = cubemap; // apply textures to shader
    // create shader material
    var skyBoxMaterial = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });
    // create skybox mesh
    var skybox = new THREE.Mesh(new THREE.CubeGeometry(1000, 1000, 1000), skyBoxMaterial);
    function loadTexture(image) {
        var texture = new THREE.TextureLoader().load(image);
        var material = new THREE.MeshBasicMaterial({ map: texture });
        return material;
    }
    scene.add(skybox);
    //Add a Cube to the Scene
    sun = new gameObject(new SphereGeometry(2, 20, 18), loadTexture('./images/planet/sun.jpg'), 0, 4, 0);
    scene.add(sun);
    horizontalRotationContainer = new gameObject(new SphereGeometry(0.1, 8, 6), loadTexture('./images/stars_background.png'), 0, 0, 0);
    moonFiveContainer = new gameObject(new SphereGeometry(0.1, 8, 6), loadTexture('./images/stars_background.png'), 0, 0, 0);
    moonOneContainer = new gameObject(new SphereGeometry(0.1, 8, 6), loadTexture('./images/stars_background.png'), 0, 0, 0);
    moonTwoContainer = new gameObject(new SphereGeometry(0.1, 8, 6), loadTexture('./images/stars_background.png'), 0, 0, 0);
    planetThreeRotationContainer = new gameObject(new SphereGeometry(0.1, 8, 6), loadTexture('./images/stars_background.png'), 0, 0, 0);
    sun.add(horizontalRotationContainer);
    //planet 1
    planet = new gameObject(new SphereGeometry(3, 12, 8), loadTexture('./images/planet/planet_one.png'), -7, 0, 0);
    horizontalRotationContainer.add(planet);
    planet.add(moonOneContainer);
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xF7B7C5);
    spotLight.position.set(10, 100, 10);
    spotLight.castShadow = true;
    horizontalRotationContainer.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    //moon
    moon = new gameObject(new SphereGeometry(1.1, 12, 8), loadTexture('./images/planet/moon.png'), 0, 5, 1);
    moonOneContainer.add(moon);
    //planet 2
    planet = new gameObject(new SphereGeometry(2, 8, 6), loadTexture('./images/planet/planet_two.png'), 7, 3, 0);
    horizontalRotationContainer.add(planet);
    planet.add(moonTwoContainer);
    //moon
    moon = new gameObject(new SphereGeometry(0.5, 8, 6), loadTexture('./images/planet/moon.png'), 0, 3, 1);
    moonTwoContainer.add(moon);
    //planet 3
    planet = new gameObject(new SphereGeometry(1, 8, 6), loadTexture('./images/planet/planet_three.png'), 0, 8, 0);
    horizontalRotationContainer.add(planetThreeRotationContainer);
    planetThreeRotationContainer.add(planet);
    //planet 4       
    planet = new gameObject(new SphereGeometry(1, 8, 6), loadTexture('./images/planet/planet_four.png'), 0, 0, 5);
    horizontalRotationContainer.add(planet);
    // planet 5       
    planet = new gameObject(new SphereGeometry(0.9, 8, 6), loadTexture('./images/planet/planet_five.png'), 12, 0, 0);
    horizontalRotationContainer.add(planet);
    planet.add(moonFiveContainer);
    //moon
    moon = new gameObject(new SphereGeometry(0.5, 8, 6), loadTexture('./images/planet/moon.png'), 0, 3, 1);
    moonFiveContainer.add(moon);
    console.log("Added Child Cube Primitive to cube object...");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0xfafad2);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    // spotLight = new SpotLight(0x191970);
    // spotLight.position.set(0, 0, 0);
    // spotLight.castShadow = true;
    // scene.add(spotLight);
    // console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0.05);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = CScreen.RATIO;
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    sun.rotation.y += sunRotationSpeed;
    planetThreeRotationContainer.rotation.x += 0.05;
    moonFiveContainer.rotation.x += 0.05;
    moonTwoContainer.rotation.x += 0.05;
    moonOneContainer.rotation.x += 0.05;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    //fov, aspect, near, far
    camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 2000);
    camera.position.x = 0.6;
    camera.position.y = 24;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}

//# sourceMappingURL=game.js.map
