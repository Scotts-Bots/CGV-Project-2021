//LEVEL 3//

//scene
const scene = new THREE.Scene();

//camera and renderer
var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 0.1, 200000);
var renderer = new THREE.WebGL1Renderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(innerWidth, innerHeight);
//cam.position.set(500,50,2200);
cam.position.set(2000,50,-14000);
cam.lookAt(5000,0,-50000);
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

// let btn1 = document.querySelector("#button1");
// btn1.addEventListener('click', ()=>{
//     controls.lock();
// });

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
    rocket = gltf.scene;
    rocket.scale.set(75,75,75);
    rocket.position.set(5000,-2000,-50000);
    scene.add(rocket);
});

const rocketf = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4000, 30000, 4000),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
rocketf.position.set(5000,-2000,-50000);
rocketf.visible = false;
scene.add(rocketf);

const domEvent1 = new THREEx.DomEvents(cam, renderer.domElement);

domEvent1.addEventListener(rocketf, 'dblclick', event => {
    camposition = new THREE.Vector3();
    camposition.setFromMatrixPosition( cam.matrixWorld );
    x = camposition.x;
    y = camposition.z;
    //finder object
    finderposition = new THREE.Vector3();
    finderposition.setFromMatrixPosition( rocketf.matrixWorld );
    fx = finderposition.x;
    fy = finderposition.z;
    if (Math.sqrt(Math.pow((x-fx),2) + Math.pow((y-fy),2)) <10000){
        window.location.href = "index.html";
    }else{
        console.log(Math.sqrt(Math.pow((x-fx),2) + Math.pow((y-fy),2)));
    }
});

var pistol = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf' , function (gltf)  {
    pistol = gltf.scene;
    pistol.scale.set(3, 4, 4);
    pistol.rotation.y = Math.PI;
    pistol.position.z = -4;
    pistol.position.x = 2;
    pistol.position.y = -1;
    cam.add(pistol)
    scene.add(cam);
});

var enemy1 = new THREE.Mesh();
loader.load('Blender Models/Enemies/Enemies.gltf' , function (gltf)  {
    enemy1 = gltf.scene;
    enemy1.scale.set(350,350,350);
    enemy1.position.set(2000,100,-20000);
    scene.add(enemy1);
});

var enemy2 = new THREE.Mesh();
loader.load('Blender Models/Enemies/Enemies.gltf' , function (gltf)  {
    enemy2 = gltf.scene;
    enemy2.scale.set(350,350,350);
    enemy2.position.set(7000,100,-15000);
    scene.add(enemy2);
});

var otank1 = new THREE.Mesh();
loader.load('Blender Models/oxygen tank/Otank.gltf' , function (gltf)  {
    otank1 = gltf.scene;
    otank1.scale.set(350,350,350);
    otank1.position.set(-20000,100,-11000);
    scene.add(otank1);
});

var otank2 = new THREE.Mesh();
loader.load('Blender Models/oxygen tank/Otank.gltf' , function (gltf)  {
    otank2 = gltf.scene;
    otank2.scale.set(350,350,350);
    otank2.position.set(-7000,100,-22000);
    scene.add(otank2);
});

HUD();
Tasks();

//ACTION!

function turnTurret(r, obj){
	if (Math.pow(cam.position.x - obj.position.x, 2) + Math.pow(cam.position.z - obj.position.z, 2) <= Math.pow(r, 2)){
		var ang = Math.atan2( ( cam.position.x - obj.position.x ), ( cam.position.z - obj.position.z ) );
		obj.rotation.y = ang;
	}
}

function drawScene(){
    renderer.render(scene, cam);
    checkCollision(cam,updateKeyboard,MovingCube);
    processKeyboard();
    turnTurret(5000, enemy1);
    turnTurret(5000, enemy2);
    requestAnimationFrame(drawScene);
    Player.decHealth(0.01);
    if(Player.getHealth() <= 0){
        window.location.href = "index.html";
    }
    HUD();
    Tasks();
}
function Tasks(){
    check = document.getElementById("task");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("task1");
    if (check != null) {
        check.parentNode.removeChild(check);
    }

    var task = document.createElement('div');
    task.id = "task";
    task.style.position = 'absolute';
    task.style.color = "white";
    task.style.fontSize = "20px";
    task.style.letterSpacing = "2px";
    task.style.fontFamily = "Helvetica";
    task.style.width = 200;
    task.style.height = 500;
    task.innerHTML = "Task(s)";
    task.style.top = 200 + 'px';
    task.style.left = 70 + 'px';

    var task1 = document.createElement('div');
    task1.id = "task1";
    task1.style.position = 'absolute';
    task1.style.color = "white";
    task1.style.fontSize = "20px";
    task1.style.letterSpacing = "2px";
    task1.style.fontFamily = "Helvetica";
    task1.style.width = 200;
    task1.style.height = 500;
    task1.innerHTML = "> Get to the rocketship";
    task1.style.top = 230 + 'px';
    task1.style.left = 70 + 'px';
    
    document.body.appendChild(task);
    document.body.appendChild(task1);
}

drawScene();