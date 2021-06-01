//LEVEL 3//

//scene
const scene = new THREE.Scene();

//camera and renderer
var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 1, 200000);
var renderer = new THREE.WebGL1Renderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(innerWidth, innerHeight);
//cam.position.set(500,50,2200);
cam.position.set(2000,50,-20000);
cam.lookAt(5000,0000,50000);
//cam.lookAt(-2000,0,15000)
document.body.appendChild(renderer.domElement);

//collision detection
var cubeGeometry = new THREE.BoxBufferGeometry(200,200,200,3,3,3);
var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:false } );
MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
MovingCube.position.set(0, 0, 0);
setCollisionDetection(cam,MovingCube); //collision detection hitbox

//LIGHTING
var directionalLight = new THREE.PointLight(0xffdead, 0.7);
directionalLight.position.set(47500, 8000, 20000);
directionalLight.castShadow = true;
scene.add(directionalLight);
var ambientLight = new THREE.AmbientLight(0xffdead, 0.45);//0.05
scene.add(ambientLight);

const finder = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5000,5000,5000),
    new THREE.MeshLambertMaterial({color: 0xffffff})
);
finder.position.set(47500, 8000, 20000);
//scene.add(finder);

//SCENE MODELING - actual scene stored in floor1.js
const room = Room();
room.scale.set(4,8,5);
room.position.set(0,300,0);
room.rotateX(3*Math.PI/2);
room.castShadow = true;
scene.add(room);

//skybox
const box = sky();
box.translateY(29600);
box.receiveShadow = true;
scene.add(box);

//reticle 
var qf = [2000,1,2000,  2000,1,2000,  2000,1,2000];
addReticle(cam,qf);
scene.add(cam);

//mouse pointing
let controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', ()=>{
    controls.lock();
});

var loader = new THREE.GLTFLoader();

var rock1 = new THREE.Mesh();
loader.load('Blender Models/Level 2/Rocks/Rock3.gltf' , function (gltf)  {
    rock1 = gltf.scene;
    rock1.scale.set(10000,10000,10000);
    rock1.position.set(47500, 0, 20000);
    scene.add(rock1);
});
var rock2 = new THREE.Mesh();
loader.load('Blender Models/Level 2/Rocks/Rock3.gltf' , function (gltf)  {
    rock2 = gltf.scene;
    rock2.scale.set(10000,10000,10000);
    rock2.position.set(47500, -1000, 20000);
    scene.add(rock2);
});
var rock3 = new THREE.Mesh();
loader.load('Blender Models/Level 2/Rocks/Rock1.gltf' , function (gltf)  {
    rock3 = gltf.scene;
    rock3.scale.set(10000,10000,10000);
    rock3.position.set(100500, -10000, 100000);
    scene.add(rock3);
});

var rocket = new THREE.Mesh();
loader.load('Blender Models/rocketship/rocket.gltf' , function (gltf)  {
    console.log('hi');
    rocket = gltf.scene;
    rocket.scale.set(200000,200000,200000);
    rocket.position.set(-1500, 1000, -1200);
    scene.add(rocket);
});

var pistol = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf' , function (gltf)  {
    pistol = gltf.scene;
    pistol.scale.set(100, 100, 100);

    //pistol.position.set(cam.position.x, cam.position.y, cam.position.z);
    scene.add(pistol);
});


//ACTION!
function drawScene(){
    renderer.render(scene, cam);
    checkCollision(cam,updateKeyboard,MovingCube);
    pistol.position.set(
		cam.position.x - Math.sin(cam.rotation.y + Math.PI/6) * 0.75,
		cam.position.y,//cam.position.y - 0.5 + Math.sin(time*4 + cam.position.x + cam.position.z)*0.01,
		cam.position.z + 200//- Math.cos(cam.rotation.y + Math.PI/6) * 0.75
	);
    pistol.rotation.z = cam.rotation.z;
    pistol.rotation.y = cam.rotation.y - Math.PI;
    pistol.rotation.x = cam.rotation.x;
    processKeyboard();
    requestAnimationFrame(drawScene);
    Player.decHealth(0.02);
}

drawScene();