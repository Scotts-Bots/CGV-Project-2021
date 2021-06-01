const scene = new THREE.Scene();
intensity = 1;
len = 10;
var unLocked = false;
var shotTagets = false;
var isPlaying = false;
var success = 0;
var lines = [];
var paused = false;
var hitTargets = false;

var wall;
var wall1;
var wall2;
var wall3;

var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100000);
var renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//player hitbox
var cubeGeometry = new THREE.BoxBufferGeometry(200,200,200,3,3,3);
var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:false } );
MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
MovingCube.position.set(0, 0, 0);
setCollisionDetection(cam,MovingCube); //collision detection hitbox added to camera

renderer.setSize(innerWidth, innerHeight);
cam.position.set(2100, 50, 200);
cam.lookAt(2900, 0, 2000);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);//0.05
scene.add(ambientLight);

//back right room
const light9 = new THREE.PointLight(0xffffff, intensity, 2200, 2);
light9.position.set(-100, 375, 2100);
//light9.castShadow = true;
scene.add(light9);


//front right room
const light7 = new THREE.PointLight(0xffffff, intensity, 2500, 2);
light7.position.set(-100, 375, 900);
//light7.castShadow = true;
scene.add(light7);

//passage light
const light5 = new THREE.PointLight(0xffffff, intensity, 800, 2);
light5.position.set(1300, 375, 1500);
//light5.castShadow = true;
scene.add(light5);

//emergency light
const light3 = new THREE.PointLight(0xff0000, 3, 900, 2);
light3.position.set(2000, 200, 1200);
//light3.castShadow = true;
scene.add(light3);

//flourescent light
const light1 = new THREE.PointLight(0xffffff, intensity, 6000, 2);
light1.position.set(2500, 375, 1500);
//light1.castShadow = true;
//light1.shadow.bias = -0.0001;
scene.add(light1);


const room = Room();
room.scale.set(4, 4, 2.5);
room.rotateX(3 * Math.PI / 2);
scene.add(room);

const door = new THREE.Mesh(
    new THREE.BoxBufferGeometry(30, 520, 400),
    new THREE.MeshLambertMaterial({ color: 0x808080 })
);
door.position.set(950, -120, 1800);
if (unLocked == false) {
    scene.add(door);
}

const door1 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(30, 520, 400),
    new THREE.MeshLambertMaterial({ color: 0x808080 })
);
door1.rotateY(Math.PI/2);
door1.position.set(1350, -120, 0);
scene.add(door1);

const box = sky();
box.translateY(14600);
scene.add(box);

var qf = [2000,1,2000,  2000,1,2000,  2000,1,2000]
addReticle(cam, qf);
scene.add(cam);

const ammof = new THREE.Mesh(
    new THREE.BoxBufferGeometry(100, 100, 100),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
ammof.position.set(2100, -50, 200);
ammof.visible = false;
scene.add(ammof);

const switchf = new THREE.Mesh(
    new THREE.BoxBufferGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
switchf.position.set(1000, -10, 1550);
switchf.visible = false;
scene.add(switchf);

const switchf2 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
switchf2.position.set(1000, -10, 200);
switchf2.visible = false;
scene.add(switchf2);

const gunf = new THREE.Mesh(
    new THREE.BoxBufferGeometry(150, 150, 150),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
);
gunf.position.set(-900, -120, 2600);
gunf.visible = false;
scene.add(gunf);



var bedLight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Flourescent Light/F Light.gltf' , function (gltf)  {
    bedLight = gltf.scene;
    bedLight.scale.set(175,175,200);
    bedLight.position.set(2150, 150, 1800);
    scene.add(bedLight);
});
var ELight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Warning Light/W Light.gltf' , function (gltf)  {
    ELight = gltf.scene;
    ELight.scale.set(40,20,40);
    ELight.rotation.z = 3*Math.PI/2;
    ELight.position.set(1780, 240, 1200);
    scene.add(ELight);
});

