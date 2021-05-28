
// //creating a scene
// const scene1 = new THREE.Scene();

// // adding ambient light
// const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.6);
// scene1.add(ambientLight1);

// //adding directional light @ position 100,-300, 400
// const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
// dirLight.position.set(100, -300, 400);
// scene1.add(dirLight);

// //adding orthographic camera
// const aspectRatio = window.innerWidth / window.innerHeight;
// const cameraWidth = 8000;
// const cameraHeight = cameraWidth / aspectRatio;

// const camera = new THREE.OrthographicCamera(
//     cameraWidth / -2, //Left
//     cameraWidth / 2, // Right
//     cameraHeight / 2, //top
//     cameraHeight / -2, // bottom
//     -3000, //near
//     10000 // far
// );

// camera.position.set(800, -800, 800);
// camera.up.set(0, 0, 1);
// //camera.position.set(0,0,300);
// camera.lookAt(0, 0, 0);

// /*Perspective camera code
//     const aspectRatio = window.innerwidthh / width/innerheight;

//     const camera = new THREE.PerspectiveCamera(
//         20, vertical field of view
//         aspectRatio, aspect ratio
//         60, // near plane
//         100 // far plane
//     )

// */

// const room = Room();
// room.scale.set(1, 1, 1);
// scene1.add(room);

// // setting up renderer
// const renderer1 = new THREE.WebGL1Renderer({ antialias: true });
// renderer1.setSize(window.innerWidth, window.innerHeight);
// renderer1.render(scene1, camera);

// document.body.appendChild(renderer1.domElement);

function Floor(x, y, z) {
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0xfaebd7 })
    );
    return wall;
}

function Window(x, y, z) {
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
    );
    return wall;
}

