//LEVEL 3//
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var rover;
var frameCount = 0;
var roverCount = 0;

//scene
const scene = new THREE.Scene();

//camera and renderer
var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 200000);
var renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(innerWidth, innerHeight);
//cam.position.set(500,50,2200);
cam.position.set(2000, 50, -14000);
cam.lookAt(5000, 0, -50000);
//cam.lookAt(-2000,0,15000)
document.body.appendChild(renderer.domElement);

//collision detection
var cubeGeometry = new THREE.BoxBufferGeometry(200, 200, 200, 3, 3, 3);
var wireMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
MovingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
MovingCube.position.set(0, 0, 0);
setCollisionDetection(cam, MovingCube); //collision detection hitbox

//LIGHTING
var directionalLight = new THREE.PointLight(0xffdead, 0.7);
directionalLight.position.set(47500, 8000, 20000);
directionalLight.castShadow = true;
scene.add(directionalLight);
var ambientLight = new THREE.AmbientLight(0xffdead, 0.45);//0.05
scene.add(ambientLight);

const finder = new THREE.Mesh(
    new THREE.BoxBufferGeometry(5000, 5000, 5000),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
finder.position.set(47500, 8000, 20000);
//scene.add(finder);

//SCENE MODELING - actual scene stored in floor1.js
const room = Room();
room.scale.set(4, 8, 5);
room.position.set(0, 300, 0);
room.rotateX(3 * Math.PI / 2);
room.castShadow = true;
scene.add(room);

//skybox
const box = sky();
box.translateY(29600);
box.receiveShadow = true;
scene.add(box);

//reticle 
var qf = [2000, 1, 2000, 2000, 1, 2000, 2000, 1, 2000];
addReticle(cam, qf);
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
loader.load('Blender Models/Level 2/Rocks/Rock3.gltf', function (gltf) {
    rock1 = gltf.scene;
    rock1.scale.set(10000, 10000, 10000);
    rock1.position.set(47500, 0, 20000);
    scene.add(rock1);
});
var rock2 = new THREE.Mesh();
loader.load('Blender Models/Level 2/Rocks/Rock3.gltf', function (gltf) {
    rock2 = gltf.scene;
    rock2.scale.set(10000, 10000, 10000);
    rock2.position.set(47500, -1000, 20000);
    scene.add(rock2);
});
var rock3 = new THREE.Mesh();
loader.load('Blender Models/Level 2/Rocks/Rock1.gltf', function (gltf) {
    rock3 = gltf.scene;
    rock3.scale.set(10000, 10000, 10000);
    rock3.position.set(100500, -10000, 100000);
    scene.add(rock3);
});

var rocket = new THREE.Mesh();
loader.load('Blender Models/rocketship/rocket.gltf', function (gltf) {
    rocket = gltf.scene;
    rocket.scale.set(75, 75, 75);
    rocket.position.set(5000, -2000, -50000);
    scene.add(rocket);
});

const rocketf = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4000, 30000, 4000),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
rocketf.position.set(5000, -2000, -50000);
rocketf.visible = false;
scene.add(rocketf);

const domEvent1 = new THREEx.DomEvents(cam, renderer.domElement);

domEvent1.addEventListener(rocketf, 'dblclick', event => {
    camposition = new THREE.Vector3();
    camposition.setFromMatrixPosition(cam.matrixWorld);
    x = camposition.x;
    y = camposition.z;
    //finder object
    finderposition = new THREE.Vector3();
    finderposition.setFromMatrixPosition(rocketf.matrixWorld);
    fx = finderposition.x;
    fy = finderposition.z;
    if (Math.sqrt(Math.pow((x - fx), 2) + Math.pow((y - fy), 2)) < 10000) {
        window.location.href = "index.html";
    } else {
        console.log(Math.sqrt(Math.pow((x - fx), 2) + Math.pow((y - fy), 2)));
    }
});

var pistol = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf', function (gltf) {
    pistol = gltf.scene;
    pistol.scale.set(3, 4, 4);
    pistol.rotation.y = Math.PI;
    pistol.position.z = -4;
    pistol.position.x = 2;
    pistol.position.y = -1;
    cam.add(pistol)
    scene.add(cam);
});

enemy1 = new THREE.Mesh();
loader.load('Blender Models/Enemies/Enemies.gltf', function (gltf) {
    enemy1 = gltf.scene;
    enemy1.scale.set(350, 350, 350);
    enemy1.position.x = 100*Math.cos(frameCount) + 2000;
    enemy1.position.y = 100;
    enemy1.position.z = 100*Math.sin(frameCount) - 20000;
    scene.add(enemy1);
});

enemy3 = new THREE.Mesh();
loader.load('Blender Models/Enemies/Enemies.gltf', function (gltf) {
    enemy3 = gltf.scene;
    enemy3.scale.set(350, 350, 350);
    enemy3.position.x = 100*Math.cos(frameCount) + 5000;
    enemy3.position.y = 100;
    enemy3.position.z = 100*Math.sin(frameCount) - 30000;
    scene.add(enemy3);
});
enemy4 = new THREE.Mesh();
loader.load('Blender Models/Enemies/Enemies.gltf', function (gltf) {
    enemy4 = gltf.scene;
    enemy4.scale.set(350, 350, 350);
    enemy4.position.x = 100*Math.cos(frameCount) - 1000;
    enemy4.position.y = 100;
    enemy4.position.z = 100*Math.sin(frameCount) - 27000;
    scene.add(enemy4);
});

