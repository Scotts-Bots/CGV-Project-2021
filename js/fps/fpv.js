const scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 1, 100);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;

scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
cam.position.z = 5;
cam.position.y = 2;
document.body.appendChild(renderer.domElement);
var directionalLight = new THREE.PointLight();
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);
// var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

var groundMaterial = new THREE.MeshStandardMaterial();

 var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), groundMaterial );
 mesh.position.y = 0.0;
 mesh.rotation.x = - Math.PI / 2;
 mesh.castShadow = true;
 mesh.receiveShadow = true;
 scene.add( mesh );

let grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);
scene.add(grid);

let bGeo = new THREE.BoxGeometry(1, 1, 1);
let bMat = new THREE.MeshStandardMaterial({color: 0x00ff00, wireframe: false});
let cube = new THREE.Mesh(bGeo, bMat);
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.set(3, 0, -30);
scene.add(cube);
scene.updateMatrixWorld(true);
var position = new THREE.Vector3();
position.setFromMatrixPosition(cube.matrixWorld);

var gun = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Laser Turret/LaserTurret.gltf' , function (gltf)  {
    gun = gltf.scene;
    //scene.add(gun);
});

var pistol = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf' , function (gltf)  {
    pistol = gltf.scene;
    // pistol.scale.set(5, 5, 5);
    // pistol.position.y = -5;
    // pistol.position.z = -15;
    // pistol.position.x = 10;
    // cam.add(pistol);
    //pistol.lookAt(cam.quaternion.x*2000,cam.quaternion.y,cam.quaternion.z*2000);
    scene.add(pistol);
});

var bullets = [];

let controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', ()=>{
    controls.lock();
});

function inRadius(r, a, b, c){
    health = 100;
    var text2 = document.createElement('div');
    text2.style.position = 'absolute';
    text2.style.width = 100;
    text2.style.height = 100;
    text2.style.backgroundColor = "blue";
    text2.style.top = 200 + 'px';
    text2.style.left = 200 + 'px';
    document.body.appendChild(text2);
    if (Math.pow(a - position.x, 2) + Math.pow(b - position.y, 2) + Math.pow(c - position.z, 2) <= Math.pow(r, 2)){
        cube.material.color.setHex(0xff0000);
        text2.innerText = "Danger";
        return 0;
    }
    else{
        cube.material.color.setHex(0x00ff00);
        text2.innerText = "Safety";
        health = 100;
        return 1;
    }
}

let keyboard = [];
addEventListener('keydown', (e)=>{
    keyboard[e.key] = true;
});
addEventListener('keyup', (e)=>{
    keyboard[e.key] = false;
});
function processKeyboard(){
    var speed = 0.1;
    if (keyboard['w']){
        controls.moveForward(speed);
    }
    else if(keyboard['a']){
        controls.moveRight(-speed);
    }
    else if(keyboard['s']){
        controls.moveForward(-speed);
    }
    else if(keyboard['d']){
        controls.moveRight(speed);
    }
    else if(keyboard['r']){
        controls.lock();
    }
    
}

function lerp(a, b, t) {return a + (b - a) * t}
function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}
var t = 0;
function loop(mesh, x, y, z){
    var newX = lerp(mesh.position.x, x, ease(t));
    var newY = lerp(mesh.position.y, y, ease(t));
    var newZ = lerp(mesh.position.z, z, ease(t));
    t += 0.002;
    mesh.position.set(newX, newY, newZ);
}

function drawScene(){
    renderer.render(scene, cam);
    loop(cube, cam.position.x, cam.position.y, cam.position.z);
    setInterval(function(){
        cube.position.set(0, 0, -30);
    }, 1500);
    processKeyboard();
    if (inRadius(10, cam.position.x, cam.position.y, cam.position.z) == 0){
        var ang = Math.atan2( ( cam.position.x - gun.position.x ), ( cam.position.z - gun.position.z ) );

        gun.rotation.y = ang;
    }
    requestAnimationFrame(drawScene);
}

drawScene();