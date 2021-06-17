//LEVEL 2//

//creating a scene
const scene = new THREE.Scene();

//////////////////////View settings - pick which camera////////////////////////////
var play = true; //MANUAL CHOICE!

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 3500;
const cameraHeight = cameraWidth / aspectRatio;
var camera;
//function to switch between different cameras for editing purposes
setCamera(play);
///////////////////////////////////////////////////////////////////////////////////

//adding music to the level
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('Sounds/Atmosphere inside.wav', function(buffer){
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
})

//player hit box
var cubeGeometry = new THREE.BoxBufferGeometry(100,100,100,3,3,3);
var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:false } );
MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
MovingCube.position.set(0, 0, 0);
//setting collision detection to camera which is the player
setCollisionDetection(camera,MovingCube); 

//variables to determine if the keycard is found
var keycard; 
var found = false;
var swipePad;

//keycard gameplay data
var kswipePadPopup;
var keycardPopup;
var keycardf;
var kswipePadf;
var helpCounter = 0;

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
const box = skyBox();
box.translateY(14700);
box.scale.set(0.5,0.5,0.5);
scene.add(box);

//LIGHTING
var ambientLight;
sceneLights(); 

//event for shooting
window.addEventListener( 'mousedown', Attack, false );

function Attack(){
    if (Player.getAmmo()>0 && Player.checkGun() == true){
        Player.decAmmo();
    }
}

//setting camera for pause menu
pauseCam = camera;

//setting up renderer
const renderer = new THREE.WebGL1Renderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//loading blender models
var gltfLoader = new THREE.GLTFLoader();
loadAssets();   

//reticle and HUD
var qf = [1,1,1,  1,1,1,  1,1,1];
addReticle(camera,qf);
scene.add(camera);
HUD();
Tasks();

//keyboard and mouse controls
var controls = new THREE.PointerLockControls(camera, renderer.domElement);
var clock = new THREE.Clock();

//ACTION!
drawScene();

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

function drawScene(){
    renderer.render(scene,camera);
    //This function is called to check if there is a collision at each frame and how to react appropriately.
    checkCollision(camera,updateKeyboard,MovingCube);

    //help prompts
    if (helpCounter == 0){
        ShowHelp(false,camera);
    }else{
        helpCounter-=1;
    }
    //collectable indicator
    keycardPopup.rotation.y +=0.02;
    kswipePadPopup.rotation.y +=0.02;
    checkPopUps();

    //Functions for keyboard controls, and displaying the HUD and Tasks in each frame.
    processKeyboard();
    HUD();
    Tasks();
    requestAnimationFrame(drawScene);
}

function checkPopUps(){
    var camposition = new THREE.Vector3();
    camposition.setFromMatrixPosition( camera.matrixWorld );
    x = camposition.x;
    y = camposition.z;

    //finder object
    var finderposition = new THREE.Vector3();
    finderposition.setFromMatrixPosition( keycardf.matrixWorld );
    fx = finderposition.x;
    fy = finderposition.z;
    if (Math.sqrt(Math.pow((x-fx),2) + Math.pow((y-fy),2)) <700){
        keycardPopup.visible = true;
    }else{
        keycardPopup.visible = false;
    }

    var finderposition = new THREE.Vector3();
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

//all the lights in the scene
function sceneLights() {
    //adding ambient light
    ambientLight = new THREE.AmbientLight(0xffffff, 0);
    scene.add(ambientLight);

    //light 1
    var pointLight1 = new THREE.PointLight( 0xffffff, 1, 2000, 3);
    pointLight1.position.set(-100,700,-200);
    //pointLight1.castShadow = true; // default false
    scene.add(pointLight1);

    //light 2
    var pointLight2 = new THREE.PointLight( 0xffffff, 1, 3000, 2);
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

    //red light 1
    var pointLight3 = new THREE.PointLight( 0xff0000, 1, 4000, 3);
    pointLight3.position.set(-2050,100,-1050);
    //pointLight3.castShadow = true; // default false
    scene.add(pointLight3);

    //red light 2
    var pointLight3 = new THREE.PointLight( 0xff0000, 1, 4000, 3);
    pointLight3.position.set(-2050,100,-1050);
    //pointLight3.castShadow = true; // default false
    scene.add(pointLight3);
}

/* These are functions used to load multiple of the same types of blender models.
p - position (px,py,pz)
ry - rotation about y-axis, rx, rz
s - scale factor (sx,sy,sz)*/

//ceiling light blender model
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

//red emergency light
function RedLight(px,py,pz,ry) {
    var warningLight = new THREE.Mesh();
    gltfLoader.load('Blender Models/LIghts/Warning Light/W Light.gltf' , function (gltf)  {
        warningLight = gltf.scene;
        warningLight.scale.set(50,-50,50);
        warningLight.position.set(px,py,pz);
        warningLight.rotateY(ry);
        scene.add(warningLight);
    });
    return warningLight;
}

//shelf blender model
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

//rotated shelf blender model
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

//toolbox blender model
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

//ladder blender model
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

//table blender model
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

//chair blender model
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

//green hovering pyramid indicator
function hoveringIndicator(px,py,pz,rz){
    var geometry = new THREE.ConeGeometry( 20, 20, 4 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff99} );

    var popup = new THREE.Mesh( geometry, material );
    popup.position.set(px,py,pz);
    popup.rotateZ(rz);

    return popup;
}

