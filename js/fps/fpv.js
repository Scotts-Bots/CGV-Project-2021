const scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 1, 100);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;

scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
cam.position.z = 5;
cam.position.y = 2;
document.body.appendChild(renderer.domElement);
var directionalLight = new THREE.PointLight();
directionalLight.position.set(3, 3, 3);
directionalLight.castShadow = true;
directionalLight.shadow.radius = 8;
scene.add(directionalLight);
// var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

var groundMaterial = new THREE.MeshStandardMaterial();

 var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), groundMaterial );
 mesh.position.y = 0.0;
 mesh.rotation.x = - Math.PI / 2;
 mesh.castShadow = true;
 mesh.receiveShadow = true;
 scene.add( mesh );

let grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);
scene.add(grid);

let bGeo = new THREE.BoxGeometry(1, 1, 1);
let bMat = new THREE.MeshStandardMaterial({color: 0x00ff00, wireframe: false});
let cube = new THREE.Mesh(bGeo, bMat);
cube.castShadow = true;
cube.receiveShadow = true;
//scene.add(cube);
scene.updateMatrixWorld(true);
var position = new THREE.Vector3();

position.setFromMatrixPosition(cube.matrixWorld);
//alert(position.x + ", " + position.y + ", " + position.z);

new THREE.GLTFLoader().load('Blender Models/Level 2/Shelf/Shelf.gltf' , result =>  {
    model = result.scene;//result.scene.children[0]
    let stand = new THREE.Mesh(result.scene);
    stand.traverse(function (node) {
        if (node instanceof THREE.Mesh){
            node.castShadow = true;
        }
    });
    model.traverse(function (node){
        if (node instanceof THREE.Mesh){
            node.castShadow = true;
            node.receiveShadow = true;
        }
    });
    scene.add(model);
    //drawScene();
    /*model.traaverse(n=> {
        if(n.isMesh){
            n.castShadow = true;
            n.recieve = true;
        }
    }*/ 
});

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
    var speed = 0.1;
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