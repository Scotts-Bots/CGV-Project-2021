//LEVEL 2

//creating a scene
const scene = new THREE.Scene();

//adding ambient light
const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight1);

//adding directional light @ position 100,-300, 400
const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(400, 500, -600);
scene.add(dirLight);

const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight2.position.set(-500, 400, 100);
//scene.add(dirLight2);

//////////////////////View settings - pick which camera////////////////////////////
var play = true; //MANUAL CHOICE!

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 3500;
const cameraHeight = cameraWidth / aspectRatio;
var camera;
setCamera(play);

///////////////////////////////////////////////////////////////////////////////////

const room = Room();
//room.scale.setScalar(1);
//room.position.set(900,-300,0);
scene.add(room);

//skybox
const box = sky();
box.translateY(14700);
scene.add(box);

//setting up renderer
const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

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

        camera.position.set(0,300,600);
        camera.lookAt(-300,100,-600);
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

        camera.position.set(0, 1000, -1500);
        camera.up.set(0, 1, 0);
        camera.lookAt(0, 0, -1500);
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
        new THREE.MeshLambertMaterial({ color: 0x808080 })
    );
    return floor;
}

//generic wall mesh
function Wall() {
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100, 800, 50),
        new THREE.MeshLambertMaterial({ color: 0xc99f63 })
    );
    return wall;
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

//Room unit that gets repeated multiple times
function RoomPart() {
    const roomPart = new THREE.Group();
    //FLOORS
        //main floor 1 - f1
        const f1 = Floor()
        f1.scale.set(5,1,9);
        roomPart.add(f1);

        //floors 2 and 3
        const f2 = Floor();
        f2.scale.set(3,1,3);
        f2.position.set(600,0,600);
        roomPart.add(f2);

        const f3 = Floor();
        f3.scale.set(3,1,3);
        f3.position.set(600,0,-600);
        roomPart.add(f3);

        //walls 2 - 6
        const w2 = Wall();
        w2.scale.set(5,1,1);
        w2.rotateY(Math.PI/2);
        w2.position.set(820,200,600);
        roomPart.add(w2);

        const w6 = Wall();
        w6.scale.set(5,1,1);
        w6.rotateY(Math.PI/2);
        w6.position.set(820,200,-600);
        roomPart.add(w6);

        const w5 = Wall();
        w5.scale.set(5,1,1);
        w5.position.set(725,200,-325);
        roomPart.add(w5);

        const w3 = Wall();
        w3.scale.set(5,1,1);
        w3.position.set(725,200,325);
        roomPart.add(w3);

        const w4 = Wall();
        w4.scale.set(7,1,1);
        w4.rotateY(Math.PI/2);
        w4.position.set(500,200,0);
        roomPart.add(w4);

    return roomPart;
}

//Entire room of level
function Room() {
    const room = new THREE.Group();

    //SUB ROOMS
        const roomPart1 = RoomPart();
        room.add(roomPart1);

        const roomPart2 = RoomPart();
        roomPart2.position.set(320,0,-1650);
        roomPart2.rotateY(Math.PI);
        room.add(roomPart2);

        const roomPart3 = RoomPart();
        roomPart3.position.set(400,0,-1650);
        room.add(roomPart3);

    //FLOORS
        //floors 4 and 5
        const f4 = Floor();
        f4.scale.set(6,1,8);
        f4.position.set(-1100,0,0);
        room.add(f4);
    
    //WALLS
        //walls 1,7
        const w1 = Wall();
        w1.scale.set(25,1,1);
        w1.position.set(-450,200,825);
        room.add(w1);

        const w7 = Wall();
        w7.scale.set(12,1,1);
        w7.position.set(-1100,200,-825);
        room.add(w7);

        //walls 10,13,15,3r
        const w10 = Wall();
        w10.scale.set(10,1,1);
        w10.rotateY(Math.PI/2);
        w10.position.set(-1700,200,350);
        room.add(w10);

        const w13 = Wall();
        w13.scale.set(2,1,1);
        w13.rotateY(Math.PI/2);
        w13.position.set(-500,200,750);
        room.add(w13);

        const w15 = Wall();
        w15.scale.set(6,1,1);
        w15.rotateY(Math.PI/2);
        w15.position.set(-500,200,-500);
        room.add(w15);

        const w3r = Wall();
        w3r.scale.set(4,1,1);
        w3r.position.set(1035,200,-825);
        room.add(w3r);

        //walls with windows
        const w9 = WindowedWall();
        w9.scale.set(0.8,1,1);
        w9.rotateY(Math.PI/2);
        w9.position.set(-1700,200,-450);
        room.add(w9);

        const w14 = WindowedWall();
        w14.scale.set(0.8,1,1);
        w14.rotateY(Math.PI/2);
        w14.position.set(-500,200,0);
        room.add(w14);

        const w14r = Wall();
        w14r.scale.set(3,0.2,1);
        w14r.rotateY(Math.PI/2);
        w14r.position.set(-500,520,500);
        room.add(w14r);

        //end of level wall
        const w20 = Wall();
        w20.scale.set(6,1,1);
        w20.position.set(-225,200,-2500);
        room.add(w20);

        const w21 = Wall();
        w21.scale.set(6,1,1);
        w21.position.set(945,200,-2500);
        room.add(w21);

        const w21r = Wall();
        w21r.scale.set(2,0.8,1);
        w21r.rotateZ(Math.PI/2);
        w21r.position.set(350,500,-2500);
        room.add(w21r);

    return room;
}