function Room() {

    const room = new THREE.Group();

    const level1 = new THREE.Group();

    const level2 = new THREE.Group();

    const level22 = new THREE.Group();

    const b1 = Floor(553, 25, 300);
    const b12 = Floor(100, 25, 100);
    const b2 = Floor(450, 25, 300);
    const b3 = Floor(750, 25, 300);
    const fl = Floor(775, 1106.5, 10);
    const b5 = Floor(1100, 25, 300);
    const b6 = Floor(225, 25, 300);
    const b613 = Floor(400, 25, 70);
    const b13 = Floor(225, 25, 300);
    const b14 = Floor(400, 25, 70);
    const window = Window(400, 23, 160);
    const roof = Floor(775, 1106.5, 10);

    b1.translateX(10);
    b3.rotateZ(Math.PI / 2);
    b12.translateX(335);
    b12.translateZ(100);
    b2.translateX(610);
    b3.translateX(-387);
    b3.translateY(254);
    fl.translateZ(-155);
    fl.rotateZ(Math.PI / 2);
    fl.translateX(-375);
    fl.translateY(-286.5);
    b5.translateY(-750);
    b5.translateX(290);
    b6.rotateZ(Math.PI / 2);
    b6.translateY(-827);
    b6.translateX(-100);
    b13.rotateZ(Math.PI / 2);
    b13.translateY(-827);
    b13.translateX(-650);
    b613.rotateZ(Math.PI / 2);
    b613.translateY(-827);
    b613.translateX(-400);
    b613.translateZ(115);
    b14.rotateZ(Math.PI / 2);
    b14.translateY(-827);
    b14.translateX(-400);
    b14.translateZ(-115);
    window.rotateZ(Math.PI / 2);
    window.translateY(-827);
    window.translateX(-400);
    roof.translateZ(155);
    roof.rotateZ(Math.PI / 2);
    roof.translateX(-375);
    roof.translateY(-286.5);

    level1.add(b3);
    level1.add(b1);
    level1.add(b2);
    level1.add(b12);
    level1.add(fl);
    level1.add(b5);
    level1.add(b6);
    level1.add(b13);
    level1.add(b613);
    level1.add(b14);
    level1.add(window);
    level1.add(roof);

    level1.translateY(-600);
    level1.translateZ(20);
    level1.scale.set(1,1,1.2);

    room.add(level1);

    const geometry = new THREE.CylinderGeometry(150, 150, 600, 32);
    const material = new THREE.MeshLambertMaterial({ color: 0xfaebd7 });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.scale.set(1,1,2)
    cylinder.translateX(400);
    cylinder.translateY(-300);
    cylinder.translateZ(-150);

    room.add(cylinder);

    const _b1 = Floor(1100, 25, 300);
    const _b3 = Floor(750, 25, 300);
    const _fl = Floor(775, 1106.5, 10);
    const _b5 = Floor(1100, 25, 300);
    const _b6 = Floor(225, 25, 300);
    const _b613 = Floor(400, 25, 70);
    const _b13 = Floor(225, 25, 300);
    const _b14 = Floor(400, 25, 70);
    const _window = Window(400, 23, 160);
    const _roof = Floor(775, 1106.5, 10);

    _b1.translateX(290);
    _b3.rotateZ(Math.PI / 2);
    _b3.translateX(-387);
    _b3.translateY(254);
    _fl.translateZ(-155);
    _fl.rotateZ(Math.PI / 2);
    _fl.translateX(-375);
    _fl.translateY(-286.5);
    _b5.translateY(-750);
    _b5.translateX(290);
    _b6.rotateZ(Math.PI / 2);
    _b6.translateY(-827);
    _b6.translateX(-100);
    _b13.rotateZ(Math.PI / 2);
    _b13.translateY(-827);
    _b13.translateX(-650);
    _b613.rotateZ(Math.PI / 2);
    _b613.translateY(-827);
    _b613.translateX(-400);
    _b613.translateZ(115);
    _b14.rotateZ(Math.PI / 2);
    _b14.translateY(-827);
    _b14.translateX(-400);
    _b14.translateZ(-115);
    _window.rotateZ(Math.PI / 2);
    _window.translateY(-827);
    _window.translateX(-400);
    _roof.translateZ(155);
    _roof.rotateZ(Math.PI / 2);
    _roof.translateX(-375);
    _roof.translateY(-286.5);

    level2.add(_b3);
    level2.add(_b1);
    level2.add(_fl);
    level2.add(_b5);
    level2.add(_b6);
    level2.add(_b13);
    level2.add(_b613);
    level2.add(_b14);
    level2.add(_window);
    level2.add(_roof);
    level2.rotateZ(Math.PI);
    level2.translateY(13);
    level2.translateX(-200);
    

    room.add(level2);

    const _2b1 = Floor(1100, 25, 300);
    const _2b3 = Floor(750, 25, 300);
    const _2fl = Floor(775, 1106.5, 10);
    const _2b5 = Floor(1100, 25, 300);
    const _2b6 = Floor(750, 25, 300);
    const _2roof = Floor(775, 1106.5, 10);

    _2b1.translateX(290);
    _2b3.rotateZ(Math.PI / 2);
    _2b3.translateX(-387);
    _2b3.translateY(254);
    _2fl.translateZ(-155);
    _2fl.rotateZ(Math.PI / 2);
    _2fl.translateX(-375);
    _2fl.translateY(-286.5);
    _2b5.translateY(-750);
    _2b5.translateX(290);
    _2b6.rotateZ(Math.PI / 2);
    _2b6.translateY(-830);
    _2b6.translateX(-387);
    _2roof.translateZ(155);
    _2roof.rotateZ(Math.PI / 2);
    _2roof.translateX(-375);
    _2roof.translateY(-286.5);

    level22.add(_2b3);
    level22.add(_2b1);
    level22.add(_2fl);
    level22.add(_2b5);
    level22.add(_2b6);
    level22.add(_2roof);

    level22.translateY(1500);
    level22.translateZ(160);
    level22.scale.set(1,2,2);

    room.add(level22);

    return room;

}