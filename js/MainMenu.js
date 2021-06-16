var mesh, mesh2, mesh6, mesh7, mesh8, mesh9, mesh10, mesh11, mesh12, back2, back4, cback;

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial();
const mars = new THREE.Mesh(geometry, material);

const starsGeometry = new THREE.SphereGeometry(50, 32, 32);
const starsMaterial = new THREE.MeshBasicMaterial();
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);

const light = new THREE.DirectionalLight(0xcccccc, 1);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

cam.position.z = 3;
light.position.set(5, 3, 5);

var input = document.createElement('INPUT');
input.id ="input";
input.style.position = 'absolute';
input.style.color = "white";
input.style.fontSize = "20px";
input.style.letterSpacing = "2px";
input.style.fontFamily = "Helvetica";
input.style.width = 200;
input.style.height = 500;
input.innerHTML = "Q";
input.style.top = 820 + 'px';
input.style.left = 2130 + 'px';

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
    RemovePause();
        AddCredit();
});

document.addEventListener('keydown', event => {
    if (event.code === "ArrowDown") {
        RemoveCredit();
        AddPause();
    }
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

        var restartText = new THREE.TextGeometry("Start", {

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

        var TitleText = new THREE.TextGeometry("Escape Mars", {

            font: font,

            size: 0.1,
            height: 0.05,
            curveSegments: 2,

            bevelThickness: 0.005,
        bevelSize: 0.005,
        bevelEnabled: true

        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const textMaterial1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });

        mesh = new THREE.Mesh(restartText, textMaterial);
        mesh.position.z = -1;
        mesh.position.y = 0.17;
        mesh.position.x = -0.08;

        mesh2 = new THREE.Mesh(creditText, textMaterial);
        mesh2.position.z = -1;
        mesh2.position.y = -0.18;
        mesh2.position.x = -0.1;

        mesh3 = new THREE.Mesh(TitleText, textMaterial1);
        mesh3.position.z = -1;
        mesh3.position.y = 0.5;
        mesh3.position.x = -0.4;

        cam.add(mesh);
        cam.add(mesh2);
        cam.add(mesh3);
        scene.add(cam);

    });
}

function RemoveCredit(){
    cam.remove(mesh6);
        cam.remove(mesh7);
        cam.remove(mesh8);
        cam.remove(mesh9);
        cam.remove(mesh10);
        cam.remove(mesh11);
        cam.remove(mesh12);
        cam.remove(cback);

        scene.add(cam);
}

function RemovePause(){
        cam.remove(mesh);
        cam.remove(mesh2);
        cam.remove(back2);
        cam.remove(back4);


        scene.add(cam);
}

function AddCredit(){
    cback = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 0.7, 0.001),
        new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
    );
    cback.position.z = -1;
    cback.position.x = -0.05;
    cam.add(cback);
    scene.add(cam);

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

            size: 0.018,
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
        mesh11.position.x = 0.2;

        cam.add(mesh6);
        cam.add(mesh7);
        cam.add(mesh8);
        cam.add(mesh9);
        cam.add(mesh10);
        cam.add(mesh11);
        cam.add(mesh12);
        scene.add(cam);

    });
}

localStorage["name"] = "Jafed";
localStorage["health"] = 100;
localStorage["oxygen"] = 100;
localStorage["ammo"] = 10;
localStorage["cards"]  = 0;
localStorage["gun"] = false;

