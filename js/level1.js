
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
    // const cameraWidth = 3500;
    // const cameraHeight = cameraWidth / aspectRatio;

    // const camera = new THREE.OrthographicCamera(
    //     cameraWidth / -2, //Left
    //     cameraWidth / 2, // Right
    //     cameraHeight / 2, //top
    //     cameraHeight / -2, // bottom
    //     -800, //near
    //     5000 // far
    // );

    // camera.position.set(0, -200, 300);
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
    // room.scale.set(2,2.5,1);
    // scene1.add(room);

    // // setting up renderer
    // const renderer1 = new THREE.WebGL1Renderer({ antialias: true });
    // renderer1.setSize(window.innerWidth, window.innerHeight);
    // renderer1.render(scene1, camera);

    // document.body.appendChild(renderer1.domElement);

function Wall(x, y, z) {
    const wall = new THREE.Mesh(
        new THREE.BoxBufferGeometry(x, y, z),
        new THREE.MeshLambertMaterial({ color: 0x808080 })
    );
    return wall;
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

}