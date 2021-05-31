const scene = new THREE.Scene();

scene.background = new THREE.Color(0x0000ff);

var isPlaying = false;
var success = 0;

var lines = [];

var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100000);
var renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(innerWidth, innerHeight);
cam.position.set(2100, 50, 200);
cam.lookAt(2900, 0, 2000);

var ambientLight = new THREE.AmbientLight(0xffffff, 1);//0.05
scene.add(ambientLight);
//adding directional light
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(100, 300, 300);
//scene.add(dirLight);

var cback = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 0.7, 0.001),
    new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
);
cback.position.z = -1;
cback.position.x = -0.05;
cam.add(cback);
scene.add(cam);

var loader = new THREE.FontLoader();

loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

    var credit1 = new THREE.TextGeometry("SkyBox images: MegaKosan - https://gamebanana.com/mods/7912", {

        font: font,

        size: 0.017,
        height: 0.001,
        curveSegments: 2,

    });

    var credit2 = new THREE.TextGeometry("Threex library: Jerome Etienne - https://github.com/jeromeetienne/threex.domevents", {

        font: font,

        size: 0.017,
        height: 0.001,
        curveSegments: 2,

    });

    var credit = new THREE.TextGeometry("Credits", {

        font: font,

        size: 0.05,
        height: 0.001,
        curveSegments: 2,

    });

    var credit3 = new THREE.TextGeometry("Collision dectection: Three.js tutorials by Lee Stemkoski Date: July 2013 (three.js v59dev)", {

        font: font,

        size: 0.017,
        height: 0.001,
        curveSegments: 2,

    });

    var credit4 = new THREE.TextGeometry("Gun view: saucecode - https://github.com/saucecode/threejs-demos/tree/master/08_GunView", {

        font: font,

        size: 0.0155,
        height: 0.001,
        curveSegments: 2,

    });

    var dArrow = new THREE.TextGeometry("Down arrow to close", {

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

    mesh11 = new THREE.Mesh(dArrow, textMaterial);
    mesh11.position.z = -1;
    mesh11.position.y = 0.3;
    mesh11.position.x = 0.25;

    cam.add(mesh6);
    cam.add(mesh7);
    cam.add(mesh8);
    cam.add(mesh9);
    cam.add(mesh10);
    cam.add(mesh11);
    scene.add(cam);

});


document.body.appendChild(renderer.domElement);

let controls = new THREE.PointerLockControls(cam, renderer.domElement);


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
    var speed = 15
    if (keyboard['w']) {
        controls.moveForward(speed);
    }
    else if (keyboard['a']) {
        controls.moveRight(-speed);
    }
    else if (keyboard['s']) {
        controls.moveForward(-speed);
    }
    else if (keyboard['d']) {
        controls.moveRight(speed);
    }
    else if (keyboard['r']) {
        controls.lock();
    }
}

function drawScene() {
    //wall4.position.x -= 0.01;
    renderer.render(scene, cam);
    processKeyboard();
    requestAnimationFrame(drawScene);
}

drawScene();

