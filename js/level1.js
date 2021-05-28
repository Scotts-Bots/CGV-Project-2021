const scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 1, 100000);
var renderer = new THREE.WebGL1Renderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(innerWidth, innerHeight);
//cam.position.set(500,50,2200);
cam.position.set(2100,50,200);
cam.lookAt(2900,0,2000);
//cam.lookAt(-2000,0,15000)
document.body.appendChild(renderer.domElement);

var directionalLight = new THREE.PointLight(0xffdead, 0.5);
directionalLight.position.set(47500, 8000, 20000);
//directionalLight.castShadow = true;
//scene.add(directionalLight);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.05);//0.05
scene.add(ambientLight);

const finder = new THREE.Mesh(
    new THREE.BoxBufferGeometry(200,200,200),
    new THREE.MeshLambertMaterial({color: 0xffffff})
);
finder.position.set(0,375,2000);
//scene.add(finder);

//back right room
const light9 = new THREE.PointLight( 0xffffff, 1, 2100 ,2 ); 
light9.position.set( -100,375,2100 ); 
light9.castShadow = true;
scene.add( light9 );
// const light10 = new THREE.PointLight( 0xffffff, 1, 2100 ,2 ); 
// light10.position.set( -100,375,2200 ); 
// light10.castShadow = true;
//scene.add( light10 );


//front right room
const light7 = new THREE.PointLight( 0xffffff, 1, 2100 ,2 ); 
light7.position.set( -100,375,900 ); 
light7.castShadow = true;
scene.add( light7 );
// const light8 = new THREE.PointLight( 0xffffff, 1, 2000 ,2 ); 
// light8.position.set( -100,375,800 ); 
// light8.castShadow = true;
//scene.add( light8 );

//passage light
// const light4 = new THREE.PointLight( 0xffffff, 0.5, 1700 ,2 ); 
// light4.position.set( 1300,375,1650 ); 
//light4.castShadow = true;
//scene.add( light4 );
const light5 = new THREE.PointLight( 0xffffff, 0.5, 1400 ,2 ); 
light5.position.set( 1300,375,1500 ); 
light5.castShadow = true;
scene.add( light5 );
// const light6 = new THREE.PointLight( 0xffffff, 0.5, 1700 ,2 ); 
// light6.position.set( 1300,375,1350 ); 
//light6.castShadow = true;
//scene.add( light6 );

//emergency light
const light3 = new THREE.PointLight( 0xff0000, 3, 900 ,2 ); 
light3.position.set( 2000,200,1200 ); 
light3.castShadow = true;
scene.add( light3 );

//flourescent light
// const light = new THREE.PointLight( 0xffffff, 1, 3000 ,2 ); 
// light.position.set( 2500,375,1650 ); 
//light.castShadow = true;
//scene.add( light );
const light1 = new THREE.PointLight( 0xffffff, 1, 6000 ,2 ); 
light1.position.set( 2500,375,1500 ); 
light1.castShadow = true;
scene.add( light1 );
// const light2 = new THREE.PointLight( 0xffffff, 1, 3000 ,2 ); 
// light2.position.set( 2500,375,1350 ); 
//light2.castShadow = true;
//scene.add( light2 );


const room = Room();
room.scale.set(4,4,2.5);
room.rotateX(3*Math.PI/2);
scene.add(room);


const box = sky();
box.translateY(14600);
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
    var speed = 15;
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

// const finder = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(200,200,200),
//     new THREE.MeshLambertMaterial({color: 0xffffff})
// );
// finder.position.set(2500,375,1500);