rover = new THREE.Mesh();
loader.load('Blender Models/Rover/Rover.gltf', function (gltf) {
    rover = gltf.scene;
    rover.scale.set(150, 150, 150);
    rover.position.x = 100*Math.cos(frameCount) - 1000;
    rover.position.y = -400;
    rover.position.z = 100*Math.sin(frameCount) - 27000;
    scene.add(rover);
});

var bullet = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({color: 0xffffff})
);
bullet.scale.set(500, 500, 500);

enemy2 = new THREE.Mesh();
loader.load('Blender Models/Laser Turret/LaserTurret.gltf', function (gltf) {
    enemy2 = gltf.scene;
    enemy2.scale.set(350, 350, 350);
    enemy2.position.x = 100*Math.cos(frameCount) + 7000;
    enemy2.position.y = -400;
    enemy2.position.z = 100*Math.sin(frameCount) - 15000;
    bullet.position.set(7000, -210, -15000);
    scene.add(bullet);
    scene.add(enemy2);
});

var otank1 = new THREE.Mesh();
loader.load('Blender Models/Health Packs/HealthPack.gltf', function (gltf) {
    otank1 = gltf.scene;
    otank1.scale.set(100, 100, 100);
    otank1.position.set(-20000, -250, -11000);
    scene.add(otank1);
});

var otank2 = new THREE.Mesh();
loader.load('Blender Models/Health Packs/HealthPack.gltf', function (gltf) {
    otank2 = gltf.scene;
    otank2.scale.set(100, 100, 100);
    otank2.position.set(-7000, -250, -22000);
    scene.add(otank2);
});

HUD();
Tasks();

//ACTION!

function lerp(a, b, t) {return a + (b - a) * t}
function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}
var t = 0;
function loop(mesh, x, y, z){
    var newX = lerp(mesh.position.x, x, t);
    var newY = mesh.position.y; //lerp(mesh.position.y, y, ease(t));
    var newZ = lerp(mesh.position.z, z, t);
    t += 0.0002;
    mesh.position.set(newX, newY, newZ);
}

function turnTurret(r, obj) {
    if (Math.pow(cam.position.x - obj.position.x, 2) + Math.pow(cam.position.z - obj.position.z, 2) <= Math.pow(r, 2)) {
        var ang = Math.atan2((cam.position.x - obj.position.x), (cam.position.z - obj.position.z));
        obj.rotation.y = ang;
        ran = Math.floor(Math.random() * 20);
        loop(bullet, cam.position.x, cam.position.y, cam.position.z)
        if (ran == 2){
            //Player.decHealth(1);
        }
    }
    else{
        bullet.position.set(7000, -210, -15000);
    }
}

function getPacks(r, obj) {
    if (Math.pow(cam.position.x - obj.position.x, 2) + Math.pow(cam.position.z - obj.position.z, 2) <= Math.pow(r, 2)) {
        //Player.resetHealth();
        scene.remove(obj);

    }
}

function drawScene() {
    renderer.render(scene, cam);
    otank1.rotation.y += 0.05;
    otank2.rotation.y += 0.05;
    checkCollision(cam, updateKeyboard, MovingCube);
    processKeyboard();
    //turnTurret(5000, enemy1);
    turnTurret(5000, enemy2);
    //turnTurret(5000, enemy3);
    //turnTurret(5000, enemy4);
    getPacks(500, otank1);
    getPacks(500, otank2);
    requestAnimationFrame(drawScene);
    

    if (Player.getHealth() <= 0) {
        window.location.href = "GameOver.html";
    }else{
        if (Player.getOxygen() == 0) {
            Player.decHealth(0.07);
        } else {
            //Player.decHealth(0.03);
            //Player.decOxygen(0.07);
        }
    }

    enemy1.position.x = 9000*Math.cos(frameCount) + 2000;
    enemy1.position.z = 1000*Math.sin(frameCount) - 20000;
    enemy3.position.x = 2000*Math.cos(frameCount) + 5000;
    enemy3.position.z = 6000*Math.sin(frameCount) - 30000;
    enemy4.position.x = 4200*Math.cos(frameCount) - 1000;
    enemy4.position.z = 5700*Math.sin(frameCount) - 27000;
    rover.position.x = 12000*Math.cos(roverCount) + 2000;
    rover.position.z = 6000*Math.sin(roverCount) - 27000;
    rover.rotation.y = (-roverCount % 360);//-Math.sin(frameCount/2)

    roverCount+=0.002;
    frameCount+=0.007;

    HUD();
    Tasks();
}
function Tasks() {
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
    task.style.fontSize = window.innerWidth*0.01+"px";
    task.style.letterSpacing = window.innerWidth*0.001+"px";
    task.style.fontFamily = "Helvetica";
    task.style.width = 200;
    task.style.height = 500;
    task.innerHTML = "Task(s)";
    task.style.top = window.innerHeight*0.2 + 'px';
    task.style.left = window.innerWidth*0.02 + 'px';

    var task1 = document.createElement('div');
    task1.id = "task1";
    task1.style.position = 'absolute';
    task1.style.color = "white";
    task1.style.fontSize = window.innerWidth*0.01+"px";
    task1.style.letterSpacing = window.innerWidth*0.001+"px";
    task1.style.fontFamily = "Helvetica";
    task1.style.width = 200;
    task1.style.height = 500;
    task1.innerHTML = "> Get to the rocketship";
    task1.style.top = window.innerHeight*0.23 + 'px';
    task1.style.left = window.innerWidth*0.02 + 'px';

    document.body.appendChild(task);
    document.body.appendChild(task1);
}

drawScene();