//ADDING ALL THE BLENDER MODELS INTO THE SCENE
function loadAssets(){
    
    //the player's gun attached to camera
    var pistol = new THREE.Mesh();
    gltfLoader.load('Blender Models/GunModel/Gun Model.gltf' , function (gltf)  {
        pistol = gltf.scene;
        pistol.scale.set(3, 4, 4);
        pistol.rotation.y = Math.PI;
        pistol.position.z = -4;
        pistol.position.x = 2;
        pistol.position.y = -1;
        camera.add(pistol)
        scene.add(camera);
    });

    //red light in the corner of side room
    var warningLight1 = RedLight(-2180,300,-1080,0);

    //ceiling lights
    var ceilingLight1 = CeilingLight(-100,850,-1800,0);
    var ceilingLight2 = CeilingLight(-100,850,-200,0);

    //swipe pad next to exit door
    swipePad = new THREE.Mesh();
    gltfLoader.load('Blender Models/keycard/swipepad.gltf' , function (gltf)  {
        swipePad = gltf.scene;
        swipePad.scale.set(50,50,50);
        swipePad.rotateX(Math.PI/2);
        swipePad.rotateY(-Math.PI/2);
        swipePad.position.set(600,50,-3715);
        scene.add(swipePad);
    })

    //invisible box that determines whether the player is in range of the keycard swipe pad
    //and shows green pop-up if player within range
    kswipePadf = new THREE.Mesh(
        new THREE.BoxBufferGeometry(50, 50, 50),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    kswipePadf.position.set(600,50,-3715);
    kswipePadf.visible = false;
    scene.add(kswipePadf);

    //green pop-up for swipe pad
    kswipePadPopup = hoveringIndicator(600,90,-3715,Math.PI);
    scene.add(kswipePadPopup);

    //This event listener decides what to do when the player interacts with keycard swipe pad
    var domEvent3 = new THREEx.DomEvents(camera,  renderer.domElement);
    domEvent3.addEventListener(kswipePadf, 'dblclick', event =>{
        //move to next level if key card is in possession
        if (found) {
            window.location.href = "level3.html";
        //provide text hint if key card not in possession
        } else {
            ShowHelp(true,camera);
            helpCounter = 60;
        }
    });

    //randomise keycard locations
    var keycardLocs = [[-830,-130,-200],[800, -135, -750],[800, -135, 830]];
    var keyCardLoc = keycardLocs[Math.floor(Math.random() * keycardLocs.length)];

    //key card object
    keycard = new THREE.Mesh();
    gltfLoader.load('Blender Models/keycard/keycard.gltf' , function (gltf)  {
        keycard = gltf.scene;
        keycard.scale.set(200,150,200);
        keycard.position.set(keyCardLoc[0],keyCardLoc[1],keyCardLoc[2]);
        scene.add(keycard);
    })

    //invisible detection box for keycard
    keycardf = new THREE.Mesh(
        new THREE.BoxBufferGeometry(50, 50, 50),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    keycardf.position.set(keyCardLoc[0],keyCardLoc[1],keyCardLoc[2]);
    keycardf.visible = false;
    scene.add(keycardf);

    //green pop-up for keycard
    keycardPopup = hoveringIndicator(keyCardLoc[0],keyCardLoc[1]+40,keyCardLoc[2],Math.PI);
    scene.add(keycardPopup);

    //This event listener decides what to do when the player interacts with keycard
    var domEvent2 = new THREEx.DomEvents(camera,  renderer.domElement);
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

//generic floor mesh
function Floor() {
    var floor = new THREE.Mesh(
        new THREE.BoxBufferGeometry(200, 100, 200),
        materialimg
    );
    floor.receiveShadow = true;
    return floor;
}

//generic wall mesh
function Wall() {
    var wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(100, 800, 60),
             materialimg
    );
    wall.receiveShadow = true;
    wall.castShadow = true;
    collidableMeshList.push(wall); //add wall to objects that affect collision detection
    return wall;
}

//transparent box for window
function Window(x, y, z) {
    var window = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.5})
    );
    collidableMeshList.push(window); //add window to objects that affect collision detection
    return window;
}

