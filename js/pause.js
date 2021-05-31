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
    cam.add(back);
    scene.add(cam);

    back1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.9, 0.6, 0.001),
        new THREE.MeshLambertMaterial({ color: 0xC0C0C0 })
    );
    back1.position.z = -1;
    back1.position.x = -0.05;
    cam.add(back1);
    scene.add(cam);

    back2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back2.position.z = -1;
    back2.position.y = 0.19;
    back2.position.x = -0.04;
    cam.add(back2);
    scene.add(cam);

    back3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back3.position.z = -1;
    back3.position.y = 0.01;
    back3.position.x = -0.04;
    cam.add(back3);
    scene.add(cam);

    back4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.4, 0.1, 0.001),
        new THREE.MeshLambertMaterial({ color: 0x696969 })
    );
    back4.position.z = -1;
    back4.position.y = -0.16;
    back4.position.x = -0.04;
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
        textMaterial1 = new THREE.MeshPhongMaterial({ color: 0x000000 });

        mesh = new THREE.Mesh(restartText, textMaterial1);
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

        cam.add(mesh);
        cam.add(mesh1);
        cam.add(mesh2);
        cam.add(mesh3);
        cam.add(mesh4);
        cam.add(mesh5);
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
        cam.remove(cback);

        scene.add(cam);
}

function RemovePause(){
        cam.remove(mesh);
        cam.remove(mesh1);
        cam.remove(mesh2);
        cam.remove(mesh3);
        cam.remove(mesh4);
        cam.remove(mesh5);
        cam.remove(back);
        cam.remove(back1);
        cam.remove(back2);
        cam.remove(back3);
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
}