var hLight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Flourescent Light/F Light.gltf' , function (gltf)  {
    hLight = gltf.scene;
    hLight.scale.set(175,175,200);
    hLight.position.set(1200, 150, 1800);
    scene.add(hLight);
});

var frLight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Flourescent Light/F Light.gltf' , function (gltf)  {
    frLight = gltf.scene;
    frLight.scale.set(175,175,200);
    frLight.position.set(50, 150, 1300);
    scene.add(frLight);
});

var brLight = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/LIghts/Flourescent Light/F Light.gltf' , function (gltf)  {
    brLight = gltf.scene;
    brLight.scale.set(175,175,200);
    brLight.position.set(50, 150, 2600);
    scene.add(brLight);
});

var Ammo = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Ammo Box/AmmoBox.gltf' , function (gltf)  {
    Ammo = gltf.scene;
    Ammo.scale.set(20,20,20);
    Ammo.position.set(2100, -100, 200);
    scene.add(Ammo);
});

const domEvent2 = new THREEx.DomEvents(cam,  renderer.domElement);

domEvent2.addEventListener(ammof, 'dblclick', event =>{
    scene.remove(Ammo);//must remove object
    Player.incAmmo();
});

var lswitch = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Switch/Switch.gltf' , function (gltf)  {
    lswitch = gltf.scene;
    lswitch.scale.set(200,200,200);
    lswitch.position.set(800, -200, 1750);
    scene.add(lswitch);
});

const domEvent1 = new THREEx.DomEvents(cam, renderer.domElement);

domEvent1.addEventListener(switchf, 'dblclick', event => {
    isPlaying = true;
    playgame();
});

var lswitch2 = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Switch/Switch.gltf' , function (gltf)  {
    lswitch2 = gltf.scene;
    lswitch2.scale.set(200,200,200);
    lswitch2.position.set(800, -200, 400);
    scene.add(lswitch2);
});

const domEvent3 = new THREEx.DomEvents(cam, renderer.domElement);

domEvent3.addEventListener(switchf2, 'dblclick', event => {
    if(success>=10 && unLocked == true && Player.checkGun() != false && Player.getAmmo() > 0){
        window.location.href = "level2.html";
    }
});

var pgun = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/GunModel/Gun Model.gltf' , function (gltf)  {
    pgun = gltf.scene;
    pgun.scale.set(175,175,175);
    pgun.rotation.z = (Math.PI/2);
    pgun.position.set(-900, -170, 2600);
    scene.add(pgun);
});

const domEvent4 = new THREEx.DomEvents(cam, renderer.domElement);

domEvent4.addEventListener(gunf, 'dblclick', event => {
    scene.remove(pgun);
    Player.pickUpGun();
});

var bTable = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/table/Table.gltf' , function (gltf)  {
    bTable = gltf.scene;
    bTable.scale.set(175,200,175);
    bTable.rotation.y = (Math.PI/2);
    bTable.position.set(2150, -400, 250);
    scene.add(bTable);
});

var bChair = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/chair/Chair.gltf' , function (gltf)  {
    bChair = gltf.scene;
    bChair.scale.set(175,200,175);
    bChair.rotation.y = (Math.PI/2);
    bChair.position.set(2050, -370, 300);
    scene.add(bChair);
});

var Table = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/table/Table.gltf' , function (gltf)  {
    Table = gltf.scene;
    Table.scale.set(175,155,500);
    Table.position.set(-900, -400, 2800);
    scene.add(Table);
});

var Chair = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 2/chair/Chair.gltf' , function (gltf)  {
    Chair = gltf.scene;
    Chair.scale.set(175,140,175);
    Chair.position.set(-900, -370, 2600);
    scene.add(Chair);
});

