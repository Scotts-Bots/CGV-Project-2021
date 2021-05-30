//LEVEL 2

//creating a scene
const scene = new THREE.Scene();

//////////////////////View settings - pick which camera////////////////////////////
var play = false; //MANUAL CHOICE!

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 3500;
const cameraHeight = cameraWidth / aspectRatio;
var camera;
setCamera(play);

///////////////////////////////////////////////////////////////////////////////////

//actual level
const room = Room();
room.scale.set(1.3,1,1.5);
//room.scale.setScalar(1.5);
room.position.set(0,-300,0);
scene.add(room);

//skybox
const box = sky();
box.translateY(14700);
scene.add(box);

//setting up renderer
const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//LIGHTING
    //adding ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    var spotlight3 = new THREE.SpotLight(0x0000ff);
	spotlight3.position.set(-1400,400,-450);
	spotlight3.shadowCameraVisible = true;
	spotlight3.shadowDarkness = 0.95;
	spotlight3.intensity = 2;
	spotlight3.castShadow = true;
	scene.add(spotlight3);
	// change the direction this spotlight is facing
	var lightTarget = new THREE.Object3D();
	lightTarget.position.set(-1100,300,-650);
	scene.add(lightTarget);
	spotlight3.target = lightTarget;
    

document.body.appendChild(renderer.domElement);

//keyboard and mouse controls
let controls = new THREE.PointerLockControls(camera, renderer.domElement);
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

function setCamera(isPlay) {
    if (isPlay) {
        //setting up perspective camera
            camera = new THREE.PerspectiveCamera(
            45, //vertical field of view
            aspectRatio, //aspect ratio
            0.1, //near plane
            100000 //far plane
        );

        camera.position.set(300,0,-100);
        camera.lookAt(300,200,-1000);
    } else {
        //setting up orthographic camera
            camera = new THREE.OrthographicCamera(
            cameraWidth / -2, //left
            cameraWidth / 2, //right
            cameraHeight / 2, //top
            cameraHeight / -2, //bottom
            -2000, //near
            10000 //far
        );

        camera.position.set(-100, 500, -1500);
        camera.up.set(0, 1, 0);
        camera.lookAt(0, 300, -800);
    }
}

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
    renderer.render(scene, camera);
    processKeyboard();
    requestAnimationFrame(drawScene);
}

drawScene();

////////////////////////////////////SCENE MODELING//////////////////////////////////
//generic floor mesh
function Floor() {
    const floor = new THREE.Mesh(
        new THREE.BoxBufferGeometry(200, 100, 200),
        new THREE.MeshLambertMaterial({ color: 0x888888 })
    );
    floor.receiveShadow = true;
    return floor;
}

//generic wall mesh
function Wall() {
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100, 800, 50),
        new THREE.MeshLambertMaterial({
             color: 0xc99f63,
             })
    );
    return wall;
}

//transparent box
function Window(x, y, z) {
    const window = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.5})
    );
    return window;
}

//wall with a single window
function WindowedWall() {
    windowedWall = new THREE.Group();
    var wallHeight = 0;

    const leftWall = Wall();
    leftWall.scale.set(2,1,1);
    leftWall.position.set(-400,wallHeight,0);
    windowedWall.add(leftWall);

    const rightWall = Wall();
    rightWall.scale.set(2,1,1);
    rightWall.position.set(400,wallHeight,0);
    windowedWall.add(rightWall);

    const topWall = Wall();
    topWall.scale.set(1,0.8,1);
    topWall.rotateZ(Math.PI/2);
    topWall.position.set(0,350 + wallHeight,0);
    windowedWall.add(topWall);

    const bottomWall = Wall();
    bottomWall.scale.set(4,0.8,1);
    bottomWall.rotateZ(Math.PI/2);
    bottomWall.position.set(0,-200 + wallHeight,0);
    windowedWall.add(bottomWall);

    return windowedWall;
}


//Entire room of level
function Room() {
    const room = new THREE.Group();
    
    const rightWall = Wall();
        rightWall.scale.set(40,3,1);
        rightWall.rotateY(Math.PI/2);
        rightWall.position.set(-500,200,-1050);
        room.add(rightWall);

        const rightWall2 = Wall();
        rightWall2.scale.set(40,3,1);
        rightWall2.rotateY(Math.PI/2);
        rightWall2.position.set(-300,200,-1050);
        room.add(rightWall2);

    const f = Floor();
        f.scale.set(10,1,18);
        f.position.set(600,0,-800);
        room.add(f);
    
    return room;
}
