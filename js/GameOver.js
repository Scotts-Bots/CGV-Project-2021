var mesh;
var mesh2;
var mesh6;
var mesh7;
var mesh8;
var mesh9;
var mesh10;
var mesh11;
var mesh12;
var back2;
var back4;
var cback;

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial();
const mars = new THREE.Mesh(geometry, material);

const starsGeometry = new THREE.SphereGeometry(50, 32, 32);
const starsMaterial = new THREE.MeshBasicMaterial();
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);

const light = new THREE.DirectionalLight(0xff2200, 0.5);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

cam.position.z = 3;
light.position.set(5, 3, 5);

var ambientLight = new THREE.AmbientLight(0xff0000, 0.3);//0.05
scene.add(ambientLight);

material.map = new THREE.TextureLoader().load('textures/diffuse.jpg');
material.bumpMap = new THREE.TextureLoader().load('textures/bump.jpg');     
material.bumpScale = 0.015;

starsMaterial.map = new THREE.TextureLoader().load('textures/stars.jpg');
starsMaterial.side = THREE.BackSide;

scene.add(mars);
scene.add(light);
scene.add(starsMesh);
AddPause();

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, cam);

    starsMesh.rotation.y += 0.0001;
    starsMesh.rotation.x += 0.0003;
    mars.rotation.y -= 0.001;
    mars.rotation.z -= 0.0005;
    light.rotation.y -= 0.001;
};

animate();

const domEvent1 = new THREEx.DomEvents(cam,  renderer.domElement);

domEvent1.addEventListener(back2, 'click', event =>{
    window.location.href = "level1.html";
});

const domEvent2 = new THREEx.DomEvents(cam,  renderer.domElement);

domEvent2.addEventListener(back4, 'click', event =>{
    window.location.href = "index.html";
});

function AddPause(){

    back2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back2.position.z = -1;
    back2.position.y = 0.19;
    cam.add(back2);
    scene.add(cam);

    back4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back4.position.z = -1;
    back4.position.y = -0.16;
    cam.add(back4);
    scene.add(cam);


    var loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        var restartText = new THREE.TextGeometry("Restart", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        var creditText = new THREE.TextGeometry("Main Menu", {

            font: font,

            size: 0.05,
            height: 0.001,
            curveSegments: 2,

        });

        var TitleText = new THREE.TextGeometry("GAME OVER", {

            font: font,

            size: 0.19,
            height: 0.05,
            curveSegments: 20,

            bevelThickness: 0.005,
        bevelSize: 0.005,
        bevelEnabled: true

        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0x110000 });
        const textMaterial1 = new THREE.MeshPhongMaterial({ color: 0xAA0000 });

        mesh = new THREE.Mesh(restartText, textMaterial);
        mesh.position.z = -1;
        mesh.position.y = 0.17;
        mesh.position.x = -0.1;

        mesh2 = new THREE.Mesh(creditText, textMaterial);
        mesh2.position.z = -1;
        mesh2.position.y = -0.18;
        mesh2.position.x = -0.155;

        mesh3 = new THREE.Mesh(TitleText, textMaterial1);
        mesh3.position.z = -1;
        mesh3.position.y = 0.4;
        mesh3.position.x = -0.8;

        cam.add(mesh);
        cam.add(mesh2);
        cam.add(mesh3);
        scene.add(cam);

    });
}