//wall with a single window
function WindowedWall() {
    var windowedWall = new THREE.Group();
    var wallHeight = 0;

    var leftWall = Wall();
    leftWall.scale.set(13,1,1);
    leftWall.position.set(-950,wallHeight,0);
    windowedWall.add(leftWall);

    var rightWall = Wall();
    rightWall.scale.set(2,1,1);
    rightWall.position.set(400,wallHeight,0);
    windowedWall.add(rightWall);

    var topWall = Wall();
    topWall.scale.set(1,0.75,1);
    topWall.rotateZ(Math.PI/2);
    topWall.position.set(0,350 + wallHeight,0);
    windowedWall.add(topWall);

    var bottomWall = Wall();
    bottomWall.scale.set(4,0.75,1);
    bottomWall.rotateZ(Math.PI/2);
    bottomWall.position.set(0,-200 + wallHeight,0);
    windowedWall.add(bottomWall);

    return windowedWall;
}

//Room unit that gets repeated multiple times
function RoomPart() {
    var roomPart = new THREE.Group();

    //walls 2 - 6
    var w2 = Wall();
    w2.scale.set(5,3,1);
    w2.rotateY(Math.PI/2);
    w2.position.set(820,200,600);
    roomPart.add(w2);

    var w6 = Wall();
    w6.scale.set(5,3,1);
    w6.rotateY(Math.PI/2);
    w6.position.set(820,200,-600);
    roomPart.add(w6);

    var w5 = Wall();
    w5.scale.set(5,3,1);
    w5.position.set(725,200,-325);
    roomPart.add(w5);

    var w3 = Wall();
    w3.scale.set(5,3,1);
    w3.position.set(725,200,325);
    roomPart.add(w3);

    var w4 = Wall();
    w4.scale.set(7.5,3,1);
    w4.rotateY(Math.PI/2);
    w4.position.set(452,200,0);
    roomPart.add(w4);

    return roomPart;
}

//Entire room of level
function Room() {
    var room = new THREE.Group();

    //SUB ROOMS
    var roomPart1 = RoomPart();
    room.add(roomPart1);

    var roomPart3 = RoomPart();
    roomPart3.position.set(400,0,-1650);
    room.add(roomPart3);

    //FLOOR
    var f = Floor();
    f.scale.set(15,1,18);
    f.position.set(-200,0,-800);
    room.add(f);
    
    //WALLS
    //walls 1,7
    var w1 = Wall();
    w1.scale.set(25,3,1);
    w1.position.set(-450,200,810);
    room.add(w1);

    var w7 = Wall();
    w7.scale.set(12,3,1);
    w7.position.set(-1100,200,-825);
    room.add(w7);

    //walls 10,13,3r
    // var w10 = Wall();
    // w10.scale.set(9,1,1);
    // w10.rotateY(Math.PI/2);
    // w10.position.set(-1700,200,400);
    // room.add(w10);

    var w13 = Wall();
    w13.scale.set(2.5,3,1);
    w13.rotateY(Math.PI/2);
    w13.position.set(-500,200,755);
    room.add(w13);

    var w3r = Wall();
    w3r.scale.set(4,3,1);
    w3r.position.set(1035,200,-800);
    room.add(w3r);

    //walls with windows
    var w9 = WindowedWall();
    w9.scale.set(0.8,1,1);
    w9.rotateY(Math.PI/2);
    w9.position.set(-1700,200,-450);
    room.add(w9);

    var window9 = Window(480,300,50);
    window9.rotateY(Math.PI/2);
    window9.position.set(-1700,350,-450);
    room.add(window9);

    var rightWall = Wall();
    rightWall.scale.set(29,3,0.5);
    rightWall.rotateY(Math.PI/2);
    rightWall.position.set(-500,200,-1050);
    room.add(rightWall);

    var w14r = Wall();
    w14r.scale.set(2.3,1.3,0.5);
    w14r.rotateY(Math.PI/2);
    w14r.position.set(-500,900,515);
    room.add(w14r);

    //end of level wall
    var w20 = Wall();
    w20.scale.set(11,3,1);
    w20.position.set(-400,200,-2510);
    room.add(w20);

    var w21 = Wall();
    w21.scale.set(11,3,1);
    w21.position.set(1000,200,-2510);
    room.add(w21);

    var w22 = Wall();
    w22.scale.set(3,2,1);
    w22.position.set(300,1300,-2550);
    room.add(w22);

    var door = Wall();
    door.scale.set(3,1,1);
    door.position.set(300,100,-2530);
    room.add(door);

    //CEILING
    //c - ceiling
    var c1 = Floor();
    c1.scale.set(6,1,9);
    c1.position.set(-1100,650,0);
    room.add(c1);

    var c2 = Floor();
    c2.scale.set(10,1,18);
    c2.position.set(300,1400,-800);
    room.add(c2);
        
    return room;
}




