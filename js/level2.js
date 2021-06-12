//LEVEL 2
var helpCounter = 0;
var kswipePadPopup;
var keycardPopup;
var keycardf;
var kswipePadf;

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
var cubeGeometry = new THREE.BoxBufferGeometry(100,100,100,3,3,3);
var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:false } );
MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
MovingCube.position.set(0, 0, 0);
setCollisionDetection(camera,MovingCube); //collision detection hitbox

///////////////////////////////////////////////////////////////////////////////////

var keycard; 
var found = false;
var swipePad;

//load textures
const materialimg = new THREE.MeshPhongMaterial();
materialimg.map = new THREE.TextureLoader().load('Images/wall_texture.jpg');

//actual level
const room = Room();
room.scale.set(1.3,1,1.5);
//room.scale.setScalar(1.5);
room.position.set(0,-300,0);
scene.add(room);

//skybox
const box = sky();
box.translateY(14700);
box.scale.set(0.5,0.5,0.5);
scene.add(box);

//setting up renderer
const renderer = new THREE.WebGL1Renderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//loading blender models
var gltfLoader = new THREE.GLTFLoader();
loadAssets();

//LIGHTING
    //adding ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    //light 1
    const pointLight1 = new THREE.PointLight( 0xffffff, 1, 2000, 3);
    pointLight1.position.set(-100,700,-200);
    //pointLight1.castShadow = true; // default false
    scene.add(pointLight1);

    //light 2
    const pointLight2 = new THREE.PointLight( 0xffffff, 1, 3000, 2);
    pointLight2.position.set(-100,700,-1800);
    //pointLight2.castShadow = true; // default false
    scene.add(pointLight2);
    
    // const finder1 = new THREE.Mesh(
    // new THREE.SphereBufferGeometry(50),
    // new THREE.MeshLambertMaterial({color: 0x666666})
    // );
    // finder1.position.set(-200,500,-1500);
    // //finder1.castShadow = true;
    // scene.add(finder1);

    // red light
    const pointLight3 = new THREE.PointLight( 0xff0000, 1, 4000, 3);
    pointLight3.position.set(-2050,100,-1050);
    //pointLight3.castShadow = true; // default false
    scene.add(pointLight3);

//reticle
var qf = [1,1,1,  1,1,1,  1,1,1];
addReticle(camera,qf);
scene.add(camera);

document.body.appendChild(renderer.domElement);
HUD();
//assets


//keyboard and mouse controls
let controls = new THREE.PointerLockControls(camera, renderer.domElement);
let clock = new THREE.Clock();

// let btn1 = document.querySelector("#button1");
// btn1.addEventListener('click', ()=>{
//     controls.lock();
// });

function setCamera(isPlay) {
    if (isPlay) {
        //setting up perspective camera
            camera = new THREE.PerspectiveCamera(
            45, //vertical field of view
            aspectRatio, //aspect ratio
            0.1, //near plane
            100000 //far plane
        );

        camera.position.set(100,0,1000);
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

var pistol = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf' , function (gltf)  {
    pistol = gltf.scene;
    pistol.scale.set(3, 4, 4);
    pistol.rotation.y = Math.PI;
    pistol.position.z = -4;
    pistol.position.x = 2;
    pistol.position.y = -1;
    camera.add(pistol)
    scene.add(camera);
});

function drawScene(){
    renderer.render(scene, camera);
    checkCollision(camera,updateKeyboard,MovingCube);
    if (helpCounter == 0){
        ShowHelp(false);
    }else{
        helpCounter-=1;
    }
    //console.log(lastKeyPressed, speedA, speedD, speedS, speedW);
    keycardPopup.rotation.y +=0.02;
    kswipePadPopup.rotation.y +=0.02;
    checkPopUps();
    processKeyboard();
    HUD();
    Tasks();
    requestAnimationFrame(drawScene);
}

//ACTION!
drawScene();