var mScope = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 1/Microscope/Microscope.gltf' , function (gltf)  {
    mScope = gltf.scene;
    mScope.scale.set(50,50,50);
    mScope.rotation.y = (Math.PI/2);
    mScope.position.set(-900, -170, 2300);
    scene.add(mScope);
});
var mScope1 = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 1/Microscope/Microscope.gltf' , function (gltf)  {
    mScope1 = gltf.scene;
    mScope1.scale.set(50,50,50);
    mScope1.rotation.y = (Math.PI/2);
    mScope1.position.set(-900, -170, 2100);
    scene.add(mScope1);
});
var mScope2 = new THREE.Mesh();
new THREE.GLTFLoader().load('Blender Models/Level 1/Microscope/Microscope.gltf' , function (gltf)  {
    mScope2 = gltf.scene;
    mScope2.scale.set(50,50,50);
    mScope2.rotation.y = (Math.PI/2);
    mScope2.position.set(-900, -170, 1900);
    scene.add(mScope2);
});

HUD();


document.body.appendChild(renderer.domElement);

// function onMouseMove( event ) {
// 	const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
// 				const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

// 				_euler.setFromQuaternion( cam.quaternion );

// 				_euler.y -= movementX * 0.02;
// 				_euler.x -= movementY * 0.02;
// 				_euler.x = Math.max(Math.PI / 2 - 3.141592653589793, Math.min(Math.PI / 2 - 0, _euler.x ) );
// 				cam.quaternion.setFromEuler( _euler );

// }

const speedDefault = 7;
var speedW = 10, speedA = 10, speedS = 10, speedD = 10;
let controls = new THREE.PointerLockControls(cam, renderer.domElement);
var lastKeyPressed;
let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', () => {
    controls.lock();
});

let keyboard = [];
addEventListener('keydown', (e) => {
    keyboard[e.key] = true;
});
addEventListener('keyup', (e) => {
    keyboard[e.key] = false;
});

function processKeyboard() {
    if (keyboard['w']) {
        if (isPlaying == true){
            EndGame();
        }
        controls.moveForward(speedW);
    }
    else if (keyboard['a']) {
        if (isPlaying == true){
            EndGame();
        }
        controls.moveRight(-speedA);
    }
    else if (keyboard['s']) {
        if (isPlaying == true){
            EndGame();
        }
        controls.moveForward(-speedS);
    }
    else if (keyboard['d']) {
        if (isPlaying == true){
            EndGame();
        }
        controls.moveRight(speedD);
    }
    else if (keyboard['r']) {
        controls.lock();
    }
}

function drawScene() {

    if (isPlaying == true) {
        RemoveHUD();
        ran = Math.floor(Math.random() * 20);
        if (ran == 2) {

            if (lines.length < 4) {
                let line = new Line();
                cam.add(line);
                scene.add(cam);
                lines.push(line);
            }
        }
        for (i = 0; i < lines.length; i++) {
            lines[i].position.x -= 0.01;
            if (lines[i].position.x < -1.55) {
                cam.remove(lines[i]);
                lines.splice(0, i);
            }
        }

        if (success > 10) {
            EndGame();
            unLocked = true;
        }
    }else if(paused == true){
    }else{
        // if (len == 0) {
        //     len = Math.floor(Math.random() * 10);
        //     ran = Math.floor(Math.random() * 6);
        //     if (ran == 2) {
        //         intensity = 0.3;
        //         light1.intensity = intensity;
        //         light5.intensity = intensity;
        //         light7.intensity = intensity;
        //         light9.intensity = intensity;
        //     } else {
        //         intensity = 1;
        //         light1.intensity = intensity;
        //         light5.intensity = intensity;
        //         light7.intensity = intensity;
        //         light9.intensity = intensity;
        //     }
        // } else {
        //     len = len - 1;
        // }
    
        if (unLocked == true) {
            scene.remove(door);
        }
        
        HUD();
        
    }

    
    renderer.render(scene, cam);
    checkCollision(cam,updateKeyboard,MovingCube);
    processKeyboard();
    requestAnimationFrame(drawScene);
}

function updateKeyboard(isCollision){
    if (isCollision) {
        appendText(" Hit ");
        switch (lastKeyPressed) {
            case "w":
                speedW = 0;
                break;
            case "a":
                speedA = 0;
                break;
            case "s":
                speedS = 0;
                break;
            case "d":
                speedD = 0;
                break;
        }
    } else {
        speedA = speedDefault;
        speedW = speedDefault;
        speedS = speedDefault;
        speedD = speedDefault;
    }
}

