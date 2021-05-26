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

function Wall(x, y, z) {
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    return wall;
}

/*function sky(){
    const materialArray = [];
    const texture_ft = new THREE.TextureLoader().load('Images/marslike01ft2.jpg');
    const texture_bk = new THREE.TextureLoader().load('Images/marslike01bk2.jpg');
    const texture_up = new THREE.TextureLoader().load('Images/marslike01up.jpg');
    const texture_dn = new THREE.TextureLoader().load('Images/marslike01dn1.jpg');
    const texture_rt = new THREE.TextureLoader().load('Images/marslike01rt1.jpg');
    const texture_lt = new THREE.TextureLoader().load('Images/marslike01lf1.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({map : texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_lt}));

    for (let i = 0; i < 6; i++){
        materialArray[i].side = THREE.BackSide;
    }
           

    const skyBoxGeo = new THREE.BoxGeometry(100000,30000,100000);
    const skyBox = new THREE.Mesh(skyBoxGeo,materialArray);

    return skyBox
}

function Room() {

    // D - DOOR     | - WALL
    //               [b1]                  [b12]              [b2]
    // ||||||||||||||||||||||||||||||||||||D D D|||||||||||||||||||||||||
    // |                            |                 |                 |   
    // |                            |[b7]             |[b11]            |
    // |[b3]                        |                 |                 |
    // |                            D                 D                 |
    // |                            D[b78]            D[b1112]          |
    // |                            D                 D                 |
    // |            [b4]            |[b8]             |                 | 
    // ||||||||||||||||||||||||||||||                 |                 |[b6]
    // |                            |[b9]             |                 | 
    // |                            D                 |                 |
    // |                            D[b910]           |[b_12]           |
    // |                            D                 |                 |
    // |[b3]                        |                 |                 |
    // |                            |[b10]            |                 |
    // |                            |                 |                 |
    // ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||  
    //               [b5]                   [b5]              [b5]       

    const room = new THREE.Group();

    const b1 = Wall(553, 25, 300);
    const b12 = Wall(100, 25, 100);
    const b2 = Wall(450, 25, 300);
    const b3 = Wall(750, 25, 300);
    const fl = Wall(775, 1100, 10);
    const b4 = Wall(500, 25, 300);
    const b5 = Wall(1100, 25, 300);
    const b6 = Wall(750, 25, 300);
    const b7 = Wall(240, 25, 300);
    const b78 = Wall(100, 25, 100);
    const b8 = Wall(30, 25, 300);
    const b9 = Wall(30, 25, 300);
    const b910 = Wall(100, 25, 100);
    const b10 = Wall(240, 25, 300);
    const b11 = Wall(240, 25, 300);
    const b1112 = Wall(100, 25, 100);
    const b_12 = Wall(410, 25, 300);

    b1.translateX(10);
    b3.rotateZ(Math.PI / 2);
    b12.translateX(335);
    b12.translateZ(100);
    b2.translateX(610);
    b3.translateX(-387);
    b3.translateY(252.5);
    fl.translateZ(-155);
    fl.rotateZ(Math.PI / 2);
    fl.translateX(-375);
    fl.translateY(-280);
    b4.translateY(-375);
    b5.translateY(-750);
    b5.translateX(290);
    b6.rotateZ(Math.PI / 2);
    b6.translateY(-825);
    b6.translateX(-364);
    b7.rotateZ(Math.PI / 2);
    b7.translateY(-237);
    b7.translateX(-130);
    b78.rotateZ(Math.PI / 2);
    b78.translateY(-237);
    b78.translateX(-300);
    b78.translateZ(100);
    b8.rotateZ(Math.PI / 2);
    b8.translateY(-237);
    b8.translateX(-360);
    b9.rotateZ(Math.PI / 2);
    b9.translateY(-237);
    b9.translateX(-400);
    b910.rotateZ(Math.PI / 2);
    b910.translateY(-237);
    b910.translateX(-460);
    b910.translateZ(100);
    b10.rotateZ(Math.PI / 2);
    b10.translateY(-237);
    b10.translateX(-630);
    b11.rotateZ(Math.PI / 2);
    b11.translateY(-430);
    b11.translateX(-130);
    b1112.rotateZ(Math.PI / 2);
    b1112.translateY(-430);
    b1112.translateX(-300);
    b1112.translateZ(100);
    b_12.rotateZ(Math.PI / 2);
    b_12.translateY(-430);
    b_12.translateX(-550);

    room.add(b3);
    room.add(b1);
    room.add(b2);
    room.add(b12);
    room.add(fl);
    room.add(b4);
    room.add(b5);
    room.add(b6);
    room.add(b7);
    room.add(b78);
    room.add(b8);
    room.add(b9);
    room.add(b910);
    room.add(b10);
    room.add(b11);
    room.add(b1112);
    room.add(b_12);

    return room;

}*/

function drawScene(){
    renderer.render(scene, cam);
    processKeyboard();
    requestAnimationFrame(drawScene);
}

drawScene();