function checkPopUps(){
    camposition = new THREE.Vector3();
    camposition.setFromMatrixPosition( camera.matrixWorld );
    x = camposition.x;
    y = camposition.z;
    //finder object
    finderposition = new THREE.Vector3();
    finderposition.setFromMatrixPosition( keycardf.matrixWorld );
    fx = finderposition.x;
    fy = finderposition.z;
    if (Math.sqrt(Math.pow((x-fx),2) + Math.pow((y-fy),2)) <700){
        keycardPopup.visible = true;
    }else{
        keycardPopup.visible = false;
    }
    finderposition = new THREE.Vector3();
    finderposition.setFromMatrixPosition( kswipePadf.matrixWorld );
    fx = finderposition.x;
    fy = finderposition.z;
    if (Math.sqrt(Math.pow((x-fx),2) + Math.pow((y-fy),2)) <700){
        kswipePadPopup.visible = true;
    }else{
        kswipePadPopup.visible = false;
    }
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

    check1 = document.getElementById("task2");
    if (check1 != null) {
        check1.parentNode.removeChild(check1);
    }
    check = document.getElementById("task3");
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
    task1.innerHTML = "> Find Key Card";
    task1.style.top = window.innerHeight*0.23 + 'px';
    task1.style.left = window.innerWidth*0.02 + 'px';

    var task2 = document.createElement('div');
    task2.id = "task2";
    task2.style.position = 'absolute';
    task2.style.color = "white";
    task2.style.fontSize = window.innerWidth*0.01+"px";
    task2.style.letterSpacing = window.innerWidth*0.001+"px";
    task2.style.fontFamily = "Helvetica";
    task2.style.width = 200;
    task2.style.height = 500;
    task2.innerHTML = "> Swipe Key Card";
    task2.style.top = window.innerHeight*0.26 + 'px';
    task2.style.left = window.innerWidth*0.02 + 'px';

    
    document.body.appendChild(task);
    if (found == false){
        document.body.appendChild(task1);
        
    }
    document.body.appendChild(task2);
    
 }

////////////////////////////////////SCENE MODELING//////////////////////////////////
function CeilingLight(px,py,pz,ry) {
    var ceilingLight = new THREE.Mesh();
    gltfLoader.load('Blender Models/LIghts/Flourescent Light/F Light.gltf' , function (gltf)  {
        ceilingLight = gltf.scene;
        ceilingLight.scale.set(175,175,200);
        ceilingLight.position.set(px,py,pz);
        ceilingLight.rotateY(ry);
        scene.add(ceilingLight);
    });
    return ceilingLight;
}


function Shelf(sx,sy,sz,px,py,pz) {
    var shelf = new THREE.Mesh();
    gltfLoader.load('Blender Models/Level 2/Shelf/Shelf.gltf' , function (gltf)  {
        shelf = gltf.scene;
        shelf.scale.set(sx,sy,sz);
        shelf.position.set(px,py,pz);
        scene.add(shelf);
    });
    return shelf;
}

//rotated shelf
function rShelf(sx,sy,sz,px,py,pz) {
    var rshelf = new THREE.Mesh();
    gltfLoader.load('Blender Models/Level 2/Shelf/Shelf.gltf' , function (gltf)  {
        rshelf = gltf.scene;
        rshelf.scale.set(sx,sy,sz);
        rshelf.position.set(px,py,pz);
        rshelf.rotateY(Math.PI/2);
        scene.add(rshelf);
    });
    return rshelf;
}

//toolbox
function Toolbox(sx,sy,sz,px,py,pz,ry) {
    var toolbox = new THREE.Mesh();
    gltfLoader.load('Blender Models/Level 2/toolbox/Toolbox.gltf' , function (gltf)  {
        toolbox = gltf.scene;
        toolbox.scale.set(sx,sy,sz);
        toolbox.position.set(px,py,pz);
        toolbox.rotateY(ry);
        scene.add(toolbox);
    });
    return toolbox;
}

function Ladder(s,ry,px,py,pz) {
    var ladder = new THREE.Mesh();
    gltfLoader.load('Blender Models/Level 2/ladder/Ladder.gltf' , function (gltf)  {
        ladder = gltf.scene;
        ladder.scale.set(s,s,s);
        ladder.position.set(px,py,pz);
        ladder.rotateY(ry);
        scene.add(ladder);
    });
    return ladder;
}

function Table(s,ry,px,py,pz) {
    var table = new THREE.Mesh();
    gltfLoader.load('Blender Models/Level 2/table/Table.gltf' , function (gltf)  {
        table = gltf.scene;
        table.scale.set(s,s,s);
        table.position.set(px,py,pz);
        table.rotateY(ry);
        scene.add(table);
    });
    return table;
}