function EndGame() {
    if (lines.length > 0) {
        for (i = 0; i < lines.length; i++) {
            cam.remove(lines[i]);
        }
        for (i = 0; i < lines.length; i++) {
            lines.splice(0, i);
        }
    }
    ambientLight.intensity = 0.05;
    cam.remove(wall);
    cam.remove(wall1);
    cam.remove(wall2);
    cam.remove(wall3);
    isPlaying = false;
}

function playgame(){
    ambientLight.intensity = 1;
    wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3.8, 1.8, 5),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    wall.position.z = -5
    wall.position.x = -0.05;
    cam.add(wall);
    scene.add(cam);
    
    wall1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3.6, 1.6, 5),
        new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
    );
    wall1.position.z = -5;
    wall1.position.x = -0.05;
    cam.add(wall1);
    scene.add(cam);
    
    wall2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(3, 0.1, 5),
        new THREE.MeshLambertMaterial({ color: 0x000000 })
    );
    wall2.position.z = -5;
    wall2.position.x = -0.05;
    cam.add(wall2);
    scene.add(cam);
    
    wall3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.1, 0.1, 5),
        new THREE.MeshLambertMaterial({ color: 0xff0000 })
    );
    wall3.position.z = -5;
    wall3.position.x = -1;
    cam.add(wall3);
    scene.add(cam);
}


//window.addEventListener( 'mousemove', onMouseMove, false );

drawScene();

function Line() {
    const wall4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.02, 0.1, 5),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    wall4.position.z = -5;
    wall4.position.x = 1.45;

    return wall4;
}

document.addEventListener('keydown', event => {
    if (event.code === "Space") {
        if (lines.length > 0){
            line = lines[0];
            if (line.position.x<-0.93 && line.position.x>-1.052){
                success++;
            }
            cam.remove(lines[0]);
            lines.shift();
        }
    }
});

// const finder = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(200,200,200),
//     new THREE.MeshLambertMaterial({color: 0xffffff})
// );
// finder.position.set(2500,25,1500);
// scene.add(finder);

