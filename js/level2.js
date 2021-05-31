//LEVEL 2

//creating a scene
const scene = new THREE.Scene();

//////////////////////View settings - pick which camera////////////////////////////
var play = true; //MANUAL CHOICE!

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 3500;
const cameraHeight = cameraWidth / aspectRatio;
var camera;
setCamera(play);

//player hit box
var cubeGeometry = new THREE.BoxBufferGeometry(200,200,200,3,3,3);
var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
MovingCube.position.set(0, 0, 0);
setCollisionDetection(camera,MovingCube); //collision detection hitbox

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
const renderer = new THREE.WebGL1Renderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//LIGHTING
    //adding ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    //ight 1
    const pointLight1 = new THREE.PointLight( 0xffffff, 5, 3000, 3);
    pointLight1.position.set(1000,500,-550);
    //pointLight1.castShadow = true; // default false
    //scene.add(pointLight1);

    //light 2
    const pointLight2 = new THREE.PointLight( 0xffffff, 2, 5000, 2);
    pointLight2.position.set(-400,300,-3400);
    //pointLight2.castShadow = true; // default false
    scene.add(pointLight2);
    
    // const finder1 = new THREE.Mesh(
    // new THREE.SphereBufferGeometry(50),
    // new THREE.MeshLambertMaterial({color: 0x666666})
    // );
    // finder1.position.set(-600,500,-3700);
    // finder1.castShadow = true;
    // scene.add(finder1);

    // red light
    const pointLight3 = new THREE.PointLight( 0xff0000, 2, 4000, 3);
    pointLight3.position.set(-2050,100,-1050);
    //pointLight3.castShadow = true; // default false
    scene.add(pointLight3);

//reticle
var qf = [1,1,1,  1,1,1,  1,1,1];
addReticle(camera,qf);
scene.add(camera);

document.body.appendChild(renderer.domElement);

//keyboard and mouse controls

let controls = new THREE.PointerLockControls(camera, renderer.domElement);
let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', ()=>{
    controls.lock();
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

        camera.position.set(200,1000, -500);
        camera.up.set(0, 1, 0);
        camera.lookAt(0, 300, -2000);
    }
}

function drawScene(){
    renderer.render(scene, camera);
    checkCollision(camera,updateKeyboard,MovingCube);
    console.log(lastKeyPressed, speedA, speedD, speedS, speedW);
    processKeyboard();
    requestAnimationFrame(drawScene);
}

//ACTION!
drawScene();

////////////////////////////////////SCENE MODELING//////////////////////////////////
//generic floor mesh
function Floor() {
    const floor = new THREE.Mesh(
        new THREE.BoxBufferGeometry(200, 100, 200),
        new THREE.MeshLambertMaterial({ color: 0x888888 })
    );
    floor.receiveShadow = true;
    floor.castShadow = true;
    return floor;
}

//generic wall mesh
function Wall() {
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100, 800, 60),
        new THREE.MeshLambertMaterial({
             color: 0xc99f63,
             })
    );
    wall.receiveShadow = true;
    wall.castShadow = true;
    collidableMeshList.push(wall);
    return wall;
}

//transparent box
function Window(x, y, z) {
    const window = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.5})
    );
    collidableMeshList.push(window);
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

//Room unit that gets repeated multiple times
function RoomPart() {
    const roomPart = new THREE.Group();

    //walls 2 - 6
    const w2 = Wall();
    w2.scale.set(5,3,1);
    w2.rotateY(Math.PI/2);
    w2.position.set(820,200,600);
    roomPart.add(w2);

    const w6 = Wall();
    w6.scale.set(5,3,1);
    w6.rotateY(Math.PI/2);
    w6.position.set(820,200,-600);
    roomPart.add(w6);

    const w5 = Wall();
    w5.scale.set(5,3,1);
    w5.position.set(725,200,-325);
    roomPart.add(w5);

    const w3 = Wall();
    w3.scale.set(5,3,1);
    w3.position.set(725,200,325);
    roomPart.add(w3);

    const w4 = Wall();
    w4.scale.set(7,3,1);
    w4.rotateY(Math.PI/2);
    w4.position.set(452,200,0);
    roomPart.add(w4);

    return roomPart;
}

//Entire room of level
function Room() {
    const room = new THREE.Group();

    //SUB ROOMS
        const roomPart1 = RoomPart();
        room.add(roomPart1);

        const roomPart3 = RoomPart();
        roomPart3.position.set(400,0,-1650);
        room.add(roomPart3);

    //FLOOR
        const f = Floor();
        f.scale.set(15,1,18);
        f.position.set(-200,0,-800);
        room.add(f);
    
    //WALLS
        //walls 1,7
        const w1 = Wall();
        w1.scale.set(25,3,1);
        w1.position.set(-450,200,810);
        room.add(w1);

        const w7 = Wall();
        w7.scale.set(12,3,1);
        w7.position.set(-1100,200,-825);
        room.add(w7);

        //walls 10,13,3r
        const w10 = Wall();
        w10.scale.set(9,1,1);
        w10.rotateY(Math.PI/2);
        w10.position.set(-1700,200,350);
        room.add(w10);

        const w13 = Wall();
        w13.scale.set(2.5,3,1);
        w13.rotateY(Math.PI/2);
        w13.position.set(-500,200,755);
        room.add(w13);

        const w3r = Wall();
        w3r.scale.set(4,3,1);
        w3r.position.set(1035,200,-825);
        room.add(w3r);

        //walls with windows
        const w9 = WindowedWall();
        w9.scale.set(0.8,1,1);
        w9.rotateY(Math.PI/2);
        w9.position.set(-1700,200,-450);
        room.add(w9);

        const window9 = Window(480,300,50);
        window9.rotateY(Math.PI/2);
        window9.position.set(-1700,350,-450);
        room.add(window9);

        const rightWall = Wall();
        rightWall.scale.set(29,3,0.5);
        rightWall.rotateY(Math.PI/2);
        rightWall.position.set(-500,200,-1050);
        room.add(rightWall);

        const w14r = Wall();
        w14r.scale.set(2.3,1.3,0.5);
        w14r.rotateY(Math.PI/2);
        w14r.position.set(-500,900,515);
        room.add(w14r);

        //end of level wall
        const w20 = Wall();
        w20.scale.set(18,3,1);
        w20.position.set(400,200,-2510);
        room.add(w20);

    //CEILING
        //c - ceiling
        const c1 = Floor();
        c1.scale.set(6,1,9);
        c1.position.set(-1100,650,0);
        room.add(c1);

        const c2 = Floor();
        c2.scale.set(10,1,18);
        c2.position.set(300,1400,-800);
        room.add(c2);
        
    return room;
}