function Chair(s,ry,px,py,pz) {
    var chair = new THREE.Mesh();
    gltfLoader.load('Blender Models/Level 2/chair/Chair.gltf' , function (gltf)  {
        chair = gltf.scene;
        chair.scale.set(s,s,s);
        chair.position.set(px,py,pz);
        chair.rotateY(ry);
        scene.add(chair);
    });
    return chair;
}

function loadAssets(){

    const geometry = new THREE.ConeGeometry( 20, 20, 4 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff99} );

    var warningLight = new THREE.Mesh();
    gltfLoader.load('Blender Models/LIghts/Warning Light/W Light.gltf' , function (gltf)  {
        warningLight = gltf.scene;
        warningLight.scale.set(50,-50,50);
        warningLight.position.set(-2180,300,-1080);
        scene.add(warningLight);
    });

    var ceilingLight1 = CeilingLight(-100,850,-1800,0);

    var ceilingLight2 = CeilingLight(-100,850,-200,0);

    swipePad = new THREE.Mesh();
    gltfLoader.load('Blender Models/keycard/swipepad.gltf' , function (gltf)  {
        swipePad = gltf.scene;
        swipePad.scale.set(50,50,50);
        swipePad.rotateX(Math.PI/2);
        swipePad.rotateY(-Math.PI/2);
        swipePad.position.set(600,50,-3715);
        scene.add(swipePad);
    })

    
    kswipePadf = new THREE.Mesh(
        new THREE.BoxBufferGeometry(50, 50, 50),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    kswipePadf.position.set(600,50,-3715);
    kswipePadf.visible = false;
    scene.add(kswipePadf);

    kswipePadPopup = new THREE.Mesh( geometry, material );
    kswipePadPopup.position.set(600,90,-3715);
    kswipePadPopup.rotateZ(Math.PI);
scene.add( kswipePadPopup );

    const domEvent3 = new THREEx.DomEvents(camera,  renderer.domElement);

domEvent3.addEventListener(kswipePadf, 'dblclick', event =>{
    if (found) {
        window.location.href = "level3.html";
    }else{
        ShowHelp(true);
        helpCounter = 60;
    }
});

    keycard = new THREE.Mesh();
    gltfLoader.load('Blender Models/keycard/keycard.gltf' , function (gltf)  {
        keycard = gltf.scene;
        keycard.scale.set(200,150,200);
        keycard.position.set(-830,-130,-200);
        scene.add(keycard);
    })

    keycardf = new THREE.Mesh(
        new THREE.BoxBufferGeometry(50, 50, 50),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    keycardf.position.set(-830,-130,-200);
    keycardf.visible = false;
    scene.add(keycardf);

    keycardPopup = new THREE.Mesh( geometry, material );
    keycardPopup.position.set(-830,-90,-200);
    keycardPopup.rotateZ(Math.PI);
scene.add( keycardPopup );

    const domEvent2 = new THREEx.DomEvents(camera,  renderer.domElement);

domEvent2.addEventListener(keycardf, 'dblclick', event =>{
    scene.remove( keycardPopup );
    scene.remove(keycard);//must remove object
    Player.incCards();
    found = true;
});

    //shelves - function made above
        //main room shelves
        var shelf1 = Shelf(200,200,200,800,-350,-600);
        var shelf2 = Shelf(200,200,200,800,-350,1110);
        var shelf3 = Shelf(200,200,200,800,30,1110);
        var shelf6 = Shelf(200,200,200,800,-350,-2100);
        var shelf7 = Shelf(200,200,200,800,30,-2100);

        //side room shelves
        var shelf4 = rShelf(200,200,200,-700,-350,200);
        var shelf5 = Shelf(200,200,200,-1400,-350,200);
        var shelf6 = Shelf(200,200,200,-1400,-350,-300);
    
    var toolbox1 = Toolbox(50,50,50,-2150,-250,1000,0);
    var toolbox2 = Toolbox(50,50,50,300,-250,-200,180);
    var ladder = Ladder(150,Math.PI/2,800,-280,650);
    var table1 = Table(150,Math.PI/2,-800,-350,-50);
    var table2 = Table(150,Math.PI/2,-1850,-350,-1000);
    var chair1 = Chair(100,-Math.PI/2,-1000,-250,-350);

}
//generic floor meshw
function Floor() {
    const floor = new THREE.Mesh(
        new THREE.BoxBufferGeometry(200, 100, 200),
        materialimg
        //new THREE.MeshLambertMaterial({ color: 0x888888 })
    );
    floor.receiveShadow = true;
    return floor;
}

//generic wall mesh
function Wall() {
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100, 800, 60),
             materialimg//color: 0xc99f63,
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
        w20.scale.set(11,3,1);
        w20.position.set(-400,200,-2510);
        room.add(w20);

        const w21 = Wall();
        w21.scale.set(11,3,1);
        w21.position.set(1000,200,-2510);
        room.add(w21);

        const w22 = Wall();
        w22.scale.set(3,2,1);
        w22.position.set(300,1300,-2550);
        room.add(w22);

        const door = Wall();
        door.scale.set(3,1,1);
        door.position.set(300,100,-2530);
        room.add(door);

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


//PAUSE MENU
var mesh;
var mesh1;
var mesh2;
var mesh3;
var mesh4;
var mesh5;
var mesh6;
var mesh7;
var mesh8;
var mesh9;
var mesh10;
var mesh11;
var mesh12;
var back;
var back1;
var back2;
var back3;
var back4;
var cback;

document.addEventListener('keydown', event => {
    if (event.code === "ArrowLeft") {
        paused = false;
        
    ambientLight.intensity = 0.05;
    RemoveCredit();
        RemovePause();
    }
});

document.addEventListener('keydown', event => {
    if (event.code === "ArrowUp") {
        window.location.href = "index.html";
    }
});

document.addEventListener('keydown', event => {
    if (event.code === "ArrowDown") {
        RemoveCredit();
        AddPause();
    }
});

document.addEventListener('keydown', event => {
    if (event.code === "ArrowRight") {

        RemovePause();
        AddCredit();

    }
});

document.addEventListener('keydown', event => {
    if (event.code === "KeyP") {
        RemoveHUD();
        paused = true;
        ambientLight.intensity = 1;
        AddPause();
    }
});

function AddPause(){
    back = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 0.7, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back.position.z = -1;
    back.position.x = -0.05;
    camera.add(back);
    scene.add(camera);

    back1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.9, 0.6, 0.001),
        new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
    );
    back1.position.z = -1;
    back1.position.x = -0.05;
    camera.add(back1);
    scene.add(camera);

    back2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back2.position.z = -1;
    back2.position.y = 0.19;
    back2.position.x = -0.04;
    camera.add(back2);
    scene.add(camera);

    back3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back3.position.z = -1;
    back3.position.y = 0.01;
    back3.position.x = -0.04;
    camera.add(back3);
    scene.add(camera);

    back4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back4.position.z = -1;
    back4.position.y = -0.16;
    back4.position.x = -0.04;
    camera.add(back4);
    scene.add(camera);


    var loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        var restartText = new THREE.TextGeometry("Restart", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        var resumeText = new THREE.TextGeometry("Resume", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        var creditText = new THREE.TextGeometry("Credits", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        var rArrow = new THREE.TextGeometry("right arrow key", {

            font: font,

            size: 0.015,
            height: 0.001,
            curveSegments: 2,

        });

        var lArrow = new THREE.TextGeometry("left arrow key", {

            font: font,

            size: 0.015,
            height: 0.001,
            curveSegments: 2,

        });

        var uArrow = new THREE.TextGeometry("up arrow key", {

            font: font,

            size: 0.015,
            height: 0.001,
            curveSegments: 2,

        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

        mesh = new THREE.Mesh(restartText, textMaterial);
        mesh.position.z = -1;
        mesh.position.y = 0.17;
        mesh.position.x = -0.15;

        mesh1 = new THREE.Mesh(resumeText, textMaterial);
        mesh1.position.z = -1;
        mesh1.position.y = -0.01;
        mesh1.position.x = -0.15;

        mesh2 = new THREE.Mesh(creditText, textMaterial);
        mesh2.position.z = -1;
        mesh2.position.y = -0.18;
        mesh2.position.x = -0.15;

        mesh3 = new THREE.Mesh(rArrow, textMaterial);
        mesh3.position.z = -1;
        mesh3.position.y = -0.205;
        mesh3.position.x = -0.1;

        mesh4 = new THREE.Mesh(lArrow, textMaterial);
        mesh4.position.z = -1;
        mesh4.position.y = -0.035;
        mesh4.position.x = -0.1;

        mesh5 = new THREE.Mesh(uArrow, textMaterial);
        mesh5.position.z = -1;
        mesh5.position.y = 0.145;
        mesh5.position.x = -0.1;

        camera.add(mesh);
        camera.add(mesh1);
        camera.add(mesh2);
        camera.add(mesh3);
        camera.add(mesh4);
        camera.add(mesh5);
        scene.add(camera);

    });
}

function RemoveCredit(){
    camera.remove(mesh6);
        camera.remove(mesh7);
        camera.remove(mesh8);
        camera.remove(mesh9);
        camera.remove(mesh10);
        camera.remove(mesh11);
        camera.remove(mesh12);
        camera.remove(cback);

        scene.add(camera);
}
function RemovePause(){
        camera.remove(mesh);
        camera.remove(mesh1);
        camera.remove(mesh2);
        camera.remove(mesh3);
        camera.remove(mesh4);
        camera.remove(mesh5);
        camera.remove(back);
        camera.remove(back1);
        camera.remove(back2);
        camera.remove(back3);
        camera.remove(back4);


        scene.add(camera);
}

function AddCredit(){
    cback = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 0.7, 0.001),
        new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
    );
    cback.position.z = -1;
    cback.position.x = -0.05;
    camera.add(cback);
    scene.add(camera);

    let loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        let credit1 = new THREE.TextGeometry("SkyBox images: MegaKosan - https://gamebanana.com/mods/7912", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let credit2 = new THREE.TextGeometry("Threex library: Jerome Etienne - https://github.com/jeromeetienne/threex.domevents", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let credit = new THREE.TextGeometry("Credits", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        let credit3 = new THREE.TextGeometry("Collision dectection: Three.js tutorials by Lee Stemkoski Date: July 2013 (three.js v59dev)", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let credit4 = new THREE.TextGeometry("Gun view: saucecode - https://github.com/saucecode/threejs-demos/tree/master/08_GunView", {

            font: font,

            size: 0.0155,
            height: 0.001,
            curveSegments: 2,

        });

        let credit5 = new THREE.TextGeometry("Main menu background: flowforfrank - https://github.com/flowforfrank/threejs", {

            font: font,

            size: 0.017,
            height: 0.001,
            curveSegments: 2,

        });

        let dArrow = new THREE.TextGeometry("Down arrow to close", {

            font: font,

            size: 0.013,
            height: 0.001,
            curveSegments: 2,

        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

        mesh6 = new THREE.Mesh(credit1, textMaterial);
        mesh6.position.z = -1;
        mesh6.position.y = 0.17;
        mesh6.position.x = -0.5;

        mesh7 = new THREE.Mesh(credit2, textMaterial);
        mesh7.position.z = -1;
        mesh7.position.y = -0.01;
        mesh7.position.x = -0.5;

        mesh8 = new THREE.Mesh(credit, textMaterial);
        mesh8.position.z = -1;
        mesh8.position.y = 0.25;
        mesh8.position.x = -0.15;

        mesh9 = new THREE.Mesh(credit3, textMaterial);
        mesh9.position.z = -1;
        mesh9.position.y = 0.08;
        mesh9.position.x = -0.5;

        mesh10 = new THREE.Mesh(credit4, textMaterial);
        mesh10.position.z = -1;
        mesh10.position.y = -0.105;
        mesh10.position.x = -0.5;

        mesh12 = new THREE.Mesh(credit5, textMaterial);
        mesh12.position.z = -1;
        mesh12.position.y = -0.19;
        mesh12.position.x = -0.5;

        mesh11 = new THREE.Mesh(dArrow, textMaterial);
        mesh11.position.z = -1;
        mesh11.position.y = 0.3;
        mesh11.position.x = 0.25;

        camera.add(mesh6);
        camera.add(mesh7);
        camera.add(mesh8);
        camera.add(mesh9);
        camera.add(mesh10);
        camera.add(mesh11);
        camera.add(mesh12);
        scene.add(camera);

    });
}

/// helper text
var helpText;

var loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        var helperText = new THREE.TextGeometry("Complete all tasks before proceeding to next level", {

            font: font,

            size: 0.02,
            height: 0.001,
            curveSegments: 2,

        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        helpText = new THREE.Mesh(helperText, textMaterial);
        helpText.position.z = -1;
        helpText.position.y = 0.03;
        helpText.position.x = -0.325;


    });

    function ShowHelp(help){
    
        if (help){
            camera.add(helpText);
            scene.add(camera);
        }else{
            camera.remove(helpText);
        scene.add(camera);
        }
        
    }


