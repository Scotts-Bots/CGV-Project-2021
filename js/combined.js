const scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 1, 100000);
var renderer = new THREE.WebGLRenderer({antialias: true});

scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
cam.position.set(1000,50,200);
cam.lookAt(1300,0,2000)
document.body.appendChild(renderer.domElement);
var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const room = Room();
room.scale.set(2,2.5,1.8);
room.rotateX(3*Math.PI/2);
scene.add(room);


const box = sky();
box.translateY(14700);
scene.add(box);

let controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', ()=>{
    controls.lock();
});

let keyboard = [];
addEventListener('keydown', (e)=>{
    keyboard[e.key] = true;
});
addEventListener('keyup', (e)=>{
    keyboard[e.key] = false;
});
function processKeyboard(){
    var speed = 10;
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
}

function drawScene(){
    renderer.render(scene, cam);
    processKeyboard();
    requestAnimationFrame(drawScene);
}

drawScene();