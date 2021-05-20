const scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 1, 100);
var renderer = new THREE.WebGLRenderer({antialias: true});

scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
cam.position.z = 5;
cam.position.y = 0;
document.body.appendChild(renderer.domElement);
var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

let grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
grid.position.set(0, -0.5, 0);
scene.add(grid);

let bGeo = new THREE.BoxGeometry(1, 1, 1);
let bMat = new THREE.MeshStandardMaterial({color: 0x00ff00, wireframe: false});
let cube = new THREE.Mesh(bGeo, bMat);
scene.add(cube);

let controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock()

function drawScene(){
    renderer.render(scene, cam);
    requestAnimationFrame(drawScene);
}

drawScene();