function HUD() {

    let check = document.getElementById("Hbar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("helper");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Q");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("torch");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("ammo");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Name");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
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
    check = document.getElementById("gun");
    if (check != null) {
        check.parentNode.removeChild(check);
    }

    var Name = document.createElement('div');
    Name.id = "Name";
    Name.style.position = 'absolute';
    Name.style.color = "white";
    Name.style.fontSize = "25px";
    Name.style.letterSpacing = "2px";
    Name.style.fontFamily = "Helvetica";
    Name.style.width = 200;
    Name.style.height = 500;
    Name.innerHTML = Player.getName();
    Name.style.top = 70 + 'px';
    Name.style.left = 70 + 'px';

    var Hbar = document.createElement('progress');
    Hbar.id = "Hbar";
    Hbar.style.position = 'absolute';
    Hbar.value = Player.getHealth();
    Hbar.max = 100;
    Hbar.style.top = 100 + 'px';
    Hbar.style.left = 75 + 'px';
    Hbar.style.backgroundColor = 'green';

    var task = document.createElement('div');
    task.id = "task";
    task.style.position = 'absolute';
    task.style.color = "white";
    task.style.fontSize = "20px";
    task.style.letterSpacing = "2px";
    task.style.fontFamily = "Helvetica";
    task.style.width = 200;
    task.style.height = 500;
    task.innerHTML = "Task(s)";
    task.style.top = 200 + 'px';
    task.style.left = 70 + 'px';

    var task1 = document.createElement('div');
    task1.id = "task1";
    task1.style.position = 'absolute';
    task1.style.color = "white";
    task1.style.fontSize = "20px";
    task1.style.letterSpacing = "2px";
    task1.style.fontFamily = "Helvetica";
    task1.style.width = 200;
    task1.style.height = 500;
    task1.innerHTML = "> Pick up Gun and ammo";
    task1.style.top = 230 + 'px';
    task1.style.left = 70 + 'px';

    var task2 = document.createElement('div');
    task2.id = "task2";
    task2.style.position = 'absolute';
    task2.style.color = "white";
    task2.style.fontSize = "20px";
    task2.style.letterSpacing = "2px";
    task2.style.fontFamily = "Helvetica";
    task2.style.width = 200;
    task2.style.height = 500;
    task2.innerHTML = "> Unlock Door";
    task2.style.top = 260 + 'px';
    task2.style.left = 70 + 'px';

    var task3 = document.createElement('div');
    task3.id = "task3";
    task3.style.position = 'absolute';
    task3.style.color = "white";
    task3.style.fontSize = "20px";
    task3.style.letterSpacing = "2px";
    task3.style.fontFamily = "Helvetica";
    task3.style.width = 200;
    task3.style.height = 500;
    task3.innerHTML = "> Shoot Targets";
    task3.style.top = 290 + 'px';
    task3.style.left = 70 + 'px';

    var ammo = document.createElement('div');
    ammo.id = "ammo"
    ammo.style.position = 'absolute';
    ammo.style.color = "white";
    ammo.style.fontSize = "20px";
    ammo.style.letterSpacing = "2px";
    ammo.style.fontFamily = "Helvetica";
    ammo.style.width = 200;
    ammo.style.height = 500;
    ammo.innerHTML = "Ammo: " + Player.getAmmo();
    ammo.style.top = 750 + 'px';
    ammo.style.left = 2200 + 'px';

    var torch = document.createElement("img");
    torch.id = "torch";
    torch.style.position = 'absolute';
    torch.src = "Images/torch.png";
    torch.style.top = 850 + 'px';
    torch.style.left = 2100 + 'px';
    torch.width = 80;

    var gun = document.createElement("img");
    gun.id = "gun";
    gun.style.position = 'absolute';
    gun.src = "Images/gun.jpg";
    gun.style.top = 850 + 'px';
    gun.style.left = 2230 + 'px';
    gun.width = 85;

    var helper = document.createElement('div');
    helper.id = "helper";
    helper.style.position = 'absolute';
    helper.style.color = "white";
    helper.style.fontSize = "15px";
    helper.style.letterSpacing = "2px";
    helper.style.fontFamily = "Helvetica";
    helper.style.width = 1500;
    helper.style.height = 700;
    helper.innerHTML = "To aim center the mouse on the reticle and press r, Shoot - single click,    Interact - double click,         Movement - WASD           PAUSE - P";
    helper.style.top = 40 + 'px';
    helper.style.left = 500 + 'px';

    var Q = document.createElement('div');
    Q.id ="Q";
    Q.style.position = 'absolute';
    Q.style.color = "white";
    Q.style.fontSize = "20px";
    Q.style.letterSpacing = "2px";
    Q.style.fontFamily = "Helvetica";
    Q.style.width = 200;
    Q.style.height = 500;
    Q.innerHTML = "Q";
    Q.style.top = 820 + 'px';
    Q.style.left = 2130 + 'px';


    document.body.appendChild(Hbar);
    document.body.appendChild(Name);
    document.body.appendChild(task);
    document.body.appendChild(ammo);
    document.body.appendChild(torch);
    document.body.appendChild(Q);
    document.body.appendChild(helper);
    if (Player.checkGun() == false || Player.getAmmo() == 0) {
        document.body.appendChild(task1);
    }
    if (Player.checkGun() != false && Player.getAmmo() > 0) {
        document.body.appendChild(gun);
    }
    if (unLocked == false) {
        document.body.appendChild(task2);
    }
    if (shotTagets == false) {
        document.body.appendChild(task3);
    }

}

function RemoveHUD(){
    check = document.getElementById("Hbar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("helper");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Q");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("torch");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("ammo");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Name");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
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
    check = document.getElementById("gun");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
}