//LEVEL 3//

//scene
const scene = new THREE.Scene();

//camera and renderer
var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 1, 100000);
var renderer = new THREE.WebGL1Renderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(innerWidth, innerHeight);
//cam.position.set(500,50,2200);
cam.position.set(2100,50,200);
cam.lookAt(50000,0000,50000);
//cam.lookAt(-2000,0,15000)
document.body.appendChild(renderer.domElement);

//LIGHTING
var directionalLight = new THREE.PointLight(0xffdead, 0.5);
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
room.scale.set(4,4,2.5);
room.rotateX(3*Math.PI/2);
room.castShadow = true;
scene.add(room);

//skybox
const box = sky();
box.translateY(14600);
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

//ACTION!
function drawScene(){
    renderer.render(scene, cam);
    processKeyboard();
    requestAnimationFrame(drawScene);
}

drawScene();